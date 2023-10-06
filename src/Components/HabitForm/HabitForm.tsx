import { useDispatch } from "react-redux"
import Button from "../Shared/Button"
import { createHabit } from "../../Calendar/calendarSlice"

export default function HabitForm() {
  const dispatch = useDispatch()
  return (
    <form className="z-50 fixed inset-0">
      HabitForm
      <div onClick={() => dispatch(createHabit())}>
        <Button text="create-habit" color="light" />
      </div>
    </form>
  )
}
