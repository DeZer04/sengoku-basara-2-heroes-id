// Streaming-download helper for the Basara 2 ID patcher (patcher.html).
// It lets the patched ISO be written straight to a browser download with constant
// memory — no multi-GB Blob is ever held in RAM — so Android / non-FSA browsers
// stream the file out instead of stalling while they try to buffer the whole ISO.
//
// The page transfers a ReadableStream here keyed by a random id, then loads a
// hidden iframe at ./dl/<id>; this worker answers that request with the stream and
// a Content-Disposition: attachment header, so the browser downloads it as it flows.

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

const PENDING = new Map();   // id -> { name, size, readable }

self.addEventListener('message', e => {
  const d = e.data;
  if (!d || d.type !== 'stream') return;
  PENDING.set(d.id, { name: d.name, size: d.size, readable: d.readable });
  e.source.postMessage({ type: 'ready', id: d.id });   // tell the page the stream is registered
});

self.addEventListener('fetch', e => {
  const m = new URL(e.request.url).pathname.match(/\/dl\/([^/]+)$/);
  if (!m) return;                              // not a download request -> handle normally
  const item = PENDING.get(m[1]);
  if (!item) return;                           // unknown/expired id -> let it 404
  PENDING.delete(m[1]);
  const headers = {
    'Content-Type': 'application/octet-stream',
    'Content-Disposition': "attachment; filename=\"basara2_id.iso\"; filename*=UTF-8''" + encodeURIComponent(item.name),
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
  };
  if (item.size) headers['Content-Length'] = String(item.size);   // lets the browser show total size / progress
  e.respondWith(new Response(item.readable, { headers }));
});
