/* Basic offline shell for Marina Pizza PWA */
var CACHE_NAME = 'marina-pizza-shell-v2';
var CORE_FILES = [
  './', './index.html', './manifest.webmanifest',
  './css/style.css', './js/menu-data.js', './js/app.js', './js/install.js', './js/opening-notice.js',
  './assets/logo.jpg', './assets/hero.jpg', './assets/chef.jpg', './assets/fatir.jpg'
];
self.addEventListener('install', function (event) {
  event.waitUntil(caches.open(CACHE_NAME).then(function (cache) {
    return cache.addAll(CORE_FILES);
  }).then(function () { return self.skipWaiting(); }));
});
self.addEventListener('activate', function (event) {
  event.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (key) { return key !== CACHE_NAME; }).map(function (key) { return caches.delete(key); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(event.request).then(function (cached) {
    if (cached) return cached;
    return fetch(event.request).then(function (response) {
      if (response && response.status === 200) {
        var copy = response.clone();
        caches.open(CACHE_NAME).then(function (cache) { cache.put(event.request, copy); });
      }
      return response;
    }).catch(function () {
      if (event.request.mode === 'navigate') return caches.match('./index.html');
      throw new Error('Offline resource unavailable');
    });
  }));
});
