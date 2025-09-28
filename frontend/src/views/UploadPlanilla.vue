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
import { ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { inventoryService } from '@/services/inventory.service';
import { io, Socket } from 'socket.io-client';

const router = useRouter();

// Reactive data
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);
const filePreview = ref<string | null>(null);
const isDragging = ref(false);
const isProcessing = ref(false);
const errorMessage = ref('');
const processingSteps = ref<any[]>([]);

let socket: Socket | null = null;

const triggerFileInput = () => {
  fileInput.value?.click();
};

// File handling
const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  isDragging.value = false;

  const files = e.dataTransfer?.files;
  if (files && files.length > 0) {
    handleFile(files[0]);
  }
};

const handleFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    handleFile(target.files[0]);
  }
};

const handleFile = (file: File) => {
  if (!file.type.startsWith('image/')) {
    errorMessage.value = 'Por favor selecciona un archivo de imagen válido';
    return;
  }

  if (file.size > 10 * 1024 * 1024) { // 10MB
    errorMessage.value = 'El archivo es demasiado grande. Máximo 10MB';
    return;
  }

  selectedFile.value = file;
  errorMessage.value = '';

  // Create preview
  const reader = new FileReader();
  reader.onload = (e) => {
    filePreview.value = e.target?.result as string;
  };
  reader.readAsDataURL(file);
};

const clearFile = () => {
  selectedFile.value = null;
  filePreview.value = null;
  processingSteps.value = [];
  errorMessage.value = '';
};

// OCR Processing
const processFile = async () => {
  if (!selectedFile.value) return;

  isProcessing.value = true;
  errorMessage.value = '';
  processingSteps.value = [];

  try {
    addProcessingStep('Subiendo archivo...', 'Preparando imagen para procesamiento', 'processing');

    const result = await inventoryService.uploadPlanilla(selectedFile.value);
    const planillaId = result.id;

    initWebSocket(planillaId);

  } catch (error: any) {
    errorMessage.value = error.message || 'Error al procesar la planilla';
    addProcessingStep('Error en procesamiento', error.message, 'error');
    isProcessing.value = false;
  }
};

// WebSocket for real-time updates
const initWebSocket = (planillaId: string) => {
  socket = io('http://localhost:3000/ws/progress');

  socket.on('connect', () => {
    console.log('Connected to WebSocket');
    socket?.emit('joinRoom', planillaId);
  });

  socket.on('progress', (data: any) => {
    addProcessingStep(data.message, 'Progreso de OCR', data.status);
    if (data.status === 'validacion_pendiente') {
      isProcessing.value = false;
      router.push({ name: 'ValidarPlanilla', params: { id: planillaId } });
    }
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket');
  });

  socket.on('error', (error: any) => {
    console.error('WebSocket error:', error);
  });
};

const addProcessingStep = (title: string, description: string, status: string) => {
  processingSteps.value.push({
    title,
    description,
    status,
    timestamp: new Date().toLocaleTimeString(),
  });
};

// Utility functions
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Lifecycle
onUnmounted(() => {
  if (socket) {
    socket.disconnect();
  }
});
</script>
