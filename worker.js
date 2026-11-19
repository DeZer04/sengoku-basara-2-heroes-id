// Web Worker: applies the patch off the main thread so the UI stays smooth and the byte work runs full speed.
// The page transfers a WritableStream (piped to the service worker's download) plus the source ISO / patch
// Files and the parsed header; this worker streams the patched ISO straight into that writable.
importScripts('patch-core.js');

self.onmessage = async (e) => {
  const { iso, patch, hdr, verify, writable } = e.data;
  try {
    const writer = writable.getWriter();
    const sink = { write: u8 => writer.write(u8) };     // WritableStream backpressure keeps memory constant
    let last = 0;
    const progress = f => {                              // throttle progress posts to the page
      const n = Date.now();
      if (f >= 1 || n - last > 150) { last = n; self.postMessage({ type: 'progress', f }); }
    };
    let crc;
    try {
      crc = await writePatched(iso, patch, hdr, sink, progress, { skipCrc: !verify });
      await writer.close();
    } catch (err) {
      try { await writer.abort(err); } catch (_) {}
      throw err;
    }
    self.postMessage({ type: 'done', crc });
  } catch (err) {
    self.postMessage({ type: 'error', message: (err && err.message) || String(err) });
  }
};
