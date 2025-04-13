<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <BaseCard title="Crear Cuenta">
          <v-form @submit.prevent="handleRegister">
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

            <v-text-field
              v-model="confirmPassword"
              label="Confirmar contraseña"
              type="password"
              required
              :error-messages="confirmPasswordError"
            />

            <v-text-field
              v-model="nombreTienda"
              label="Nombre de tu tienda"
              required
              :error-messages="nombreTiendaError"
            />

            <v-text-field
              v-model="whatsapp"
              label="WhatsApp (con código de país)"
              required
              :error-messages="whatsappError"
              placeholder="Ej: 5491112345678"
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
              Crear Cuenta
            </v-btn>

            <div class="text-center mt-4">
              <nuxt-link to="/auth/login">
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
const nombreTienda = ref('')
const whatsapp = ref('')
const loading = ref(false)
const error = ref('')
const emailError = ref('')
const passwordError = ref('')
const confirmPasswordError = ref('')
const nombreTiendaError = ref('')
const whatsappError = ref('')

// Métodos
const validateForm = () => {
  let isValid = true
  emailError.value = ''
  passwordError.value = ''
  confirmPasswordError.value = ''
  nombreTiendaError.value = ''
  whatsappError.value = ''

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

  if (!nombreTienda.value) {
    nombreTiendaError.value = 'El nombre de la tienda es requerido'
    isValid = false
  }

  if (!whatsapp.value) {
    whatsappError.value = 'El número de WhatsApp es requerido'
    isValid = false
  } else if (!/^\d+$/.test(whatsapp.value)) {
    whatsappError.value = 'El número debe contener solo dígitos'
    isValid = false
  }

  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) return

  loading.value = true
  error.value = ''

  try {
    // 1. Registrar usuario
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    })

    if (authError) throw authError

    // 2. Crear tienda
    const slug = nombreTienda.value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const { error: tiendaError } = await supabase
      .from('tiendas')
      .insert({
        user_id: authData.user?.id,
        nombre: nombreTienda.value,
        slug,
        whatsapp: whatsapp.value,
      })

    if (tiendaError) throw tiendaError

    router.push('/dashboard')
  } catch (e: any) {
    error.value = e.message || 'Error al crear la cuenta'
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
})</script> 