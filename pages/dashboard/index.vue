<template>
  <div class="pa-2 pa-sm-4">
    <!-- Información y edición de la tienda -->
    <div v-if="tiendaActual" class="mb-4 mb-sm-6">
      <v-card variant="flat" class="mb-4">
        <v-card-item>
          <div class="d-flex flex-column flex-sm-row align-center">
            <!-- Logo de la tienda -->
            <div class="position-relative mb-4 mb-sm-0 mr-sm-4">
              <v-avatar
                size="64"
                size-sm="80"
                :color="tiendaActual.color_tema || 'grey-lighten-2'"
                class="elevation-1"
              >
                <v-img v-if="tiendaActual.logo_url" :src="tiendaActual.logo_url" />
                <v-icon v-else size="32" size-sm="40">mdi-store</v-icon>
              </v-avatar>
              <v-btn
                icon="mdi-pencil"
                size="x-small"
                color="primary"
                class="position-absolute"
                style="bottom: -4px; right: -4px"
                @click="showLogoDialog = true"
              />
            </div>

            <!-- Información de la tienda -->
            <div class="text-center text-sm-left flex-grow-1">
              <div class="d-flex align-center justify-center justify-sm-start mb-2">
                <h1 class="text-h5 text-sm-h4">{{ tiendaActual.nombre }}</h1>
                <v-btn
                  icon="mdi-pencil"
                  size="small"
                  variant="text"
                  color="primary"
                  class="ml-2"
                  @click="startEditing"
                />
              </div>
              <div class="text-body-1 text-medium-emphasis">{{ tiendaActual.descripcion }}</div>
              <div class="d-flex align-center justify-center justify-sm-start mt-2">
                <v-chip
                  :color="tiendaActual.color_tema"
                  size="small"
                  label
                  class="mr-2"
                >
                  {{ tiendaActual.color_tema }}
                </v-chip>
                <v-chip
                  variant="outlined"
                  size="small"
                  label
                  class="text-body-2"
                  :href="`/${tiendaActual.slug}`"
                  target="_blank"
                >
                  {{ tiendaActual.slug }}
                  <v-icon size="small" class="ml-1">mdi-open-in-new</v-icon>
                </v-chip>
              </div>
            </div>

            <!-- Acciones -->
            <div class="d-flex flex-column align-center align-sm-end mt-4 mt-sm-0">
              <v-btn
                color="primary"
                :href="`/tienda/${tiendaActual.slug}`"
                target="_blank"
                prepend-icon="mdi-eye"
                class="mb-2"
              >
                Ver Tienda
              </v-btn>
              <v-btn
                variant="outlined"
                prepend-icon="mdi-share-variant"
                @click="compartirTienda"
              >
                Compartir
              </v-btn>
            </div>
          </div>
        </v-card-item>
      </v-card>
    </div>

    <h1 class="text-h5 text-sm-h4 text-md-h3 mb-4 mb-sm-6">Dashboard</h1>
    
    <v-row class="g-2">
      <!-- Resumen de Estadísticas -->
      <v-col cols="6" sm="6" md="3" class="pa-1">
        <BaseCard title="Productos" class="h-100">
          <div class="text-h6 text-sm-h5 text-md-h4 text-center">{{ estadisticas.productos }}</div>
        </BaseCard>
      </v-col>
      <v-col cols="6" sm="6" md="3" class="pa-1">
        <BaseCard title="Pedidos Hoy" class="h-100">
          <div class="text-h6 text-sm-h5 text-md-h4 text-center">{{ estadisticas.pedidosHoy }}</div>
        </BaseCard>
      </v-col>
      <v-col cols="6" sm="6" md="3" class="pa-1">
        <BaseCard title="Visitas" class="h-100">
          <div class="text-h6 text-sm-h5 text-md-h4 text-center">{{ estadisticas.visitas }}</div>
        </BaseCard>
      </v-col>
      <v-col cols="6" sm="6" md="3" class="pa-1">
        <BaseCard title="Conversiones" class="h-100">
          <div class="text-h6 text-sm-h5 text-md-h4 text-center">{{ estadisticas.conversiones }}%</div>
        </BaseCard>
      </v-col>

      <!-- Gráficos y Tablas -->
      <v-col cols="12" md="8" class="pa-1">
        <BaseCard title="Pedidos Recientes">
          <div class="overflow-x-auto">
            <v-table density="compact" class="text-body-2 text-sm-body-1">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="pedido in pedidosRecientes" :key="pedido.id">
                  <td>{{ pedido.producto }}</td>
                  <td>{{ pedido.cliente }}</td>
                  <td>
                    <v-chip :color="getEstadoColor(pedido.estado)" size="x-small" size-sm="small">
                      {{ pedido.estado }}
                    </v-chip>
                  </td>
                  <td>\${{ pedido.total }}</td>
                </tr>
              </tbody>
            </v-table>
          </div>
        </BaseCard>
      </v-col>

      <v-col cols="12" md="4" class="pa-1">
        <BaseCard title="Productos Populares">
          <v-list density="compact" class="text-body-2 text-sm-body-1">
            <v-list-item
              v-for="producto in productosPopulares"
              :key="producto.id"
              :title="producto.nombre"
              :subtitle="`${producto.ventas} ventas`"
            >
              <template v-slot:prepend>
                <v-avatar size="32" size-sm="40">
                  <v-img :src="producto.imagen" />
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </BaseCard>
      </v-col>
    </v-row>

    <!-- Diálogo de edición -->
    <v-dialog v-model="showEditDialog" max-width="600">
      <v-card>
        <v-card-title class="text-h5 pa-4">
          Editar Tienda
          <v-btn icon="mdi-close" variant="text" @click="showEditDialog = false" class="float-right" />
        </v-card-title>
        <v-card-text class="pa-4">
          <v-form @submit.prevent="handleSubmit" ref="form">
            <v-text-field
              v-model="formData.nombre"
              label="Nombre de la tienda"
              :rules="[v => !!v || 'El nombre es requerido']"
              variant="outlined"
              density="comfortable"
              class="mb-4"
            />

            <v-text-field
              v-model="formData.slug"
              label="URL de la tienda"
              :rules="[
                v => !!v || 'La URL es requerida',
                v => /^[a-z0-9-]+$/.test(v) || 'Solo letras minúsculas, números y guiones'
              ]"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              :hint="`vendeporwhats.com/${formData.slug || 'mi-tienda'}`"
              persistent-hint
            />

            <v-textarea
              v-model="formData.descripcion"
              label="Descripción"
              :rules="[v => !!v || 'La descripción es requerida']"
              variant="outlined"
              density="comfortable"
              class="mb-4"
              rows="3"
              auto-grow
            />

            <v-card variant="outlined" class="mb-4">
              <v-card-item>
                <template v-slot:prepend>
                  <v-icon>mdi-palette</v-icon>
                </template>
                <v-card-title>Color del tema</v-card-title>
                <v-card-subtitle>
                  <v-chip
                    :color="formData.color_tema"
                    size="small"
                    class="mt-2"
                  >
                    {{ formData.color_tema }}
                  </v-chip>
                </v-card-subtitle>
              </v-card-item>
              <v-card-text class="pt-0">
                <v-color-picker
                  v-model="formData.color_tema"
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
                  flat
                  width="100%"
                />
              </v-card-text>
            </v-card>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            variant="text"
            @click="showEditDialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            :loading="loading"
            @click="handleSubmit"
          >
            Guardar Cambios
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Diálogo de logo -->
    <v-dialog v-model="showLogoDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h5 pa-4">
          Cambiar Logo
          <v-btn icon="mdi-close" variant="text" @click="showLogoDialog = false" class="float-right" />
        </v-card-title>
        <v-card-text class="pa-4">
          <div class="d-flex align-center mb-4">
            <v-avatar
              size="64"
              :image="previewLogo || tiendaActual?.logo_url || undefined"
              class="mr-4"
              :color="tiendaActual?.color_tema || 'grey-lighten-2'"
            >
              <v-icon v-if="!previewLogo && !tiendaActual?.logo_url" size="32">mdi-store</v-icon>
            </v-avatar>
            
            <v-file-input
              v-model="logoFile"
              label="Seleccionar imagen"
              accept="image/*"
              @change="handleLogoChange"
              variant="outlined"
              density="comfortable"
              hide-details
            />
          </div>
        </v-card-text>
        <v-card-actions class="pa-4">
          <v-spacer />
          <v-btn
            variant="text"
            @click="showLogoDialog = false"
          >
            Cancelar
          </v-btn>
          <v-btn
            color="primary"
            :loading="loading"
            @click="handleLogoSubmit"
          >
            Guardar Logo
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

interface User {
  id: string
  email: string
  nombre: string | null
}

interface Shop {
  id: string
  user_id: string
  nombre: string
  slug: string
  descripcion: string | null
  logo_url: string | null
  color_tema: string | null
  created_at: string
}

interface Pedido {
  id: number
  producto: string
  cliente: string
  estado: string
  total: number
}

interface Producto {
  id: number
  nombre: string
  ventas: number
  imagen: string
}

// Estados
const tiendaActual = ref<Shop | null>(null)
const loading = ref(false)
const showEditDialog = ref(false)
const showLogoDialog = ref(false)
const logoFile = ref<File | null>(null)
const previewLogo = ref<string | null>(null)
const formData = ref({
  nombre: '',
  slug: '',
  descripcion: '',
  color_tema: 'primary'
})

const estadisticas = ref({
  productos: 0,
  pedidosHoy: 0,
  visitas: 0,
  conversiones: 0
})

const pedidosRecientes = ref<Pedido[]>([])
const productosPopulares = ref<Producto[]>([])

// Métodos
const startEditing = () => {
  if (!tiendaActual.value) return

  formData.value = {
    nombre: tiendaActual.value.nombre,
    slug: tiendaActual.value.slug,
    descripcion: tiendaActual.value.descripcion || '',
    color_tema: tiendaActual.value.color_tema || 'primary'
  }
  showEditDialog.value = true
}

const handleLogoChange = (file: File | null) => {
  if (!file) {
    previewLogo.value = null
    return
  }

  // Crear preview
  const reader = new FileReader()
  reader.onload = (e) => {
    previewLogo.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const uploadLogo = async (file: File) => {
  if (!user.value) return null

  const fileExt = file.name.split('.').pop()
  const fileName = `${user.value.id}-${Date.now()}.${fileExt}`
  const filePath = `shops/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('public')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data: { publicUrl } } = supabase.storage
    .from('public')
    .getPublicUrl(filePath)

  return publicUrl
}

const handleLogoSubmit = async () => {
  if (!user.value || !logoFile.value) return

  loading.value = true

  try {
    const logo_url = await uploadLogo(logoFile.value)

    const { error } = await supabase
      .from('shops')
      .update({ logo_url })
      .eq('user_id', user.value.id)

    if (error) throw error

    if (tiendaActual.value) {
      tiendaActual.value.logo_url = logo_url
    }

    showLogoDialog.value = false
    logoFile.value = null
    previewLogo.value = null
  } catch (error) {
    console.error('Error al actualizar el logo:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!user.value) return

  loading.value = true

  try {
    const { error } = await supabase
      .from('shops')
      .update(formData.value)
      .eq('user_id', user.value.id)

    if (error) throw error

    // Actualizar tienda actual
    if (tiendaActual.value) {
      Object.assign(tiendaActual.value, formData.value)
    }

    showEditDialog.value = false
  } catch (error) {
    console.error('Error al actualizar la tienda:', error)
  } finally {
    loading.value = false
  }
}

const compartirTienda = () => {
  if (!tiendaActual.value) return

  const url = `https://vendeporwhats.com/${tiendaActual.value.slug}`
  navigator.clipboard.writeText(url)
  // TODO: Mostrar notificación de éxito
}

const getEstadoColor = (estado: string) => {
  switch (estado.toLowerCase()) {
    case 'pendiente': return 'warning'
    case 'completado': return 'success'
    case 'cancelado': return 'error'
    default: return 'grey'
  }
}

// Validar y cargar datos
const validarYCargarDatos = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    navigateTo('/login')
    return
  }

  // Verificar si el usuario existe en la tabla users
  const { data: existingUser } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!existingUser) {
    // Crear nuevo usuario en la tabla users
    const { error } = await supabase
      .from('users')
      .insert<Partial<User>>([
        {
          id: user.id,
          email: user.email || '',
          nombre: user.user_metadata?.nombre || null
        }
      ])

    if (error) {
      console.error('Error al crear usuario:', error)
    }
  }

  // Cargar tienda del usuario
  const { data: shop, error: shopError } = await supabase
    .from('shops')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (shopError) {
    console.error('Error al obtener la tienda:', shopError)
    navigateTo('/dashboard/shop/create')
    return
  }

  tiendaActual.value = shop

  // TODO: Cargar estadísticas reales
  estadisticas.value = {
    productos: 0,
    pedidosHoy: 0,
    visitas: 0,
    conversiones: 0
  }

  // TODO: Cargar pedidos recientes reales
  pedidosRecientes.value = []

  // TODO: Cargar productos populares reales
  productosPopulares.value = []
}

// Cargar datos al montar el componente
onMounted(() => {
  validarYCargarDatos()
})

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})
</script>

<style scoped>
.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
}

.float-right {
  float: right;
}
</style>