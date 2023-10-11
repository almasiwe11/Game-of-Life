import { useDispatch } from "react-redux"
import { HabitTab } from "../../Types/CalendarType"
import LevelTracker from "../Body/CalendarHeader/LevelTracker"
import { openMarkDay, updateCurrentHabit } from "../../Calendar/calendarSlice"
import { isSameDay, isSameMonth, parseJSON } from "date-fns"
import { styleCell } from "../Body/Grid/styleCell"
import { Mood } from "../../Types/HabitTypes"

type Props = {
  habit: HabitTab
}

export default function TodayHabit({ habit }: Props) {
  const dispatch = useDispatch()
  const date = new Date()
  function handleClick() {
    dispatch(updateCurrentHabit(habit.name))
    dispatch(openMarkDay(JSON.stringify(date)))
  }

  const isMarked = habit.markedDays
    .find((day) => isSameMonth(parseJSON(day.month), date))
    ?.marked.find((day) => isSameDay(parseJSON(day.date), date))

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
