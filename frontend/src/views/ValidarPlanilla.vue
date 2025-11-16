<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 px-4 sm:px-6 lg:px-8">
    <!-- Grid de fondo -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="p-3 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
              <svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Validar Planilla
              </h1>
              <p class="text-cyan-300/70 mt-1">Revisa y corrige los datos extraídos por OCR</p>
            </div>
          </div>
          <button
            @click="$router.back()"
            class="inline-flex items-center px-4 py-2 border border-slate-600 text-sm font-medium rounded-lg text-slate-300 bg-slate-900/50 hover:bg-slate-700/50 transition-all"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            Volver
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
        <div class="relative">
          <div class="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <div class="absolute inset-0 w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
        </div>
        <p class="text-cyan-300 mt-6 text-lg">Cargando planilla...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="!planilla" class="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-12 text-center">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 mb-6">
          <svg class="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-red-300 mb-2">Error al cargar la planilla</h3>
        <p class="text-red-400 mb-6">No se pudo cargar la información de la planilla. Por favor, vuelve a intentarlo.</p>
        <button
          @click="$router.back()"
          class="inline-flex items-center px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
        >
          Volver al inicio
        </button>
      </div>

      <!-- Main Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Image Panel -->
        <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 p-6 sticky top-6 h-fit">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-white flex items-center">
              <svg class="w-6 h-6 text-cyan-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              Imagen Original
            </h2>
            <button
              @click="zoomImage = !zoomImage"
              class="p-2 rounded-lg bg-slate-700/50 text-cyan-400 hover:bg-slate-600/50 transition-all"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
              </svg>
            </button>
          </div>
          <div class="relative group">
            <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl blur-xl"></div>
            <div class="relative bg-slate-900/50 p-2 rounded-xl border border-cyan-500/30">
              <img 
                :src="getImageUrl(planilla.filePath)" 
                alt="Planilla" 
                class="w-full h-auto rounded-lg shadow-2xl shadow-cyan-500/20 transition-transform duration-300 cursor-zoom-in"
                @click="zoomImage = !zoomImage"
              >
            </div>
          </div>
          
          <!-- Zoom Modal Overlay -->
          <transition name="fade">
            <div 
              v-if="zoomImage" 
              class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              @click="zoomImage = false"
            >
              <div class="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center" @click.stop>
                <img 
                  :src="getImageUrl(planilla.filePath)" 
                  alt="Planilla Zoomed" 
                  class="max-w-full max-h-full object-contain rounded-lg shadow-2xl shadow-cyan-500/30 cursor-zoom-out"
                  @click="zoomImage = false"
                >
                <button
                  @click="zoomImage = false"
                  class="absolute top-4 right-4 p-3 rounded-lg bg-slate-900/80 text-cyan-400 hover:bg-slate-800 transition-all"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>
          </transition>
          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-4">
              <p class="text-cyan-300/70 text-xs mb-1">Total Items</p>
              <p class="text-2xl font-bold text-white">{{ editableData.length }}</p>
            </div>
            <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-4">
              <p class="text-cyan-300/70 text-xs mb-1">Editados</p>
              <p class="text-2xl font-bold text-yellow-400">{{ editedCount }}</p>
            </div>
            <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-4">
              <p class="text-cyan-300/70 text-xs mb-1">Confianza</p>
              <p class="text-2xl font-bold text-green-400">95%</p>
            </div>
          </div>
          <!-- Status Card -->
          <div class="mt-4 p-4 bg-slate-900/30 rounded-lg border border-slate-700/50">
            <div class="flex items-center justify-between text-sm">
              <span class="text-slate-400">Estado:</span>
              <span class="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30 text-xs font-semibold">
                Validación Pendiente
              </span>
            </div>
          </div>
          <!-- Action Buttons -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-6">
            <div class="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <div class="text-sm text-cyan-300/70">
                <p>Revisa cuidadosamente todos los campos antes de confirmar.</p>
                <p class="text-xs text-slate-500 mt-1">Los cambios serán permanentes.</p>
              </div>
              <div class="flex space-x-3">
                <button
                  @click="$router.back()"
                  class="px-6 py-3 border border-slate-600 text-sm font-medium rounded-lg text-slate-300 bg-slate-900/50 hover:bg-slate-700/50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  @click="confirmAndSave"
                  :disabled="isSaving"
                  class="px-8 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/50 transition-all flex items-center"
                >
                  <svg v-if="!isSaving" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <div v-else class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {{ isSaving ? 'Guardando...' : 'Confirmar y Guardar' }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Data Panel -->
        <div class="space-y-6">
          <!-- Table Card -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden">
            <div class="p-6 border-b border-cyan-500/20">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold text-white flex items-center">
                  <svg class="w-6 h-6 text-cyan-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
                  </svg>
                  Datos Extraídos
                </h2>
                <span class="text-sm text-cyan-300/70">{{ editableData.length }} productos detectados</span>
              </div>
            </div>

            <!-- Scrollable Table -->
            <div class="overflow-x-auto overflow-y-auto max-h-[600px] custom-scrollbar">
              <table class="w-full min-w-[1400px]">
                <thead class="bg-slate-900/50 sticky top-0 z-10">
                  <tr>
                    <th class="py-4 px-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-slate-700 w-16">#</th>
                    <th class="py-4 px-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-slate-700 w-32">Código</th>
                    <th class="py-4 px-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-slate-700 w-48">Nombre</th>
                    <th class="py-4 px-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-slate-700 w-64">Descripción</th>
                    <th class="py-4 px-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-slate-700 w-40">Categoría</th>
                    <th class="py-4 px-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-slate-700 w-40">Ubicación</th>
                    <th class="py-4 px-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-slate-700 w-32">Cantidad</th>
                    <th class="py-4 px-4 text-left text-xs font-semibold text-cyan-300 uppercase tracking-wider border-b border-slate-700 w-36">Precio</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(item, index) in editableData" 
                    :key="index"
                    class="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors group"
                  >
                    <td class="py-3 px-4 text-slate-400 font-mono text-sm">{{ index + 1 }}</td>
                    <td class="py-3 px-4">
                      <input 
                        type="text" 
                        v-model="item.codigo" 
                        @input="markAsEdited(index)"
                        class="w-full min-w-[100px] px-3 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all font-mono"
                        placeholder="Código"
                      >
                    </td>
                    <td class="py-3 px-4">
                      <input 
                        type="text" 
                        v-model="item.nombre_del_producto" 
                        @input="markAsEdited(index)"
                        class="w-full min-w-[150px] px-3 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="Nombre del producto"
                      >
                    </td>
                    <td class="py-3 px-4">
                      <input 
                        type="text" 
                        v-model="item.descripcion" 
                        @input="markAsEdited(index)"
                        class="w-full min-w-[200px] px-3 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="Descripción"
                      >
                    </td>
                    <td class="py-3 px-4">
                      <input 
                        type="text" 
                        v-model="item.categoria" 
                        @input="markAsEdited(index)"
                        class="w-full min-w-[120px] px-3 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="Categoría"
                      >
                    </td>
                    <td class="py-3 px-4">
                      <input 
                        type="text" 
                        v-model="item.ubicacion" 
                        @input="markAsEdited(index)"
                        class="w-full min-w-[120px] px-3 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="Ubicación"
                      >
                    </td>
                    <td class="py-3 px-4">
                      <input 
                        type="number" 
                        v-model="item.cantidad" 
                        @input="markAsEdited(index)"
                        class="w-full min-w-[90px] px-3 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                        placeholder="0"
                      >
                    </td>
                    <td class="py-3 px-4">
                      <div class="relative">
                        <span class="absolute left-3 top-2.5 text-green-400 text-sm">$</span>
                        <input 
                          type="number" 
                          step="0.01" 
                          v-model="item.precio" 
                          @input="markAsEdited(index)"
                          class="w-full min-w-[100px] pl-7 pr-3 py-2 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                          placeholder="0.00"
                        >
                      </div>
                    </td>
                  </tr>
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
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { inventoryService } from '@/services/inventory.service';
import type { Planilla } from '@/types/inventory';

const route = useRoute();
const router = useRouter();

const planilla = ref<Planilla | null>(null);
const editableData = ref<any[]>([]);
const isLoading = ref(true);
const isSaving = ref(false);
const zoomImage = ref(false);
const editedItems = ref<Set<number>>(new Set());

const editedCount = computed(() => editedItems.value.size);

const getImageUrl = (filePath: string) => {
  return `http://localhost:3000/${filePath.replace(/\\/g, '/')}`;
};

const markAsEdited = (index: number) => {
  editedItems.value.add(index);
};

onMounted(async () => {
  const planillaId = route.params.id as string;
  try {
    const data = await inventoryService.getPlanillaById(planillaId);
    planilla.value = data;

    if (data && data.rawOcrData) {
      let parsedObject: any = null;

      try {
        if (typeof data.rawOcrData === 'object') {
          parsedObject = data.rawOcrData;
        } else if (typeof data.rawOcrData === 'string') {
          const cleanString = data.rawOcrData
            .replace(/^"|"$/g, '')
            .replace(/\\"/g, '"')
            .trim();

          const jsonStart = cleanString.indexOf('{');
          const jsonEnd = cleanString.lastIndexOf('}');
          if (jsonStart !== -1 && jsonEnd > jsonStart) {
            parsedObject = JSON.parse(cleanString.substring(jsonStart, jsonEnd + 1));
          }
        }

        const parseNumber = (value: any): number => {
          if (value === undefined || value === null) return 0;
          const clean = value.toString().replace(',', '.').trim();
          const num = parseFloat(clean);
          return isNaN(num) ? 0 : num;
        };

        if (Array.isArray(parsedObject)) {
          editableData.value = parsedObject
            .filter((item: any, index: number) => {
              const codigo = item["código"]?.trim();
              const nombre = item["nombre del producto"]?.trim();
              return index !== 0 || (codigo && nombre);
            })
            .map((item: any) => ({
              codigo: item["código"] || '---',
              nombre_del_producto: item["nombre del producto"] || 'Sin nombre',
              descripcion: item["descripción"] || 'Sin descripción',
              categoria: item["categoria"] || 'Sin categoría',
              ubicacion: item["ubicación"] || 'No asignada',
              cantidad: parseNumber(item["cantidad"]),
              precio: parseNumber(item["precio"]),
            }));
        } else if (parsedObject && Array.isArray(parsedObject.inventario)) {
          editableData.value = parsedObject.inventario
            .filter((item: any, index: number) => {
              const codigo = item["código"]?.trim();
              const nombre = item["nombre del producto"]?.trim();
              return index !== 0 || (codigo && nombre);
            })
            .map((item: any) => ({
              codigo: item["código"] || '---',
              nombre_del_producto: item["nombre del producto"] || 'Sin nombre',
              descripcion: item["descripción"] || 'Sin descripción',
              categoria: item["categoria"] || 'Sin categoría',
              ubicacion: item["ubicación"] || 'No asignada',
              cantidad: parseNumber(item["cantidad"]),
              precio: parseNumber(item["precio"]),
            }));
        } else {
          console.warn('⚠️ No se encontró un formato de inventario válido en el rawOcrData:', parsedObject);
        }
      } catch (err) {
        console.error('Error parseando rawOcrData:', err, data.rawOcrData);
      }
    }
  } catch (error) {
    console.error('Error fetching planilla:', error);
    planilla.value = null;
  } finally {
    isLoading.value = false;
  }
});

const confirmAndSave = async () => {
  if (!planilla.value) return;
  
  isSaving.value = true;
  try {
    await inventoryService.confirmPlanillaData(planilla.value.id, { items: editableData.value });
    router.push({ name: 'InventoryList', query: { success: 'Planilla validada y guardada exitosamente' } });
  } catch (error) {
    console.error('Error confirming planilla data:', error);
    alert('Error al guardar los datos. Por favor, intenta nuevamente.');
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
/* Scrollbar personalizado para la tabla */
.custom-scrollbar::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: rgb(30 41 59 / 0.5);
  border-radius: 6px;
  margin: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgb(6 182 212 / 0.4);
  border-radius: 6px;
  border: 2px solid rgb(30 41 59 / 0.5);
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgb(6 182 212 / 0.6);
}

.custom-scrollbar::-webkit-scrollbar-corner {
  background: rgb(30 41 59 / 0.5);
}

/* Transiciones para el modal de zoom */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>