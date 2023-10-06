import { useSelector } from "react-redux"
import MonthSwitcher from "./MonthSwitcher"
import { RootState } from "../../../RootState"
import { format, parseJSON } from "date-fns"
import CreateNewHabit from "./CreateNewHabit"

export default function Header() {
  const todayState = useSelector((state: RootState) => state.calendar.today)
  const today = format(parseJSON(todayState), "MMMM yyyy")
  return (
    <div className="bg-dark py-5 flex justify-between items-center relative px-7">
      <div className="text-white text-3xl flex items-center gap-9 font-bold">
        <span> {today} </span>
        <CreateNewHabit />
      </div>

      <MonthSwitcher />
    </div>
  )
}
