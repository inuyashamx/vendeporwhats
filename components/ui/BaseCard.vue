<template>
  <v-card :class="['pa-4', className]">
    <v-card-title v-if="title" class="text-h6 mb-2">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
    <v-card-actions v-if="$slots.actions">
      <slot name="actions" />
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  className?: string
}>()</script> 