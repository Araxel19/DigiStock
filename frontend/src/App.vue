<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './store/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Verificar si hay token almacenado al cargar la app
  authStore.checkAuth()
})
</script>

<style scoped>
#app {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
</style>