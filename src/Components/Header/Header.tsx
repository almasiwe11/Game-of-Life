import { useDate } from "../../Context/DateContextProvider"
import { format } from "date-fns"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { BsPlusCircle } from "react-icons/bs"
import { Commands } from "../../Context/ContextTypes"

export default function Header() {
  const { dateState, dispatch } = useDate()
  const formattedDate = format(dateState.today, "MMMM y")
  return (
    <div className="bg-dark py-5 flex justify-between items-center relative  px-7">
      <span className="text-white text-3xl font-bold"> {formattedDate}</span>
      <div className="absolute flex gap-2 left-[50%] translate-x-[-50%]">
        <button className="bg-gray-dark text-white py-2 cursor-pointer px-5 rounded-xl">
          Coding
        </button>
        <button className=" text-white self-center h-6 flex-center w-6 cursor-pointer  rounded-full ">
          <BsPlusCircle className="w-6 h-6" />
        </button>
      </div>
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
    </div>
  )
}
