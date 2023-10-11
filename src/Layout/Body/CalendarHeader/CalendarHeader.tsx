import { useSelector } from "react-redux"
import MonthSwitcher from "./MonthSwitcher"
import { RootState } from "../../../RootState"
import { format, parseJSON } from "date-fns"
import LevelTracker from "./LevelTracker"

export default function CalendarHeader() {
  const calendar = useSelector((state: RootState) => state.calendar)
  const { today: todayState, currentHabit } = calendar
  const today = format(parseJSON(todayState), "MMMM yyyy")
  return (
    <div className="bg-dark py-5 flex justify-between items-center relative px-7">
      <div className="text-white text-3xl flex items-center gap-9 font-bold">
        <span> {today} </span>
      </div>
      {currentHabit && <LevelTracker habit={currentHabit} />}
      <MonthSwitcher />
    </div>
  )
}
