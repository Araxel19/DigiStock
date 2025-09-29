<template>
  <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Inventario Digital</h2>
          <p class="text-gray-600">Gestiona todos los productos digitalizados</p>
        </div>
        <router-link
          to="/upload"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Nueva Planilla
        </router-link>
      </div>
    </div>

    <!-- Success Message -->
    <div v-if="successMessage" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
      <div class="flex">
        <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        <div class="ml-3">
          <p class="text-sm text-green-600">{{ successMessage }}</p>
        </div>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="bg-white rounded-xl shadow-soft p-6 mb-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div class="flex-1 max-w-lg">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              v-model="searchQuery"
              @input="debouncedSearch"
              type="text"
              placeholder="Buscar por código o nombre..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <select
            v-model="selectedCategory"
            @change="filterProducts"
            class="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Todas las categorías</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <button
            @click="refreshProducts"
            :disabled="loading"
            class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            <svg class="w-4 h-4 mr-1" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Actualizar
          </button>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div v-if="loading && products.length === 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="n in 6" :key="n" class="bg-white rounded-xl shadow-soft p-6 animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div class="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div class="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    </div>

    <div v-else-if="filteredProducts.length === 0 && !loading" class="bg-white rounded-xl shadow-soft p-12 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No hay productos</h3>
      <p class="mt-1 text-sm text-gray-500">Comienza subiendo tu primera planilla de inventario</p>
      <div class="mt-6">
        <router-link
          to="/upload"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Subir Planilla
        </router-link>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="bg-white rounded-xl shadow-soft hover:shadow-lg transition-all duration-200 overflow-hidden"
      >
        <div class="p-6">
          <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-1">{{ product.name }}</h3>
              <p class="text-sm text-gray-500 font-mono">{{ product.code }}</p>
            </div>
          </div>

          <div v-if="product.description" class="mb-4">
            <p class="text-sm text-gray-600 line-clamp-2">{{ product.description }}</p>
          </div>

          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p class="text-xs text-gray-500 uppercase tracking-wide">Precio</p>
              <p class="text-lg font-semibold text-gray-900">
                ${{ formatPrice(product.price) }}
              </p>
            </div>
          </div>

          <div v-if="product.category || product.location" class="mb-4 space-y-1">
            <div v-if="product.category" class="flex items-center text-xs text-gray-500">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
              {{ product.category.name }}
            </div>
            <div v-if="product.location" class="flex items-center text-xs text-gray-500">
              <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              {{ product.location.name }}
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-gray-100">
            <span class="text-xs text-gray-400">
              {{ formatDate(product.createdAt) }}
            </span>
            <div class="flex space-x-2">
              <button
                @click="editProduct(product)"
                class="text-primary-600 hover:text-primary-800 text-sm font-medium transition-colors"
              >
                Editar
              </button>
              <button
                @click="viewProduct(product)"
                class="text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors"
              >
                Ver
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Load More Button -->
    <div v-if="hasMore && !loading" class="mt-8 text-center">
      <button
        @click="loadMore"
        class="inline-flex items-center px-6 py-3 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
      >
        Cargar más productos
      </button>
    </div>

    <!-- Product View Modal -->
    <div v-if="isViewModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <h3 class="text-lg leading-6 font-medium text-gray-900">Detalles del Producto</h3>
          <div v-if="selectedProduct" class="mt-2 px-7 py-3 text-left">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><strong>ID:</strong> {{ selectedProduct.id }}</div>
              <div><strong>Código:</strong> {{ selectedProduct.code }}</div>
              <div><strong>Nombre:</strong> {{ selectedProduct.name }}</div>
              <div><strong>Precio:</strong> ${{ formatPrice(selectedProduct.price) }}</div>
              <div class="md:col-span-2"><strong>Descripción:</strong> {{ selectedProduct.description || 'N/A' }}</div>
              <div><strong>Categoría:</strong> {{ selectedProduct.category?.name || 'N/A' }}</div>
              <div><strong>Ubicación:</strong> {{ selectedProduct.location?.name || 'N/A' }}</div>
              <div><strong>Creado:</strong> {{ formatDate(selectedProduct.createdAt) }}</div>
              <div><strong>Actualizado:</strong> {{ formatDate(selectedProduct.updatedAt) }}</div>
            </div>
          </div>
          <div class="items-center px-4 py-3">
            <button
              @click="closeModal"
              class="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Product Edit Modal -->
    <div v-if="isEditModalOpen" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
        <form @submit.prevent="saveProduct" class="mt-3">
          <h3 class="text-lg leading-6 font-medium text-gray-900 text-center mb-4">Editar Producto</h3>
          <div v-if="productToEdit" class="space-y-4">
            <div>
              <label for="edit-name" class="block text-sm font-medium text-gray-700">Nombre</label>
              <input type="text" id="edit-name" v-model="productToEdit.name" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            </div>
            <div>
              <label for="edit-code" class="block text-sm font-medium text-gray-700">Código</label>
              <input type="text" id="edit-code" v-model="productToEdit.code" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            </div>
            <div>
              <label for="edit-description" class="block text-sm font-medium text-gray-700">Descripción</label>
              <textarea id="edit-description" v-model="productToEdit.description" rows="3" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"></textarea>
            </div>
            <div>
              <label for="edit-price" class="block text-sm font-medium text-gray-700">Precio</label>
              <input type="number" id="edit-price" v-model.number="productToEdit.price" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            </div>
          </div>
          <div class="items-center px-4 py-3 mt-4 flex justify-end space-x-2 bg-gray-50 -mx-5 -mb-5 rounded-b-md">
            <button
              type="button"
              @click="closeEditModal"
              class="px-4 py-2 bg-white text-gray-700 text-base font-medium rounded-md shadow-sm border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-primary-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useInventoryStore } from '@/store/inventory'
import type { Product, Category } from '@/types/inventory'

const route = useRoute()
const inventoryStore = useInventoryStore()

// Reactive data
const searchQuery = ref('')
const selectedCategory = ref('')
const loading = ref(false)
const hasMore = ref(false)
const successMessage = ref('')

// View Modal State
const selectedProduct = ref<Product | null>(null)
const isViewModalOpen = ref(false)

// Edit Modal State
const productToEdit = ref<Partial<Product> | null>(null)
const isEditModalOpen = ref(false)

// Computed
const products = computed(() => inventoryStore.products)
const categories = computed(() => {
  const cats = products.value.map((p:any) => p.category).filter(Boolean) as Category[];
  const uniqueCategories = cats.reduce((acc, cat) => {
    if (!acc.find(c => c.id === cat.id)) {
      acc.push(cat);
    }
    return acc;
  }, [] as Category[]);
  return uniqueCategories;
})

const filteredProducts = computed(() => {
  let filtered = products.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter((product:any) =>
      product.name.toLowerCase().includes(query) ||
      product.code.toLowerCase().includes(query)
    )
  }

  if (selectedCategory.value) {
    filtered = filtered.filter((product:any) => product.category?.id === selectedCategory.value)
  }

  return filtered
})

// Methods
const refreshProducts = async () => {
  loading.value = true
  try {
    await inventoryStore.fetchProducts()
  } finally {
    loading.value = false
  }
}

const filterProducts = () => {
  // Trigger reactivity
}

const debouncedSearch = debounce(() => {
  // Search is handled by computed property
}, 300)

const loadMore = async () => {
  // Implement pagination if needed
}

// View Modal Methods
const viewProduct = (product: Product) => {
  selectedProduct.value = product;
  isViewModalOpen.value = true;
  console.log('View product:', product)
}

const closeModal = () => {
  isViewModalOpen.value = false;
  selectedProduct.value = null;
}

// Edit Modal Methods
const editProduct = (product: Product) => {
  // Create a deep copy to avoid editing the original object directly
  productToEdit.value = JSON.parse(JSON.stringify(product));
  isEditModalOpen.value = true;
  console.log('Edit product:', product)
}

const closeEditModal = () => {
  isEditModalOpen.value = false;
  productToEdit.value = null;
}

const saveProduct = async () => {
  if (!productToEdit.value || !productToEdit.value.id) return;

  // Create a DTO-compliant payload
  const payload: Partial<Product> = {
    name: productToEdit.value.name,
    code: productToEdit.value.code,
    description: productToEdit.value.description,
    price: productToEdit.value.price,
  };

  try {
    await inventoryStore.updateProduct(productToEdit.value.id, payload);
    closeEditModal();
    // The store action already updates the local state, so a full refresh might not be needed
    // await refreshProducts(); 
    successMessage.value = 'Producto actualizado con éxito.';
    setTimeout(() => successMessage.value = '', 5000);
  } catch (error) {
    console.error('Error updating product:', error);
    // Optionally, show an error message to the user
  }
}

// Utility functions
const formatPrice = (price: number): string => {
  if (typeof price !== 'number') return '0.00';
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(price)
}

const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Lifecycle
onMounted(async () => {
  // Check for success message
  if (route.query.success) {
    successMessage.value = route.query.success as string
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  }

  // Load products
  await refreshProducts()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
