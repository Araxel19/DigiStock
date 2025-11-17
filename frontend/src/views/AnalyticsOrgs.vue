<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div class="bg-slate-800/50 backdrop-blur-xl p-6 rounded-xl border border-cyan-500/20 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-bold text-white">Análisis por Organización</h2>
          <div class="flex items-center gap-3">
            <input v-model="q" @input="applyFilters" placeholder="Buscar organización..." class="bg-slate-700 text-sm text-white px-2 py-1 rounded border border-slate-600" />
            <select v-model="selectedRange" @change="loadOrgs" class="bg-slate-700 text-sm text-white px-2 py-1 rounded border border-slate-600">
              <option value="7d">7d</option>
              <option value="30d">30d</option>
              <option value="90d">90d</option>
            </select>
          </div>
        </div>

        <div v-if="isLoading" class="text-cyan-300">Cargando...</div>
        <div v-if="errorMsg" class="mt-2 p-3 bg-red-800/40 text-red-200 rounded">{{ errorMsg }}</div>
        <div v-else>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="text-cyan-300/70 text-sm border-b border-slate-700">
                  <th class="py-2 px-3 cursor-pointer" @click="sortBy('name')">Organización <span v-if="sort.key==='name'">{{ sort.dir==='asc'?'▲':'▼' }}</span></th>
                  <th class="py-2 px-3 cursor-pointer" @click="sortBy('cost')">Costo Inventario <span v-if="sort.key==='cost'">{{ sort.dir==='asc'?'▲':'▼' }}</span></th>
                  <th class="py-2 px-3 cursor-pointer" @click="sortBy('ventas')">Ventas <span v-if="sort.key==='ventas'">{{ sort.dir==='asc'?'▲':'▼' }}</span></th>
                  <th class="py-2 px-3 cursor-pointer" @click="sortBy('avgInventory')">Inventario Promedio <span v-if="sort.key==='avgInventory'">{{ sort.dir==='asc'?'▲':'▼' }}</span></th>
                  <th class="py-2 px-3 cursor-pointer" @click="sortBy('turnover')">Rotación <span v-if="sort.key==='turnover'">{{ sort.dir==='asc'?'▲':'▼' }}</span></th>
                  <th class="py-2 px-3 cursor-pointer" @click="sortBy('planillasCount')">Planillas <span v-if="sort.key==='planillasCount'">{{ sort.dir==='asc'?'▲':'▼' }}</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="org in filteredOrgs" :key="org.id" class="border-b border-slate-700 hover:bg-slate-700/30">
                  <td class="py-3 px-3 text-white">{{ org.name }}</td>
                  <td class="py-3 px-3 text-white">{{ formatCurrency(org.cost) }}</td>
                  <td class="py-3 px-3 text-white">{{ org.ventas }}</td>
                  <td class="py-3 px-3 text-white">{{ Math.round(org.avgInventory) }}</td>
                  <td class="py-3 px-3 text-white">{{ (org.turnover || 0).toFixed(2) }}x</td>
                  <td class="py-3 px-3 text-white">{{ org.planillasCount }}</td>
                </tr>
              </tbody>
            </table>
            <div v-if="filteredOrgs.length===0" class="mt-4 text-slate-400">No se encontraron organizaciones.</div>
          </div>

          <div class="mt-4 flex items-center justify-between">
            <div class="text-slate-400 text-sm">Mostrando {{ startIndex }} - {{ endIndex }} de {{ total }}</div>
            <div class="flex items-center gap-2">
              <button :disabled="page<=1" @click="prevPage" class="px-3 py-1 bg-slate-700 text-white rounded disabled:opacity-50">Anterior</button>
              <button :disabled="page*perPage>=total" @click="nextPage" class="px-3 py-1 bg-slate-700 text-white rounded disabled:opacity-50">Siguiente</button>
              <select v-model.number="perPage" @change="onPerPageChange" class="bg-slate-700 text-white px-2 py-1 rounded">
                <option :value="10">10</option>
                <option :value="20">20</option>
                <option :value="50">50</option>
              </select>
              <button @click="exportCsv" class="px-3 py-1 bg-cyan-600 text-white rounded">Exportar CSV</button>
            </div>
          </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { analyticsService, AnalyticsRange } from '@/services/analytics.service'
import { useToastStore } from '@/composables/useToast'

const orgs = ref<any[]>([])
const isLoading = ref(false)
const selectedRange = ref<AnalyticsRange>('30d')
const errorMsg = ref('')

const q = ref('')
const sort = ref<{ key: string; dir: 'asc' | 'desc' }>({ key: 'cost', dir: 'desc' })

const page = ref(1)
const perPage = ref(20)
const total = ref(0)

const loadOrgs = async () => {
  isLoading.value = true
  errorMsg.value = ''
  try {
    const res = await analyticsService.getOrgsAnalysisPaged({ range: selectedRange.value, page: page.value, perPage: perPage.value, q: q.value, sortKey: sort.value.key, sortDir: sort.value.dir })
    const rows = res.data || []
    // normalize backend snake_case -> frontend camelCase
    orgs.value = rows.map((r:any) => ({
      id: r.id,
      name: r.name,
      cost: Number(r.cost ?? r.total ?? 0),
      ventas: Number(r.ventas ?? r.ventas_total ?? 0),
      avgInventory: Number(r.avg_inventory ?? r.avgInventory ?? 0),
      turnover: Number(r.turnover ?? 0),
      planillasCount: Number(r.planillas_count ?? r.planillasCount ?? 0)
    }))
    total.value = Number(res.total || 0)
  } catch (e:any) {
    console.error('Failed to load orgs analysis', e)
    orgs.value = []
    total.value = 0
    // friendly message
    errorMsg.value = e?.response?.data?.message || e?.message || 'Error cargando datos'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadOrgs)

const applyFilters = async () => {
  page.value = 1
  await loadOrgs()
}

const sortBy = (key: string) => {
  if (sort.value.key === key) {
    sort.value.dir = sort.value.dir === 'asc' ? 'desc' : 'asc'
  } else {
    sort.value.key = key
    sort.value.dir = 'desc'
  }
  page.value = 1
  loadOrgs()
}

const filteredOrgs = computed(() => orgs.value)

const startIndex = computed(() => total.value === 0 ? 0 : (page.value - 1) * perPage.value + 1)
const endIndex = computed(() => Math.min(page.value * perPage.value, total.value))

const prevPage = () => {
  if (page.value > 1) {
    page.value -= 1
    loadOrgs()
  }
}

const nextPage = () => {
  if (page.value * perPage.value < total.value) {
    page.value += 1
    loadOrgs()
  }
}

const onPerPageChange = () => {
  page.value = 1
  loadOrgs()
}

const exportCsv = async () => {
  try {
    const blob = await analyticsService.exportOrgsCsv({ range: selectedRange.value, q: q.value, sortKey: sort.value.key, sortDir: sort.value.dir })
    const url = (globalThis as any).URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orgs_analysis_${selectedRange.value}.csv`
    document.body.appendChild(a)
    a.click()
    a.remove()
    ;(globalThis as any).URL.revokeObjectURL(url)
    // show success toast
    const { success } = useToastStore()
    success('CSV descargado correctamente')
  } catch (e) {
    console.error('Failed to export CSV', e)
    const { error } = useToastStore()
    error('Error al exportar CSV')
  }
}

const formatCurrency = (v: number) => `$${new Intl.NumberFormat('es-ES').format(Math.round(v || 0))}`
</script>

<!-- estilos gestionados globalmente; no es necesario CSS local -->
