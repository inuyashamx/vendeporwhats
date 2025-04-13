<template>
  <v-app>
    <v-navigation-drawer permanent>
      <v-list>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          to="/dashboard"
        />
        <v-list-item
          prepend-icon="mdi-store"
          title="Mi Tienda"
          to="/dashboard/tienda"
        />
        <v-list-item
          prepend-icon="mdi-package-variant"
          title="Productos"
          to="/dashboard/productos"
        />
        <v-list-item
          prepend-icon="mdi-cart"
          title="Pedidos"
          to="/dashboard/pedidos"
        />
        <v-list-item
          prepend-icon="mdi-cog"
          title="Configuración"
          to="/dashboard/configuracion"
        />
      </v-list>
      <template v-slot:append>
        <v-list>
          <v-list-item
            prepend-icon="mdi-logout"
            title="Cerrar Sesión"
            @click="handleLogout"
          />
        </v-list>
      </template>
    </v-navigation-drawer>

    <v-app-bar>
      <v-container class="d-flex align-center">
        <v-app-bar-title>Dashboard</v-app-bar-title>
        <v-spacer />
        <v-btn icon="mdi-bell" variant="text" />
        <v-avatar class="ml-3" v-if="user">
          {{ user.email?.charAt(0).toUpperCase() }}
        </v-avatar>
      </v-container>
    </v-app-bar>

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

const handleLogout = async () => {
  await auth.signOut()
  router.push('/auth/login')
}
</script> 