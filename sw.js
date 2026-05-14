/* C Mastery service worker
   - Caches the app shell so it works offline after first visit
   - Lets the browser show an "Install app" prompt on Android/Chrome
   - Lets iOS Safari's "Add to Home Screen" feel app-like
   Network requests to OTHER origins (like the Piston compiler API) are
   left untouched so the Run button still works online.
*/
const CACHE = "c-mastery-v1";
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
  e.waitUntil(
    caches
      .open(CACHE)
      .then((c) => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Same-origin: serve from cache first, fall back to network, then to index.
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req)
            .then((res) => {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
              return res;
            })
            .catch(() => caches.match("./index.html"))
      )
    );
  }
  // Cross-origin (CodeMirror CDN, Piston API): just go to network, no caching.
});
