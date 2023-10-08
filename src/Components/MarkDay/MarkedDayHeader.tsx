import { useSelector } from "react-redux"
import { RootState } from "../../RootState"
import { format, parseJSON } from "date-fns"

export default function MarkedDayHeader() {
  const { selectedDay, currentHabit } = useSelector(
    (state: RootState) => state.calendar
  )
  const habit = currentHabit!
  const markingDay = format(parseJSON(selectedDay), "d MMMM")
  return (
    <div className="flex justify-center items-center gap-1">
      <span className="text-brand">{habit.name} - </span>
      <p className="text-center font-bold text-xl"> {markingDay}</p>
    </div>
  )
}
