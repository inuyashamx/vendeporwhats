<template>
  <div>
    <v-container class="px-2 px-sm-4">
      <v-row class="justify-center py-4 py-sm-8 py-md-16">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="pa-2 pa-sm-4">
            <v-card-title class="text-h5 text-sm-h4 text-center mb-4">
              Iniciar Sesión
            </v-card-title>

            <v-form @submit.prevent="handleLogin" ref="form">
              <v-text-field
                v-model="email"
                label="Correo electrónico"
                type="email"
                :rules="[
                  v => !!v || 'El correo es requerido',
                  v => /.+@.+\..+/.test(v) || 'El correo debe ser válido'
                ]"
                variant="outlined"
                density="comfortable"
                class="mb-2"
              />

              <v-text-field
                v-model="password"
                label="Contraseña"
                :type="showPassword ? 'text' : 'password'"
                :rules="[v => !!v || 'La contraseña es requerida']"
                variant="outlined"
                density="comfortable"
                class="mb-4"
              >
                <template v-slot:append>
                  <v-icon
                    @click="showPassword = !showPassword"
                    :icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  />
                </template>
              </v-text-field>

              <v-btn
                color="primary"
                type="submit"
                :loading="loading"
                :disabled="loading"
                block
                class="mb-4"
                height="44"
              >
                Iniciar Sesión
              </v-btn>

              <div class="text-center mb-4">
                <v-btn
                  variant="text"
                  color="primary"
                  to="/auth/forgot-password"
                  class="text-body-2"
                >
                  ¿Olvidaste tu contraseña?
                </v-btn>
              </div>

              <v-divider class="mb-4">
                <span class="text-body-2 text-medium-emphasis px-2">o</span>
              </v-divider>

              <v-btn
                color="error"
                variant="outlined"
                @click="handleGoogleLogin"
                :loading="googleLoading"
                :disabled="googleLoading"
                block
                class="mb-2"
                height="44"
              >
                <template v-slot:prepend>
                  <v-icon>mdi-google</v-icon>
                </template>
                Continuar con Google
              </v-btn>

              <v-btn
                color="primary"
                variant="outlined"
                @click="handleFacebookLogin"
                :loading="facebookLoading"
                :disabled="facebookLoading"
                block
                height="44"
              >
                <template v-slot:prepend>
                  <v-icon>mdi-facebook</v-icon>
                </template>
                Continuar con Facebook
              </v-btn>

              <div class="text-center mt-4">
                <span class="text-body-2 text-medium-emphasis">¿No tienes cuenta?</span>
                <v-btn
                  variant="text"
                  color="primary"
                  to="/auth/register"
                  class="text-body-2 ml-1"
                >
                  Regístrate
                </v-btn>
              </div>
            </v-form>
          </v-card>
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
const showPassword = ref(false)

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