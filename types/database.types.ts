export interface Database {
  public: {
    Tables: {
      shops: {
        Row: {
          id: string
          user_id: string
          nombre: string
          slug: string
          descripcion: string | null
          logo_url: string | null
          color_tema: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          nombre: string
          slug: string
          descripcion?: string | null
          logo_url?: string | null
          color_tema?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          nombre?: string
          slug?: string
          descripcion?: string | null
          logo_url?: string | null
          color_tema?: string | null
          created_at?: string
        }
      }
    }
  }
} 