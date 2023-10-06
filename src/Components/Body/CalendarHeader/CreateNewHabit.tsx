import { useDispatch } from "react-redux"
import Button from "../../Shared/Button"
import { newHabit } from "../../../Calendar/calendarSlice"

export default function CreateNewHabit() {
  const dispatch = useDispatch()
  return (
    <div
      className="text-white"
      onClick={() => {
        dispatch(newHabit())
      }}
    >
      <Button text="Create new Habit" color="light" />
    </div>
  )
}
