// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/test-utils',
    '@nuxtjs/supabase'
  ],

  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
  ],

  build: {
    transpile: ['vuetify']
  },

  vite: {
    define: {
      'process.env.DEBUG': false,
    },
    ssr: {
      noExternal: ['vuetify', '@supabase/supabase-js', '@supabase/ssr']
    },
    optimizeDeps: {
      include: ['cookie']
    }
  },

  // Configuración de Supabase
  supabase: {
    url: 'https://pcatnmcfompxbupwrsbo.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjYXRubWNmb21weGJ1cHdyc2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Nzg5NDEsImV4cCI6MjA2MDE1NDk0MX0.aUXpto6iZckBdgp0IV_hWfIboprtMID0bD3c1IESO0c',
    redirectOptions: {
      login: '/auth/login',
      callback: '/auth/confirm',
      exclude: ['/*'],
    },
    cookieOptions: {
      maxAge: 60 * 60 * 8,
      sameSite: 'lax',
      secure: true
    }
  }
})