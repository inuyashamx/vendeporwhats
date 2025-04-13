<template>
  <div>
    <v-container v-if="tienda">
      <v-row>
        <v-col cols="12">
          <h1 class="text-h3 mb-6">{{ tienda.nombre }}</h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="3">
          <!-- Categorías -->
          <BaseCard title="Categorías">
            <v-list>
              <v-list-item
                v-for="categoria in tienda.categorias"
                :key="categoria.id"
                :title="categoria.nombre"
                @click="filtrarPorCategoria(categoria.id)"
              />
            </v-list>
          </BaseCard>
        </v-col>

        <v-col cols="12" md="9">
          <!-- Productos -->
          <v-row>
            <v-col v-for="producto in productosFiltrados" :key="producto.id" cols="12" md="4">
              <v-card>
                <v-img
                  :src="producto.imagen"
                  height="200"
                  cover
                />
                <v-card-title>{{ producto.nombre }}</v-card-title>
                <v-card-text>
                  <p class="text-h6">\${{ producto.precio }}</p>
                  <p>{{ producto.descripcion }}</p>
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    color="primary"
                    block
                    @click="comprarPorWhatsApp(producto)"
                  >
                    Comprar por WhatsApp
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-alert type="error">
        Tienda no encontrada
      </v-alert>
    </v-container>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const supabase = useSupabaseClient()

// Estados
const tienda = ref<any>(null)
const categoriaSeleccionada = ref<number | null>(null)
const productos = ref<any[]>([])

// Computed
const productosFiltrados = computed(() => {
  if (!categoriaSeleccionada.value) return productos.value
  return productos.value.filter(p => p.categoria_id === categoriaSeleccionada.value)
})

// Métodos
const cargarTienda = async () => {
  const { data, error } = await supabase
    .from('tiendas')
    .select(`
      *,
      categorias (*),
      productos (*)
    `)
    .eq('slug', route.params.slug)
    .single()

  if (error) {
    console.error('Error al cargar la tienda:', error)
    return
  }

  tienda.value = data
  productos.value = data.productos
}

const filtrarPorCategoria = (categoriaId: number) => {
  categoriaSeleccionada.value = categoriaId
}

const comprarPorWhatsApp = (producto: any) => {
  const mensaje = `Hola, me interesa el producto ${producto.nombre} de tu tienda ${tienda.value.nombre}. ¿Está disponible?`
  const url = `https://wa.me/${tienda.value.whatsapp}?text=${encodeURIComponent(mensaje)}`
  window.open(url, '_blank')
}

// Cargar datos al montar
onMounted(() => {
  cargarTienda()
})

definePageMeta({
  layout: 'default'
})</script> 