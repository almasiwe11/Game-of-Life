import { useDispatch, useSelector } from "react-redux"
import useCell from "../../../Hooks/useCell"
import { openMarkDay } from "../../../Calendar/calendarSlice"
import { RootState } from "../../../RootState"
import { isSameDay, isSameMonth, parseJSON } from "date-fns"
import { Mood } from "../../../Types/HabitTypes"
import { styleCell } from "./styleCell"

type PropTypes = {
  date: Date
}

export default function Cell({ date }: PropTypes) {
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const habit = currentHabit!
  const dispatch = useDispatch()
  const { outOfScope, isStartDay, isToday, formattedDay } = useCell(date)

  function handleClick() {
    if (outOfScope) return
    dispatch(openMarkDay(JSON.stringify(date)))
  }
  const isMarked = habit.markedDays
    .find((day) => isSameMonth(parseJSON(day.month), date))
    ?.marked.find((day) => isSameDay(parseJSON(day.date), date))

  const { bg, Icon } = styleCell(isMarked)

  return (
    <div
      className={`text-center text-white border border-border relative cursor-pointer flex-center `}
      onClick={handleClick}
      style={bg}
    >
      <span
        className={`absolute top-2 right-4 rounded-full h-6  w-6 ${
          isToday && "bg-red-600"
        } ${isStartDay && "bg-brand"} ${outOfScope && "text-gray-medium"}`}
      >
        {formattedDay}
      </span>
      {isMarked ? (
        <Icon
          className={`${
            isMarked!.mood >= Mood.Extraordinary ? "w-16 h-16" : "h-10 w-10"
          } `}
        />
      ) : (
        ""
      )}
    </div>
  )
}
