import { useDispatch } from "react-redux"
import MarkDay from "../../../Components/MarkDay/MarkDay"
import useCell from "../../../Hooks/useCell"
import { openMarkDay } from "../../../Calendar/calendarSlice"

type PropTypes = {
  date: Date
}

export default function Cell({ date }: PropTypes) {
  const dispatch = useDispatch()
  const { outOfScope, isStartDay, isToday, formattedDay } = useCell(date)

  function handleClick() {
    if (!outOfScope) {
      dispatch(openMarkDay(JSON.stringify(date)))
    }
  }

  return (
    <div
      className="text-center text-white  border border-border relative cursor-pointer"
      onClick={handleClick}
    >
      <span
        className={`absolute top-2 right-4 rounded-full h-6  w-6 ${
          isToday && "bg-red-600"
        } ${isStartDay && "bg-brand"} ${outOfScope && "text-gray-medium"}`}
      >
        {formattedDay}
      </span>
    </div>
  )
}
