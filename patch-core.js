// ==CORE== patch format BSR2IDP2 (see make_patch.py). Shared by patcher.html (page), worker.js (Web Worker,
// via importScripts) and patcher_test.mjs (Node, via new Function). Plain classic script: its top-level
// declarations become globals usable by whatever loaded it. No DOM / no window assumptions here.
const MAGIC = 'BSR2IDP2', HDR = 96, RUN = 12, BLK = 2048, CHUNK = 8 << 20;

const CRC_T = (() => {                          // slicing-by-8 tables for CRC-32 (same values as zlib.crc32)
  const t = new Uint32Array(2048);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  for (let i = 0; i < 256; i++)
    for (let s = 1; s < 8; s++) t[s * 256 + i] = (t[(s - 1) * 256 + i] >>> 8) ^ t[t[(s - 1) * 256 + i] & 255];
  return t;
})();

function crc32(u8, crc = 0) {
  const T = CRC_T, n = u8.length;
  let c = ~crc, i = 0;
  for (; i + 8 <= n; i += 8) {
    c ^= u8[i] | u8[i + 1] << 8 | u8[i + 2] << 16 | u8[i + 3] << 24;
    c = T[1792 + (c & 255)] ^ T[1536 + (c >>> 8 & 255)] ^ T[1280 + (c >>> 16 & 255)] ^ T[1024 + (c >>> 24)] ^
        T[768 + u8[i + 4]] ^ T[512 + u8[i + 5]] ^ T[256 + u8[i + 6]] ^ T[u8[i + 7]];
  }
  for (; i < n; i++) c = T[(c ^ u8[i]) & 255] ^ (c >>> 8);
  return ~c >>> 0;
}

async function readHeader(patch) {
  const bad = () => new Error('Ini bukan file patch Basara 2 ID (atau filenya rusak).');
  if (patch.size < HDR) throw bad();
  const h = new DataView(await patch.slice(0, HDR).arrayBuffer());
  const str = (o, n) => new TextDecoder().decode(new Uint8Array(h.buffer, o, n)).replace(/\0+$/, '');
  const hex = o => Array.from(new Uint8Array(h.buffer, o, 20), b => b.toString(16).padStart(2, '0')).join('');
  if (str(0, 8) !== MAGIC) throw bad();
  const nruns = h.getUint32(32, true), dataOffset = HDR + RUN * nruns;
  if (patch.size < dataOffset) throw bad();
  const r = new DataView(await patch.slice(HDR, dataOffset).arrayBuffer());
  const runs = [];
  for (let i = 0; i < nruns; i++)
    runs.push({ start: r.getUint32(i * RUN, true) * BLK, len: r.getUint32(i * RUN + 4, true) * BLK,
                crc: r.getUint32(i * RUN + 8, true) });
  return { version: str(8, 8), size: Number(h.getBigUint64(16, true)), dataLen: Number(h.getBigUint64(24, true)),
           crcOrig: h.getUint32(36, true), crcOut: h.getUint32(40, true), sha1Orig: hex(44), sha1Out: hex(64),
           runs, dataOffset };
}

const BROKEN = 'File patch rusak atau terpotong (unduhan tidak lengkap?). Unduh ulang file patch.';

class Inflater {                                // reads the gzip data section as a byte stream
  constructor(blob) {
    this.r = blob.stream().pipeThrough(new DecompressionStream('gzip')).getReader();
    this.buf = new Uint8Array(0); this.pos = 0;
  }
  async next() {                                // inflate errors (cut-off download, bad CRC) -> one clear message
    try { return await this.r.read(); } catch (_) { throw new Error(BROKEN); }
  }
  async read(n) {                               // up to n bytes (at least 1)
    if (this.pos >= this.buf.length) {
      const { value, done } = await this.next();
      if (done) throw new Error(BROKEN);
      this.buf = value; this.pos = 0;
    }
    const k = Math.min(n, this.buf.length - this.pos);
    this.pos += k;
    return this.buf.subarray(this.pos - k, this.pos);
  }
  async readFull(n) {
    const out = new Uint8Array(n);
    for (let o = 0; o < n;) { const c = await this.read(n - o); out.set(c, o); o += c.length; }
    return out;
  }
  async end() {                                 // the stream must end exactly here (gzip CRC is checked on the way)
    if (this.pos < this.buf.length) throw new Error(BROKEN);
    for (;;) {
      const { value, done } = await this.next();
      if (done) return;
      if (value.length) throw new Error(BROKEN);
    }
  }
}

function* plan(h) {                             // the patched ISO as copied ranges of the original + patch runs
  let pos = 0;
  for (const run of h.runs) {
    if (run.start > pos) yield { from: pos, to: run.start };
    yield { run };
    pos = run.start + run.len;
  }
  if (pos < h.size) yield { from: pos, to: h.size };
}

async function readRange(blob, a, b, each) {
  for (let p = a; p < b; p += CHUNK) await each(new Uint8Array(await blob.slice(p, Math.min(p + CHUNK, b)).arrayBuffer()));
}

// quick check: right size, and the bytes the patch replaces are those of the expected dump -> null, 'size', 'content'
async function checkOriginal(iso, h, progress = () => {}) {
  if (iso.size !== h.size) return 'size';
  const total = h.runs.reduce((a, r) => a + r.len, 0);
  let done = 0;
  for (const run of h.runs) {
    let c = 0;
    await readRange(iso, run.start, run.start + run.len, u8 => { c = crc32(u8, c); done += u8.length; progress(done / total); });
    if (c !== run.crc) return 'content';
  }
  return null;
}

async function crcFile(blob, progress = () => {}) {
  let c = 0, done = 0;
  await readRange(blob, 0, blob.size, u8 => { c = crc32(u8, c); done += u8.length; progress(done / blob.size); });
  return c;
}

// stream the patched ISO into sink.write(u8) (in order); returns its CRC-32, or -1 when opts.skipCrc is set
// (skipping the checksum saves a full output-size pass through crc32 on the fast path)
async function writePatched(iso, patch, h, sink, progress = () => {}, opts = {}) {
  const inf = new Inflater(patch.slice(h.dataOffset));
  const doCrc = !opts.skipCrc;
  let crc = 0, done = 0;
  const put = async u8 => { if (doCrc) crc = crc32(u8, crc); await sink.write(u8); done += u8.length; progress(done / h.size); };
  for (const s of plan(h)) {
    if (s.run) for (let left = s.run.len; left > 0;) { const u8 = await inf.readFull(Math.min(left, CHUNK)); left -= u8.length; await put(u8); }
    else await readRange(iso, s.from, s.to, put);
  }
  await inf.end();
  return doCrc ? crc : -1;
}

// the patched ISO as a Blob: unchanged ranges stay references into the original file (nothing is copied in memory)
async function patchedBlob(iso, patch, h, progress = () => {}) {
  const inf = new Inflater(patch.slice(h.dataOffset));
  const parts = [];
  let done = 0;
  for (const s of plan(h)) {
    if (s.run) for (let left = s.run.len; left > 0;) {
      const u8 = await inf.readFull(Math.min(left, CHUNK));
      parts.push(u8); left -= u8.length; done += u8.length; progress(done / h.dataLen);
    }
    else parts.push(iso.slice(s.from, s.to));
  }
  await inf.end();
  return new Blob(parts, { type: 'application/octet-stream' });
}
// ==END CORE==
