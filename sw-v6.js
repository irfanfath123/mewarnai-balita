/* Service worker Mewarnai Balita — cache-first agar bisa offline */
const CACHE = 'mewarnai-balita-v6';
const FILES = [
  './', './index.html', './styles-v6.css', './app-v6.js',
  './manifest.webmanifest',
  './icons/icon-192.png', './icons/icon-512.png',
  './assets/shark.png', './assets/cat.png',
  './assets/dino.png', './assets/car.png',
  './assets/butterfly.png', './assets/flower.png',
  './assets/ship.png', './assets/house.png',
  './assets/trace-shark.png', './assets/trace-cat.png',
  './assets/trace-dino.png', './assets/trace-car.png',
  './assets/trace-butterfly.png', './assets/trace-flower.png',
  './assets/trace-ship.png', './assets/trace-house.png',
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
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request))
  );
});
