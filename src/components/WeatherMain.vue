<script setup>
import store from '@/state'

const feelsLike = computed(() => store.state.weatherData.feelsLike)
const temp = computed(() => store.state.weatherData.temp)
const description = computed(() => store.state.weatherData.description)
const icon = computed(() => store.state.weatherData.icon)
</script>

<template>
  <div class="mb-[40px] mt-[40px] flex flex-col items-center text-center">
    <div class="text-lg text-[#666]">
      Feels Like
      <strong>
        {{ feelsLike && Math.round(feelsLike) }}
        <sup class="relative left-[-2px] top-[-4px] text-[18px]">&deg;</sup>
      </strong>
    </div>
    <div
      class="relative m-y-[40px] h-[150px] w-[150px] flex items-center justify-center rounded-full bg-white shadow-lg"
    >
      <img
        v-if="icon"
        class="absolute left-[-35px] top-[-35px] h-[110px] w-[110px] bg-cover bg-no-repeat"
        :src="`http://openweathermap.org/img/wn/${icon}d@2x.png`"
        style="filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.03)) drop-shadow(-5px -5px 0 rgba(0, 0, 0, 0.08))"
      >
      <span class="relative text-[60px] tracking-[-2px] font-[800]">{{
        temp && Math.round(temp) }}</span>
      <sup class="relative top-[-21px] text-[40px]">&deg;</sup>
    </div>
    <div class="text-lg text-[#666] capitalize">
      {{ description }}
    </div>
    <p />
  </div>
</template>

<style scoped>
@media (max-height: 767px) {
  .weather-main {
    @apply mt-[30px] mb-[30px];
  }

  .weather-temp {
    @apply w-[125px] h-[125px] m-y-[30px];
  }
}
</style>
