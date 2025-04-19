<template>
  <div>
    <v-container class="px-2 px-sm-4">
      <v-row class="justify-center py-4">
        <v-col cols="12" sm="10" md="8">
          <!-- Header con botón de editar -->
          <div class="d-flex align-center justify-space-between mb-4">
            <h1 class="text-h5 text-sm-h4">Mi Tienda</h1>
            <v-btn
              color="primary"
              variant="tonal"
              :to="'/dashboard/shop/edit'"
              prepend-icon="mdi-pencil"
            >
              Editar
            </v-btn>
          </div>

          <!-- Card de información de la tienda -->
          <v-card class="mb-4">
            <v-card-item>
              <template v-if="shop?.logo_url">
                <v-avatar
                  size="80"
                  class="mb-4"
                  :image="shop.logo_url"
                />
              </template>

              <v-card-title class="text-h6 mb-2">
                {{ shop?.nombre || 'Mi Tienda' }}
              </v-card-title>

              <v-card-subtitle class="text-body-1 mb-4">
                {{ shop?.descripcion || 'Sin descripción' }}
              </v-card-subtitle>

              <v-divider class="mb-4" />

              <!-- Información adicional -->
              <div class="d-flex flex-column gap-2">
                <div class="d-flex align-center">
                  <v-icon color="primary" class="mr-2">mdi-link</v-icon>
                  <span class="text-body-1">
                    {{ shop?.slug ? `vendeporwhats.com/${shop.slug}` : 'URL no configurada' }}
                  </span>
                </div>

                <div class="d-flex align-center">
                  <v-icon color="primary" class="mr-2">mdi-palette</v-icon>
                  <span class="text-body-1">
                    Color de tema: 
                    <v-chip
                      :color="shop?.color_tema || 'primary'"
                      size="small"
                      class="ml-2"
                    >
                      {{ shop?.color_tema || 'Default' }}
                    </v-chip>
                  </span>
                </div>

                <div class="d-flex align-center">
                  <v-icon color="primary" class="mr-2">mdi-calendar</v-icon>
                  <span class="text-body-1">
                    Creada el: {{ formatDate(shop?.created_at) }}
                  </span>
                </div>
              </div>
            </v-card-item>
          </v-card>

          <!-- Estadísticas rápidas -->
          <v-row>
            <v-col cols="6" sm="4">
              <v-card>
                <v-card-item>
                  <div class="text-center">
                    <div class="text-h6 mb-1">0</div>
                    <div class="text-body-2 text-medium-emphasis">Productos</div>
                  </div>
                </v-card-item>
              </v-card>
            </v-col>

            <v-col cols="6" sm="4">
              <v-card>
                <v-card-item>
                  <div class="text-center">
                    <div class="text-h6 mb-1">0</div>
                    <div class="text-body-2 text-medium-emphasis">Pedidos</div>
                  </div>
                </v-card-item>
              </v-card>
            </v-col>

            <v-col cols="12" sm="4">
              <v-card>
                <v-card-item>
                  <div class="text-center">
                    <div class="text-h6 mb-1">0</div>
                    <div class="text-body-2 text-medium-emphasis">Clientes</div>
                  </div>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const user = useSupabaseUser()

// Estado
const shop = ref<any>(null)

// Métodos
const formatDate = (date: string | undefined) => {
  if (!date) return 'No disponible'
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Cargar datos de la tienda
const loadShop = async () => {
  if (!user.value) return

  try {
    const { data, error } = await supabase
      .from('shops')
      .select('*')
      .eq('user_id', user.value.id)
      .single()

    if (error) throw error
    shop.value = data
  } catch (error) {
    console.error('Error al cargar la tienda:', error)
  }
}

// Cargar datos al montar el componente
onMounted(() => {
  loadShop()
})

// Recargar cuando cambie el usuario
watch(user, () => {
  loadShop()
})

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})
</script>

<style scoped>
.v-row {
  margin: 0;
}
</style> 