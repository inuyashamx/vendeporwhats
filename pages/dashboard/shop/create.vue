<template>
  <div>
    <!-- Header fijo -->
    <v-app-bar flat density="compact" class="px-2">
      <v-btn icon to="/dashboard">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer />
      <v-app-bar-title class="text-body-1">Crear Nueva Tienda</v-app-bar-title>
      <v-spacer />
      <v-btn icon disabled>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Contenido principal con scroll -->
    <v-main class="pa-0">
      <v-container class="pa-0">
        <v-form @submit.prevent="crearTienda" ref="form" class="px-4">
          <!-- Campos del formulario -->
          <v-text-field
            v-model="tienda.nombre"
            placeholder="Nombre de la tienda"
            :rules="[v => !!v || 'El nombre es requerido']"
            required
            variant="plain"
            class="mb-2 mt-4"
            bg-color="grey-lighten-4"
            hide-details
          />

          <v-text-field
            v-model="tienda.slug"
            placeholder="URL de la tienda"
            :rules="[
              v => !!v || 'La URL es requerida',
              v => /^[a-z0-9-]+$/.test(v) || 'Solo letras minúsculas, números y guiones'
            ]"
            required
            variant="plain"
            class="mb-2"
            bg-color="grey-lighten-4"
            :hint="`${urlBase}/${tienda.slug}`"
            persistent-hint
            hide-details
          />

          <v-textarea
            v-model="tienda.descripcion"
            placeholder="Descripción"
            :rules="[v => !!v || 'La descripción es requerida']"
            required
            variant="plain"
            class="mb-2"
            bg-color="grey-lighten-4"
            rows="3"
            auto-grow
            hide-details
          />

          <!-- Logo con preview integrado -->
          <div class="d-flex align-center mb-2 pa-2" style="background-color: rgb(243, 243, 243); border-radius: 4px;">
            <v-avatar
              size="48"
              :image="logoPreview"
              class="mr-4"
              style="background-color: white;"
            >
              <v-icon v-if="!logoPreview">mdi-store</v-icon>
            </v-avatar>
            
            <v-file-input
              v-model="logoFile"
              placeholder="Logo"
              accept="image/*"
              @change="previsualizarLogo"
              variant="plain"
              density="compact"
              hide-details
              class="mb-0"
            >
              <template v-slot:prepend>
                <v-icon size="small">mdi-camera</v-icon>
              </template>
            </v-file-input>
          </div>

          <!-- Color del tema -->
          <v-expansion-panels variant="accordion" class="mb-4">
            <v-expansion-panel>
              <v-expansion-panel-title class="px-2 py-1">
                <v-icon size="small" class="mr-2">mdi-palette</v-icon>
                Color del tema
              </v-expansion-panel-title>
              <v-expansion-panel-text class="px-0">
                <v-color-picker
                  v-model="tienda.color_tema"
                  mode="hexa"
                  :swatches="[
                    ['#1976D2', '#2196F3', '#64B5F6', '#42A5F5'],
                    ['#4CAF50', '#81C784', '#66BB6A', '#43A047'],
                    ['#FF9800', '#FFA726', '#FB8C00', '#F57C00']
                  ]"
                  show-swatches
                  hide-inputs
                  hide-mode-switch
                  :swatches-max-height="120"
                />
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- Botón fijo en la parte inferior -->
          <div class="fixed-bottom">
            <v-btn
              color="primary"
              type="submit"
              :loading="loading"
              :disabled="loading"
              block
              class="text-none text-subtitle-1"
              height="48"
            >
              CREAR TIENDA
            </v-btn>
          </div>
        </v-form>
      </v-container>
    </v-main>
  </div>
</template>

<style scoped>
.fixed-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: white;
  z-index: 1;
}

.v-main {
  padding-bottom: 80px !important;
}
</style>

<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()

interface Shop {
  id?: string
  user_id: string
  nombre: string
  slug: string
  descripcion: string
  logo_url?: string | null
  color_tema?: string | null
  created_at?: string
}

type ShopInsert = Omit<Shop, 'id' | 'created_at'>

const form = ref()
const loading = ref(false)
const logoFile = ref<File | null>(null)
const logoPreview = ref<string | undefined>(undefined)
const urlBase = 'https://tudominio.com/tienda'

const tienda = ref<Shop>({
  nombre: '',
  slug: '',
  descripcion: '',
  logo_url: null,
  color_tema: '#1976D2',
  user_id: '' // Se establecerá cuando se cree la tienda
})

// Previsualizar logo
const previsualizarLogo = (file: File | null) => {
  if (file) {
    logoPreview.value = URL.createObjectURL(file)
  } else {
    logoPreview.value = undefined
  }
}

// Subir logo a Supabase Storage
const subirLogo = async (file: File): Promise<string | undefined> => {
  try {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `logos/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('shops')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('shops')
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('Error al subir el logo:', error)
    return undefined
  }
}

// Crear tienda
const crearTienda = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  loading.value = true
  try {
    // Obtener usuario actual
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuario no autenticado')

    // Preparar datos de la tienda
    const tiendaData: ShopInsert = {
      ...tienda.value,
      user_id: user.id
    }

    console.log('Datos de la tienda a crear:', tiendaData)

    // Subir logo si existe
    if (logoFile.value) {
      tiendaData.logo_url = await subirLogo(logoFile.value)
    }

    // Crear tienda
    const { data, error } = await supabase
      .from('shops')
      .insert(tiendaData)
      .select()
      .single()

    console.log('Resultado de crear tienda:', { data, error })

    if (error) throw error

    // Redirigir al dashboard
    router.push('/dashboard')
  } catch (error: any) {
    console.error('Error al crear la tienda:', error)
    // Aquí podrías mostrar un mensaje de error al usuario
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})
</script> 