import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare const self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is default injection point
const selfWbManifest = self.__WB_MANIFEST
precacheAndRoute(selfWbManifest)

// clean old res
cleanupOutdatedCaches()

let allowlist: undefined | RegExp[]
if (import.meta.env.DEV) allowlist = [/^\/$/]

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),
  { allowlist: allowlist! }
))

console.log(selfWbManifest)

self.skipWaiting()
clientsClaim()
