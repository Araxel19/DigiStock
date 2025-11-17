<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
    <!-- Grid de fondo -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative">
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-xl overflow-hidden">
        <div class="p-6 sm:p-8">
          <!-- Header -->
          <div class="flex items-center space-x-3 mb-6">
            <div class="p-2 rounded-lg bg-gradient-to-br from-slate-700 to-slate-600 border border-slate-600">
              <svg class="w-6 h-6 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-slate-200">Mis Planillas Subidas</h2>
          </div>

          <!-- Loading -->
          <div v-if="loading" class="text-center py-16">
            <div class="inline-block relative">
              <div class="w-16 h-16 border-4 border-slate-700 border-t-slate-500 rounded-full animate-spin"></div>
            </div>
            <p class="text-slate-400 mt-4">Cargando planillas...</p>
          </div>

          <!-- Empty -->
          <div v-else-if="planillas.length === 0" class="text-center py-16">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-700/50 mb-4">
              <svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <p class="text-slate-400">No has subido ninguna planilla todavía.</p>
          </div>

          <!-- Table -->
          <div v-else>
            <div class="overflow-x-auto">
              <table class="min-w-full divide-y divide-slate-700">
                <thead class="bg-slate-900/50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Nombre del Archivo
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Fecha de Subida
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Estado
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Items Procesados
                    </th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-slate-700/50">
                  <template v-for="planilla in planillas" :key="planilla.id">
                    <tr
                      class="hover:bg-slate-700/30 cursor-pointer transition-colors"
                      @click="toggleDetails(planilla.id)"
                    >
                      <td class="px-6 py-4 text-sm font-medium text-slate-200">
                        <div class="flex items-center">
                          <svg class="w-4 h-4 text-slate-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                          </svg>
                          {{ planilla.fileName || 'Sin nombre' }}
                        </div>
                      </td>
                      <td class="px-6 py-4 text-sm text-slate-400">
                        {{ new Date(planilla.uploadedAt || planilla.createdAt).toLocaleString() }}
                      </td>
                      <td class="px-6 py-4 text-sm">
                        <span
                          :class="getStatusClass(planilla.status)"
                          class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded border"
                        >
                          {{ getStatusText(planilla.status) }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-sm text-slate-400">
                        <span class="px-2 py-1 bg-slate-700/50 rounded border border-slate-600">
                          {{ planilla.items?.length || 0 }} items
                        </span>
                      </td>
                    </tr>

                    <!-- Fila expandible -->
                    <tr v-if="expandedPlanillaId === planilla.id" class="bg-slate-900/50">
                      <td colspan="4" class="px-6 py-4">
                        <div class="border-l-4 border-slate-600 pl-4">
                          <h4 class="font-semibold text-slate-300 mb-3 flex items-center">
                            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                            </svg>
                            Impacto en Inventario
                          </h4>

                          <!-- Resumen -->
                          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                            <div class="bg-slate-800/50 border border-slate-700 px-4 py-3 rounded-lg">
                              <div class="flex items-center">
                                <div class="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
                                <span class="text-slate-400 text-xs">Nuevos productos</span>
                              </div>
                              <p class="text-slate-200 text-lg font-semibold mt-1">
                                +{{ planilla.stats?.added || 0 }}
                              </p>
                            </div>
                            <div class="bg-slate-800/50 border border-slate-700 px-4 py-3 rounded-lg">
                              <div class="flex items-center">
                                <div class="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
                                <span class="text-slate-400 text-xs">Actualizados</span>
                              </div>
                              <p class="text-slate-200 text-lg font-semibold mt-1">
                                ~{{ planilla.stats?.updated || 0 }}
                              </p>
                            </div>
                            <div class="bg-slate-800/50 border border-slate-700 px-4 py-3 rounded-lg">
                              <div class="flex items-center">
                                <div class="w-2 h-2 bg-slate-500 rounded-full mr-2"></div>
                                <span class="text-slate-400 text-xs">Sin cambios</span>
                              </div>
                              <p class="text-slate-200 text-lg font-semibold mt-1">
                                ={{ planilla.stats?.unchanged || 0 }}
                              </p>
                            </div>
                          </div>

                          <!-- Tabla de items -->
                          <div class="overflow-x-auto bg-slate-900/30 rounded-lg border border-slate-700">
                            <table class="min-w-full divide-y divide-slate-700 text-sm">
                              <thead class="bg-slate-800/50">
                                <tr>
                                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Código</th>
                                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Nombre</th>
                                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Cantidad Detectada</th>
                                  <th class="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Cantidad Final</th>
                                </tr>
                              </thead>
                              <tbody class="divide-y divide-slate-700/50">
                                <tr v-for="item in planilla.items" :key="item.id" class="hover:bg-slate-800/30">
                                  <td class="px-4 py-3 text-slate-300 font-mono text-xs">{{ item.detectedCode }}</td>
                                  <td class="px-4 py-3 text-slate-300">{{ item.detectedName }}</td>
                                  <td class="px-4 py-3 text-slate-400">{{ item.detectedQuantity }}</td>
                                  <td class="px-4 py-3 text-slate-300 font-semibold">
                                    {{ item.correctedQuantity ?? item.detectedQuantity }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div class="mt-4 flex justify-end">
                            <button
                              @click.stop="exportPlanilla(planilla)"
                              class="inline-flex items-center px-4 py-2 bg-slate-700 text-slate-200 rounded-lg hover:bg-slate-600 border border-slate-600 transition-all text-sm"
                            >
                              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                              </svg>
                              Exportar PDF
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { inventoryService } from '@/services/inventory.service'
import { useToastStore } from '@/composables/useToast'
import type { Planilla } from '@/types/inventory'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

const planillas = ref<Planilla[]>([])
const loading = ref(true)
const expandedPlanillaId = ref<string | null>(null)

const fetchMyPlanillas = async () => {
  loading.value = true
  try {
    const response = await inventoryService.getMyPlanillas()
    planillas.value = response
  } catch (error) {
    console.error('Error fetching planillas:', error)
    const { error: showError } = useToastStore();
    showError('Error al cargar planillas')
  } finally {
    loading.value = false
  }
}

onMounted(fetchMyPlanillas)

const toggleDetails = (id: string) => {
  expandedPlanillaId.value = expandedPlanillaId.value === id ? null : id
}

const exportPlanilla = (planilla: Planilla) => {
  const doc = new jsPDF();
  doc.text(`Detalle de Planilla: ${planilla.fileName}`, 14, 16);

  autoTable(doc, {
    head: [['Código', 'Nombre', 'Cantidad Detectada', 'Cantidad Final']],
    body: planilla.items.map(i => [
      i.detectedCode ?? '',
      i.detectedName ?? '',
      i.detectedQuantity ?? 0,
      i.correctedQuantity ?? i.detectedQuantity ?? 0,
    ]),
  });

  doc.save(`planilla_${planilla.fileName}.pdf`);
};

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    recibido: 'Recibido',
    en_ocr: 'En OCR',
    validacion_pendiente: 'Validación Pendiente',
    procesado: 'Procesado',
    error: 'Error',
  }
  return statusMap[status] || status
}

const getStatusClass = (status: string) => {
  const classMap: Record<string, string> = {
    recibido: 'bg-blue-900/30 text-blue-400 border-blue-700',
    en_ocr: 'bg-amber-900/30 text-amber-400 border-amber-700',
    validacion_pendiente: 'bg-orange-900/30 text-orange-400 border-orange-700',
    procesado: 'bg-emerald-900/30 text-emerald-400 border-emerald-700',
    error: 'bg-red-900/30 text-red-400 border-red-700',
  }
  return classMap[status] || 'bg-slate-700/30 text-slate-400 border-slate-600'
}
</script>