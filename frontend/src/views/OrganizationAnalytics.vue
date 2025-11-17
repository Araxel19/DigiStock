<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-6 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <button @click="goBack" class="mb-4 text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Volver
          </button>
          <h1 class="text-4xl font-bold text-white mb-2">{{ orgName }}</h1>
          <p class="text-cyan-300/70">Análisis detallado de rotación, ventas e inventario</p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="text-cyan-300 text-center py-12">Cargando datos...</div>

      <!-- Error State -->
      <div v-if="errorMsg" class="mt-4 p-4 bg-red-800/40 text-red-200 rounded-lg">{{ errorMsg }}</div>

      <!-- Content -->
      <div v-else class="space-y-6">
        <!-- Range Selector -->
        <div class="flex gap-4 mb-6">
          <select v-model="selectedRange" @change="loadData" class="bg-slate-800/50 text-white px-4 py-2 rounded-lg border border-cyan-500/20">
            <option value="7d">Últimos 7 días</option>
            <option value="30d">Últimos 30 días</option>
            <option value="90d">Últimos 90 días</option>
          </select>
        </div>

        <!-- Key Metrics -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-6">
            <p class="text-cyan-300/70 text-sm mb-2">Costo Inventario</p>
            <p class="text-3xl font-bold text-white">{{ formatCurrency(metrics.cost) }}</p>
          </div>
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-6">
            <p class="text-cyan-300/70 text-sm mb-2">Ventas Totales</p>
            <p class="text-3xl font-bold text-white">{{ metrics.ventas }}</p>
          </div>
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-6">
            <p class="text-cyan-300/70 text-sm mb-2">Rotación</p>
            <p class="text-3xl font-bold text-white">{{ (metrics.turnover || 0).toFixed(2) }}x</p>
          </div>
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-6">
            <p class="text-cyan-300/70 text-sm mb-2">Planillas</p>
            <p class="text-3xl font-bold text-white">{{ metrics.planillasCount }}</p>
          </div>
        </div>

        <!-- Charts -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Turnover Chart -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-6">
            <h2 class="text-xl font-bold text-white mb-4">Rotación de Inventario</h2>
            <div class="h-64">
              <canvas ref="turnoverChart"></canvas>
            </div>
          </div>

          <!-- Inventory Cost Trend -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-6">
            <h2 class="text-xl font-bold text-white mb-4">Evolución del Costo de Inventario</h2>
            <div class="h-64">
              <canvas ref="costChart"></canvas>
            </div>
          </div>

          <!-- Sales Chart -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-6">
            <h2 class="text-xl font-bold text-white mb-4">Ventas por Período</h2>
            <div class="h-64">
              <canvas ref="salesChart"></canvas>
            </div>
          </div>

          <!-- Inventory Distribution -->
          <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-6">
            <h2 class="text-xl font-bold text-white mb-4">Distribución de Inventario</h2>
            <div class="h-64">
              <canvas ref="inventoryChart"></canvas>
            </div>
          </div>
        </div>

        <!-- Detailed Table -->
        <div class="bg-slate-800/50 backdrop-blur-xl rounded-lg border border-cyan-500/20 p-6">
          <h2 class="text-xl font-bold text-white mb-4">Detalles Mensuales</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="text-cyan-300/70 border-b border-slate-700">
                  <th class="py-3 px-4">Mes</th>
                  <th class="py-3 px-4">Costo</th>
                  <th class="py-3 px-4">Ventas</th>
                  <th class="py-3 px-4">Rotación</th>
                  <th class="py-3 px-4">Planillas</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in detailedData" :key="row.month" class="border-b border-slate-700 hover:bg-slate-700/30">
                  <td class="py-3 px-4 text-white">{{ row.month }}</td>
                  <td class="py-3 px-4 text-white">{{ formatCurrency(row.cost) }}</td>
                  <td class="py-3 px-4 text-white">{{ row.ventas }}</td>
                  <td class="py-3 px-4 text-white">{{ (row.turnover || 0).toFixed(2) }}x</td>
                  <td class="py-3 px-4 text-white">{{ row.planillasCount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Chart, registerables } from 'chart.js'
import { analyticsService, AnalyticsRange } from '@/services/analytics.service'
import { useToastStore } from '@/composables/useToast'

Chart.register(...registerables)

const router = useRouter()
const route = useRoute()
const orgId = route.params.id as string

// Reactive state
const isLoading = ref(true)
const errorMsg = ref('')
const selectedRange = ref<AnalyticsRange>('30d')
const orgName = ref('Organización')

const metrics = ref({
  cost: 0,
  ventas: 0,
  turnover: 0,
  planillasCount: 0
})

const detailedData = ref<any[]>([])

// Chart references
const turnoverChart = ref<HTMLCanvasElement | null>(null)
const costChart = ref<HTMLCanvasElement | null>(null)
const salesChart = ref<HTMLCanvasElement | null>(null)
const inventoryChart = ref<HTMLCanvasElement | null>(null)

let turnoverChartInstance: Chart | null = null
let costChartInstance: Chart | null = null
let salesChartInstance: Chart | null = null
let inventoryChartInstance: Chart | null = null

const loadData = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    // Get aggregated data for this org
    const res = await analyticsService.getOrganizationAnalytics(orgId, selectedRange.value)
    const data = res.data || {}
    
    orgName.value = data.name || 'Organización'
    metrics.value = {
      cost: Number(data.cost || 0),
      ventas: Number(data.ventas || 0),
      turnover: Number(data.turnover || 0),
      planillasCount: Number(data.planillasCount || 0)
    }

    detailedData.value = (data.monthlyData || []).map((d: any) => ({
      month: d.month || '',
      cost: Number(d.cost || 0),
      ventas: Number(d.ventas || 0),
      turnover: Number(d.turnover || 0),
      planillasCount: Number(d.planillasCount || 0)
    }))

    // Initialize charts after a tick to ensure canvas elements are ready
    setTimeout(() => initCharts(data), 100)
  } catch (e: any) {
    console.error('Failed to load org analytics', e)
    errorMsg.value = e?.response?.data?.message || e?.message || 'Error cargando datos'
    const { error } = useToastStore()
    error('Error al cargar análisis de organización')
  } finally {
    isLoading.value = false
  }
}

const initCharts = (_data: any) => {
  const chartConfig = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#e2e8f0' }
      }
    },
    scales: {
      y: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } },
      x: { ticks: { color: '#94a3b8' }, grid: { color: '#334155' } }
    }
  }

  // Turnover Chart
  if (turnoverChart.value) {
    if (turnoverChartInstance) turnoverChartInstance.destroy()
    turnoverChartInstance = new Chart(turnoverChart.value, {
      type: 'line',
      data: {
        labels: detailedData.value.map(d => d.month),
        datasets: [{
          label: 'Rotación',
          data: detailedData.value.map(d => d.turnover),
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          tension: 0.3,
          fill: true
        }]
      },
      options: chartConfig
    })
  }

  // Cost Chart
  if (costChart.value) {
    if (costChartInstance) costChartInstance.destroy()
    costChartInstance = new Chart(costChart.value, {
      type: 'line',
      data: {
        labels: detailedData.value.map(d => d.month),
        datasets: [{
          label: 'Costo ($)',
          data: detailedData.value.map(d => d.cost),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.3,
          fill: true
        }]
      },
      options: chartConfig
    })
  }

  // Sales Chart
  if (salesChart.value) {
    if (salesChartInstance) salesChartInstance.destroy()
    salesChartInstance = new Chart(salesChart.value, {
      type: 'bar',
      data: {
        labels: detailedData.value.map(d => d.month),
        datasets: [{
          label: 'Ventas',
          data: detailedData.value.map(d => d.ventas),
          backgroundColor: '#10b981'
        }]
      },
      options: chartConfig
    })
  }

  // Inventory Chart
  if (inventoryChart.value) {
    if (inventoryChartInstance) inventoryChartInstance.destroy()
    inventoryChartInstance = new Chart(inventoryChart.value, {
      type: 'doughnut',
      data: {
        labels: ['Costo Total', 'Otros'],
        datasets: [{
          data: [metrics.value.cost, Math.max(0, metrics.value.cost * 0.1)],
          backgroundColor: ['#06b6d4', '#334155']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#e2e8f0' }
          }
        }
      }
    })
  }
}

const goBack = () => {
  router.back()
}

const formatCurrency = (v: number) => `$${new Intl.NumberFormat('es-ES').format(Math.round(v || 0))}`

onMounted(() => {
  loadData()
})
</script>
