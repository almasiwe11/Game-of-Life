import { useDispatch, useSelector } from "react-redux"
import { deleteHabit, newHabit } from "../../Calendar/calendarSlice"
import Button from "../../Components/Shared/Button"
import HabitsSelect from "../Body/CalendarHeader/HabitsSelect"
import { RootState } from "../../RootState"

export default function Header() {
  const dispatch = useDispatch()
  const calendar = useSelector((state: RootState) => state.calendar)
  const { allHabits } = calendar
  return (
    <section className=" row-start-1 col-start-2 flex items-center ">
      <div className="flex items-stretch justify-between w-full px-7">
        <Button
          text="new Habit"
          color="light"
          onClick={() => {
            dispatch(newHabit())
          }}
        />
        <HabitsSelect allHabits={allHabits} />
        {allHabits.length > 0 && (
          <Button
            text="delete Habit"
            color="danger"
            onClick={() => {
              dispatch(deleteHabit("try-delete"))
            }}
          />
        )}
      </div>
    </section>
  )
}
