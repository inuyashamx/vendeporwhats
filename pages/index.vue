<template>
  <div>
    <v-container>
      <!-- Hero Section -->
      <v-row class="align-center py-16">
        <v-col cols="12" md="6">
          <h1 class="text-h2 font-weight-bold mb-4">
            Vende tus productos por WhatsApp
          </h1>
          <p class="text-body-1 mb-6">
            Crea tu tienda online y gestiona tus ventas a través de WhatsApp de manera fácil y profesional.
          </p>
          <v-btn
            color="primary"
            size="large"
            to="/auth/register"
          >
            Comenzar Gratis
          </v-btn>
        </v-col>
        <v-col cols="12" md="6" class="text-center">
          <v-img
            src="/hero-image.png"
            alt="VendePorWhats Hero"
            class="mx-auto"
            max-width="500"
          />
        </v-col>
      </v-row>

      <!-- Features Section -->
      <v-row class="py-16">
        <v-col cols="12" class="text-center mb-12">
          <h2 class="text-h3 font-weight-bold">
            Características
          </h2>
        </v-col>
        <v-col cols="12" md="4">
          <BaseCard title="Fácil de Usar">
            Configura tu tienda en minutos y empieza a vender inmediatamente.
          </BaseCard>
        </v-col>
        <v-col cols="12" md="4">
          <BaseCard title="Integración con WhatsApp">
            Recibe pedidos directamente en tu WhatsApp Business.
          </BaseCard>
        </v-col>
        <v-col cols="12" md="4">
          <BaseCard title="Gestión de Pedidos">
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
})</script> 