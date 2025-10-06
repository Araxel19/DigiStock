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
              <th class="py-2 px-4 border-b">Nombre del producto</th>
              <th class="py-2 px-4 border-b">Descripción</th>
              <th class="py-2 px-4 border-b">Categoría</th>
              <th class="py-2 px-4 border-b">Ubicación</th>
              <th class="py-2 px-4 border-b">Cantidad</th>
              <th class="py-2 px-4 border-b">Precio</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in editableData" :key="index">
              <td class="py-2 px-4 border-b"><input type="text" v-model="item.codigo" class="w-full p-1 border rounded"></td>
              <td class="py-2 px-4 border-b"><input type="text" v-model="item.nombre_del_producto" class="w-full p-1 border rounded"></td>
              <td class="py-2 px-4 border-b"><input type="text" v-model="item.descripcion" class="w-full p-1 border rounded"></td>
              <td class="py-2 px-4 border-b"><input type="text" v-model="item.categoria" class="w-full p-1 border rounded"></td>
              <td class="py-2 px-4 border-b"><input type="text" v-model="item.ubicacion" class="w-full p-1 border rounded"></td>
              <td class="py-2 px-4 border-b"><input type="number" v-model="item.cantidad" class="w-full p-1 border rounded"></td>
              <td class="py-2 px-4 border-b"><input type="number" step="any" v-model="item.precio" class="w-full p-1 border rounded"></td>
            </tr>
          </tbody>
        </table>
        <button
          @click="confirmAndSave"
          class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
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
import type { Planilla } from '@/types/inventory';

const route = useRoute();
const router = useRouter();

const planilla = ref<Planilla | null>(null);
const editableData = ref<any[]>([]);
const isLoading = ref(true);

const getImageUrl = (filePath: string) => {
  return `http://localhost:3000/${filePath.replace(/\\/g, '/')}`;
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

        // 🔹 Función auxiliar para limpiar y convertir valores numéricos
        const parseNumber = (value: any): number => {
          if (value === undefined || value === null) return 0;
          const clean = value.toString().replace(',', '.').trim();
          const num = parseFloat(clean);
          return isNaN(num) ? 0 : num;
        };

        // 🔹 Detecta formato tipo array o con propiedad inventario
        if (Array.isArray(parsedObject)) {
          editableData.value = parsedObject
            // Evita la primera fila vacía
            .filter((item: any, index: number) => {
              const codigo = item["código"]?.trim();
              const nombre = item["nombre del producto"]?.trim();
              return index !== 0 || (codigo && nombre);
            })
            // Convierte y normaliza cada campo
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
  try {
    await inventoryService.confirmPlanillaData(planilla.value.id, { items: editableData.value });
    router.push({ name: 'InventoryList' });
  } catch (error) {
    console.error('Error confirming planilla data:', error);
  }
};
</script>
