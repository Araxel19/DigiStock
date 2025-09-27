<template>
  <div class="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Subir Planilla de Inventario</h2>
      <p class="text-gray-600">Digitaliza tu planilla física usando tecnología OCR</p>
    </div>

    <!-- Upload Area -->
    <div class="bg-white rounded-xl shadow-soft p-6 mb-6">
      <div
        @drop="handleDrop"
        @dragover.prevent
        @dragenter.prevent
        class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors"
        :class="{ 'border-primary-400 bg-primary-50': isDragging }"
      >
        <div v-if="!selectedFile" class="space-y-4">
          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div>
            <p class="text-lg font-medium text-gray-900">Arrastra tu planilla aquí</p>
            <p class="text-gray-500">o haz clic para seleccionar archivo</p>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileSelect"
            class="hidden"
          />

          <button
            @click="triggerFileInput"
            class="inline-flex items-center px-4 py-2 ..."
          >
            Seleccionar Archivo
          </button>
        </div>

        <!-- File Preview -->
        <div v-else class="space-y-4">
          <div class="flex items-center justify-center">
            <img
              v-if="filePreview"
              :src="filePreview"
              alt="Preview"
              class="max-h-48 rounded-lg shadow-md"
            />
          </div>
          <div class="text-center">
            <p class="font-medium text-gray-900">{{ selectedFile.name }}</p>
            <p class="text-sm text-gray-500">{{ formatFileSize(selectedFile.size) }}</p>
          </div>
          <div class="flex justify-center space-x-3">
            <button
              @click="clearFile"
              class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Cambiar Archivo
            </button>
            <button
              @click="processFile"
              :disabled="isProcessing"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="!isProcessing">Procesar con OCR</span>
              <div v-else class="flex items-center space-x-2">
                <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Procesando...</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Section -->
    <div v-if="isProcessing || processingSteps.length > 0" class="bg-white rounded-xl shadow-soft p-6 mb-6">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">Progreso del Procesamiento</h3>
      
      <div class="space-y-4">
        <div v-for="(step, index) in processingSteps" :key="index" class="flex items-center space-x-3">
          <div class="flex-shrink-0">
            <div v-if="step.status === 'completed'" class="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <div v-else-if="step.status === 'processing'" class="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
              <div class="animate-spin rounded-full h-3 w-3 border-b-2 border-primary-600"></div>
            </div>
            <div v-else class="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
              <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">{{ step.title }}</p>
            <p class="text-sm text-gray-500">{{ step.description }}</p>
          </div>
          <div class="text-xs text-gray-400">{{ step.timestamp }}</div>
        </div>
      </div>
    </div>

    <!-- Results Section -->
    <div v-if="ocrResults" class="bg-white rounded-xl shadow-soft p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">Resultados del OCR</h3>
        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          {{ ocrResults.extractedProducts?.length || 0 }} productos encontrados
        </span>
      </div>

      <!-- Extracted Products -->
      <div v-if="ocrResults.extractedProducts && ocrResults.extractedProducts.length > 0" class="space-y-4">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Código</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cantidad</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(product, index) in ocrResults.extractedProducts" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <input
                    v-model="product.code"
                    class="w-full border-gray-300 rounded-md text-sm"
                    placeholder="Código"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <input
                    v-model="product.name"
                    class="w-full border-gray-300 rounded-md text-sm"
                    placeholder="Nombre del producto"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <input
                    v-model="product.quantity"
                    type="number"
                    class="w-20 border-gray-300 rounded-md text-sm"
                    placeholder="0"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <input
                    v-model="product.price"
                    type="number"
                    step="0.01"
                    class="w-24 border-gray-300 rounded-md text-sm"
                    placeholder="0.00"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    @click="removeProduct(index)"
                    class="text-red-600 hover:text-red-800 transition-colors"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-end space-x-3 pt-4 border-t">
          <button
            @click="addProduct"
            class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Agregar Producto
          </button>
          <button
            @click="saveProducts"
            :disabled="isSaving"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:opacity-50 transition-colors"
          >
            <span v-if="!isSaving">Guardar en Inventario</span>
            <div v-else class="flex items-center space-x-2">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Guardando...</span>
            </div>
          </button>
        </div>
      </div>

      <!-- No products found -->
      <div v-else class="text-center py-8">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <p class="mt-2 text-sm text-gray-500">No se encontraron productos en la planilla</p>
        <p class="text-xs text-gray-400">Intenta con una imagen de mejor calidad</p>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="errorMessage" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
      <div class="flex">
        <svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div class="ml-3">
          <p class="text-sm text-red-600">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { inventoryService } from '@/services/inventory.service'
import { useAuthStore } from '@/store/auth'

const router = useRouter()

// Reactive data
const fileInput = ref<HTMLInputElement | null>(null)
const selectedFile = ref<File | null>(null)
const filePreview = ref<string | null>(null)
const isDragging = ref(false)
const isProcessing = ref(false)
const isSaving = ref(false)
const ocrResults = ref<any>(null)
const errorMessage = ref('')
const processingSteps = ref<any[]>([])

const triggerFileInput = () => {
  fileInput.value?.click()
}

// WebSocket for real-time updates
let websocket: WebSocket | null = null

// File handling
const handleDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  
  const files = e.dataTransfer?.files
  if (files && files.length > 0) {
    handleFile(files[0])
  }
}

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    handleFile(target.files[0])
  }
}

const handleFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    errorMessage.value = 'Por favor selecciona un archivo de imagen válido'
    return
  }

  if (file.size > 10 * 1024 * 1024) { // 10MB
    errorMessage.value = 'El archivo es demasiado grande. Máximo 10MB'
    return
  }

  selectedFile.value = file
  errorMessage.value = ''

  // Create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    filePreview.value = e.target?.result as string
  }
  reader.readAsDataURL(file)
}

const clearFile = () => {
  selectedFile.value = null
  filePreview.value = null
  ocrResults.value = null
  processingSteps.value = []
  errorMessage.value = ''
}

// OCR Processing
const processFile = async () => {
  if (!selectedFile.value) return

  isProcessing.value = true
  errorMessage.value = ''
  processingSteps.value = []

  try {
    // Initialize WebSocket for real-time updates
    initWebSocket()

    // Add initial step
    addProcessingStep('Subiendo archivo...', 'Preparando imagen para procesamiento', 'processing')

    // Upload and process file
    const result = await inventoryService.uploadPlanilla(selectedFile.value)
    
    if (result.success) {
      ocrResults.value = result.data
      addProcessingStep('Procesamiento completado', 'OCR finalizado exitosamente', 'completed')
    } else {
      throw new Error(result.message || 'Error en el procesamiento OCR')
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Error al procesar la planilla'
    addProcessingStep('Error en procesamiento', error.message, 'error')
  } finally {
    isProcessing.value = false
    if (websocket) {
      websocket.close()
    }
  }
}

// WebSocket for real-time updates
const initWebSocket = () => {
  const wsUrl = `ws://localhost:3000/ws/progress`
  websocket = new WebSocket(wsUrl)

  websocket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    
    if (data.type === 'progress') {
      addProcessingStep(data.title, data.description, data.status)
    }
  }

  websocket.onerror = (error) => {
    console.warn('WebSocket error:', error)
  }
}

const addProcessingStep = (title: string, description: string, status: string) => {
  processingSteps.value.push({
    title,
    description,
    status,
    timestamp: new Date().toLocaleTimeString()
  })
}

// Product management
const addProduct = () => {
  if (!ocrResults.value.extractedProducts) {
    ocrResults.value.extractedProducts = []
  }
  
  ocrResults.value.extractedProducts.push({
    code: '',
    name: '',
    quantity: 0,
    price: 0
  })
}

const removeProduct = (index: number) => {
  ocrResults.value.extractedProducts.splice(index, 1)
}

const saveProducts = async () => {
  if (!ocrResults.value?.extractedProducts) return;
  const authStore = useAuthStore();

  if (!authStore.user) {
    errorMessage.value = 'Debe iniciar sesión para guardar productos.';
    isSaving.value = false;
    return;
  }

  isSaving.value = true;
  try {
    for (const product of ocrResults.value.extractedProducts) {
      if (product.code && product.name) {
        await inventoryService.createProduct({
          code: product.code,
          name: product.name,
          price: product.price || 0,
          description: `Importado desde planilla OCR - ${new Date().toLocaleDateString()}`,
          organizationId: authStore.user.organizationId,
        });
      }
    }

    router.push({
      path: '/inventory',
      query: { success: 'Productos guardados exitosamente' },
    });
  } catch (error: any) {
    errorMessage.value = error.message || 'Error al guardar productos';
  } finally {
    isSaving.value = false;
  }
};

// Utility functions
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Lifecycle
onMounted(() => {
  // Setup drag and drop listeners
  document.addEventListener('dragover', (e) => e.preventDefault())
  document.addEventListener('drop', (e) => e.preventDefault())
})

onUnmounted(() => {
  if (websocket) {
    websocket.close()
  }
})
</script>
