import { useState } from "react"
import { format } from "date-fns"
import { useSelector } from "react-redux"
import { RootState } from "../../RootState"
import DatePicker from "react-datepicker"
import TodayHabit from "./TodayHabit"
import { HabitTab } from "../../Types/CalendarType"

export default function Today() {
  const { allHabits } = useSelector((state: RootState) => state.calendar)
  const [date, setDate] = useState(new Date())
  const today = format(date, "d MMMM")
  return (
    <div className=" bg-dark text-white px-10 py-6 ">
      <div className="text-center font-bold text-3xl">{today}</div>
      <ul className="flex flex-col mt-8 gap-4">
        <DatePicker
          selected={date}
          className="p-1.5 px-3 border-2 cursor-pointer border-dark rounded-lg text-black  focus:outline-brand"
          onChange={(date) => {
            setDate(date!)
          }}
          maxDate={new Date()}
        />
        {allHabits.map((habit: HabitTab) => (
          <TodayHabit key={habit.name} habit={habit} observedDate={date} />
        ))}
      </ul>
    </div>
  )
}
