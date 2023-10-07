import { format, isAfter, isBefore, isSameDay, parseJSON } from "date-fns"
import { useSelector } from "react-redux"
import { RootState } from "../../../RootState"

type PropTypes = {
  date: Date
}

export default function Cell({ date }: PropTypes) {
  const formattedDay = format(date, "d")
  const isToday = isSameDay(new Date(), date)

  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const { startDate: startDateState } = currentHabit!
  const startDate = parseJSON(startDateState)
  const isStartDay = isSameDay(startDate, date)
  const isBeforeStartDay = isBefore(date, startDate) && !isStartDay
  const isAfterToday = isAfter(date, new Date())
  const outOfScope = isBeforeStartDay || isAfterToday

  function handleClick() {
    if (!outOfScope) {
      console.log("hello there")
    }
  }

  return (
    <div
      className="text-center text-white  border border-border relative cursor-pointer"
      onClick={handleClick}
    >
      <span
        className={`absolute top-2 right-4 rounded-full h-6  w-6 ${
          isToday && "bg-red-600"
        } ${isStartDay && "bg-brand"} ${outOfScope && "text-gray-medium"}`}
      >
        {formattedDay}
      </span>
    </div>
  )
}
