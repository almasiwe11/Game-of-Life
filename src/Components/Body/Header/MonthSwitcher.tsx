import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { subMonth } from "../../../Calendar/calendarSlice"
import { useDispatch } from "react-redux"

export default function MonthSwitcher() {
  const dispatch = useDispatch()

  return (
    <div className="flex gap-1">
      <button
        className="bg-gray-dark p-2 rounded-full text-white"
        onClick={() => {
          dispatch(subMonth())
        }}
      >
        <AiOutlineLeft />
      </button>
      <span className="font-bold p-1 px-3 rounded-lg text-white">Month</span>
      <button
        className="bg-gray-dark p-2 rounded-full text-white"
        onClick={() => {
          dispatch(subMonth())
        }}
      >
        <AiOutlineRight />
      </button>
    </div>
  )
}
