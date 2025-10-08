<template>
  <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="p-6 sm:p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Mis Planillas Subidas</h2>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-10">
          <p>Cargando planillas...</p>
        </div>

        <!-- Empty -->
        <div v-else-if="planillas.length === 0" class="text-center py-10">
          <p class="text-gray-600">No has subido ninguna planilla todavía.</p>
        </div>

        <!-- Table -->
        <div v-else>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre del Archivo
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha de Subida
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items Procesados
                  </th>
                </tr>
              </thead>

              <tbody class="bg-white divide-y divide-gray-200">
                <template v-for="planilla in planillas" :key="planilla.id">
                  <tr
                    class="hover:bg-gray-50 cursor-pointer"
                    @click="toggleDetails(planilla.id)"
                  >
                    <td class="px-6 py-4 text-sm font-medium text-gray-900">
                      {{ planilla.fileName || 'Sin nombre' }}
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
                      {{ new Date(planilla.uploadedAt || planilla.createdAt).toLocaleString() }}
                    </td>
                    <td class="px-6 py-4 text-sm">
                      <span
                        :class="getStatusClass(planilla.status)"
                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                      >
                        {{ getStatusText(planilla.status) }}
                      </span>
                    </td>
                    <td class="px-6 py-4 text-sm text-gray-500">
                      {{ planilla.items?.length || 0 }}
                    </td>
                  </tr>

                  <!-- Fila expandible -->
                  <tr v-if="expandedPlanillaId === planilla.id" class="bg-gray-50">
                    <td colspan="4" class="px-6 py-4">
                      <div class="border-l-4 border-primary-400 pl-4">
                        <h4 class="font-semibold text-gray-800 mb-3">Impacto en Inventario</h4>

                        <!-- Resumen -->
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                          <div class="bg-green-100 text-green-800 px-3 py-2 rounded text-sm font-medium">
                            + {{ planilla.stats?.added || 0 }} nuevos productos
                          </div>
                          <div class="bg-yellow-100 text-yellow-800 px-3 py-2 rounded text-sm font-medium">
                            ~ {{ planilla.stats?.updated || 0 }} productos actualizados
                          </div>
                          <div class="bg-gray-100 text-gray-800 px-3 py-2 rounded text-sm font-medium">
                            = {{ planilla.stats?.unchanged || 0 }} sin cambios
                          </div>
                        </div>

                        <!-- Tabla de items -->
                        <div class="overflow-x-auto">
                          <table class="min-w-full divide-y divide-gray-200 text-sm">
                            <thead class="bg-gray-100">
                              <tr>
                                <th class="px-4 py-2 text-left font-medium text-gray-600">Código</th>
                                <th class="px-4 py-2 text-left font-medium text-gray-600">Nombre</th>
                                <th class="px-4 py-2 text-left font-medium text-gray-600">Cantidad Detectada</th>
                                <th class="px-4 py-2 text-left font-medium text-gray-600">Cantidad Final</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr v-for="item in planilla.items" :key="item.id">
                                <td class="px-4 py-2">{{ item.detectedCode }}</td>
                                <td class="px-4 py-2">{{ item.detectedName }}</td>
                                <td class="px-4 py-2">{{ item.detectedQuantity }}</td>
                                <td class="px-4 py-2">{{ item.correctedQuantity ?? item.detectedQuantity }}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <div class="mt-4 flex justify-end space-x-2">
                          <button
                            @click.stop="exportPlanilla(planilla)"
                            class="px-3 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 text-sm"
                          >
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
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { inventoryService } from '@/services/inventory.service'
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
    recibido: 'bg-blue-100 text-blue-800',
    en_ocr: 'bg-yellow-100 text-yellow-800',
    validacion_pendiente: 'bg-orange-100 text-orange-800',
    procesado: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  }
  return classMap[status] || 'bg-gray-100 text-gray-800'
}
</script>
