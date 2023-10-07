import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../RootState"
import Button from "./Shared/Button"
import { deleteHabit } from "../Calendar/calendarSlice"

export default function DeleteHabit() {
  const currentHabit = useSelector(
    (state: RootState) => state.calendar.currentHabit
  )!
  const dispatch = useDispatch()
  return (
    <section className="fixed inset-0 flex-center">
      <div className="bg-white rounded-lg p-5 flex flex-col gap-4 items-center">
        <div className="">
          Are you sure you want to delete habit {currentHabit.name}. All the
          tracking will be lost
        </div>
        <div className="flex gap-4">
          <Button
            text="No"
            color="brand"
            onClick={() => dispatch(deleteHabit("no-delete"))}
          />
          <Button
            text="Delete"
            color="danger"
            onClick={() => dispatch(deleteHabit("delete"))}
          />
        </div>
      </div>
    </section>
  )
}
