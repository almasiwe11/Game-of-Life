/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Controller, FieldValues, Control } from "react-hook-form"
import DatePicker from "react-datepicker"

type Props = {
  control: Control<FieldValues, any>
}

export default function StartDate({ control }: Props) {
  const [startDate, setStartDate] = useState(new Date())
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor="startDate" className="px-3">
        Starting Date
      </label>
      <Controller
        name="startDate"
        control={control}
        defaultValue={new Date()}
        render={({ field }) => (
          <DatePicker
            {...field}
            selected={startDate}
            className="p-1.5 px-3 border-2 border-dark rounded-lg w-full focus:outline-brand"
            onChange={(date) => {
              setStartDate(date!)
              field.onChange(date)
            }}
          />
        )}
      />
    </div>
  )
}
