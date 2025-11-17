<template>
  <div class="bg-slate-800/50 p-4 rounded-xl border border-cyan-500/20 shadow-lg">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-white">Gráficos de Tendencia</h3>
      <div class="flex items-center space-x-2">
        <select v-model="range" class="bg-slate-900/50 text-white px-2 py-1 rounded">
          <option value="7d">7 días</option>
          <option value="30d">30 días</option>
          <option value="90d">90 días</option>
        </select>
        <button @click="exportPNG" class="px-3 py-1 bg-cyan-600 text-white rounded">Exportar PNG</button>
      </div>
    </div>

    <div class="relative h-80 md:h-96">
      <canvas ref="chartRef" class="w-full h-full"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';
import { analyticsService } from '@/services/analytics.service';

Chart.register(...registerables);

const props = defineProps<{ orgId?: string }>();

const chartRef = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;
const range = ref<'7d'|'30d'|'90d'>('7d');

const loadAndRender = async () => {
  const data = await analyticsService.getTrends(props.orgId, range.value);
  const ctx = chartRef.value?.getContext('2d');
  if (!ctx) return;

  const config = {
    type: 'line' as const,
    data: {
      labels: data.labels,
      datasets: [
        {
          label: 'Ventas',
          data: data.ventas,
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6,182,212,0.12)',
          tension: 0.2,
          yAxisID: 'y',
        },
        {
          label: 'Inventario',
          data: data.inventario,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.08)',
          tension: 0.2,
          yAxisID: 'y1',
        },
        {
          label: 'Movimientos',
          data: data.movimientos,
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245,158,11,0.08)',
          tension: 0.2,
          yAxisID: 'y',
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index' as const, intersect: false },
      stacked: false,
      scales: {
        y: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
        },
        y1: {
          type: 'linear' as const,
          display: true,
          position: 'right' as const,
          grid: { drawOnChartArea: false }
        }
      }
    }
  };

  if (chart) {
    chart.data = config.data as any;
    chart.options = config.options as any;
    chart.update();
  } else {
    chart = new Chart(ctx, config as any);
  }
};

onMounted(() => {
  loadAndRender();
});

watch(range, () => loadAndRender());

onBeforeUnmount(() => {
  if (chart) {
    chart.destroy();
    chart = null;
  }
});

const exportPNG = () => {
  if (!chart) return;
  const url = chart.toBase64Image();
  const a = document.createElement('a');
  a.href = url;
  a.download = `trends-${range.value}.png`;
  a.click();
};
</script>

<style scoped>
</style>
