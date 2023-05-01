'use client'
import React, { useState } from 'react'
// @ts-ignore
import { z, ZodError } from 'zod'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const today = new Date()
today.setHours(0, 0, 0, 0)

const schema = z.object({
  sport: z.string().nonempty('Please select a sport'),
  date: z.date().min(today, {
    message: 'Please select a date from today or later',
  }),
})

type FormValues = z.infer<typeof schema>

interface Props {
  onSubmitForm: (sport: string, date: string) => void
}

const SportForm = ({ onSubmitForm }: Props) => {
  const [values, setValues] = useState<FormValues>({
    sport: '',
    date: new Date(),
  })
  const [errors, setErrors] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSportChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setValues({ ...values, sport: event.target.value })
  }

  const handleDateChange = (date: Date) => {
    setValues({ ...values, date })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = schema.safeParse(values)
    if (result.success) {
      const date = values.date.toISOString().slice(0, 10)
      setErrors([])
      setIsSubmitting(true)
      await onSubmitForm(values.sport, date)
      setIsSubmitting(false)
    } else {
      const errorMessages = result.error.errors.map(
        (error: ZodError) => error.message
      )
      setErrors(errorMessages)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center"
    >
      <div className="w-full md:w-2/4">
        <label htmlFor="sport" className="block text-gray-700 font-bold mb-2">
          Select a sport:
        </label>
        <select
          id="sport"
          name="sport"
          value={values.sport}
          onChange={handleSportChange}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-4"
        >
          <option value="">Select a sport</option>
          <option value="soccer">Soccer</option>
          {/* <option value="basketball">Basketball</option> */}
        </select>
      </div>

      <div className="w-full md:w-2/4">
        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
          Select a date:
        </label>
        <DatePicker
          id="date"
          name="date"
          selected={values.date}
          onChange={handleDateChange}
          minDate={today}
          className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-4 mx-auto"
        />
      </div>

      {errors.length > 0 && (
        <ul className="text-red-500">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
        disabled={isSubmitting}
      >
        Get Fixture
      </button>
    </form>
  )
}

export default SportForm
