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

          <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-indigo-500/20 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/30 transition-all">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-indigo-300/70 mb-1">Costo Total Inventario</p>
                <p class="text-2xl font-bold text-white">{{ formatCurrency(superAdminStats.inventoryCost) }}</p>
              </div>
              <div class="p-3 rounded-lg bg-gradient-to-br from-indigo-500/20 to-blue-500/20 border border-indigo-500/30">
                <svg class="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2v4h6v-4c0-1.105-1.343-2-3-2z"/>
                </svg>
              </div>
            </div>
            <div class="mt-4 text-xs text-cyan-300/70">Valor estimado en base a precio * cantidad</div>
          </div>
          <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-emerald-500/20 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/30 transition-all">
            <div class="flex items-center justify-between">
              <div>
                <div class="flex items-center space-x-2">
                  <p class="text-sm font-medium text-emerald-300/70 mb-1">Rotación Inventario (30d)</p>
                  <button type="button" @click="showTurnoverHelp = true" class="text-cyan-300/60 hover:text-cyan-200 text-xs" title="Ayuda">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
                  </button>
                </div>
                <p class="text-2xl font-bold text-white">{{ formatTurnover(superAdminStats.turnover) }}</p>
                <div class="mt-2 flex items-center space-x-2">
                  <select v-model="selectedTurnoverRange" @change="reloadTurnover" class="bg-slate-700 text-sm text-white px-2 py-1 rounded border border-slate-600">
                    <option value="7d">7d</option>
                    <option value="30d">30d</option>
                    <option value="90d">90d</option>
                  </select>
                  <span v-if="isTurnoverLoading" class="text-xs text-cyan-300">Cargando...</span>
                </div>
              </div>
              <div class="p-3 rounded-lg bg-gradient-to-br from-emerald-500/20 to-lime-500/20 border border-emerald-500/30">
                <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h4l3-8 4 16 3-6h4" />
                </svg>
              </div>
            </div>
            <div class="mt-4 text-xs" :class="turnoverClass(superAdminStats.turnover)">{{ turnoverText(superAdminStats.turnover) }}</div>
          </div>
        </div>

        <!-- Usage Metrics (Super Admin) -->
        <div class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-4">
            <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 shadow-lg">
              <p class="text-sm text-cyan-300/70">DAU (último día)</p>
              <p class="text-2xl font-bold text-white">{{ dau }}</p>
            </div>

            <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 shadow-lg">
              <p class="text-sm text-cyan-300/70">MAU (últimos 30 días)</p>
              <p class="text-2xl font-bold text-white">{{ mau }}</p>
            </div>

            <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 shadow-lg">
              <p class="text-sm text-cyan-300/70">Almacenamiento (MB)</p>
              <p class="text-2xl font-bold text-white">{{ (storageBytes / (1024*1024)).toFixed(2) }}</p>
            </div>

            <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 shadow-lg">
              <p class="text-sm text-cyan-300/70">Planillas / día (últimos {{ selectedTurnoverRange }})</p>
              <div class="mt-3 h-12 flex items-end space-x-1">
                <div v-for="(v, idx) in planillasPerDay" :key="idx" class="flex-1 bg-gradient-to-t from-cyan-500/50 to-cyan-500/20 rounded-t" :style="{height: barHeight(v, planillasPerDay)}"></div>
              </div>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur-xl p-4 rounded-xl border border-cyan-500/20 shadow-lg">
            <p class="text-sm text-cyan-300/70 mb-2">Llamadas API / día</p>
            <div class="h-20 flex items-end space-x-1">
              <div v-for="(v, idx) in apiCallsPerDay" :key="idx" class="flex-1 bg-gradient-to-t from-sky-500/40 to-sky-500/10 rounded-t" :style="{height: barHeight(v, apiCallsPerDay)}"></div>
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
        <!-- Trends Chart (Super Admin) -->
        <div class="mb-8">
          <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 shadow-lg">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white">Gráficos de Tendencia</h3>
              <p class="text-sm text-cyan-300/70">Ventas, inventario y movimientos</p>
            </div>
            <TrendsChart />
          </div>
        </div>
      </div>

      <!-- Data Entry View -->
      <div v-else-if="authStore.user?.roles?.includes('data_entry')">
        <!-- Data Entry Stats (styled) -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 shadow-lg hover:shadow-cyan-500/30 transition-all">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-cyan-300/70 mb-1">Mis Subidas</p>
                <p class="text-3xl font-bold text-white">{{ myStats.totalUploads }}</p>
              </div>
              <div class="p-3 rounded-lg bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-sky-500/30">
                <svg class="w-8 h-8 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v4a1 1 0 001 1h3m10 0h3a1 1 0 001-1V7M7 21h10a1 1 0 001-1v-5H6v5a1 1 0 001 1zM12 11V3"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-purple-500/20 shadow-lg hover:shadow-purple-500/30 transition-all">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-purple-300/70 mb-1">Procesadas</p>
                <p class="text-3xl font-bold text-white">{{ myStats.processed }}</p>
              </div>
              <div class="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7 21h10a1 1 0 001-1V11"/>
                </svg>
              </div>
            </div>
            <div class="mt-3 text-xs text-purple-300/70">Tiempo medio: {{ myStats.avgProcessingMinutes }} min</div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-yellow-500/20 shadow-lg hover:shadow-yellow-500/30 transition-all">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-yellow-300/70 mb-1">Pendientes</p>
                <p class="text-3xl font-bold text-white">{{ myStats.pending }}</p>
              </div>
              <div class="p-3 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/30">
                <svg class="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3M12 4a8 8 0 100 16 8 8 0 000-16z"/>
                </svg>
              </div>
            </div>
            <div class="mt-3 text-xs text-yellow-300/70">Revisa y corrige para acelerar el procesamiento</div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-green-500/20 shadow-lg hover:shadow-green-500/30 transition-all">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-green-300/70 mb-1">Éxito OCR (mis planillas)</p>
                <p class="text-3xl font-bold text-white">{{ myStats.ocrSuccessRate }}%</p>
              </div>
              <div class="p-3 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
                <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
            </div>
            <div class="mt-3 text-xs text-cyan-300/70">Promedio de coincidencias por planilla</div>
          </div>
        </div>

        <!-- Quick action -->
        <div class="mb-6 flex items-center justify-between">
          <router-link to="/upload" class="inline-flex items-center px-4 py-2 bg-cyan-600 text-white rounded-lg shadow hover:shadow-cyan-500/40 transition-all">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V7a1 1 0 011-1h8a1 1 0 011 1v9"/></svg>
            Subir nueva planilla
          </router-link>
          <div class="text-sm text-cyan-300/70">Accede rápido a tus últimas subidas y estados</div>
        </div>

        <!-- Mis últimas planillas -->
        <div class="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-lg mb-8">
          <div class="p-6 border-b border-cyan-500/20">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-bold text-white">Mis últimas planillas</h3>
              <div class="text-xs text-cyan-300/70">Mostrando últimas {{ myPlanillas.length }}</div>
            </div>
          </div>
          <div class="p-6">
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-cyan-500/20">
                    <th class="text-left py-3 px-4 text-sm font-semibold text-cyan-300">Archivo</th>
                    <th class="text-left py-3 px-4 text-sm font-semibold text-cyan-300">Estado</th>
                    <th class="text-left py-3 px-4 text-sm font-semibold text-cyan-300">Procesado</th>
                    <th class="text-right py-3 px-4 text-sm font-semibold text-cyan-300">Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in myPlanillas" :key="p.id" class="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                    <td class="py-4 px-4 text-white flex items-center space-x-3">
                      <div class="w-10 h-10 rounded-md bg-slate-900/40 flex items-center justify-center border border-slate-700/30">
                        <svg class="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg>
                      </div>
                      <div>
                        <div class="text-white font-medium">{{ p.fileName }}</div>
                        <div class="text-xs text-slate-400">Subida: {{ new Date(p.createdAt || p.uploadedAt).toLocaleString() }}</div>
                      </div>
                    </td>
                    <td class="py-4 px-4">
                      <span class="px-3 py-1 text-xs font-semibold rounded-full" :class="{
                        'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30': p.status === 'validacion_pendiente',
                        'bg-green-500/10 text-green-300 border border-green-500/20': p.status === 'procesado',
                        'bg-slate-700/20 text-slate-300 border border-slate-600/20': p.status === 'recibido'
                      }">{{ p.status }}</span>
                    </td>
                    <td class="py-4 px-4 text-cyan-300/70">{{ p.processedAt ? new Date(p.processedAt).toLocaleString() : '-' }}</td>
                    <td class="py-4 px-4 text-right">
                      <router-link :to="{ name: 'PlanillaDetalle', params: { id: p.id } }" class="inline-flex items-center px-4 py-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10 transition-all">
                        Ver
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
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

        <!-- Trends Chart (Organization) -->
        <div class="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-slate-800/50 backdrop-blur-xl p-4 rounded-xl border border-cyan-500/20 shadow-sm">
            <div>
              <p class="text-sm text-cyan-300/70">Costo Total Inventario</p>
              <p class="text-lg font-bold text-white">{{ formatCurrency(stats.inventoryCost) }}</p>
            </div>
            <div class="text-xs text-cyan-300/60 mt-2">Estimado: price * cantidad</div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur-xl p-4 rounded-xl border border-emerald-500/20 shadow-sm">
            <div>
              <div class="flex items-center space-x-2">
                <p class="text-sm text-emerald-300/70">Rotación Inventario (30d)</p>
                <button type="button" @click="showTurnoverHelp = true" class="text-cyan-300/60 hover:text-cyan-200 text-xs" title="Ayuda">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
                </button>
              </div>
              <p class="text-lg font-bold text-white">{{ formatTurnover(stats.turnover) }}</p>
              <div class="mt-2 flex items-center space-x-2">
                <select v-model="selectedTurnoverRange" @change="reloadTurnover" class="bg-slate-700 text-sm text-white px-2 py-1 rounded border border-slate-600">
                  <option value="7d">7d</option>
                  <option value="30d">30d</option>
                  <option value="90d">90d</option>
                </select>
                <span v-if="isTurnoverLoading" class="text-xs text-cyan-300">Cargando...</span>
              </div>
            </div>
            <div class="text-xs mt-2" :class="turnoverClass(stats.turnover)">{{ turnoverText(stats.turnover) }}</div>
          </div>
        </div>
        <div class="mb-8">
          <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 shadow-lg">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white">Gráficos de Tendencia</h3>
              <p class="text-sm text-cyan-300/70">Ventas, inventario y movimientos</p>
            </div>
            <TrendsChart :orgId="authStore.user?.organizationId" />
          </div>
        </div>

        <!-- Alerts + Critical Inventory -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="md:col-span-2 bg-slate-800/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold text-white">Alertas</h3>
              <p class="text-sm text-cyan-300/70">Resumen rápido de eventos que requieren atención</p>
            </div>
            <div class="space-y-3">
              <div v-if="pendingPlanillas.length > 0" class="flex items-center justify-between p-4 rounded bg-yellow-900/10 border border-yellow-500/10">
                <div>
                  <p class="text-sm text-yellow-300 font-semibold">Planillas pendientes</p>
                  <p class="text-white text-lg font-bold">{{ pendingPlanillas.length }}</p>
                </div>
                <router-link :to="{ name: 'ValidarPlanilla' }" class="text-yellow-400 hover:text-yellow-300">Ver pendientes</router-link>
              </div>

              <div v-if="criticalProducts.length > 0" class="flex items-center justify-between p-4 rounded bg-red-900/10 border border-red-500/10">
                <div>
                  <p class="text-sm text-red-300 font-semibold">Productos con bajo stock</p>
                  <p class="text-white text-lg font-bold">{{ criticalProducts.length }}</p>
                </div>
                <button @click="gotoInventory" class="text-red-400 hover:text-red-300">Ver inventario</button>
              </div>

              <div v-if="pendingPlanillas.length === 0 && criticalProducts.length === 0" class="p-4 rounded bg-slate-700/30 text-cyan-300">No hay alertas críticas en este momento</div>
            </div>
          </div>

          <div class="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 shadow-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white">Inventario Crítico</h3>
              <div class="flex items-center space-x-2">
                <input type="number" v-model.number="lowStockThreshold" min="0" class="w-20 bg-slate-900/50 text-white px-2 py-1 rounded text-sm" />
                <button @click="reloadCritical" class="px-3 py-1 bg-cyan-600 text-white rounded text-sm">Actualizar</button>
              </div>
            </div>

            <div v-if="criticalProducts.length === 0" class="text-slate-500 text-sm">No se encontraron productos con stock por debajo del umbral.</div>
            <ul v-else class="space-y-2">
              <li v-for="p in criticalProducts" :key="p.id" class="flex items-center justify-between p-3 rounded bg-slate-700/30 border border-slate-600/20">
                <div>
                  <p class="text-white font-medium">{{ p.name }} <span class="text-xs text-slate-400">({{ p.code }})</span></p>
                  <p class="text-sm text-cyan-300/70">Ubicación: {{ p.location?.name || 'N/A' }} • Categoría: {{ p.category?.name || 'N/A' }}</p>
                </div>
                <div class="text-right">
                  <p class="text-lg font-bold text-white">{{ p.cantidad }}</p>
                  <p class="text-xs text-slate-400">umbral: {{ lowStockThreshold }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
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
  <!-- Turnover help modal -->
  <div v-if="showTurnoverHelp" class="fixed inset-0 z-60 flex items-center justify-center">
    <div class="absolute inset-0 bg-black/60" @click="closeTurnoverHelp"></div>
    <div class="relative bg-slate-800/90 max-w-lg w-full mx-4 rounded-lg p-6 border border-cyan-500/20 shadow-lg">
      <div class="flex items-start justify-between">
        <div>
          <h3 class="text-lg font-bold text-white">Rotación de Inventario</h3>
          <p class="text-sm text-cyan-300/70 mt-2">La rotación se calcula como <strong>ventas totales / inventario promedio</strong> en el periodo seleccionado. Indica cuántas veces, en promedio, se renovó el inventario.</p>
          <ul class="text-sm text-cyan-300/70 mt-3 list-disc list-inside space-y-1">
            <li><strong>Ventas totales:</strong> suma de cantidades procesadas en planillas.</li>
            <li><strong>Inventario promedio:</strong> promedio diario del stock registrado en snapshots.</li>
            <li>Interpretación: valores bajos (ej. &lt; 0.5) indican rotación lenta; valores altos (&gt; 2) indican rotación rápida.</li>
          </ul>
        </div>
        <button @click="closeTurnoverHelp" class="text-cyan-300 hover:text-white ml-4">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuthStore } from '@/store/auth'
import { useToastStore } from '@/composables/useToast'
import { inventoryService } from '@/services/inventory.service'
import { organizationService } from '@/services/organization.service'
import { userService } from '@/services/user.service'
import { analyticsService } from '@/services/analytics.service'
import { Planilla, Product } from '@/types/inventory'
import { useRouter } from 'vue-router'
import TrendsChart from '@/components/TrendsChart.vue'

const authStore = useAuthStore()
const isLoading = ref(true)

// Turnover range control
const selectedTurnoverRange = ref<'7d' | '30d' | '90d'>('30d')
const isTurnoverLoading = ref(false)
const showTurnoverHelp = ref(false)

// Stats for Super Admin
const superAdminStats = ref({
  totalOrganizations: 0,
  totalUsers: 0,
  inventoryCost: 0,
  turnover: 0,
})

// Stats for Organization Users
const stats = ref({
  totalProducts: 0,
  processedPlanillas: 0,
  pendingPlanillas: 0,
  ocrSuccessRate: 0,
  inventoryCost: 0,
  turnover: 0,
})

const recentActivity = ref<any[]>([])
const pendingPlanillas = ref<Planilla[]>([])

// Data-entry specific
const myPlanillas = ref<Planilla[]>([])
const myStats = ref({ totalUploads: 0, processed: 0, pending: 0, ocrSuccessRate: 0, avgProcessingMinutes: 0 })

// Critical inventory
const lowStockThreshold = ref<number>(5)
const criticalProducts = ref<Product[]>([])
const router = useRouter()

// Usage metrics (superadmin)
const usageLabels = ref<string[]>([])
const planillasPerDay = ref<number[]>([])
const apiCallsPerDay = ref<number[]>([])
const dau = ref(0)
const mau = ref(0)
const storageBytes = ref(0)
const isUsageLoading = ref(false)

const userRoles = computed(() => authStore.user?.roles || [])

const canPerformAction = (action: 'Subir Planilla' | 'Ver Inventario' | 'Gestionar Usuarios') => {
  if (authStore.user?.isSuperAdmin) {
      if (action === 'Gestionar Usuarios') return true;
      return false;
  }

  const roles = userRoles.value
  switch (action) {
    case 'Subir Planilla':
      return roles.includes('data_entry')
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
    // Inventory cost (global)
    try {
      const costRes = await inventoryService.getInventoryCost()
      superAdminStats.value.inventoryCost = costRes.total || 0
    } catch (err) {
      console.warn('Error fetching inventory cost for superadmin', err)
      superAdminStats.value.inventoryCost = 0
    }

    // Turnover (global, using selected range)
    try {
      await reloadTurnover()
    } catch (err) {
      console.warn('Error fetching turnover for superadmin', err)
      superAdminStats.value.turnover = 0
    }

    // Usage metrics
    try {
      await reloadUsage()
    } catch (err) {
      console.warn('Error fetching usage metrics', err)
    }
  } catch (error) {
    console.error("Error fetching data:", error)
    const { error: showError } = useToastStore()
    showError('Error al cargar datos del sistema')
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

    // inventory cost for organization
    try {
      const costRes = await inventoryService.getInventoryCost(authStore.user?.organizationId)
      stats.value.inventoryCost = costRes.total || 0
    } catch (err) {
      console.warn('Error fetching inventory cost for org', err)
      stats.value.inventoryCost = 0
    }

    // turnover (rotación) - usar rango seleccionado
    try {
      await reloadTurnover()
    } catch (err) {
      console.warn('Error fetching turnover for org', err)
      stats.value.turnover = 0
    }

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
    if (authStore.user?.roles?.includes('data_entry')) {
      pendingPlanillas.value = []
    } else {
      const planillas = await inventoryService.getPlanillas()
      pendingPlanillas.value = planillas.filter(p => p.status === 'validacion_pendiente')
    }

    // Cargar inventario crítico
    await reloadCritical()

  } catch (error) {
    console.error('Error loading inventory data:', error)
    const { error: showError } = useToastStore()
    showError('Error al cargar datos de inventario')
    stats.value = { totalProducts: 0, processedPlanillas: 0, pendingPlanillas: 0, ocrSuccessRate: 0, inventoryCost: 0, turnover: 0 }
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
    } else if (authStore.user?.roles?.includes('data_entry')) {
      await loadDataEntryData()
    } else {
      await loadInventoryData()
    }
  } catch (error) {
    console.error('Error loading dashboard data:', error)
    const { error: showError } = useToastStore()
    showError('Error al cargar datos del dashboard')
  } finally {
    isLoading.value = false
  }
}

async function loadDataEntryData() {
  try {
    const planillas = await inventoryService.getMyPlanillas()
    myPlanillas.value = planillas || []
    const total = myPlanillas.value.length
    const processed = myPlanillas.value.filter(p => p.status === 'procesado').length
    const pending = myPlanillas.value.filter(p => p.status === 'validacion_pendiente').length

    // calc average OCR success if available in planilla.stats
    let successTotal = 0
    let successCount = 0
    let totalMinutes = 0
    let timeCount = 0

    for (const p of myPlanillas.value) {
      if (p.stats) {
        const added = Number(p.stats.added || 0)
        const updated = Number(p.stats.updated || 0)
        const unchanged = Number(p.stats.unchanged || 0)
        const items = added + updated + unchanged
        if (items > 0) {
          successTotal += ((added + updated) / items) * 100
          successCount++
        }
      }
      if (p.processedAt && p.uploadedAt) {
        const diffMs = new Date(p.processedAt).getTime() - new Date(p.uploadedAt).getTime()
        if (!Number.isNaN(diffMs) && diffMs > 0) {
          totalMinutes += diffMs / (1000 * 60)
          timeCount++
        }
      }
    }

    const avgSuccess = successCount > 0 ? Math.round(successTotal / successCount) : 0
    const avgMins = timeCount > 0 ? Math.round(totalMinutes / timeCount) : 0

    myStats.value = { totalUploads: total, processed, pending, ocrSuccessRate: avgSuccess, avgProcessingMinutes: avgMins }

    // also populate recentActivity simplified for data_entry
    recentActivity.value = myPlanillas.value.slice(0,5).map(p => ({ id: p.id, type: 'planilla', title: 'Mi subida', description: p.fileName, time: p.uploadedAt }))
  } catch (err) {
    console.warn('Error loading data-entry dashboard', err)
    myPlanillas.value = []
    myStats.value = { totalUploads: 0, processed: 0, pending: 0, ocrSuccessRate: 0, avgProcessingMinutes: 0 }
  }
}

onMounted(() => {
  loadDashboardData()
})

const formatCurrency = (value: number) => {
  const v = Number(value || 0)
  return `$${new Intl.NumberFormat('es-ES').format(Math.round(v))}`
}

async function reloadTurnover() {
  
  isTurnoverLoading.value = true
  try {
    if (authStore.user?.isSuperAdmin) {
      const t = await analyticsService.getTurnover(undefined, selectedTurnoverRange.value)
      superAdminStats.value.turnover = Number(t.turnover || 0)
    } else {
      const t = await analyticsService.getTurnover(authStore.user?.organizationId, selectedTurnoverRange.value)
      stats.value.turnover = Number(t.turnover || 0)
    }
  } catch (err) {
    console.warn('Error reloading turnover', err)
  } finally {
    isTurnoverLoading.value = false
  }
}

// Close help on backdrop click
function closeTurnoverHelp() {
  showTurnoverHelp.value = false
}

async function reloadUsage() {
  isUsageLoading.value = true
  try {
    const res = await analyticsService.getUsage(undefined, selectedTurnoverRange.value)
    usageLabels.value = res.labels || []
    planillasPerDay.value = res.planillasPerDay || []
    apiCallsPerDay.value = res.apiCallsPerDay || []
    dau.value = Number(res.dau || 0)
    mau.value = Number(res.mau || 0)
    storageBytes.value = Number(res.storageBytes || 0)
  } catch (e) {
    console.warn('Failed to fetch usage', e)
  } finally {
    isUsageLoading.value = false
  }
}

const formatTurnover = (value: number) => {
  const v = Number(value || 0)
  if (!v || Number.isNaN(v)) return '0.00x'
  return `${v.toFixed(2)}x`
}

const turnoverText = (value: number) => {
  const v = Number(value || 0)
  if (!v || Number.isNaN(v)) return 'Sin datos'
  if (v < 0.5) return 'Baja'
  if (v < 2) return 'Moderada'
  return 'Alta'
}

const turnoverClass = (value: number) => {
  const v = Number(value || 0)
  if (!v || Number.isNaN(v)) return 'text-slate-400'
  if (v < 0.5) return 'text-yellow-400'
  if (v < 2) return 'text-cyan-300/70'
  return 'text-green-400'
}

const barHeight = (value: number, series: number[]) => {
  const max = Math.max(...(series || [1]), 1)
  const h = Math.round((value / max) * 40)
  return `${h}px`
}

// Load critical products (low stock)
async function reloadCritical() {
  try {
    const products = await inventoryService.getProducts()
    const threshold = Number(lowStockThreshold.value || 0)
    const filtered = (products || []).filter(p => Number(p.cantidad || 0) <= threshold)
    // ordenar asc por cantidad y limitar
    criticalProducts.value = filtered.sort((a, b) => Number(a.cantidad || 0) - Number(b.cantidad || 0)).slice(0, 10)
  } catch (e) {
    console.warn('Error loading critical products', e)
    criticalProducts.value = []
  }
}

function gotoInventory() {
  router.push('/inventory')
}
</script>