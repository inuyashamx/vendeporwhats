import { SupabaseClient } from '@supabase/supabase-js'

export const useSupabase = () => {
  return useSupabaseClient() as SupabaseClient
} 