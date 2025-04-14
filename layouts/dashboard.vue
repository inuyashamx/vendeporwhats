<template>
  <v-app>
    <!-- Menú lateral oculto por defecto en móvil -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="left"
      elevation="1"
    >
      <v-list density="compact">
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          to="/dashboard"
          rounded="lg"
        />
        <v-list-item
          prepend-icon="mdi-store"
          title="Mi Tienda"
          to="/dashboard/tienda"
          rounded="lg"
        />
        <v-list-item
          prepend-icon="mdi-package-variant"
          title="Productos"
          to="/dashboard/productos"
          rounded="lg"
        />
        <v-list-item
          prepend-icon="mdi-cart"
          title="Pedidos"
          to="/dashboard/pedidos"
          rounded="lg"
        />
        <v-list-item
          prepend-icon="mdi-cog"
          title="Configuración"
          to="/dashboard/configuracion"
          rounded="lg"
        />
      </v-list>
      
      <template v-slot:append>
        <v-divider />
        <v-list density="compact">
          <v-list-item
            prepend-icon="mdi-logout"
            title="Cerrar Sesión"
            @click="handleLogout"
            rounded="lg"
          />
        </v-list>
      </template>
    </v-navigation-drawer>

    <!-- Barra superior con botón de menú -->
    <v-app-bar flat density="comfortable">
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      
      <v-app-bar-title class="text-truncate">
        {{ currentPageTitle }}
      </v-app-bar-title>
      
      <template v-slot:append>
        <v-btn icon="mdi-bell" variant="text" />
        <v-avatar class="ml-3" color="primary" v-if="user">
          {{ user.email?.charAt(0).toUpperCase() }}
        </v-avatar>
      </template>
    </v-app-bar>

    <!-- Contenido principal -->
    <v-main>
      <v-container>
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const { auth } = useSupabaseClient()
const router = useRouter()
const route = useRoute()

// Control del menú lateral
const drawer = ref(false)

// Título dinámico según la ruta
const currentPageTitle = computed(() => {
  const titles: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/dashboard/tienda': 'Mi Tienda',
    '/dashboard/productos': 'Productos',
    '/dashboard/pedidos': 'Pedidos',
    '/dashboard/configuracion': 'Configuración',
    '/dashboard/shop/create': 'Crear Tienda'
  }
  return titles[route.path] || 'Dashboard'
})

const handleLogout = async () => {
  await auth.signOut()
  router.push('/auth/login')
}
</script>

<style scoped>
.v-list-item {
  margin: 4px 8px;
}

.v-list-item--active {
  background-color: rgb(var(--v-theme-primary));
  color: white;
}
</style> 