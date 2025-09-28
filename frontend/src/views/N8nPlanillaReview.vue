<template>
  <div class="n8n-planilla-review">
    <h1>Revisar Datos de Planilla de n8n</h1>
    <p v-if="!n8nData">Cargando datos...</p>
    <div v-else>
      <table class="table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in n8nData.items" :key="index">
            <td>
              <input type="text" v-model="item.productName" class="form-control" />
            </td>
            <td>
              <input type="number" v-model="item.quantity" class="form-control" />
            </td>
            <td>
              <button @click="removeItem(index)" class="btn btn-danger btn-sm">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <button @click="addItem" class="btn btn-primary mb-3">Agregar Item</button>
      <button @click="confirmData" class="btn btn-success">Confirmar y Guardar</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface N8nPlanillaItem {
  productName: string;
  quantity: number;
}

interface N8nPlanillaData {
  items: N8nPlanillaItem[];
}

export default defineComponent({
  name: 'N8nPlanillaReview',
  setup() {
    const route = useRoute();
    const router = useRouter();
    const n8nData = ref<N8nPlanillaData | null>(null);

    onMounted(() => {
      // In a real scenario, you would fetch the data from a temporary storage
      // or directly from the route params if n8n redirects with data.
      // For now, we'll simulate receiving data.
      const dataFromN8n = route.query.data as string; // Assuming data is passed as a query param
      if (dataFromN8n) {
        try {
          n8nData.value = JSON.parse(decodeURIComponent(dataFromN8n));
        } catch (e) {
          console.error('Error parsing n8n data:', e);
          // Handle error, maybe redirect to an error page or dashboard
          router.push('/dashboard');
        }
      } else {
        // Simulate some dummy data if no data is passed
        n8nData.value = {
          items: [
            { productName: 'Producto A', quantity: 10 },
            { productName: 'Producto B', quantity: 5 },
          ],
        };
      }
    });

    const addItem = () => {
      if (n8nData.value) {
        n8nData.value.items.push({ productName: '', quantity: 0 });
      }
    };

    const removeItem = (index: number) => {
      if (n8nData.value) {
        n8nData.value.items.splice(index, 1);
      }
    };

    const confirmData = async () => {
      if (n8nData.value) {
        console.log('Confirming data:', n8nData.value);
        try {
          // await inventoryService.saveConfirmedN8nPlanilla(n8nData.value);
          alert('Datos confirmados y enviados a la base de datos.');
          router.push('/inventory'); // Redirect after saving
        } catch (error) {
          console.error('Error saving n8n planilla data:', error);
          alert('Error al guardar los datos de la planilla.');
        }
      }
    };

    return {
      n8nData,
      addItem,
      removeItem,
      confirmData,
    };
  },
});
</script>

<style scoped>
.n8n-planilla-review {
  padding: 20px;
}
.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
  border-collapse: collapse;
}
.table th,
.table td {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}
.table thead th {
  vertical-align: bottom;
  border-bottom: 2px solid #dee2e6;
}
.form-control {
  display: block;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}
.btn-success {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}
.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}
.mb-3 {
  margin-bottom: 1rem !important;
}
</style>
