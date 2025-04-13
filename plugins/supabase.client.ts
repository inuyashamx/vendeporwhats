import { createSupabaseClient } from '~/utils/supabase'

export default defineNuxtPlugin(() => {
  // Crear el cliente de Supabase solo en el lado del cliente
  if (process.client) {
    const supabase = createSupabaseClient()
    
    return {
      provide: {
        supabaseClient: supabase
      }
    }
  }
}) 