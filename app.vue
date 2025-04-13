<template>
  <v-app>
    <v-main>
      <v-container>
        <h1 class="text-h3 my-4">Mi Aplicación con Nuxt, Vuetify y Supabase</h1>
        <v-row>
          <v-col cols="12" md="6">
            <SupabaseConnectionTest />
          </v-col>
          <v-col cols="12" md="6">
            <SupabaseTest />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
// Los componentes se importarán automáticamente
</script>
