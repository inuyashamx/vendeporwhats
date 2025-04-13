<template>
  <div>
    <v-card class="mx-auto my-4" max-width="500">
      <v-card-title>Prueba de Conexión a Supabase</v-card-title>
      <v-card-text>
        <div v-if="loading">Cargando...</div>
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else>
          <p>Estado de conexión: {{ status }}</p>
          <p>URL: {{ supabaseUrl }}</p>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click="checkConnection">
          Verificar conexión
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Definir las credenciales directamente en el componente
const supabaseUrl = 'https://pcatnmcfompxbupwrsbo.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjYXRubWNmb21weGJ1cHdyc2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ1Nzg5NDEsImV4cCI6MjA2MDE1NDk0MX0.aUXpto6iZckBdgp0IV_hWfIboprtMID0bD3c1IESO0c'

const loading = ref(true)
const error = ref<string | null>(null)
const status = ref('Desconectado')

const checkConnection = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Verificar la conexión a Supabase usando fetch
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      }
    })
    
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    
    status.value = 'Conectado'
  } catch (e: any) {
    error.value = e.message || 'Error desconocido'
    status.value = 'Error de conexión'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  checkConnection()
})
</script> 