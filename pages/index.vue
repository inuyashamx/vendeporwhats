<template>
  <div>
    <v-container class="px-2 px-sm-4">
      <!-- Hero Section -->
      <v-row class="align-center py-4 py-sm-8 py-md-16">
        <v-col cols="12" md="6" class="text-center text-md-left order-2 order-md-1">
          <h1 class="text-h4 text-sm-h3 text-md-h2 font-weight-bold mb-2 mb-sm-3 mb-md-4">
            Vende tus productos por WhatsApp
          </h1>
          <p class="text-body-1 text-sm-h6 mb-4 mb-sm-6">
            Crea tu tienda online y gestiona tus ventas a través de WhatsApp de manera fácil y profesional.
          </p>
          <v-btn
            color="primary"
            size="large"
            size-sm="x-large"
            block
            block-sm
            class="mb-4 mb-sm-0"
            to="/auth/register"
          >
            Comenzar Gratis
          </v-btn>
        </v-col>
        <v-col cols="12" md="6" class="text-center order-1 order-md-2 mb-4 mb-md-0">
          <v-img
            src="/hero-image.png"
            alt="VendePorWhats Hero"
            class="mx-auto"
            max-width="100%"
            width="280"
            width-sm="400"
          />
        </v-col>
      </v-row>

      <!-- Features Section -->
      <v-row class="py-4 py-sm-8 py-md-16">
        <v-col cols="12" class="text-center mb-4 mb-sm-8 mb-md-12">
          <h2 class="text-h5 text-sm-h4 text-md-h3 font-weight-bold">
            Características
          </h2>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="pa-1">
          <BaseCard title="Fácil de Usar" class="h-100">
            <div class="text-body-2 text-sm-body-1">
              Configura tu tienda en minutos y empieza a vender inmediatamente.
            </div>
          </BaseCard>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="pa-1">
          <BaseCard title="Integración con WhatsApp" class="h-100">
            <div class="text-body-2 text-sm-body-1">
              Recibe pedidos directamente en tu WhatsApp Business.
            </div>
          </BaseCard>
        </v-col>
        <v-col cols="12" sm="6" md="4" class="pa-1">
          <BaseCard title="Gestión de Pedidos" class="h-100">
            <div class="text-body-2 text-sm-body-1">
              Administra tus pedidos y clientes desde un solo lugar.
            </div>
          </BaseCard>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.v-row {
  margin: 0;
}
</style>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})
</script> 