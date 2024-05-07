import type { AxiosResponse } from 'axios'
import axios from 'axios'
import { reactive } from 'vue'

interface WeatherDataResponse {
  name: string
  main: {
    temp: number
    temp_min: number
    temp_max: number
    feels_like: number
    humidity: number
  }
  weather: {
    description: string
    icon: string
    main: string
  }[]
  wind: {
    speed: number
  }
  clouds: {
    all: number
  }
  sys: {
    country: string
  }
}

interface WeatherData {
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

export interface City {
  city: string
  country: string
  countryCode: string
  id: number
  latitude: number
  longitude: number
  name: string
  population: number
  region: string
  regionCode: string
  regionWdId: string
  type: string
  wikiDataId: string
}

interface SearchCitiesResponse {
  data: City[]
  metadata?: {
    currentOffset: number
    totalCount: number
  }
}
interface State {
  firstTimeLoad: boolean
  isFetching: boolean
  defaultSearch: string
  search: string
  isError: boolean
  weatherData: WeatherData
}

const state: State = reactive({
  firstTimeLoad: true,
  isFetching: false,
  defaultSearch: 'ho chi minh',
  search: '',
  isError: false,
  weatherData: {},
})

const mutations = {
  SET_SEARCH(search: string) {
    state.search = search.toLowerCase()
  },
  SET_WEATHER_DATA(data: WeatherDataResponse) {
    const { name, main, weather, wind, clouds, sys } = data
    const { temp, temp_min, temp_max, feels_like, humidity } = main || {}
    const { description, icon, main: info } = weather ? weather[0] : {} as any
    state.weatherData = {
      name,
      temp,
      humidity,
      info,
      description,
      tempMin: temp_min,
      tempMax: temp_max,
      feelsLike: feels_like,
      icon: icon.substring(0, 2),
      wind: wind.speed,
      clouds: clouds.all,
      country: sys.country,
    }
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
  async searchCities(search: string): Promise<AxiosResponse<SearchCitiesResponse>> {
    const options = {
      method: 'GET',
      url: `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=1000000&namePrefix=${search}`,
      headers: {
        'X-RapidAPI-Key': '7ec2061215msh824263b5f89845dp17b2a6jsn690f8402d0a4',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
      },
    }
    return axios.request(options)
  },
  async fetchWeatherData(search: string) {
    mutations.SET_FETCHING(true)
    try {
      mutations.SET_SEARCH(search)
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&APPID=a66dfd662d90f5875b4c90bba18af2e9`,
      )
      setTimeout(() => {
        mutations.SET_ERROR(false)
        mutations.SET_WEATHER_DATA(data)
        mutations.SET_FETCHING(false)
        mutations.SET_FIRST_TIME_LOAD(false)
      }, 500) // add delay to show loading spinner
    }
    catch (error) {
      mutations.SET_ERROR(true)
      mutations.SET_WEATHER_DATA({} as WeatherDataResponse)
      mutations.SET_FETCHING(false)
      mutations.SET_FIRST_TIME_LOAD(false)
    }
  },
}

export default { state, actions, mutations }
