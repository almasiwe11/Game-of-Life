import { Commands } from "../../../Types/ContextTypes"
import { useDate } from "../../../Context/DateContextProvider"

export default function AllTabs() {
  const { dispatch, dateState } = useDate()
  const { tabs } = dateState
  return (
    <div className=" flex-center gap-2 ">
      <div className="flex gap-2  w-full flex-wrap ">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`${
              dateState.currentTab === tab.name
                ? "border-blue text-blue bg-white"
                : "border-gray-dark text-white bg-gray-dark"
            }   border-2   py-2 cursor-pointer px-5 rounded-xl`}
            onClick={() =>
              dispatch({ type: Commands.SWITCHTAB, tabName: tab.name })
            }
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  )
}
