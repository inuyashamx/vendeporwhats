<template>
  <div>
    <h1 class="text-h4 mb-6">Dashboard</h1>
    
    <v-row>
      <!-- Resumen de Estadísticas -->
      <v-col cols="12" md="3">
        <BaseCard title="Productos">
          <div class="text-h4 text-center">{{ estadisticas.productos }}</div>
        </BaseCard>
      </v-col>
      <v-col cols="12" md="3">
        <BaseCard title="Pedidos Hoy">
          <div class="text-h4 text-center">{{ estadisticas.pedidosHoy }}</div>
        </BaseCard>
      </v-col>
      <v-col cols="12" md="3">
        <BaseCard title="Visitas">
          <div class="text-h4 text-center">{{ estadisticas.visitas }}</div>
        </BaseCard>
      </v-col>
      <v-col cols="12" md="3">
        <BaseCard title="Conversiones">
          <div class="text-h4 text-center">{{ estadisticas.conversiones }}%</div>
        </BaseCard>
      </v-col>

      <!-- Gráficos y Tablas -->
      <v-col cols="12" md="8">
        <BaseCard title="Pedidos Recientes">
          <v-table>
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
                  <v-chip :color="getEstadoColor(pedido.estado)">
                    {{ pedido.estado }}
                  </v-chip>
                </td>
                <td>\${{ pedido.total }}</td>
              </tr>
            </tbody>
          </v-table>
        </BaseCard>
      </v-col>

      <v-col cols="12" md="4">
        <BaseCard title="Productos Populares">
          <v-list>
            <v-list-item
              v-for="producto in productosPopulares"
              :key="producto.id"
              :title="producto.nombre"
              :subtitle="`${producto.ventas} ventas`"
            >
              <template v-slot:prepend>
                <v-avatar>
                  <v-img :src="producto.imagen" />
                </v-avatar>
              </template>
            </v-list-item>
          </v-list>
        </BaseCard>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()

// Estados
const estadisticas = ref({
  productos: 0,
  pedidosHoy: 0,
  visitas: 0,
  conversiones: 0
})

const pedidosRecientes = ref([])
const productosPopulares = ref([])

// Métodos
const cargarEstadisticas = async () => {
  // Aquí irían las llamadas a Supabase para obtener las estadísticas reales
  estadisticas.value = {
    productos: 24,
    pedidosHoy: 8,
    visitas: 156,
    conversiones: 3.2
  }
}

const cargarPedidosRecientes = async () => {
  // Simulación de datos
  pedidosRecientes.value = [
    { id: 1, producto: 'Producto 1', cliente: 'Juan Pérez', estado: 'pendiente', total: 99.99 },
    { id: 2, producto: 'Producto 2', cliente: 'María García', estado: 'completado', total: 149.99 },
    { id: 3, producto: 'Producto 3', cliente: 'Carlos López', estado: 'enviado', total: 79.99 },
  ]
}

const cargarProductosPopulares = async () => {
  // Simulación de datos
  productosPopulares.value = [
    { id: 1, nombre: 'Producto 1', ventas: 45, imagen: '/producto1.jpg' },
    { id: 2, nombre: 'Producto 2', ventas: 38, imagen: '/producto2.jpg' },
    { id: 3, nombre: 'Producto 3', ventas: 32, imagen: '/producto3.jpg' },
  ]
}

const getEstadoColor = (estado: string) => {
  const colores = {
    pendiente: 'warning',
    completado: 'success',
    enviado: 'info'
  }
  return colores[estado as keyof typeof colores] || 'grey'
}

// Cargar datos al montar
onMounted(() => {
  cargarEstadisticas()
  cargarPedidosRecientes()
  cargarProductosPopulares()
})

definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
})
</script> 