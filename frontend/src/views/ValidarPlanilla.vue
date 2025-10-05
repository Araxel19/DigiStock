<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Validar Planilla</h1>

    <div v-if="isLoading">
      <p>Cargando planilla...</p>
    </div>

    <div v-else-if="planilla" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 class="text-xl font-semibold mb-2">Imagen Original</h2>
        <img :src="getImageUrl(planilla.filePath)" alt="Planilla" class="w-full h-auto rounded-lg shadow-md">
      </div>
      <div>
        <h2 class="text-xl font-semibold mb-2">Datos Extraídos (Editables)</h2>
        <table class="min-w-full bg-white">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b">Código</th>
              <th class="py-2 px-4 border-b">Nombre</th>
              <th class="py-2 px-4 border-b">Descripción</th>
              <th class="py-2 px-4 border-b">Precio</th>
              <th class="py-2 px-4 border-b">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in editableData" :key="index">
              <td class="py-2 px-4 border-b"><input type="text" v-model="item.detectedCode" class="w-full p-1 border rounded"></td>
              <td class="py-2 px-4 border-b"><input type="text" v-model="item.detectedName" class="w-full p-1 border rounded"></td>
              <td class="py-2 px-4 border-b"><input type="text" v-model="item.detectedQuantity" class="w-full p-1 border rounded"></td>
              <td class="py-2 px-4 border-b"><input type="number" v-model="item.correctedProductId" class="w-full p-1 border rounded"></td>
              <td class="py-2 px-4 border-b"><input type="number" v-model="item.correctedQuantity" class="w-full p-1 border rounded"></td>
            </tr>
          </tbody>
        </table>
        <button @click="confirmAndSave" class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Confirmar y Guardar
        </button>
      </div>
    </div>

    <div v-else>
      <p class="text-red-500">No se pudo cargar la información de la planilla. Por favor, vuelve a intentarlo.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { inventoryService } from '@/services/inventory.service';
import type { Planilla } from '@/types/inventory'; // Usando 'type' para importación de tipos

const route = useRoute();
const router = useRouter();

const planilla = ref<Planilla | null>(null);
const editableData = ref<any[]>([]);
const isLoading = ref(true); // Estado para manejar la carga

const getImageUrl = (filePath: string) => {
  // filePath = 'uploads/planillas/xxxx.png'
  return `http://localhost:3000/${filePath.replace(/\\/g, '/')}`;
};

onMounted(async () => {
  const planillaId = route.params.id as string;
  try {
    // Llama al servicio para obtener los datos de la planilla
    const data = await inventoryService.getPlanillaById(planillaId);
    planilla.value = data;
    
    if (data && data.rawOcrData) {
      let parsedObject: any = null;

      try {
        // Si ya viene como objeto, no hace falta parsear
        if (typeof data.rawOcrData === 'object') {
          parsedObject = data.rawOcrData;
        } else if (typeof data.rawOcrData === 'string') {
          // Limpia comillas escapadas o texto adicional
          const cleanString = data.rawOcrData
            .replace(/^"|"$/g, '') // elimina comillas externas
            .replace(/\\"/g, '"')  // corrige comillas escapadas
            .trim();

          const jsonStart = cleanString.indexOf('{');
          const jsonEnd = cleanString.lastIndexOf('}');
          if (jsonStart !== -1 && jsonEnd > jsonStart) {
            parsedObject = JSON.parse(cleanString.substring(jsonStart, jsonEnd + 1));
          }
        }
        if (Array.isArray(parsedObject)) {
          editableData.value = parsedObject.map((item: any) => ({
            detectedCode: item['DETECTED CODE'] || '',
            detectedName: item['DETECTED NAME'] || '',
            detectedQuantity: item['DETECTED QUANTITY'] || '',
            correctedProductId: item['CORRECTED PRODUCT ID'] || '',
            correctedQuantity: item['CORRECTED QUANTITY'] || '',
          }));
        } else if (parsedObject && Array.isArray(parsedObject.inventario)) {
          editableData.value = parsedObject.inventario.map((item: any) => ({
            detectedCode: item['DETECTED CODE'] || '',
            detectedName: item['DETECTED NAME'] || '',
            detectedQuantity: item['DETECTED QUANTITY'] || '',
            correctedProductId: item['CORRECTED PRODUCT ID'] || '',
            correctedQuantity: item['CORRECTED QUANTITY'] || '',
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
    planilla.value = null; // En caso de error, se limpia la planilla
  } finally {
    isLoading.value = false; // Se deja de cargar, tanto si hay éxito como si hay error
  }
});

const confirmAndSave = async () => {
  if (!planilla.value) return;

  try {
    // Llama a un nuevo método en el servicio que enviará los datos corregidos al backend
    await inventoryService.confirmPlanillaData(planilla.value.id, { items: editableData.value });
    // Redirige a otra página (ej. el inventario) tras guardar con éxito
    router.push({ name: 'InventoryList' }); 
  } catch (error) {
    console.error('Error confirming planilla data:', error);
    // Aquí podrías mostrar una notificación de error al usuario
  }
};
</script>

