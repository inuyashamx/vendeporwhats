import { SupabaseClient } from '@supabase/supabase-js'
import { createSupabaseClient } from '~/utils/supabase'

export const useSupabase = () => {
  // Intentar usar el cliente proporcionado por el módulo @nuxtjs/supabase
  try {
    return useSupabaseClient() as SupabaseClient
  } catch (error) {
    // Si falla, usar nuestro cliente personalizado
    const { $supabaseClient } = useNuxtApp()
    if (!$supabaseClient) {
      // Si no hay cliente proporcionado por el plugin, crear uno nuevo
      return createSupabaseClient() as SupabaseClient
    }
    return $supabaseClient as SupabaseClient
  }
} 