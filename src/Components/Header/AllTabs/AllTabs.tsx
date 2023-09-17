import { BsPlusCircle } from "react-icons/bs"
import { Commands } from "../../../Types/ContextTypes"
import { useDate } from "../../../Context/DateContextProvider"

export default function AllTabs() {
  const { dispatch, dateState } = useDate()
  const { tabs } = dateState
  return (
    <div className="absolute flex gap-2 left-[50%] translate-x-[-50%]">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className="bg-gray-dark text-white py-2 cursor-pointer px-5 rounded-xl"
          onClick={() =>
            dispatch({ type: Commands.SWITCHTAB, tabName: tab.name })
          }
        >
          {tab.name}
        </button>
      ))}

      <button
        className=" text-white self-center h-6 flex-center w-6 cursor-pointer  rounded-full"
        onClick={() => dispatch({ type: Commands.NEWTAB })}
      >
        <BsPlusCircle className="w-6 h-6" />
      </button>
    </div>
  )
}
