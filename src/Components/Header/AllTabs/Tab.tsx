import { useState, useEffect } from "react"
import { useDate } from "../../../Context/DateContextProvider"
import { Commands } from "../../../Types/ContextTypes"
import { TabTypes } from "../../../Types/TabTypes"
import { AiFillCloseCircle } from "react-icons/ai"
import { saveChanges } from "../../Grid/MonthDays/Logic/updateStorage"

export default function Tab({ tab }: { tab: TabTypes }) {
  const [deletion, setDeletion] = useState({ delete: false, sure: false })
  const { dispatch, dateState } = useDate()
  function handleDelete() {
    setDeletion({ sure: false, delete: true })
    dispatch({ type: Commands.OVERLAYON })
  }

  useEffect(() => {
    if (deletion.sure === true) {
      const oldTabs = dateState.tabs
      const newTabs = oldTabs.filter((tab) => tab.name !== dateState.currentTab)
      saveChanges(newTabs, dispatch)
      dispatch({ type: Commands.OVERLAYOFF })
      dispatch({ type: Commands.SETCURRENTTAB })
      setDeletion({ delete: false, sure: false })
    }
  }, [deletion, dateState.currentTab, dateState.tabs, dispatch])

  return (
    <>
      <button
        className={`${
          dateState.currentTab === tab.name
            ? "border-blue text-blue bg-white"
            : "border-gray-dark text-white bg-gray-dark"
        }   border-2   py-2 cursor-pointer px-5 rounded-xl relative group`}
        onClick={() =>
          dispatch({ type: Commands.SWITCHTAB, tabName: tab.name })
        }
      >
        {tab.name}
        <span
          onClick={handleDelete}
          className="absolute top-0 right-0 invisible text-lg group-hover:visible hover:text-red-500 text-blue "
        >
          {" "}
          <AiFillCloseCircle />
        </span>
      </button>

      <div
        className={`${
          deletion.delete ? "flex-center " : "hidden"
        } fixed inset-0 z-50`}
      >
        <div className="bg-white p-7 rounded-xl">
          <span className="">
            Are you sure you want to delete {tab.name}? All the progress and
            tracking will be lost
          </span>
          <div className="flex-center gap-2 mt-3 ">
            <button
              className="border border-red-500 bg-red-500 hover:bg-white p-1.5 px-3 rounded-lg"
              onClick={() => setDeletion({ delete: true, sure: true })}
            >
              Yes
            </button>
            <button
              className="border border-blue bg-blue hover:bg-white p-1.5 px-3 rounded-lg"
              onClick={() => {
                setDeletion({ delete: false, sure: false })
                dispatch({ type: Commands.OVERLAYOFF })
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
