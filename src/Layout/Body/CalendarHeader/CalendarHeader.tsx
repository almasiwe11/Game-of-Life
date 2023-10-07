import { useDispatch, useSelector } from "react-redux"
import MonthSwitcher from "./MonthSwitcher"
import { RootState } from "../../../RootState"
import { format, parseJSON } from "date-fns"
import Button from "../../../Components/Shared/Button"
import { newHabit } from "../../../Calendar/calendarSlice"
import HabitsSelect from "./HabitsSelect"

export default function Header() {
  const calendar = useSelector((state: RootState) => state.calendar)
  const { today: todayState, allHabits } = calendar
  console.log(allHabits)
  const today = format(parseJSON(todayState), "MMMM yyyy")
  const dispatch = useDispatch()
  return (
    <div className="bg-dark py-5 flex justify-between items-center relative px-7">
      <div className="text-white text-3xl flex items-center gap-9 font-bold">
        <span> {today} </span>
        <HabitsSelect allHabits={allHabits} />
        <Button
          text="Create new Habit"
          color="light"
          onClick={() => {
            dispatch(newHabit())
          }}
        />
      </div>

      <MonthSwitcher />
    </div>
  )
}
