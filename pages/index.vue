<template>
  <div>
    <v-container class="px-4">
      <!-- Hero Section -->
      <v-row class="align-center py-8 py-md-16">
        <v-col cols="12" md="6" class="text-center text-md-left">
          <h1 class="text-h3 text-md-h2 font-weight-bold mb-3 mb-md-4">
            Vende tus productos por WhatsApp
          </h1>
          <p class="text-body-1 mb-4 mb-md-6">
            Crea tu tienda online y gestiona tus ventas a través de WhatsApp de manera fácil y profesional.
          </p>
          <v-btn
            color="primary"
            size="x-large"
            block
            class="mb-4 mb-md-0"
            to="/auth/register"
          >
            Comenzar Gratis
          </v-btn>
        </v-col>
        <v-col cols="12" md="6" class="text-center mt-8 mt-md-0">
          <v-img
            src="/hero-image.png"
            alt="VendePorWhats Hero"
            class="mx-auto"
            max-width="100%"
            width="400"
          />
        </v-col>
      </v-row>

      <!-- Features Section -->
      <v-row class="py-8 py-md-16">
        <v-col cols="12" class="text-center mb-8 mb-md-12">
          <h2 class="text-h4 text-md-h3 font-weight-bold">
            Características
          </h2>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="mb-6">
          <BaseCard title="Fácil de Usar" class="h-100">
            Configura tu tienda en minutos y empieza a vender inmediatamente.
          </BaseCard>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="mb-6">
          <BaseCard title="Integración con WhatsApp" class="h-100">
            Recibe pedidos directamente en tu WhatsApp Business.
          </BaseCard>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="mb-6">
          <BaseCard title="Gestión de Pedidos" class="h-100">
            Administra tus pedidos y clientes desde un solo lugar.
          </BaseCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script> 