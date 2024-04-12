import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import checker from 'vite-plugin-checker'



// manifest object to inject
const manifest: VitePWAOptions['manifest'] = {
  name: 'PWA Inject Manifest',
  short_name: 'PWA Inject',
  theme_color: '#ffffff',
  icons: [
    {
      src: 'pwa-192x192.png', // <== don't add slash, for testing
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/pwa-512x512.png', // <== don't remove slash, for testing
      sizes: '512x512',
      type: 'image/png',
    },
    {
      src: 'pwa-512x512.png', // <== don't add slash, for testing
      sizes: '512x512',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
}

// ● inject manifest
// ● inject service-worker registration
// ● pick service worker by path & filename
const pwaOptions1: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  devOptions: {
    // enable PWA in dev mode
    enabled: true,
    type: 'module',
    navigateFallback: 'index.html',
  },
  strategies: 'injectManifest',
  
  // ● inject manifest from object
  injectManifest: {
    minify: false,
    enableWorkboxModulesLogs: true,
  },
  manifest: manifest,
  
  // ● inject service-worker registration as script file
  injectRegister: 'script',
  
  // ● pick service worker by path & filename
  srcDir: 'src/service-worker',
  filename: 'service-worker.ts',
  
  base: '/',
  includeAssets: ['pwa.svg'],
}




// ● do not inject manifest (write manually <link rel="manifest" href="/manifest.json"> in head)
// ● inject service-worker registration
// ● pick service worker by path & filename
const pwaOptions: Partial<VitePWAOptions> = {
  registerType: 'autoUpdate',
  devOptions: {
    // enable PWA in dev mode
    enabled: true,
    type: 'module',
    navigateFallback: 'index.html',
  },
  strategies: 'injectManifest',
  
  // ● do not inject manifest, only service worker,
  // so you can write your own link to manifest in index.html
  // https://vite-pwa-org.netlify.app/guide/service-worker-without-pwa-capabilities
  manifest: false,
  
  // ● inject service-worker registration as script file
  injectRegister: 'script',
  
  // ● pick service worker by path & filename
  srcDir: 'src/service-worker',
  filename: 'service-worker.ts',

  base: '/',
  includeAssets: ['pwa.svg'],
}



// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // expose app via IP access from local network
    //port: 40000,
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000', // адрес бэка
    //     changeOrigin: true,
    //     rewrite: path=>path.replace(/^\/api/,''),
    //   },
    // }
  },
  plugins: [
    react(),
    tsconfigPaths(),
    svgr(),
    /* svgr({
      svgrOptions: { exportType: 'named', ref: true, svgo: false, titleProp: true, typescript: true },
      include: '**!/!*.svg',
    }), */
    VitePWA(pwaOptions),
    checker({
      typescript: true, // use TypeScript check
    }),
  ],
})
