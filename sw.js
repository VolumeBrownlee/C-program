/* C Mastery service worker — network-first edition
   Strategy:
     - Always try the network first for same-origin files.
     - On success, the response is stored in the cache as an offline backup.
     - On failure (offline / flaky network), we serve from the cache.
     - Cross-origin requests (compiler APIs, CodeMirror CDN) are ignored
       so the Run button isn't affected.
   This avoids the "browser is stuck on old code after I redeployed" trap
   that cache-first service workers create.
*/
const CACHE = "c-mastery-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./icon.svg",
  "./content/lessons.js",
  "./content/problems.js",
  "./content/projects.js"
];

self.addEventListener("install", (e) => {
  // Pre-warm the cache so the app still works on a flight after first visit.
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(ASSETS).catch(() => {})) // tolerate missing files
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Leave cross-origin requests (Codex/Piston/Wandbox/CodeMirror) alone.
  if (url.origin !== location.origin) return;

  // NETWORK-FIRST: try fresh, fall back to cache only when network fails.
  e.respondWith(
    fetch(req)
      .then((res) => {
        // Cache a copy for offline use, but only if the response is OK
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then((cached) => cached || caches.match("./index.html")))
  );
});
