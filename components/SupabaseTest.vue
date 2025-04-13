<template>
  <div>
    <v-card class="mx-auto my-4" max-width="500">
      <v-card-title>Prueba de Supabase</v-card-title>
      <v-card-text>
        <div v-if="loading">Cargando...</div>
        <div v-else-if="error">Error: {{ error }}</div>
        <div v-else>
          <p>Estado de conexión: {{ status }}</p>
          <p v-if="user">Usuario autenticado: {{ user.email }}</p>
          <p v-else>No hay usuario autenticado</p>
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
import { createSupabaseClient } from '~/utils/supabase'

const supabase = createSupabaseClient()
const loading = ref(true)
const error = ref<string | null>(null)
const status = ref('Desconectado')
const user = ref<any>(null)

const checkConnection = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Verificar la conexión a Supabase usando el cliente
    const { data: { session }, error: authError } = await supabase.auth.getSession()
    
    if (authError) {
      throw authError
    }
    
    status.value = 'Conectado'
    
    // Obtener el usuario actual
    const { data: { user: currentUser } } = await supabase.auth.getUser()
    user.value = currentUser
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