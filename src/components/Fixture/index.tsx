'use client'
import { useFootballFixtures } from '@/hooks/useFootballFixtures'
import Image from 'next/image'
import Modal from '@/components/shared/Modal'
import usePrediction from '@/hooks/usePrediction'
import { useState } from 'react'

interface Props {
  sport: string
  date: string
}

const Fixture = ({ date }: Props) => {
  const [selectedLeagueCountry, setSelectedLeagueCountry] = useState<string>('')
  const [selectedLeagueName, setSelectedLeagueName] = useState<string>('')
  const [selectedTeamHome, setSelectedTeamHome] = useState<string>('')
  const [selectedTeamAway, setSelectedTeamAway] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<string>('')
  const { prediction, isLoadingPrediction } = usePrediction(
    selectedLeagueCountry,
    selectedLeagueName,
    selectedTeamHome,
    selectedTeamAway,
    selectedDate
  )

  const { fixtures, isLoading, isError } = useFootballFixtures(date)

  const handlePredictionClick = (
    leagueCountry: string,
    leagueName: string,
    teamHome: string,
    teamAway: string,
    date: string
  ) => {
    setSelectedLeagueCountry(leagueCountry)
    setSelectedLeagueName(leagueName)
    setSelectedTeamHome(teamHome)
    setSelectedTeamAway(teamAway)

    const dateObj = new Date(date)
    const year = dateObj.getFullYear()
    const month =
      dateObj.getMonth() < 10
        ? `0${dateObj.getMonth() + 1}`
        : dateObj.getMonth() + 1
    const day =
      dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate()
    const formattedDate = `${year}-${month}-${day}`
    setSelectedDate(formattedDate)
  }

  const closeModal = () => {
    setSelectedLeagueCountry('')
    setSelectedLeagueName('')
    setSelectedTeamHome('')
    setSelectedTeamAway('')
    setSelectedDate('')
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading fixtures</div>

  return (
    <>
      <div className="h-screen overflow-y-scroll">
        <div className="space-y-4">
          {fixtures.map((fixture: any) => {
            const date = new Date(fixture.fixture.date)
            const formattedDate = date.toLocaleDateString('en-US')
            const formattedTime = date.toLocaleTimeString('en-US', {
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })
            const formattedDatetime = `${formattedDate} at ${formattedTime}`

            return (
              <div
                key={fixture.fixture.id}
                className="flex items-center justify-between bg-white shadow-md p-4 rounded-md"
              >
                <div className="flex items-center space-x-4">
                  {fixture.league.flag && (
                    <Image
                      src={fixture.league.flag}
                      alt={`${fixture.league.country} flag`}
                      width={32}
                      height={32}
                    />
                  )}
                  <div>
                    <p>{formattedDatetime}</p>
                    <p>{fixture.league.name}</p>
                    <p>{fixture.league.country}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Image
                      src={fixture.teams.home.logo}
                      alt={`${fixture.teams.home.name} logo`}
                      width={32}
                      height={32}
                    />
                    <p>{fixture.teams.home.name}</p>
                  </div>
                  <p className="font-bold">VS</p>
                  <div className="flex items-center space-x-2">
                    <Image
                      src={fixture.teams.away.logo}
                      alt={`${fixture.teams.away.name} logo`}
                      width={32}
                      height={32}
                    />
                    <p>{fixture.teams.away.name}</p>
                  </div>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  onClick={() =>
                    handlePredictionClick(
                      fixture.league.country,
                      fixture.league.name,
                      fixture.teams.home.name,
                      fixture.teams.away.name,
                      formattedDate
                    )
                  }
                >
                  Get Prediction using AI
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <Modal
        isOpen={
          !!selectedLeagueCountry &&
          !!selectedLeagueName &&
          !!selectedTeamHome &&
          !!selectedTeamAway &&
          !!selectedDate
        }
        onClose={closeModal}
      >
        {isLoadingPrediction ? (
          <div>Loading prediction...</div>
        ) : (
          <div>{prediction}</div>
        )}
      </Modal>
    </>
  )
}

export default Fixture
