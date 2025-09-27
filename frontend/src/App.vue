<template>
  <div id="app" class="min-h-screen bg-gray-50">
    <AppLayout v-if="authStore.isAuthenticated">
      <router-view />
    </AppLayout>
    <router-view v-else />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './store/auth'
import AppLayout from '@/components/AppLayout.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.checkAuth()
})
</script>

<style scoped>
#app {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}
</style>
