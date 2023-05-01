import { useEffect, useState } from 'react'
import axios from 'axios'

interface Prediction {
  data: {
    id: string
    object: string
    created: number
    model: string
    usage: {
      prompt_tokens: number
      completion_tokens: number
      total_tokens: number
    }
    choices: Array<{
      message: {
        role: string
        content: string
      }
      finish_reason: string
      index: number
    }>
  }
}

const usePrediction = (
  leagueCountry: string,
  leagueName: string,
  teamHome: string,
  teamAway: string,
  date: string
) => {
  const [prediction, setPrediction] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchPrediction = async () => {
      setIsLoading(true)

      try {
        const content: string = `Actua como un experto de soccer y revisa las ultimas noticias de Futbol ${leagueCountry} ${leagueName} ${teamHome} vs ${teamAway} el ${date}, analiza paginas de prediccion, despues de un analisis profundo entre jugadores lesionados, quienes son titulares, quien juega de local, ultimos resultados, historicos entre clubes, finalmente arroja 3 predicciones con su respectivo porcentaje estimado, considera estimaciones de handicap asiatico y doble probabilidad, es decir local empate o visitante empate, o +1.5 goles, etc.`

        const options = {
          method: 'POST',
          url: 'https://<set RAPIDAPI_URL>/v1/chat/completions', // set: config.publicRuntimeConfig.RAPIDAPI_URL
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key':
              '', // set: config.publicRuntimeConfig.RAPIDAPI_KEY
            'X-RapidAPI-Host': '', // set: config.publicRuntimeConfig.RAPIDAPI_URL
          },
          data: {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'user',
                content,
              },
            ],
          },
        }

        const response: Prediction = await axios.request(options)

        setPrediction(response.data.choices[0].message.content)
      } catch (error) {
        console.error('Error fetching prediction:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (leagueCountry && leagueName && teamHome && teamAway && date) {
      fetchPrediction()
    }
  }, [leagueCountry, leagueName, teamHome, teamAway, date])

  return {
    prediction,
    isLoadingPrediction: isLoading,
  }
}

export default usePrediction
