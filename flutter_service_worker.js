'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "ad29429c4eb1a66d8aab36ce691c7df5",
"assets/assets/anim/loading.json": "ac184ae3dd7d3da9a8ebe271cb3e7b64",
"assets/assets/fonts/BankGothic.otf": "bdd2a9091cbe0a1a40e32b7dbe0aafe1",
"assets/assets/fonts/NexaExtraBold.otf": "9e6108697583d1f9be8bc4040d6195bf",
"assets/assets/fonts/NexaLight.otf": "12108809f49c49bcdc126dcecc938761",
"assets/assets/fonts/NexaMedium.otf": "459f4dc6bfb8cbfdfe7e18fb3b59f1c9",
"assets/assets/fonts/NexaRegular.otf": "43af9a823810d7aea830a8db17ca902d",
"assets/assets/fonts/NexaSemiBold.otf": "c9f309b3d47969ecac64a77a6c672594",
"assets/assets/fonts/NexaThin.otf": "88d262eeee71db1fe99a42c8e6a4bcc9",
"assets/assets/home4.m4v": "559f9310d44fd44562f7a226514352ed",
"assets/assets/images/animeInsta.png": "5ac59bda0b81755abca93112c92c0092",
"assets/assets/images/assignment.png": "2dd37fb1da3b5ccd4ab9776d44a20c12",
"assets/assets/images/certif1.jpg": "dec55d7ee69493f72b324541f7f645e7",
"assets/assets/images/certif2.jpg": "705608f0fcb8ad1cccffd91eca17273b",
"assets/assets/images/certif3.jpg": "763ac347a6b7a0c30dfeccc14d5a50f7",
"assets/assets/images/certif4.jpg": "ada39f54955344fd9906ddb745d7762b",
"assets/assets/images/cherrytree.png": "86cc71c0a22207a7a6f2e970747a7ad7",
"assets/assets/images/ct.png": "668f4393ef5dab3406d65c4ab417f1cb",
"assets/assets/images/doodle.png": "2c6f0d84279e5feaa045103fde529530",
"assets/assets/images/flowers.png": "d99c97037e9695e4938728086b2ad86d",
"assets/assets/images/github.png": "eb94bb97c3410733ce017b184d314723",
"assets/assets/images/inshorts.png": "83360d5a0fc96325ef590b54d6520abb",
"assets/assets/images/lines.png": "a4a95a8f0545673f427d7b0c0015f30a",
"assets/assets/images/luffy.png": "b4ba1a0e48bd85ed1eb9c1708ebb7697",
"assets/assets/images/play.png": "cc34f54865f1f4532a86f350049cdf07",
"assets/assets/images/rect.png": "2bd6779d5f4940b46a45cc80b56b8188",
"assets/assets/images/tree.png": "466b0c293425b6f3d5a257694b572baa",
"assets/assets/images/waymaps.png": "4e5d2de04fd5ebc54f0f6343870a843f",
"assets/assets/images/web.png": "8911b2a812489868a3e651a228c23bd1",
"assets/assets/images/yt.png": "edb6e8e64392a239e95cff99d98474dc",
"assets/FontManifest.json": "9fff3158873fe2338ace5b864d08c47e",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/loading.gif": "8452d27aaf19dece2cbe0fd9615a324a",
"assets/NOTICES": "971b8e83aeaa2dd85de286a10369ba27",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "69d9902dff30e1e6c5c91738c533e2d3",
"/": "69d9902dff30e1e6c5c91738c533e2d3",
"main.dart.js": "8e38f8e0a588767e7207594d95fe320c",
"manifest.json": "66734b3f91eab2da009a9ea2b4fc4a8f",
"version.json": "2eeb3f233c86762a75918fc76187f2d8"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
