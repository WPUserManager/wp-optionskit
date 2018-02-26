importScripts('workbox-v3.0.0-alpha.3/workbox-sw.js')

self.workbox.skipWaiting();
self.workbox.clientsClaim();

self.workbox.routing.registerRoute(
  /\.html$/,
  self.workbox.strategies.networkFirst()
);

self.workbox.precaching.precacheAndRoute([
  {
    "url": "assets/icon/favicon.ico",
    "revision": "99fc5f75faf5ed2c4f7b53d0034401a8"
  },
  {
    "url": "assets/img/feature-icons.png",
    "revision": "27bfbedb35d80a68fa31ebcee9292048"
  },
  {
    "url": "assets/img/logo.png",
    "revision": "a969f393090397b2a55a352dcba5666f"
  },
  {
    "url": "build/app.css",
    "revision": "fcdc64583f9b8991a3df2cc766bdcb55"
  },
  {
    "url": "build/app.js",
    "revision": "5554e35d79abc1707429f8795ad8fa24"
  },
  {
    "url": "build/app/app.global.js",
    "revision": "c0344134bee4f5a871ae07658ecd1a34"
  },
  {
    "url": "build/app/app.m6zfgcl9.js",
    "revision": "5ce9f66df01b0530f9ffac53486d2093"
  },
  {
    "url": "build/app/app.registry.json",
    "revision": "963b26db347ddee835611d552f4da7a5"
  },
  {
    "url": "build/app/app.ucumfbl5.js",
    "revision": "bb6a80c2067fbeca110611f7ebe64e08"
  },
  {
    "url": "build/app/bayssvoa.es5.js",
    "revision": "dd8926beb1aa78d00e8e73d27cf14554"
  },
  {
    "url": "build/app/bayssvoa.js",
    "revision": "343054db6f0852f01617fb8130575896"
  },
  {
    "url": "build/app/chunk1.es5.js",
    "revision": "b4112d97ee19937d56d357446d85070c"
  },
  {
    "url": "build/app/chunk1.js",
    "revision": "062a09e8f97dc59680f969fc9ab041d8"
  },
  {
    "url": "build/app/dyoj3lkk.es5.js",
    "revision": "94f27798f9b539ecd4e2bfd9d22d3b9b"
  },
  {
    "url": "build/app/dyoj3lkk.js",
    "revision": "2fe0b7c60f001e0b1ac46a0fd414b28f"
  },
  {
    "url": "build/app/e35zse16.es5.js",
    "revision": "3cb3f40625774a862986b01c1dc29675"
  },
  {
    "url": "build/app/e35zse16.js",
    "revision": "efec3fa6d44225d461074f43f220f0f2"
  },
  {
    "url": "build/app/r7jvoom2.es5.js",
    "revision": "c7def63327666e7b41c726e8d3351918"
  },
  {
    "url": "build/app/r7jvoom2.js",
    "revision": "b2bbcdcb29da021cc9703363e5f75863"
  },
  {
    "url": "build/app/triafowf.es5.js",
    "revision": "9861617bc8ac665ef98542f85feb593b"
  },
  {
    "url": "build/app/triafowf.js",
    "revision": "ef5eeaaaa0d0ad876c2b21b9acec3ac6"
  },
  {
    "url": "build/app/xzrtjtph.es5.js",
    "revision": "601ae01d70cd918935f5e999d1f5d32d"
  },
  {
    "url": "build/app/xzrtjtph.js",
    "revision": "5b898375fa229bb4a4ac37519fce4cbf"
  },
  {
    "url": "docs-content/addons/stencil-router.html",
    "revision": "eb894121ce1d8211ab8d8ac4a68c1778"
  },
  {
    "url": "docs-content/addons/stencil-sass.html",
    "revision": "e136cb434158e882cd08a281d43e2b27"
  },
  {
    "url": "docs-content/advanced/compiler/index.html",
    "revision": "0364af7ee1093c69ef8a412266026006"
  },
  {
    "url": "docs-content/advanced/css-variables/index.html",
    "revision": "0983d656e130a71c9a965e6c6c6e1fc1"
  },
  {
    "url": "docs-content/advanced/custom-fields.html",
    "revision": "8ca3084320f04d1fe287f6484f0e6f5d"
  },
  {
    "url": "docs-content/advanced/distribution/index.html",
    "revision": "a067c74332498216f6751caab0b46677"
  },
  {
    "url": "docs-content/advanced/error-handling.html",
    "revision": "30b36249ebd14335ae847fcd85172578"
  },
  {
    "url": "docs-content/advanced/framework-integration/index.html",
    "revision": "bd23b21215fe99c89ff045e3a7d04123"
  },
  {
    "url": "docs-content/advanced/pre-rendering/index.html",
    "revision": "f0f447abe7f473d7eee5b948c7a383e8"
  },
  {
    "url": "docs-content/advanced/sanitization-filters.html",
    "revision": "ecf4f475689c65f2c86b7fed75d630fb"
  },
  {
    "url": "docs-content/advanced/service-worker/index.html",
    "revision": "4bbf3d21250de75b9e815cc32b99f78c"
  },
  {
    "url": "docs-content/advanced/shadow-dom/index.html",
    "revision": "5fec23b974e713d1f3731a58c4b57036"
  },
  {
    "url": "docs-content/advanced/ssr/index.html",
    "revision": "5bdfa19ad27f0279956ddcdef1726895"
  },
  {
    "url": "docs-content/basics/adding-fields.html",
    "revision": "54b2debeb162bdf4aa8f62c55cd276ed"
  },
  {
    "url": "docs-content/basics/labels.html",
    "revision": "9a8e2a7ce299e488bfc80b051c23e5c1"
  },
  {
    "url": "docs-content/basics/menu-setup.html",
    "revision": "5f1e7438e7231af88b2a2ffa417caf00"
  },
  {
    "url": "docs-content/basics/tabs-and-sections.html",
    "revision": "75ab5ca1e8ef58c023e860de7ac20a8e"
  },
  {
    "url": "docs-content/intro/browsers.html",
    "revision": "d4fd210849e901aa9ddc213d72b8b063"
  },
  {
    "url": "docs-content/intro/index.html",
    "revision": "67508b2a7a6d1c38d140b2171f241a5a"
  },
  {
    "url": "docs-content/start/index.html",
    "revision": "94f752aefe5f16d9cbf3aa0d3d46cfff"
  },
  {
    "url": "docs/adding-fields/index.html",
    "revision": "c52933bd18835ab4970f8a4fd9d6a756"
  },
  {
    "url": "docs/custom-fields/index.html",
    "revision": "9461a1c7eaa22483825c1e049f0cb411"
  },
  {
    "url": "docs/error-handling/index.html",
    "revision": "e6651032173a08b4719ac81f2d69f646"
  },
  {
    "url": "docs/getting-started/index.html",
    "revision": "ee78ba0929c8dd304f7c5cf98815aa2d"
  },
  {
    "url": "docs/intro/index.html",
    "revision": "228e7b281bce11eb8eb2271bbeb84bd3"
  },
  {
    "url": "docs/labels/index.html",
    "revision": "7156b6a000102d042c6e15209c7f58e5"
  },
  {
    "url": "docs/menu-setup/index.html",
    "revision": "340270dbe3b32a309a46fca421b94296"
  },
  {
    "url": "docs/sanitization-filters/index.html",
    "revision": "6e49cc3dd726e0d2ca0b85899a87d82c"
  },
  {
    "url": "docs/tabs-and-sections/index.html",
    "revision": "49337e9c47b40b87a9c2f7c9db0e4acc"
  },
  {
    "url": "host.config.json",
    "revision": "8dc09768d186aabc26e893cd85667350"
  },
  {
    "url": "index.html",
    "revision": "2bd67be24fbc3c4d122d1c26521fd0ac"
  },
  {
    "url": "manifest.json",
    "revision": "c71c294aede87b87032240c440534258"
  }
]);