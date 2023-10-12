import { useDispatch, useSelector } from "react-redux"
import { HabitTab } from "../../../Types/CalendarType"
import { updateCurrentHabit } from "../../../Calendar/calendarSlice"
import { RootState } from "../../../RootState"

type Props = {
  allHabits: HabitTab[]
}

export default function HabitsSelect({ allHabits }: Props) {
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const dispatch = useDispatch()
  if (allHabits.length === 0) return

  function handleChange(habitName: string) {
    dispatch(updateCurrentHabit(habitName))
  }

  return (
    <select
      className="bg-gray-dark rounded-lg text-base text-white px-2"
      onChange={(e) => handleChange(e.target.value)}
      value={currentHabit?.name}
    >
      {allHabits.map((habit) => (
        <option key={habit.name}>{habit.name}</option>
      ))}
    </select>
  )
}
