// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  spaLoadingTemplate: false,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'VendePorWhats',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Vende tus productos por WhatsApp de manera fácil y profesional' }
      ]
    }
  },

  pages: true,

  modules: [
    '@nuxtjs/supabase',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils'
  ],

  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  build: {
    transpile: ['vuetify']
  },

  nitro: {
    preset: 'firebase',
    serveStatic: true
  },

  // Configuración de Supabase
  supabase: {
    redirect: false,
    url: 'https://pcatnmcfompxbupwrsbo.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjYXRubWNmb21weGJ1cHdyc2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Nzg5NDEsImV4cCI6MjA2MDE1NDk0MX0.aUXpto6iZckBdgp0IV_hWfIboprtMID0bD3c1IESO0c',
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true
    },
    clientOptions: {
      auth: {
        flowType: 'pkce',
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
        storageKey: 'vendeporwhats-auth'
      }
    }
  },

  vite: {
    // Configuración de Vite
    optimizeDeps: {
      include: ['vuetify']
    },
    define: {
      'process.env.DEBUG': false
    }
  }
})