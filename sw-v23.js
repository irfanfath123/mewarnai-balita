/* Service worker Mewarnai Balita — cache-first agar bisa offline */
const CACHE = 'mewarnai-balita-v23';
const FILES = [
  './', './index.html', './styles-v9.css', './app-v23.js',
  './kategori.html',
  './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png',
];
self.addEventListener('install', e => {
  const fresh = FILES.map(u => new Request(u, { cache: 'reload' }));
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(fresh)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        // cache runtime: gambar & aset lain agar offline setelah dibuka sekali
        if (res.ok && new URL(e.request.url).origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        }
        return res;
      });
    })
  );
});
