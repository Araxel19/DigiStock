<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <!-- Header con efecto de circuito -->
    <div class="relative overflow-hidden bg-gradient-to-r from-slate-900 via-[#0f2f55] to-slate-900 border-b border-cyan-500/20">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50"></div>
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative">
        <div class="flex items-center space-x-3 mb-2">
          <div class="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/50">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Dashboard
          </h2>
        </div>
        <p class="text-cyan-300/70 ml-13">
          {{ authStore.user?.isSuperAdmin ? 'Resumen global del sistema' : 'Panel de control del inventario electrónico' }}
        </p>
      </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="isLoading" class="absolute inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div class="flex flex-col items-center space-y-4">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          <div class="absolute inset-0 w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
        </div>
        <span class="text-cyan-300 font-medium">Cargando datos del sistema...</span>
      </div>
    </div>

    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 relative">
      <!-- Super Admin View -->
      <div v-if="authStore.user?.isSuperAdmin">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-cyan-300/70 mb-1">Total Organizaciones</p>
                <p class="text-3xl font-bold text-white">{{ superAdminStats.totalOrganizations }}</p>
              </div>
              <div class="p-3 rounded-lg bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-sky-500/30">
                <svg class="w-8 h-8 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 flex items-center text-xs text-green-400">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
              <span>Sistema activo</span>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-blue-500/20 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/30 transition-all">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-blue-300/70 mb-1">Total Usuarios</p>
                <p class="text-3xl font-bold text-white">{{ superAdminStats.totalUsers }}</p>
              </div>
              <div class="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30">
                <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 flex items-center text-xs text-green-400">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
              <span>Usuarios registrados</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <router-link
            to="/organizations"
            class="group bg-slate-800/50 backdrop-blur-xl p-8 rounded-xl border border-cyan-500/20 shadow-lg hover:shadow-cyan-500/30 hover:border-cyan-500/40 transition-all relative overflow-hidden"
          >
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <div class="relative flex items-center">
              <div class="p-4 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-sky-500/30 group-hover:scale-110 transition-transform">
                <svg class="w-10 h-10 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <div class="ml-6">
                <h3 class="text-xl font-bold text-white mb-1">Gestionar Organizaciones</h3>
                <p class="text-cyan-300/70">Administrar organizaciones del sistema</p>
              </div>
              <svg class="w-6 h-6 text-cyan-400 ml-auto group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </router-link>

          <router-link
            to="/users"
            class="group bg-slate-800/50 backdrop-blur-xl p-8 rounded-xl border border-blue-500/20 shadow-lg hover:shadow-blue-500/30 hover:border-blue-500/40 transition-all relative overflow-hidden"
          >
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <div class="relative flex items-center">
              <div class="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 group-hover:scale-110 transition-transform">
                <svg class="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <div class="ml-6">
                <h3 class="text-xl font-bold text-white mb-1">Gestionar Usuarios</h3>
                <p class="text-cyan-300/70">Crear, editar y eliminar usuarios</p>
              </div>
              <svg class="w-6 h-6 text-cyan-400 ml-auto group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Organization User View -->
      <div v-else>
        <!-- Stats Cards with Mini Charts -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all group">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-sm font-medium text-cyan-300/70 mb-1">Total Productos</p>
                <p class="text-3xl font-bold text-white">{{ stats.totalProducts }}</p>
              </div>
              <div class="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                </svg>
              </div>
            </div>
            <div class="h-12 flex items-end space-x-1">
              <div v-for="i in 7" :key="i" class="flex-1 bg-gradient-to-t from-cyan-500/50 to-cyan-500/20 rounded-t" :style="{height: Math.random() * 100 + '%'}"></div>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/30 transition-all group">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-sm font-medium text-purple-300/70 mb-1">Planillas Procesadas</p>
                <p class="text-3xl font-bold text-white">{{ stats.processedPlanillas }}</p>
              </div>
              <div class="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
            </div>
            <div class="flex items-center text-xs text-green-400">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
              <span>Completadas exitosamente</span>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-yellow-500/20 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/30 transition-all group">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-sm font-medium text-yellow-300/70 mb-1">Planillas Pendientes</p>
                <p class="text-3xl font-bold text-white">{{ stats.pendingPlanillas }}</p>
              </div>
              <div class="p-3 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="flex items-center text-xs text-yellow-400">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              <span>Requiere validación</span>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-green-500/20 shadow-lg shadow-green-500/10 hover:shadow-green-500/30 transition-all group">
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-sm font-medium text-green-300/70 mb-1">Éxito OCR</p>
                <p class="text-3xl font-bold text-white">{{ stats.ocrSuccessRate }}%</p>
              </div>
              <div class="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="relative h-2 bg-slate-700 rounded-full overflow-hidden">
              <div class="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" :style="{width: stats.ocrSuccessRate + '%'}"></div>
            </div>
          </div>
        </div>

        <!-- Quick Actions Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <router-link
            v-if="canPerformAction('Subir Planilla')"
            to="/upload"
            class="group bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 shadow-lg hover:shadow-cyan-500/30 hover:border-cyan-500/40 transition-all relative overflow-hidden"
          >
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <div class="relative">
              <div class="p-4 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 w-fit mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Subir Planilla</h3>
              <p class="text-cyan-300/70 text-sm mb-4">Digitalizar nueva planilla de inventario</p>
              <div class="flex items-center text-cyan-400 text-sm group-hover:translate-x-2 transition-transform">
                <span>Acceder</span>
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </router-link>

          <router-link
            v-if="canPerformAction('Ver Inventario')"
            to="/inventory"
            class="group bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-purple-500/20 shadow-lg hover:shadow-purple-500/30 hover:border-purple-500/40 transition-all relative overflow-hidden"
          >
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <div class="relative">
              <div class="p-4 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 w-fit mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Ver Inventario</h3>
              <p class="text-cyan-300/70 text-sm mb-4">Consultar productos digitalizados</p>
              <div class="flex items-center text-purple-400 text-sm group-hover:translate-x-2 transition-transform">
                <span>Acceder</span>
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </router-link>

          <router-link
            v-if="canPerformAction('Gestionar Usuarios')"
            to="/users"
            class="group bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-blue-500/20 shadow-lg hover:shadow-blue-500/30 hover:border-blue-500/40 transition-all relative overflow-hidden"
          >
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <div class="relative">
              <div class="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 w-fit mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              </div>
              <h3 class="text-lg font-bold text-white mb-2">Gestionar Usuarios</h3>
              <p class="text-cyan-300/70 text-sm mb-4">Crear, editar y eliminar usuarios</p>
              <div class="flex items-center text-blue-400 text-sm group-hover:translate-x-2 transition-transform">
                <span>Acceder</span>
                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </router-link>
        </div>

        <!-- Planillas Pendientes Table -->
        <div v-if="pendingPlanillas.length > 0" class="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-lg mb-8">
          <div class="p-6 border-b border-cyan-500/20">
            <div class="flex items-center">
              <svg class="w-6 h-6 text-yellow-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              <h3 class="text-xl font-bold text-white">Planillas Pendientes de Validación</h3>
            </div>
          </div>
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-cyan-500/20">
                    <th class="text-left py-3 px-4 text-sm font-semibold text-cyan-300">Archivo</th>
                    <th class="text-left py-3 px-4 text-sm font-semibold text-cyan-300">Fecha de Carga</th>
                    <th class="text-left py-3 px-4 text-sm font-semibold text-cyan-300">Estado</th>
                    <th class="text-right py-3 px-4 text-sm font-semibold text-cyan-300">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="planilla in pendingPlanillas" :key="planilla.id" class="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td class="py-4 px-4 text-white">{{ planilla.fileName }}</td>
                    <td class="py-4 px-4 text-cyan-300/70">{{ new Date(planilla.uploadedAt).toLocaleString() }}</td>
                    <td class="py-4 px-4">
                      <span class="px-3 py-1 text-xs font-semibold rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                        {{ planilla.status }}
                      </span>
                    </td>
                    <td class="py-4 px-4 text-right">
                      <router-link 
                        :to="{ name: 'ValidarPlanilla', params: { id: planilla.id } }" 
                        class="inline-flex items-center px-4 py-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition-all"
                      >
                        Validar
                        <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Actividad Reciente -->
        <div class="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-lg">
          <div class="p-6 border-b border-cyan-500/20">
            <div class="flex items-center">
              <svg class="w-6 h-6 text-cyan-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <h3 class="text-xl font-bold text-white">Actividad Reciente</h3>
            </div>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="activity in recentActivity" :key="activity.id" class="flex items-start space-x-4 p-4 rounded-lg bg-slate-700/30 border border-slate-600/30 hover:border-cyan-500/30 transition-all group">
                <div class="flex-shrink-0">
                  <div class="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform" 
                    :class="{ 
                      'bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30': activity.type === 'planilla', 
                      'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30': activity.type === 'product' 
                    }">
                    <svg v-if="activity.type === 'planilla'" class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <svg v-else-if="activity.type === 'product'" class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                    </svg>
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-base font-semibold text-white mb-1">{{ activity.title }}</p>
                  <p class="text-sm text-cyan-300/70 truncate">{{ activity.description }}</p>
                </div>
                <div class="flex-shrink-0 text-xs text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full border border-slate-600/30">
                  {{ activity.time }}
                </div>
              </div>
              <div v-if="!isLoading && recentActivity.length === 0" class="text-center py-12">
                <svg class="w-16 h-16 text-slate-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                </svg>
                <p class="text-slate-500">No hay actividad reciente</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { inventoryService } from '@/services/inventory.service'
import { organizationService } from '@/services/organization.service'
import { userService } from '@/services/user.service'
import { Planilla } from '@/types/inventory'

const authStore = useAuthStore()
const isLoading = ref(true)

// Stats for Super Admin
const superAdminStats = ref({
  totalOrganizations: 0,
  totalUsers: 0,
})

// Stats for Organization Users
const stats = ref({
  totalProducts: 0,
  processedPlanillas: 0,
  pendingPlanillas: 0,
  ocrSuccessRate: 0,
})

const recentActivity = ref<any[]>([])
const pendingPlanillas = ref<Planilla[]>([])

const userRoles = computed(() => authStore.user?.roles || [])

const canPerformAction = (action: 'Subir Planilla' | 'Ver Inventario' | 'Gestionar Usuarios') => {
  if (authStore.user?.isSuperAdmin) {
      if (action === 'Gestionar Usuarios') return true;
      return false;
  }

  const roles = userRoles.value
  switch (action) {
    case 'Subir Planilla':
      return roles.includes('supervisor') || roles.includes('data_entry')
    case 'Ver Inventario':
      return roles.includes('org_admin') || roles.includes('supervisor')
    case 'Gestionar Usuarios':
      return roles.includes('org_admin')
    default:
      return false
  }
}

async function loadSuperAdminData() {
  try {
    const orgs = await organizationService.getAll()
    superAdminStats.value.totalOrganizations = orgs.length
    
    const users = await userService.getAll()
    superAdminStats.value.totalUsers = users.length
  } catch (error) {
    console.error("Error fetching data:", error)
  }
  recentActivity.value = []
}

async function loadInventoryData() {
  try {
    let dashboardStats

    // Detectar rol del usuario para decidir qué estadísticas cargar
    if (authStore.user?.roles?.includes('data_entry')) {
      // Estadísticas personalizadas del usuario data_entry
      dashboardStats = await inventoryService.getUserStats()
    } else {
      // Estadísticas globales para org_admin, supervisor y superadmin
      dashboardStats = await inventoryService.getStats()
    }

    stats.value = dashboardStats

    // --- Actividad reciente (planillas + productos) ---
    const recentPlanillas = dashboardStats.recentActivity.planillas.map((p: any) => ({
      id: `p-${p.id}`,
      type: 'planilla',
      title: 'Planilla procesada',
      description: p.fileName || 'Sin nombre',
      time: new Date(p.processedAt || p.uploadedAt).toLocaleString(),
    }))

    const recentProducts = dashboardStats.recentActivity.products?.map((p: any) => ({
      id: `prod-${p.id}`,
      type: 'product',
      title: 'Nuevo producto agregado',
      description: `${p.code} - ${p.name}`,
      time: new Date(p.createdAt).toLocaleString(),
    })) || []

    recentActivity.value = [...recentPlanillas, ...recentProducts]
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
      .slice(0, 5)

    // --- Planillas pendientes (solo si no es data_entry) ---
    if (!authStore.user?.roles?.includes('data_entry')) {
      const planillas = await inventoryService.getPlanillas()
      pendingPlanillas.value = planillas.filter(p => p.status === 'validacion_pendiente')
    } else {
      pendingPlanillas.value = []
    }

  } catch (error) {
    console.error('Error loading inventory data:', error)
    stats.value = { totalProducts: 0, processedPlanillas: 0, pendingPlanillas: 0, ocrSuccessRate: 0 }
    recentActivity.value = []
    pendingPlanillas.value = []
  }
}

async function loadDashboardData() {
  isLoading.value = true
  try {
    // Si es superadmin, usar el dashboard general de superadmin
    if (authStore.user?.isSuperAdmin) {
      await loadSuperAdminData()
    } else {
      await loadInventoryData()
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadDashboardData()
})
</script>