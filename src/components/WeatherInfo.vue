<script setup>
import store from '@/state'

const wind = computed(() => store.state.weatherData.wind)
const humidity = computed(() => store.state.weatherData.humidity)
const clouds = computed(() => store.state.weatherData.clouds)
</script>

<template>
  <div
    class="flex items-center justify-between pt-[20px] text-[#666]" style="border-top: 2px solid rgba(0, 0, 0, 0.1)"
  >
    <div class="flex" title="Wind">
      <div class="i-carbon:windy-strong h-1.5em w-1.5em" />
      <span class="ml-1">{{ wind }}</span>
    </div>
    <div class="flex" title="Humidity">
      <div class="i-carbon:rain-drop h-1.5em w-1.5em" />
      <span class="ml-1">%{{ humidity }}</span>
    </div>
    <div class="flex" title="Cloud">
      <div class="i-carbon:cloud h-1.5em w-1.5em" />
      <span class="ml-1">%{{ clouds }}</span>
    </div>
  </div>
</template>
