<template>
  <v-app>
    <v-app-bar app>
      <v-container class="d-flex align-center">
        <v-app-bar-title>
          <nuxt-link to="/" class="text-decoration-none text-black">VendePorWhats</nuxt-link>
        </v-app-bar-title>
        <v-spacer />
        <v-btn variant="text" to="/auth/login" v-if="!user">
          Iniciar Sesión
        </v-btn>
        <v-btn variant="text" to="/auth/register" v-if="!user">
          Registrarse
        </v-btn>
        <v-btn variant="text" to="/dashboard" v-if="user">
          Dashboard
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <v-container>
        <NuxtPage />
      </v-container>
    </v-main>

    <v-footer app>
      <v-container>
        <div class="text-center">
          © {{ new Date().getFullYear() }} VendePorWhats. Todos los derechos reservados.
        </div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
</script> 