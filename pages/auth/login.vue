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
            />

            <v-text-field
              v-model="password"
              label="Contraseña"
              type="password"
              required
              :error-messages="passwordError"
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
            >
              Iniciar Sesión
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
const supabase = useSupabaseClient()
const router = useRouter()

// Estados
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const emailError = ref('')
const passwordError = ref('')

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