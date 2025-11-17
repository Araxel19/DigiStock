<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-3">
    <transition-group name="toast" tag="div">
      <div v-for="t in toasts" :key="t.id" class="max-w-xs w-full px-4 py-2 rounded shadow-md text-sm flex items-start gap-3"
        :class="t.type === 'error' ? 'bg-red-700 text-white' : t.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-white'">
        <div class="flex-1">
          <div class="font-medium">{{ t.title }}</div>
          <div class="text-xs mt-1">{{ t.message }}</div>
        </div>
        <button @click="remove(t.id)" class="ml-2 opacity-80 hover:opacity-100">✕</button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@/composables/useToast'

const { toasts, remove } = useToastStore()
</script>

<style scoped>
.toast-enter-from { opacity: 0; transform: translateY(-6px); }
.toast-enter-active { transition: all .2s ease; }
.toast-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
