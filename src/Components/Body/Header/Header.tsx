import { useSelector } from "react-redux"
import MonthSwitcher from "./MonthSwitcher"
import { RootState } from "../../../RootState"
import { parseJSON } from "date-fns"

export default function Header() {
  const todayState = useSelector((state: RootState) => state.calendar.today)
  const today = parseJSON(todayState)
  return (
    <div className="bg-dark py-5 flex justify-between items-center relative  px-7">
      <span className="text-white text-3xl font-bold"></span>
      <div className="absolute left-[50%] translate-x-[-50%]">
        <button className="bg-gray-dark text-white py-2 cursor-pointer px-5 rounded-xl">
          Coding
        </button>
      </div>
      <MonthSwitcher />
    </div>
  )
}
