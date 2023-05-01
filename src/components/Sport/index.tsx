'use client'
import { useState } from 'react'
import SportForm from '../SportForm'
import Fixture from '../Fixture'

const Sport = () => {
  const [sport, setSport] = useState('')
  const [date, setDate] = useState('')

  const handleFormSubmit = async (
    selectedSport: string,
    selectedDate: string
  ) => {
    return new Promise<void>(resolve => {
      setSport(selectedSport)
      setDate(selectedDate)
      resolve()
    })
  }

  return (
    <>
      <div className="mx-auto max-w-screen-xl grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 md:col-span-1 h-screen">
          <SportForm onSubmitForm={handleFormSubmit} />
        </div>
        <div className="col-span-1 md:col-span-3 h-screen">
          {sport && date && <Fixture sport={sport} date={date} />}
        </div>
      </div>
    </>
  )
}

export default Sport
