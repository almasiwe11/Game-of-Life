import { useSelector } from "react-redux"
import Button from "../Shared/Button"
import { RootState } from "../../RootState"
import { format, parseJSON } from "date-fns"

export default function MarkDay() {
  const { selectedDay, currentHabit } = useSelector(
    (state: RootState) => state.calendar
  )
  const markingDay = format(parseJSON(selectedDay), "d MMMM")

  return (
    <div className="fixed z-50 inset-0 w-2/3 mx-auto py-16">
      <div className="bg-white p-6 rounded-xl">
        <div className="flex justify-center items-center gap-1">
          <span className="text-brand">{currentHabit?.name} - </span>
          <p className="text-center font-bold text-xl"> {markingDay}</p>
        </div>
        <Button text="Mark Day" color="brand" />
      </div>
    </div>
  )
}
