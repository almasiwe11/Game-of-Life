import { useDispatch } from "react-redux"
import { HabitTab } from "../../../Types/calendarType"
import { updateCurrentHabit } from "../../../Calendar/calendarSlice"

type Props = {
  allHabits: HabitTab[]
}

export default function HabitsSelect({ allHabits }: Props) {
  const dispatch = useDispatch()
  if (allHabits.length === 0) return

  function handleChange(habitName: string) {
    dispatch(updateCurrentHabit(habitName))
  }

  return (
    <select
      className="bg-gray-dark rounded-lg text-base text-white px-2"
      onChange={(e) => handleChange(e.target.value)}
    >
      {allHabits.map((habit) => (
        <option key={habit.name}>{habit.name}</option>
      ))}
    </select>
  )
}
