<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
    <!-- Efectos de fondo tecnológicos -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute top-20 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
      <div class="absolute top-40 right-40 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
    </div>

    <!-- Grid de circuito en el fondo -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>

    <div class="max-w-md w-full space-y-8 p-10 bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-cyan-500/20 relative z-10">
      <!-- Logo y Header -->
      <div class="text-center">
        <div class="flex items-center justify-center mb-4">
          <div class="relative">
            <!-- Icono de chip/circuito -->
            <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <!-- Pulsos animados -->
            <div class="absolute inset-0 rounded-lg bg-cyan-500/30 animate-ping"></div>
          </div>
        </div>
        <h2 class="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
          DigiStock
        </h2>
        <p class="text-cyan-300/70 text-sm">Sistema de Inventario Electrónico</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-cyan-300 mb-2">
            Correo electrónico
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
            <input
              id="email"
              v-model="form.email"
              type="email"
              required
              class="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-slate-500"
              placeholder="admin@digistock.com"
            />
          </div>
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-cyan-300 mb-2">
            Contraseña
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              id="password"
              v-model="form.password"
              type="password"
              required
              class="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-white placeholder-slate-500"
              placeholder="••••••••"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] shadow-cyan-500/50"
        >
          <span v-if="!loading" class="flex items-center space-x-2">
            <span>Iniciar Sesión</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </span>
          <div v-else class="flex items-center space-x-2">
            <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Iniciando...</span>
          </div>
        </button>
      </form>

      <div v-if="error" class="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg backdrop-blur-sm">
        <div class="flex items-start">
          <svg class="h-5 w-5 text-red-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-sm text-red-300">{{ error }}</p>
        </div>
      </div>

      <!-- Footer decorativo -->
      <div class="pt-4 border-t border-cyan-500/20">
        <p class="text-center text-xs text-slate-500">
          Powered by DigiStock Tech © 2025
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/store/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: 'superadmin@digistock.com',
  password: 'admin123'
})

const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await authStore.login(form.value)
    router.push('/dashboard')
  } catch (err: any) {
    if (err.response?.data?.message) {
      if (Array.isArray(err.response.data.message)) {
        error.value = err.response.data.message.join(', ');
      } else {
        error.value = err.response.data.message;
      }
    } else {
      error.value = 'Error al iniciar sesión';
    }
  } finally {
    loading.value = false
  }
}
</script>