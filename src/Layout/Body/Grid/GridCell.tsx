import { useDispatch, useSelector } from "react-redux"
import useCell from "../../../Hooks/useCell"
import { openMarkDay } from "../../../Calendar/calendarSlice"
import { RootState } from "../../../RootState"
import { isSameDay, isSameMonth, parseJSON } from "date-fns"
import { moodIcons } from "../../../Icons/Icons"
import { IconType } from "react-icons"
import { Mood } from "../../../Types/HabitTypes"

type PropTypes = {
  date: Date
}

export default function Cell({ date }: PropTypes) {
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const habit = currentHabit!
  const dispatch = useDispatch()
  const { outOfScope, isStartDay, isToday, formattedDay } = useCell(date)

  function handleClick() {
    if (!outOfScope) {
      dispatch(openMarkDay(JSON.stringify(date)))
    }
  }

  const isMarked = habit.markedDays
    .find((day) => isSameMonth(parseJSON(day.month), date))
    ?.marked.find((day) => isSameDay(parseJSON(day.date), date))

  let Icon!: IconType
  let background!: string
  if (isMarked) {
    if (isMarked.mood >= Mood.Extraordinary) {
      Icon = moodIcons[moodIcons.length - 1].icon
      background = moodIcons[moodIcons.length - 1].bg
    } else if (
      isMarked.mood >= Mood.Perfect &&
      isMarked.mood < Mood.Extraordinary
    ) {
      Icon = moodIcons[Mood.Perfect].icon
      background = moodIcons[Mood.Perfect].bg
    } else {
      Icon = moodIcons[isMarked.mood].icon
      background = moodIcons[isMarked.mood].bg
    }
  }

  const bg = {
    backgroundColor: isMarked ? background : "rgb(30, 31, 33)",
  }

  return (
    <div
      className={`text-center text-white border border-border relative cursor-pointer flex-center ${
        isMarked ? `bg-${background}` : "bg-dark"
      }`}
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
