<template>
  <v-container class="fill-height px-4">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <BaseCard title="Crear Cuenta" class="pa-4 pa-sm-6">
          <v-form @submit.prevent="handleRegister">
            <v-text-field
              v-model="email"
              label="Correo electrónico"
              type="email"
              required
              :error-messages="emailError"
              autocomplete="username"
              class="mb-4"
              density="comfortable"
            />

            <v-text-field
              v-model="password"
              label="Contraseña"
              type="password"
              required
              :error-messages="passwordError"
              autocomplete="new-password"
              class="mb-4"
              density="comfortable"
            />

            <v-text-field
              v-model="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              required
              :error-messages="confirmPasswordError"
              autocomplete="new-password"
              class="mb-4"
              density="comfortable"
            />

            <v-alert
              v-if="error"
              type="error"
              class="mb-4"
              density="comfortable"
            >
              {{ error }}
            </v-alert>

            <v-alert
              v-if="success"
              type="success"
              class="mb-4"
              density="comfortable"
            >
              {{ success }}
            </v-alert>

            <v-btn
              type="submit"
              color="primary"
              block
              :loading="loading"
              class="mb-4"
              size="large"
            >
              Crear Cuenta
            </v-btn>

            <v-divider class="my-4">o regístrate con</v-divider>

            <v-btn
              block
              variant="outlined"
              :loading="googleLoading"
              @click="handleGoogleLogin"
              class="mb-3"
              color="red"
              prepend-icon="mdi-google"
              size="large"
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
              size="large"
            >
              Facebook
            </v-btn>

            <div class="text-center mt-4">
              <nuxt-link to="/auth/login" class="text-decoration-none">
                ¿Ya tienes cuenta? Inicia sesión aquí
              </nuxt-link>
            </div>
          </v-form>
        </BaseCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
const supabase = useSupabaseClient()
const router = useRouter()

// Estados
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const googleLoading = ref(false)
const facebookLoading = ref(false)
const error = ref('')
const success = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')

// Métodos
const validateForm = () => {
  let isValid = true
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''

  if (!email.value) {
    emailError.value = 'El correo electrónico es requerido'
    isValid = false
  }

  if (!password.value) {
    passwordError.value = 'La contraseña es requerida'
    isValid = false
  } else if (password.value.length < 6) {
    passwordError.value = 'La contraseña debe tener al menos 6 caracteres'
    isValid = false
  }

  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Las contraseñas no coinciden'
    isValid = false
  }

  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) return

  loading.value = true
  error.value = ''

  try {
    const { error: authError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })

    if (authError) throw authError

    // Mostrar mensaje de éxito
    error.value = ''
    success.value = 'Te hemos enviado un correo de confirmación. Por favor, revisa tu bandeja de entrada y sigue las instrucciones para activar tu cuenta.'
  } catch (e: any) {
    error.value = e.message || 'Error al crear la cuenta'
    success.value = ''
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
    error.value = e.message || 'Error al registrarse con Google'
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
    error.value = e.message || 'Error al registrarse con Facebook'
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