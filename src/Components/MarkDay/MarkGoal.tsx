import { useSelector } from "react-redux"
import Button from "../Shared/Button"
import { RootState } from "../../RootState"

export default function MarkGoal() {
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const habit = currentHabit!
  console.log(habit)

  return (
    <div className="flex gap-6 items-end justify-center">
      <div className="flex flex-col gap-1">
        <p className="">Goal - {habit.goal}</p>
        <input
          type="number"
          placeholder="result"
          name="result"
          className="border border-dark p-2 px-3 rounded-lg"
        />
      </div>
      <Button text="Skipped" color="danger" />
    </div>
  )
}
