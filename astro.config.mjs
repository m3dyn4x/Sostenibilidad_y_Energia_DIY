// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  // URL base del sitio (ajusta esto a tu dominio en producción)
  site: 'https://sostenibilidad-energia-diy.vercel.app',
  
  // Configuración de integrations (plugins Astro)
  integrations: [
    sitemap({
      // El sitemap se genera automáticamente en build
      // Ruta: /sitemap.xml
      filter: (page) => !page.includes('/admin'),
      changefreq: 'monthly',
      priority: 0.7,
    }),
  ],

  // Configuración de salida (static = pre-rendered HTML + server functions via adapter)
  output: 'static',

  // Adapter para despliegues serverless como Vercel
  adapter: vercel(),

  // Configuración de compilación y optimización
  vite: {
    ssr: {
      external: ['svgo'], // Evita problemas con este módulo en SSR
    },
  },

  // Configuración de markdown (para MDX)
  markdown: {
    // Usa el procesador de markdown por defecto (remark/rehype)
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'github-dark',
      langs: [],
      wrap: true,
    },
  },

  // Configuración de build
  build: {
    assets: 'assets', // Carpeta donde se almacenan assets estáticos
  },

  // Configuración de rutas y trailing slash
  trailingSlash: 'never', // URLs sin slash final (mejor para SEO)
});
