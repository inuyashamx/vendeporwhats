<template>
  <v-card class="pa-4 h-100">
    <v-card-title class="text-h5 font-weight-bold mb-4">
      {{ title }}
    </v-card-title>
    <v-card-text class="text-body-1">
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script> 