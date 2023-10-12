import { useDispatch } from "react-redux"
import {
  HabitTab,
  MarkedDaysOfMonth,
  MarkedHabit,
} from "../../Types/CalendarTypes"
import LevelTracker from "../Body/CalendarHeader/LevelTracker"
import { openMarkDay, updateCurrentHabit } from "../../Calendar/calendarSlice"
import { isAfter, isSameDay, isSameMonth, parseJSON } from "date-fns"
import { styleCell } from "../Body/Grid/styleCell"
import { Mood } from "../../Types/HabitTypes"

type Props = {
  habit: HabitTab
  observedDate: Date
}

export default function TodayHabit({ habit, observedDate }: Props) {
  const dispatch = useDispatch()
  function handleClick() {
    dispatch(updateCurrentHabit(habit.name))
    dispatch(openMarkDay(JSON.stringify(observedDate)))
  }

  if (isAfter(parseJSON(habit.startDate), observedDate)) return

  const isMarked = habit.markedDays
    .find((day: MarkedHabit) => isSameMonth(parseJSON(day.month), observedDate))
    ?.marked.find((day: MarkedDaysOfMonth) =>
      isSameDay(parseJSON(day.date), observedDate)
    )

  const { bg, Icon } = styleCell(isMarked)

  return (
    <div
      className="border border-brand rounded-full px-6 py-2 grid grid-cols-todayHabit gap-4 items-center cursor-pointer"
      onClick={handleClick}
    >
      <div className="rounded-full w-20 h-20 flex-center border" style={bg}>
        {isMarked && (
          <Icon
            className={`${
              isMarked!.mood >= Mood.Extraordinary ? "w-14 h-14" : "h-10 w-10"
            } `}
          />
        )}
      </div>
      <div className="text-white font-semibold text-2xl ml-4">{habit.name}</div>
      <div className="">
        <LevelTracker habit={habit} />
      </div>
    </div>
  )
}
