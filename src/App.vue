<script setup lang="ts">
import store from '@/state'

const isFirstTimeLoad = computed(() => {
  return store.state.firstTimeLoad
})

function initData() {
  store.actions.fetchWeatherData(store.state.defaultSearch)
}
onMounted(() => {
  initData()
})
</script>

<template>
  <div class="w-full flex items-center justify-center h-dvh">
    <div
      class="z-[1] m-[20px] max-w-[560px] w-full rounded-[20px] bg-[#f1f1f1] p-[40px] shadow-2xl"
    >
      <div v-if="isFirstTimeLoad" role="status" class="flex flex-col animate-pulse items-center">
        <div
          class="mb-6 h-12 w-full rounded-full bg-gray-200 dark:bg-gray-700"
        />
        <div class="mb-6 h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />

        <div
          class="mx-auto mb-6 h-48 w-full flex items-center justify-center rounded bg-gray-300 sm:w-80 dark:bg-gray-700"
        >
          <svg
            class="h-8 w-8 text-gray-200 dark:text-gray-600"
            aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
            fill="currentColor" viewBox="0 0 20 18"
          >
            <path
              d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
            />
          </svg>
        </div>
        <div class="mb-6 h-2.5 w-32 rounded-full bg-gray-200 dark:bg-gray-700" />

        <div
          class="mb-6 h-12 w-full rounded-full bg-gray-200 dark:bg-gray-700"
        />
      </div>
      <template v-else>
        <WeatherSearch />
        <WeatherMain />
        <WeatherInfo />
      </template>
    </div>
    <WeatherAnimate />
  </div>
</template>
