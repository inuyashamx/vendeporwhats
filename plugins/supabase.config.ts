import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
export const supabaseConfig = {
  url: 'https://pcatnmcfompxbupwrsbo.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjYXRubWNmb21weGJ1cHdyc2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Nzg5NDEsImV4cCI6MjA2MDE1NDk0MX0.aUXpto6iZckBdgp0IV_hWfIboprtMID0bD3c1IESO0c',
  options: {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
}

// Función para crear un cliente de Supabase
export const createSupabaseClient = () => {
  return createClient(
    supabaseConfig.url,
    supabaseConfig.key,
    supabaseConfig.options
  )
} 