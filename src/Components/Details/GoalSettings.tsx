import { useState } from "react"
import { useDate } from "../../Context/DateContextProvider"
import { Commands } from "../../Types/ContextTypes"
import { FormTypes, GoalNumber } from "../../Types/TabTypes"
import { saveChanges } from "../Grid/MonthDays/Logic/updateStorage"

export default function GoalSettings() {
  const { dateState, dispatch } = useDate()
  const { settingsIsOpen, tabs, currentTab } = dateState
  const [goal, setGoal] = useState("")

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (Number(goal) === 0) return
    e.preventDefault()
    const thisTab = tabs.find((tab) => tab.name === currentTab)! as FormTypes &
      GoalNumber
    const newTab = { ...thisTab, goal: Number(goal) }
    const allNewTabs = tabs.map((tab) =>
      tab.name === currentTab ? newTab : tab
    )
    saveChanges(allNewTabs, dispatch)
    dispatch({ type: Commands.CLOSEDSETTINGS })
  }

  return (
    <div
      className={`fixed inset-0  ${
        settingsIsOpen ? "flex" : "hidden"
      } text-dark justify-center items-center z-50 `}
    >
      <form className="bg-white p-6 rounded-xl" onSubmit={handleSubmit}>
        <label htmlFor="newGoal" className="block text-sm mb-2">
          New Goal
        </label>
        <input
          type="number"
          min={0}
          name="newGoal"
          value={goal}
          className="border rounded-lg p-1.5"
          onChange={(e) => setGoal(e.target.value)}
        />
        <button
          type="submit"
          className="p-1.5 px-3 text-blue border border-blue rounded-lg ml-2"
        >
          Change Goal
        </button>
      </form>
    </div>
  )
}
