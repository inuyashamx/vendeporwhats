<template>
  <div>
    <h1 class="text-h4 mb-6">Crear Nueva Tienda</h1>

    <v-form @submit.prevent="crearTienda" ref="form">
      <v-card class="pa-4">
        <v-row>
          <!-- Nombre de la tienda -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="tienda.nombre"
              label="Nombre de la tienda"
              :rules="[v => !!v || 'El nombre es requerido']"
              required
            />
          </v-col>

          <!-- Slug de la tienda -->
          <v-col cols="12" md="6">
            <v-text-field
              v-model="tienda.slug"
              label="URL de la tienda"
              :rules="[
                v => !!v || 'La URL es requerida',
                v => /^[a-z0-9-]+$/.test(v) || 'Solo letras minúsculas, números y guiones'
              ]"
              required
              :hint="`Tu tienda estará disponible en: ${urlBase}/${tienda.slug}`"
              persistent-hint
            />
          </v-col>

          <!-- Descripción -->
          <v-col cols="12">
            <v-textarea
              v-model="tienda.descripcion"
              label="Descripción"
              rows="3"
              :rules="[v => !!v || 'La descripción es requerida']"
              required
            />
          </v-col>

          <!-- Logo -->
          <v-col cols="12" md="6">
            <v-file-input
              v-model="logoFile"
              label="Logo de la tienda"
              accept="image/*"
              prepend-icon="mdi-camera"
              @change="previsualizarLogo"
            />
          </v-col>

          <!-- Color del tema -->
          <v-col cols="12" md="6">
            <v-color-picker
              v-model="tienda.color_tema"
              label="Color del tema"
              mode="hex"
              :swatches="[
                ['#FF0000', '#00FF00', '#0000FF'],
                ['#FFFF00', '#FF00FF', '#00FFFF']
              ]"
              show-swatches
              class="mb-4"
            />
          </v-col>

          <!-- Vista previa del logo -->
          <v-col cols="12" v-if="logoPreview">
            <v-img
              :src="logoPreview"
              max-height="200"
              contain
              class="mb-4"
            />
          </v-col>

          <!-- Botones -->
          <v-col cols="12" class="d-flex justify-end">
            <v-btn
              color="primary"
              type="submit"
              :loading="loading"
              :disabled="loading"
            >
              Crear Tienda
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-form>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()

interface Tienda {
  nombre: string
  slug: string
  descripcion: string
  logo_url: string | null
  color_tema: string | null
}

const form = ref()
const loading = ref(false)
const logoFile = ref<File | null>(null)
const logoPreview = ref<string | null>(null)
const urlBase = 'https://tudominio.com/tienda' // Ajusta esto según tu dominio

const tienda = ref<Tienda>({
  nombre: '',
  slug: '',
  descripcion: '',
  logo_url: null,
  color_tema: '#1976D2' // Color por defecto
})

// Previsualizar logo
const previsualizarLogo = (file: File | null) => {
  if (file) {
    logoPreview.value = URL.createObjectURL(file)
  } else {
    logoPreview.value = null
  }
}

// Subir logo a Supabase Storage
const subirLogo = async (file: File): Promise<string | null> => {
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
    return null
  }
}

// Crear tienda
const crearTienda = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return

  loading.value = true
  try {
    // Subir logo si existe
    if (logoFile.value) {
      tienda.value.logo_url = await subirLogo(logoFile.value)
    }

    // Obtener usuario actual
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('Usuario no autenticado')

    // Crear tienda
    const { error } = await supabase
      .from('shops')
      .insert([
        {
          ...tienda.value,
          user_id: user.id
        }
      ])

    if (error) throw error

    // Redirigir al dashboard
    router.push('/dashboard')
  } catch (error) {
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