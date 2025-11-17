<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 px-4 sm:px-6 lg:px-8">
    <!-- Grid de fondo -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none"></div>

    <div class="max-w-4xl mx-auto relative">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex items-center space-x-3 mb-3">
          <div class="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
            <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
          </div>
          <div>
            <h2 class="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Subir Planilla de Inventario
            </h2>
            <p class="text-cyan-300/70 mt-1">Digitaliza tu planilla física usando tecnología OCR</p>
          </div>
        </div>
      </div>

      <!-- Upload Area -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 p-8 mb-6">
        <div
          @drop="handleDrop"
          @dragover.prevent="isDragging = true"
          @dragleave.prevent="isDragging = false"
          @dragenter.prevent
          class="border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 relative overflow-hidden"
          :class="isDragging ? 'border-cyan-400 bg-cyan-500/10 scale-105' : 'border-cyan-500/30 hover:border-cyan-500/50'"
        >
          <!-- Animated background when dragging -->
          <div v-if="isDragging" class="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 animate-pulse"></div>
          
          <div v-if="!selectedFile" class="space-y-6 relative z-10">
            <!-- Upload Icon -->
            <div class="relative inline-block">
              <div class="absolute inset-0 bg-cyan-500 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div class="relative w-24 h-24 mx-auto bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-500/30 flex items-center justify-center">
                <svg class="w-12 h-12 text-cyan-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>

            <div>
              <p class="text-xl font-bold text-white mb-2">
                <span v-if="isDragging">Suelta el archivo aquí</span>
                <span v-else>Arrastra tu planilla aquí</span>
              </p>
              <p class="text-cyan-300/70">o haz clic para seleccionar archivo</p>
              <p class="text-sm text-slate-500 mt-2">Formatos soportados: JPG, PNG, PDF (Máx. 10MB)</p>
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
              class="inline-flex items-center px-8 py-4 border-2 border-cyan-500/50 text-sm font-medium rounded-xl text-cyan-300 bg-slate-900/50 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all transform hover:scale-105"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
              </svg>
              Seleccionar Archivo
            </button>
          </div>

          <!-- File Preview -->
          <div v-else class="space-y-6 relative z-10">
            <!-- Preview Image with Tech Frame -->
            <div class="relative inline-block">
              <div class="absolute inset-0 bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-xl blur-xl"></div>
              <div class="relative bg-slate-900/50 p-2 rounded-xl border border-cyan-500/30">
                <img
                  v-if="filePreview"
                  :src="filePreview"
                  alt="Preview"
                  class="max-h-64 rounded-lg shadow-2xl shadow-cyan-500/20"
                />
                <!-- Scanning effect overlay -->
                <div class="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scan pointer-events-none rounded-lg"></div>
              </div>
            </div>

            <!-- File Info Card -->
            <div class="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                  <div class="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
                    <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div class="text-left">
                    <p class="font-semibold text-white">{{ selectedFile.name }}</p>
                    <p class="text-sm text-cyan-300/60">{{ formatFileSize(selectedFile.size) }}</p>
                  </div>
                </div>
                <div class="flex items-center space-x-1 text-green-400">
                  <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span class="text-sm">Listo</span>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                @click="clearFile"
                class="inline-flex items-center justify-center px-6 py-3 border border-slate-600 text-sm font-medium rounded-xl text-slate-300 bg-slate-900/50 hover:bg-slate-700/50 transition-all"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Cambiar Archivo
              </button>
              <button
                @click="processFile"
                :disabled="isProcessing"
                class="inline-flex items-center justify-center px-8 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/50 transition-all transform hover:scale-105"
              >
                <svg v-if="!isProcessing" class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                <span v-if="!isProcessing">Procesar con OCR</span>
                <div v-else class="flex items-center space-x-2">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Procesando...</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Progress Section -->
      <div v-if="isProcessing || processingSteps.length > 0" class="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 p-8 mb-6">
        <div class="flex items-center space-x-3 mb-6">
          <div class="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white">Progreso del Procesamiento</h3>
            <p class="text-cyan-300/70 text-sm">Digitalizando tu planilla con IA</p>
          </div>
        </div>
        
        <div class="space-y-4">
          <div v-for="(step, index) in processingSteps" :key="index" class="group">
            <div class="flex items-start space-x-4 p-4 rounded-lg bg-slate-900/30 border border-slate-700/50 hover:border-cyan-500/30 transition-all">
              <div class="flex-shrink-0 mt-1">
                <!-- Completed -->
                <div v-if="step.status === 'completed'" class="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </div>
                <!-- Processing -->
                <div v-else-if="step.status === 'processing'" class="relative w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-full flex items-center justify-center">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-cyan-400"></div>
                  <div class="absolute inset-0 rounded-full bg-cyan-500/20 animate-ping"></div>
                </div>
                <!-- Pending -->
                <div v-else class="w-10 h-10 bg-slate-700/50 border border-slate-600 rounded-full flex items-center justify-center">
                  <div class="w-3 h-3 bg-slate-500 rounded-full"></div>
                </div>
              </div>
              
              <div class="flex-1 min-w-0">
                <p class="text-base font-semibold text-white mb-1">{{ step.title }}</p>
                <p class="text-sm text-cyan-300/70">{{ step.description }}</p>
              </div>
              
              <div class="flex-shrink-0">
                <span class="text-xs text-slate-500 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700">
                  {{ step.timestamp }}
                </span>
              </div>
            </div>

            <!-- Progress Line -->
            <div v-if="index < processingSteps.length - 1" class="ml-9 my-2">
              <div class="w-0.5 h-4 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
            </div>
          </div>
        </div>

        <!-- Overall Progress Bar -->
        <div v-if="isProcessing" class="mt-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-cyan-300/70">Procesamiento en curso</span>
            <span class="text-sm font-medium text-cyan-400">{{ Math.round((processingSteps.filter(s => s.status === 'completed').length / Math.max(processingSteps.length, 1)) * 100) }}%</span>
          </div>
          <div class="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div 
              class="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500 rounded-full"
              :style="{ width: `${(processingSteps.filter(s => s.status === 'completed').length / Math.max(processingSteps.length, 1)) * 100}%` }"
            >
              <div class="h-full w-full bg-white/20 animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-xl p-6 shadow-lg">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div class="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
          <div class="ml-4 flex-1">
            <h3 class="text-base font-semibold text-red-300 mb-1">Error en el procesamiento</h3>
            <p class="text-sm text-red-400">{{ errorMessage }}</p>
          </div>
          <button @click="errorMessage = ''" class="flex-shrink-0 text-red-400 hover:text-red-300">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div class="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
          <div class="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg border border-cyan-500/30 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
          </div>
          <h4 class="text-white font-semibold mb-2">OCR Inteligente</h4>
          <p class="text-cyan-300/60 text-sm">Reconocimiento óptico de caracteres con IA para máxima precisión</p>
        </div>

        <div class="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
          <div class="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <h4 class="text-white font-semibold mb-2">Validación Manual</h4>
          <p class="text-cyan-300/60 text-sm">Revisa y corrige los datos antes de guardarlos en el sistema</p>
        </div>

        <div class="bg-slate-800/30 backdrop-blur-sm rounded-xl border border-cyan-500/20 p-6">
          <div class="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg border border-green-500/30 flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h4 class="text-white font-semibold mb-2">Digitalización Rápida</h4>
          <p class="text-cyan-300/60 text-sm">Procesa cientos de productos en minutos, no en horas</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToastStore } from '@/composables/useToast';
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
    const { error: showError } = useToastStore();
    showError('Error al procesar planilla');
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

<style scoped>
@keyframes scan {
  0%, 100% {
    transform: translateY(-100%);
  }
  50% {
    transform: translateY(100%);
  }
}

.animate-scan {
  animation: scan 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>