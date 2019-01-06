self.__precacheManifest = [
    {
      "url": "/_next/static/runtime/webpack.js"
    },
    {
      "url": "/_next/static/development/pages/_app.js"
    },
    {
      "url": "/_next/static/development/pages/index.js"
    },
    {
      "url": "/_next/static/runtime/main.js"
    },
    {
      "url": "/_next/static/webpack/static/runtime/main.js.49ba9f4dc65ba5d28dce.hot-update.js"
    },
    {
      "url": "/_next/static/development/pages/_error.js"
    },
    {
      "url": "/_next/static/webpack/49ba9f4dc65ba5d28dce.hot-update.json"
    },
    {
      "url": "/_next/static/development/dll/dll_0dcd5bb978dc65e9b4c3.js"
    },
    {
      "url": "/_next/static/chunks/0.js"
    }
  ];
  
  /**
   * Welcome to your Workbox-powered service worker!
   *
   * You'll need to register this file in your web app and you should
   * disable HTTP caching for this file too.
   * See https://goo.gl/nhQhGp
   *
   * The rest of the code is auto-generated. Please don't update this file
   * directly; instead, make changes to your Workbox build configuration
   * and re-run your build process.
   * See https://goo.gl/2aRDsh
   */
  
  importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");
  
  importScripts(
    
  );
  
  /**
   * The workboxSW.precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  self.__precacheManifest = [].concat(self.__precacheManifest || []);
  workbox.precaching.suppressWarnings();
  workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
  
  workbox.routing.registerRoute(/^http?.*/, workbox.strategies.networkFirst({ "cacheName":"http-calls","networkTimeoutSeconds":15, plugins: [new workbox.expiration.Plugin({"maxEntries":150,"maxAgeSeconds":2592000,"purgeOnQuotaError":false}), new workbox.cacheableResponse.Plugin({"statuses":[0,200]})] }), 'GET');
  