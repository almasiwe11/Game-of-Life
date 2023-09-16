import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { useDate } from "../../../Context/DateContextProvider"
import { Commands } from "../../../Types/ContextTypes"

export default function MonthSwitcher() {
  const { dispatch } = useDate()
  return (
    <div className="flex gap-1">
      <button
        className="bg-gray-dark p-2 rounded-full text-white"
        onClick={() => dispatch({ type: Commands.PREVMONTH })}
      >
        <AiOutlineLeft />
      </button>
      <span className="font-bold p-1 px-3 rounded-lg text-white">Month</span>
      <button
        className="bg-gray-dark p-2 rounded-full text-white"
        onClick={() => dispatch({ type: Commands.NEXTMONTH })}
      >
        <AiOutlineRight />
      </button>
    </div>
  )
}
