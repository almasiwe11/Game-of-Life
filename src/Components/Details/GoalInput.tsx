import { FiSettings } from "react-icons/fi"
import { TabTypes } from "../../Types/TabTypes"
import { Commands, DispatchType } from "../../Types/ContextTypes"
import { KeyboardEvent } from "react"

type PropTypes = {
  thisTab: TabTypes | undefined
  setGoal: React.Dispatch<React.SetStateAction<string>>
  goal: string
  dispatch: DispatchType
}

export default function GoalInput({
  thisTab,
  goal,
  setGoal,
  dispatch,
}: PropTypes) {
  function handleEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setGoal("")
      dispatch({ type: Commands.SUBMITGOAL, goal: Number(goal) })
    }
  }
  function handleSkip() {
    dispatch({ type: Commands.SKIPPED })
  }

  return (
    <>
      {thisTab?.type === "goal-number" && (
        <div className="flex-center flex-col  mt-4 gap-3">
          <span className="text-2xl text-blue">
            Goal for today {thisTab.goal}
          </span>

          <div className="flex gap-2 ">
            <span className="self-center">Result</span>
            <input
              className="p-1 px-2 rounded-lg outline-transparent text-black  focus:outline-blue"
              type="number"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              onKeyDown={handleEnter}
            ></input>
            <button
              onClick={handleSkip}
              className="p-1 5 px-3 font-bold bg-red-500 text-black cursor-pointer rounded-lg"
            >
              Skipped
            </button>
            <button
              className="self-stretch w-6 flex-center"
              onClick={() => dispatch({ type: Commands.OPENSETTINGS })}
            >
              <FiSettings className="text-red h-full w-full" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
