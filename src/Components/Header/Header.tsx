import AllTabs from "./AllTabs/AllTabs"
import CurrentMonth from "./CurrentMonth/CurrentMonth"
import { BsPlusCircle } from "react-icons/bs"
import { Commands } from "../../Types/ContextTypes"

import MonthSwitcher from "./MonthSwitcher/MonthSwitcher"
import { useDate } from "../../Context/DateContextProvider"

export default function Header() {
  const { dispatch } = useDate()
  return (
    <div className="bg-dark px-7 py-5 flex flex-col gap-4 justify-center">
      <div className=" flex justify-between items-center  ">
        <CurrentMonth />
        <button
          className=" text-white self-center h-6 flex-center w-6 cursor-pointer  rounded-full"
          onClick={() => dispatch({ type: Commands.NEWTAB })}
        >
          <BsPlusCircle className="w-6 h-6" />
        </button>
        <MonthSwitcher />
      </div>
      <AllTabs />
    </div>
  )
}
