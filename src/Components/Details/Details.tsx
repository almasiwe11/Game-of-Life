import { useDate } from "../../Context/DateContextProvider"
import { KeyboardEvent, useState } from "react"
import { format } from "date-fns"
import { Commands } from "../../Types/ContextTypes"

export default function Details() {
  const { dateState, dispatch } = useDate()
  const { selectedDate, currentTab } = dateState
  const thisTab = dateState.tabs.find((tab) => tab.name === currentTab)
  const formattedDay = format(selectedDate, "do MMMM")
  const [goal, setGoal] = useState("")

  function handleEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setGoal("")
      dispatch({ type: Commands.SUBMITGOAL, goal: Number(goal) })
    }
  }
  return (
    <div className="bg-dark self-stretch w-full">
      <div className="p-8 text-white">
        <h1 className="text-3xl font-bold text-center">
          Details of {formattedDay}{" "}
        </h1>

        {thisTab?.type === "goal-number" && (
          <div className="flex-center flex-col  mt-4 gap-3">
            <span className="text-2xl">Goal {thisTab.goal}</span>

            <div className="flex gap-2  ">
              <span className="">Result</span>
              <input
                className="p-1 px-2 rounded-lg outline-transparent text-black  focus:outline-blue"
                type="number"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onKeyDown={handleEnter}
              ></input>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
