import { defineStore } from 'pinia'
import { ref } from 'vue'
import { inventoryService } from '@/services/inventory.service'
import type { Product, Planilla } from '@/types/inventory'

export const useInventoryStore = defineStore('inventory', () => {
  const products = ref<Product[]>([])
  const planillas = ref<Planilla[]>([])
  const loading = ref(false)

  const fetchProducts = async (search?: string) => {
    loading.value = true
    try {
      const response = await inventoryService.getProducts(search)
      products.value = response
    } finally {
      loading.value = false
    }
  }

  const fetchPlanillas = async () => {
    loading.value = true
    try {
      const response = await inventoryService.getPlanillas()
      planillas.value = response
    } finally {
      loading.value = false
    }
  }

  const uploadPlanilla = async (file: File) => {
    loading.value = true
    try {
      const response = await inventoryService.uploadPlanilla(file)
      await fetchPlanillas() // Refresh list
      return response
    } finally {
      loading.value = false
    }
  }

  const updateProduct = async (id: string, data: Partial<Product>) => {
    loading.value = true;
    try {
      const updatedProduct = await inventoryService.updateProduct(id, data);
      const index = products.value.findIndex(p => p.id === id);
      if (index !== -1) {
        products.value[index] = updatedProduct;
      }
      return updatedProduct;
    } finally {
      loading.value = false;
    }
  };

  return {
    products,
    planillas,
    loading,
    fetchProducts,
    fetchPlanillas,
    uploadPlanilla,
    updateProduct,
  }
})