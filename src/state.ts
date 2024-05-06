import axios from 'axios'
import { reactive } from 'vue'

interface State {
  firstTimeLoad: boolean
  isFetching: boolean
  apiBase: string
  apiKey: string
  defaultSearch: string
  search: string
  isError: boolean
  weatherData: {
    name?: string
    temp?: number
    tempMin?: number
    tempMax?: number
    feelsLike?: number
    description?: string
    icon?: string
    info?: string
    wind?: number
    humidity?: number
    clouds?: number
    country?: string
  }
}

const state: State = reactive({
  firstTimeLoad: true,
  isFetching: false,
  apiBase: 'https://api.openweathermap.org/data/2.5/',
  apiKey: 'a66dfd662d90f5875b4c90bba18af2e9',
  defaultSearch: 'ho chi minh',
  search: '',
  isError: false,
  weatherData: {},
})

const mutations = {
  SET_SEARCH(search: string) {
    state.search = search.toLowerCase()
  },
  SET_WEATHER_DATA(data: any) {
    state.weatherData = data
  },
  SET_ERROR(value: boolean) {
    state.isError = value
  },
  SET_FETCHING(value: boolean) {
    state.isFetching = value
  },
  SET_FIRST_TIME_LOAD(value: boolean) {
    state.firstTimeLoad = value
  },
}

const actions = {
  async fetchWeatherData(search: string) {
    mutations.SET_FETCHING(true)
    try {
      mutations.SET_SEARCH(search)
      const response = await axios.get(
        `${state.apiBase}weather?q=${search}&units=metric&APPID=${state.apiKey}`,
      )
      const newWeatherData = {
        name: response.data.name,
        temp: response.data.main.temp,
        tempMin: response.data.main.temp_min,
        tempMax: response.data.main.temp_max,
        feelsLike: response.data.main.feels_like,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon.substring(0, 2),
        info: response.data.weather[0].main,
        wind: response.data.wind.speed,
        humidity: response.data.main.humidity,
        clouds: response.data.clouds.all,
        country: response.data.sys.country,
      }

      setTimeout(() => {
        mutations.SET_WEATHER_DATA(newWeatherData)
        mutations.SET_ERROR(false)
        mutations.SET_FETCHING(false)
        mutations.SET_FIRST_TIME_LOAD(false)
      }, 1000)
    }
    catch (error) {
      mutations.SET_ERROR(true)
      mutations.SET_WEATHER_DATA({})
      mutations.SET_ERROR(false)
    }
  },
}

export default { state, actions, mutations }
