import { format } from "date-fns"
import { useSelector } from "react-redux"
import { RootState } from "../../RootState"
import TodayHabit from "./TodayHabit"

export default function Today() {
  const today = format(new Date(), "d MMMM")
  const { allHabits } = useSelector((state: RootState) => state.calendar)
  return (
    <div className=" bg-dark text-white px-10 py-6 ">
      <div className="text-center font-bold text-3xl">{today}</div>
      <ul className="flex flex-col mt-8 gap-4">
        {allHabits.map((habit) => (
          <TodayHabit key={habit.name} habit={habit} />
        ))}
      </ul>
    </div>
  )
}
