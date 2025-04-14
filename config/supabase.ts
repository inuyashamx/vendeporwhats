import { createClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database.types'

export const supabaseConfig = {
  url: 'https://pcatnmcfompxbupwrsbo.supabase.co',
  key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjYXRubWNmb21weGJ1cHdyc2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Nzg5NDEsImV4cCI6MjA2MDE1NDk0MX0.aUXpto6iZckBdgp0IV_hWfIboprtMID0bD3c1IESO0c'
}

export const supabase = createClient<Database>(
  supabaseConfig.url,
  supabaseConfig.key
)

export const tables = {
  shops: 'shops',
  // Aquí puedes agregar más tablas según las necesites
} 