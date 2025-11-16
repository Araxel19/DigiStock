<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 px-4 sm:px-6 lg:px-8">
    <!-- Grid de fondo -->
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto relative">
      <!-- Header -->
      <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <div class="flex items-center space-x-3 mb-2">
              <div class="p-2 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                <svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
              <h2 class="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Inventario Digital
              </h2>
            </div>
            <p class="text-cyan-300/70 ml-11">Gestiona todos los productos digitalizados</p>
          </div>
          <router-link
            to="/upload"
            class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-500/50 transition-all transform hover:scale-105"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Nueva Planilla
          </router-link>
        </div>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg backdrop-blur-sm animate-fade-in">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-green-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <p class="text-sm text-green-300">{{ successMessage }}</p>
        </div>
      </div>

      <!-- Search and Filters -->
      <div class="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-lg p-6 mb-6">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 gap-4">
          <!-- Search Bar -->
          <div class="flex-1 max-w-xl">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <input
                v-model="searchQuery"
                @input="debouncedSearch"
                type="text"
                placeholder="Buscar por código o nombre..."
                class="block w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <!-- Filters and Actions -->
          <div class="flex flex-wrap items-center gap-3">
            <!-- Category Filter -->
            <select
              v-model="selectedCategory"
              @change="filterProducts"
              class="px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
            >
              <option value="">Todas las categorías</option>
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>

            <!-- Refresh Button -->
            <button
              @click="refreshProducts"
              :disabled="loading"
              class="inline-flex items-center px-4 py-3 border border-cyan-500/30 text-sm font-medium rounded-lg text-cyan-300 bg-slate-900/50 hover:bg-slate-700/50 disabled:opacity-50 transition-all"
            >
              <svg class="w-5 h-5 mr-2" :class="{ 'animate-spin': loading }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              Actualizar
            </button>

            <!-- Export Excel -->
            <button
              @click="exportToExcel"
              class="inline-flex items-center px-4 py-3 border border-green-500/30 text-sm font-medium rounded-lg text-green-300 bg-slate-900/50 hover:bg-slate-700/50 transition-all"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Excel
            </button>

            <!-- Export PDF -->
            <button
              @click="exportToPDF"
              class="inline-flex items-center px-4 py-3 border border-red-500/30 text-sm font-medium rounded-lg text-red-300 bg-slate-900/50 hover:bg-slate-700/50 transition-all"
            >
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
              PDF
            </button>
          </div>
        </div>
      </div>

      <!-- Stats Bar -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-4">
          <p class="text-cyan-300/70 text-xs mb-1">Total Productos</p>
          <p class="text-2xl font-bold text-white">{{ products.length }}</p>
        </div>
        <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-4">
          <p class="text-cyan-300/70 text-xs mb-1">Mostrando</p>
          <p class="text-2xl font-bold text-white">{{ filteredProducts.length }}</p>
        </div>
        <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-4">
          <p class="text-cyan-300/70 text-xs mb-1">Categorías</p>
          <p class="text-2xl font-bold text-white">{{ categories.length }}</p>
        </div>
        <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-4">
          <p class="text-cyan-300/70 text-xs mb-1">Valor Total</p>
          <p class="text-2xl font-bold text-white">${{ totalValue }}</p>
        </div>
      </div>

      <!-- Loading Skeleton -->
      <div v-if="loading && products.length === 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 6" :key="n" class="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-6 animate-pulse">
          <div class="h-4 bg-slate-700 rounded w-3/4 mb-4"></div>
          <div class="h-3 bg-slate-700 rounded w-1/2 mb-2"></div>
          <div class="h-3 bg-slate-700 rounded w-2/3"></div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredProducts.length === 0 && !loading" class="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-12 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 mb-4">
          <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
          </svg>
        </div>
        <h3 class="text-xl font-bold text-white mb-2">No hay productos</h3>
        <p class="text-cyan-300/70 mb-6">Comienza subiendo tu primera planilla de inventario</p>
        <router-link
          to="/upload"
          class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-lg shadow-cyan-500/50 transition-all"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
          Subir Planilla
        </router-link>
      </div>

      <!-- Products Grid -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="group bg-slate-800/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 overflow-hidden"
        >
          <!-- Product Header with Gradient -->
          <div class="relative h-24 bg-gradient-to-br from-cyan-600/20 via-blue-600/20 to-purple-600/20 overflow-hidden">
            <div class="absolute inset-0 opacity-50">
              <div class="absolute top-2 left-4 w-16 h-16 bg-cyan-500 rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
              <div class="absolute bottom-2 right-4 w-20 h-20 bg-blue-500 rounded-full mix-blend-overlay filter blur-xl animate-pulse" style="animation-delay: 0.5s;"></div>
            </div>
            <div class="relative p-4 flex items-center justify-between">
              <span class="px-3 py-1 text-xs font-semibold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-sm">
                {{ product.code }}
              </span>
              <div class="flex space-x-1">
                <button
                  @click="viewProduct(product)"
                  class="p-2 rounded-lg bg-slate-900/50 text-cyan-400 hover:bg-slate-700/50 hover:text-cyan-300 transition-all"
                  title="Ver detalles"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                </button>
                <button
                  @click="editProduct(product)"
                  class="p-2 rounded-lg bg-slate-900/50 text-blue-400 hover:bg-slate-700/50 hover:text-blue-300 transition-all"
                  title="Editar"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Product Content -->
          <div class="p-6">
            <h3 class="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
              {{ product.name }}
            </h3>

            <p v-if="product.description" class="text-sm text-cyan-300/60 mb-4 line-clamp-2">
              {{ product.description }}
            </p>

            <!-- Price and Quantity -->
            <div class="grid grid-cols-2 gap-4 mb-4 p-4 bg-slate-900/30 rounded-lg border border-slate-700/50">
              <div>
                <p class="text-xs text-cyan-300/50 uppercase tracking-wide mb-1">Precio</p>
                <p class="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  ${{ formatPrice(product.price) }}
                </p>
              </div>
              <div>
                <p class="text-xs text-cyan-300/50 uppercase tracking-wide mb-1">Stock</p>
                <p class="text-xl font-bold text-white">
                  {{ product.cantidad }}
                </p>
              </div>
            </div>

            <!-- Category and Location -->
            <div class="space-y-2 mb-4">
              <div v-if="product.category" class="flex items-center text-xs">
                <div class="p-1.5 rounded bg-purple-500/20 border border-purple-500/30 mr-2">
                  <svg class="w-3 h-3 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                  </svg>
                </div>
                <span class="text-purple-300">{{ product.category.name }}</span>
              </div>
              <div v-if="product.location" class="flex items-center text-xs">
                <div class="p-1.5 rounded bg-blue-500/20 border border-blue-500/30 mr-2">
                  <svg class="w-3 h-3 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <span class="text-blue-300">{{ product.location.name }}</span>
              </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between pt-4 border-t border-slate-700/50">
              <span class="text-xs text-slate-500 flex items-center">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {{ formatDate(product.createdAt) }}
              </span>
              <span class="px-2 py-1 text-xs font-medium rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                ID: {{ product.id }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMore && !loading" class="mt-8 text-center">
        <button
          @click="loadMore"
          class="inline-flex items-center px-8 py-4 border border-cyan-500/30 text-sm font-medium rounded-lg text-cyan-300 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-xl transition-all"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
          Cargar más productos
        </button>
      </div>

      <!-- Product View Modal -->
      <div v-if="isViewModalOpen" class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
        <div class="relative w-full max-w-3xl bg-slate-800/90 backdrop-blur-xl border border-cyan-500/30 shadow-2xl rounded-2xl animate-fade-in">
          <!-- Modal Header -->
          <div class="relative h-32 bg-gradient-to-r from-cyan-600/30 via-blue-600/30 to-purple-600/30 rounded-t-2xl overflow-hidden">
            <div class="absolute inset-0 opacity-30">
              <div class="absolute top-4 left-10 w-20 h-20 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
              <div class="absolute bottom-4 right-10 w-24 h-24 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse" style="animation-delay: 0.5s;"></div>
            </div>
            <div class="relative p-8">
              <h3 class="text-2xl font-bold text-white">Detalles del Producto</h3>
              <p class="text-cyan-300/70 text-sm">Información completa</p>
            </div>
            <button
              @click="closeModal"
              class="absolute top-4 right-4 p-2 rounded-lg bg-slate-900/50 text-white hover:bg-slate-700/50 transition-all"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Modal Content -->
          <div v-if="selectedProduct" class="p-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="text-xs text-cyan-300/70 uppercase tracking-wide">ID del Producto</label>
                  <p class="text-white font-medium mt-1">{{ selectedProduct.id }}</p>
                </div>
                <div>
                  <label class="text-xs text-cyan-300/70 uppercase tracking-wide">Código</label>
                  <p class="text-white font-medium mt-1 font-mono">{{ selectedProduct.code }}</p>
                </div>
                <div>
                  <label class="text-xs text-cyan-300/70 uppercase tracking-wide">Nombre</label>
                  <p class="text-white font-medium mt-1">{{ selectedProduct.name }}</p>
                </div>
                <div>
                  <label class="text-xs text-cyan-300/70 uppercase tracking-wide">Precio</label>
                  <p class="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mt-1">
                    ${{ formatPrice(selectedProduct.price) }}
                  </p>
                </div>
                <div>
                  <label class="text-xs text-cyan-300/70 uppercase tracking-wide">Cantidad en Stock</label>
                  <p class="text-white font-medium mt-1">{{ selectedProduct.cantidad }} unidades</p>
                </div>
              </div>
              
              <div class="space-y-4">
                <div>
                  <label class="text-xs text-cyan-300/70 uppercase tracking-wide">Descripción</label>
                  <p class="text-white mt-1">{{ selectedProduct.description || 'N/A' }}</p>
                </div>
                <div>
                  <label class="text-xs text-cyan-300/70 uppercase tracking-wide">Categoría</label>
                  <p class="text-white font-medium mt-1">{{ selectedProduct.category?.name || 'N/A' }}</p>
                </div>
                <div>
                  <label class="text-xs text-cyan-300/70 uppercase tracking-wide">Ubicación</label>
                  <p class="text-white font-medium mt-1">{{ selectedProduct.location?.name || 'N/A' }}</p>
                </div>
                <div>
                  <label class="text-xs text-cyan-300/70 uppercase tracking-wide">Fecha de Creación</label>
                  <p class="text-white font-medium mt-1">{{ formatDate(selectedProduct.createdAt) }}</p>
                </div>
                <div>
                  <label class="text-xs text-cyan-300/70 uppercase tracking-wide">Última Actualización</label>
                  <p class="text-white font-medium mt-1">{{ formatDate(selectedProduct.updatedAt) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="p-6 border-t border-cyan-500/20 flex justify-end">
            <button
              @click="closeModal"
              class="px-6 py-3 bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-600 transition-all"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>

      <!-- Product Edit Modal -->
      <div v-if="isEditModalOpen" class="fixed inset-0 bg-slate-900/80 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
        <div class="relative w-full max-w-2xl bg-slate-800/90 backdrop-blur-xl border border-cyan-500/30 shadow-2xl rounded-2xl animate-fade-in">
          <!-- Modal Header -->
          <div class="relative h-32 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 rounded-t-2xl overflow-hidden">
            <div class="absolute inset-0 opacity-30">
              <div class="absolute top-4 left-10 w-20 h-20 bg-white rounded-full mix-blend-overlay filter blur-xl animate-pulse"></div>
            </div>
            <div class="relative p-8">
              <h3 class="text-2xl font-bold text-white">Editar Producto</h3>
              <p class="text-cyan-300/70 text-sm">Modifica la información del producto</p>
            </div>
            <button
              @click="closeEditModal"
              class="absolute top-4 right-4 p-2 rounded-lg bg-slate-900/50 text-white hover:bg-slate-700/50 transition-all"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <!-- Edit Form -->
          <form @submit.prevent="saveProduct" class="p-8">
            <div v-if="productToEdit" class="space-y-6">
              <div>
                <label for="edit-name" class="block text-sm font-semibold text-cyan-300 mb-2">Nombre del Producto</label>
                <input 
                  type="text" 
                  id="edit-name" 
                  v-model="productToEdit.name" 
                  class="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Ingresa el nombre"
                />
              </div>

              <div>
                <label for="edit-code" class="block text-sm font-semibold text-cyan-300 mb-2">Código</label>
                <input 
                  type="text" 
                  id="edit-code" 
                  v-model="productToEdit.code" 
                  class="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 font-mono focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Código del producto"
                />
              </div>

              <div>
                <label for="edit-description" class="block text-sm font-semibold text-cyan-300 mb-2">Descripción</label>
                <textarea 
                  id="edit-description" 
                  v-model="productToEdit.description" 
                  rows="3" 
                  class="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all resize-none"
                  placeholder="Descripción del producto"
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label for="edit-price" class="block text-sm font-semibold text-cyan-300 mb-2">Precio</label>
                  <div class="relative">
                    <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span class="text-green-400">$</span>
                    </div>
                    <input 
                      type="number" 
                      step="0.01" 
                      id="edit-price" 
                      v-model.number="productToEdit.price" 
                      class="w-full pl-8 pr-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div>
                  <label for="edit-cantidad" class="block text-sm font-semibold text-cyan-300 mb-2">Cantidad</label>
                  <input 
                    type="number" 
                    id="edit-cantidad" 
                    v-model.number="productToEdit.cantidad" 
                    class="w-full px-4 py-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex justify-end space-x-3 mt-8 pt-6 border-t border-cyan-500/20">
              <button
                type="button"
                @click="closeEditModal"
                class="px-6 py-3 bg-slate-700 text-white text-sm font-medium rounded-lg hover:bg-slate-600 transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-sm font-medium rounded-lg shadow-lg shadow-cyan-500/50 hover:from-cyan-500 hover:to-blue-500 transition-all"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useInventoryStore } from '@/store/inventory'
import type { Product, Category } from '@/types/inventory'
import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

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

const totalValue = computed(() => {
  const total = products.value.reduce((sum, product: any) => {
    return sum + (product.price * product.cantidad)
  }, 0)
  return formatPrice(total)
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
}

const closeModal = () => {
  isViewModalOpen.value = false;
  selectedProduct.value = null;
}

// Edit Modal Methods
const editProduct = (product: Product) => {
  productToEdit.value = JSON.parse(JSON.stringify(product));
  isEditModalOpen.value = true;
}

const closeEditModal = () => {
  isEditModalOpen.value = false;
  productToEdit.value = null;
}

const saveProduct = async () => {
  if (!productToEdit.value || !productToEdit.value.id) return;

  const payload: Partial<Product> = {
    name: productToEdit.value.name,
    code: productToEdit.value.code,
    description: productToEdit.value.description,
    price: productToEdit.value.price,
    cantidad: productToEdit.value.cantidad,
  };

  try {
    await inventoryStore.updateProduct(productToEdit.value.id, payload);
    closeEditModal();
    successMessage.value = 'Producto actualizado con éxito.';
    setTimeout(() => successMessage.value = '', 5000);
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

// Utility functions
const formatPrice = (price: number | string): string => {
  const numericPrice = Number(price);
  if (isNaN(numericPrice)) return '0.00';

  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericPrice);
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

const exportToExcel = () => {
  const data = filteredProducts.value.map(p => ({
    Código: p.code,
    Nombre: p.name,
    Descripción: p.description || '',
    Precio: p.price,
    Cantidad: p.cantidad,
    Categoría: p.category?.name || '',
    Ubicación: p.location?.name || '',
    'Creado en': formatDate(p.createdAt),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventario');

  XLSX.writeFile(workbook, 'inventario.xlsx');
};

const exportToPDF = () => {
  const doc = new jsPDF();

  autoTable(doc, {
    head: [['Código', 'Nombre', 'Precio', 'Cantidad', 'Categoría', 'Ubicación']],
    body: filteredProducts.value.map(p => [
      p.code,
      p.name,
      p.price,
      p.cantidad,
      p.category?.name || '',
      p.location?.name || '',
    ]),
    styles: { fontSize: 8 },
  });

  doc.save('inventario.pdf');
};

// Lifecycle
onMounted(async () => {
  if (route.query.success) {
    successMessage.value = route.query.success as string
    setTimeout(() => {
      successMessage.value = ''
    }, 5000)
  }

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

@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>