<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <BaseCard title="Iniciar Sesión">
          <v-form @submit.prevent="handleLogin">
            <v-text-field
              v-model="email"
              label="Correo electrónico"
              type="email"
              required
              :error-messages="emailError"
              autocomplete="username"
            />

            <v-text-field
              v-model="password"
              label="Contraseña"
              type="password"
              required
              :error-messages="passwordError"
              autocomplete="current-password"
            />

            <v-alert
              v-if="error"
              type="error"
              class="mb-4"
            >
              {{ error }}
            </v-alert>

            <v-btn
              type="submit"
              color="primary"
              block
              :loading="loading"
              class="mb-4"
            >
              Iniciar Sesión
            </v-btn>

            <v-divider class="my-4">o continúa con</v-divider>

            <v-btn
              block
              variant="outlined"
              :loading="googleLoading"
              @click="handleGoogleLogin"
              class="mb-3"
              color="red"
              prepend-icon="mdi-google"
            >
              Google
            </v-btn>

            <v-btn
              block
              variant="outlined"
              :loading="facebookLoading"
              @click="handleFacebookLogin"
              class="mb-4"
              color="blue"
              prepend-icon="mdi-facebook"
            >
              Facebook
            </v-btn>

            <div class="text-center mt-4">
              <nuxt-link to="/auth/register">
                ¿No tienes cuenta? Regístrate aquí
              </nuxt-link>
            </div>
          </v-form>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { supabaseConfig, tables } from '~/config/supabase'

const supabase = useSupabaseClient()
const router = useRouter()

// Estados
const email = ref('')
const password = ref('')
const loading = ref(false)
const googleLoading = ref(false)
const facebookLoading = ref(false)
const error = ref('')
const emailError = ref('')
const passwordError = ref('')

// Definir la interfaz para el tipo de usuario
interface Usuario {
  id: string
  email: string
  nombre: string
  created_at?: string
}

// Métodos
const validateForm = () => {
  let isValid = true
  emailError.value = ''
  passwordError.value = ''

  if (!email.value) {
    emailError.value = 'El correo electrónico es requerido'
    isValid = false
  }

  if (!password.value) {
    passwordError.value = 'La contraseña es requerida'
    isValid = false
  }

  return isValid
}

// Función auxiliar para crear usuario
const createUser = async (userData: { id: string, email: string, nombre: string }) => {
  try {
    const { data: sessionData } = await supabase.auth.getSession()
    const response = await fetch(`${supabaseConfig.url}/rest/v1/${tables.users}`, {
      method: 'POST',
      headers: {
        'apikey': supabaseConfig.key,
        'Authorization': `Bearer ${sessionData.session?.access_token}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(userData)
    })

    if (!response.ok) {
      throw new Error(`Error al crear usuario: ${response.statusText}`)
    }

    console.log('Usuario creado exitosamente')
  } catch (error) {
    console.error('Error al crear usuario:', error)
  }
}

// Modificar el handleLogin
const handleLogin = async () => {
  if (!validateForm()) return

  loading.value = true
  error.value = ''

  try {
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (authError) throw authError

    router.push('/dashboard')
  } catch (e: any) {
    error.value = e.message || 'Error al iniciar sesión'
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = async () => {
  googleLoading.value = true
  error.value = ''

  try {
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (authError) throw authError
  } catch (e: any) {
    error.value = e.message || 'Error al iniciar sesión con Google'
  } finally {
    googleLoading.value = false
  }
}

const handleFacebookLogin = async () => {
  facebookLoading.value = true
  error.value = ''

  try {
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (authError) throw authError
  } catch (e: any) {
    error.value = e.message || 'Error al iniciar sesión con Facebook'
  } finally {
    facebookLoading.value = false
  }
}

// Redireccionar si ya está autenticado
const user = useSupabaseUser()
watch(user, (newUser) => {
  if (newUser) {
    router.push('/dashboard')
  }
}, { immediate: true })

definePageMeta({
  layout: 'default'
})
</script> 