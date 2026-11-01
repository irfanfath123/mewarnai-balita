/* Service worker Mewarnai Balita — cache-first agar bisa offline.
   NAMA FILE INI STABIL (sw.js) DAN TIDAK BOLEH DIGANTI PER VERSI.
   Pelajaran v25/v26: mengganti nama file SW tiap versi membuat pengguna
   lama terjebak selamanya, karena peramban hanya memeriksa pembaruan pada
   URL SW yang terdaftar (sw-v25.js tidak pernah berubah jadi v26).
   Pembaruan versi cukup lewat CACHE dan daftar FILES di bawah ini. */
const CACHE = 'mewarnai-balita-v27';
const FILES = [
  './', './index.html', './styles-v27.css', './app-v27.js', './auto-colors-v1.js',
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
        if (res.ok && new URL(e.request.url).origin === location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        }
        return res;
      });
    })
  );
});
