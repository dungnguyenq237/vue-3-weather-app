<script setup lang="ts">
import debounce from 'lodash/debounce'
import type { City } from '@/state'
import store from '@/state'

const search = ref(store.state.defaultSearch)
const results = ref<City[]>([])
const isSearching = ref(false)
const openMenuSearch = ref(false)

const isFetching = computed(() => {
  return store.state.isFetching
})

const isSearched = computed(() => {
  return store.state.search !== ''
})

const getWeatherCountry = computed(() => {
  return store.state.weatherData.country
})

const getError = computed(() => {
  return store.state.isError
})

const getData = debounce(async () => {
  try {
    openMenuSearch.value = true
    isSearching.value = true
    if (search.value) {
      const { data } = await store.actions.searchCities(search.value)
      results.value = data.data
    }
    else {
      results.value = []
      openMenuSearch.value = false
    }
  }
  catch (error) {
    console.error('search cities', error)
  }
  finally {
    isSearching.value = false
  }
}, 500)

async function fetchWeatherData(city: City) {
  search.value = city.name
  isSearching.value = false
  await store.actions.fetchWeatherData(city.name)
}
</script>

<template>
  <div class="relative">
    <input
      v-model.trim="search" type="text" placeholder="Search City"
      class="h-[50px] w-full border-[2px] border-black border-opacity-[10%] rounded-full bg-transparent pl-6 pr-[72px] text-base outline-none transition-all duration-400"
      @keydown.enter="getData" @input="getData"
    >
    <div
      v-if="openMenuSearch"
      class="absolute z-10 mt-1 w-full rounded-md bg-white p-4 shadow-lg"
    >
      <template v-if="results.length">
        <div
          v-for="(city, i) in results" :key="i"
          class="cursor-pointer p-4 hover:bg-gray-200"
          @click="fetchWeatherData(city)"
        >
          {{ city.name }}
        </div>
      </template>
      <div v-else-if="results.length === 0 && search" class="text-center">
        No cities found! Please try to input correct city name.
      </div>
    </div>
    <svg
      v-if="isFetching || isSearching"
      class="absolute right-[64px] top-4 mr-3 h-1em h-5 w-1em w-5 transform animate-spin animate-spin text-[#666] text-[#999] text-[#999] -translate-y-[50%]"
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span
      v-if="isSearched"
      class="absolute right-[30px] top-[50%] transform text-[#999] -translate-y-[50%]"
    >({{
      getWeatherCountry }})</span>
    <div
      v-if="getError"
      class="absolute bottom-[-35px] left-0 right-0 m-auto text-center text-[14px] text-red"
    >
      No results found! Please try to input correct country name.
    </div>
  </div>
</template>
