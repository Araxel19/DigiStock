<template>
  <div class="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="p-6 sm:p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Mis Planillas Subidas</h2>

        <div v-if="loading" class="text-center py-10">
          <p>Cargando planillas...</p>
        </div>

        <div v-else-if="planillas.length === 0" class="text-center py-10">
          <p class="text-gray-600">No has subido ninguna planilla todavía.</p>
        </div>

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
                <tr v-for="planilla in planillas" :key="planilla.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {{ planilla.fileName || 'Sin nombre' }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ new Date(planilla.uploadedAt || planilla.createdAt).toLocaleString() }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      :class="getStatusClass(planilla.status)"
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    >
                      {{ getStatusText(planilla.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ planilla.items?.length || 0 }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { inventoryService } from '@/services/inventory.service';
import type { Planilla } from '@/types/inventory';

const planillas = ref<Planilla[]>([]);
const loading = ref(true);

const fetchMyPlanillas = async () => {
  loading.value = true;
  try {
    const response = await inventoryService.getMyPlanillas();
    planillas.value = response;
  } catch (error) {
    console.error('Error fetching planillas:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchMyPlanillas);

const getStatusText = (status: string) => {
  const statusMap: Record<string, string> = {
    recibido: 'Recibido',
    en_ocr: 'En OCR',
    validacion_pendiente: 'Validación Pendiente',
    procesado: 'Procesado',
    error: 'Error',
  };
  return statusMap[status] || status;
};

const getStatusClass = (status: string) => {
  const classMap: Record<string, string> = {
    recibido: 'bg-blue-100 text-blue-800',
    en_ocr: 'bg-yellow-100 text-yellow-800',
    validacion_pendiente: 'bg-orange-100 text-orange-800',
    procesado: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
  };
  return classMap[status] || 'bg-gray-100 text-gray-800';
};
</script>
