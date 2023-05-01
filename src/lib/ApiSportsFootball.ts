import axios from 'axios'
import useSWR from 'swr'
// import getConfig from 'next/config'
// const config = getConfig()

const fetcher = async (url: string) => {
  const response = await axios.get(url, {
    headers: {
      'content-type': 'application/octet-stream',
      'X-RapidAPI-Key': '', // set: config.publicRuntimeConfig.API_FOOTBALL_KEY
      'X-RapidAPI-Host': '', // set: config.publicRuntimeConfig.API_FOOTBALL_HOST
    },
  })

  return response.data
}

export const useApiSportsFootball = (date: string, path: string) => {
  // set: config.publicRuntimeConfig.API_FOOTBALL_HOST
  const url = `https://<set API_FOOTBALL_HOST>/v3/${path}?date=${date}`
  const { data, error } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  }
}
