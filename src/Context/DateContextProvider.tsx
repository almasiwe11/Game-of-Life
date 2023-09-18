import { createContext, useReducer, ReactNode, useContext } from "react"
import {
  DateStateType,
  ActionType,
  DateContextType,
  Commands,
} from "../Types/ContextTypes"
import { add, sub } from "date-fns"

const DateContext = createContext<DateContextType | null>(null)

const tabFromStorage = JSON.parse(localStorage.getItem("tabs") || "[]")

const initalState: DateStateType = {
  today: new Date(),
  tabs: tabFromStorage,
  overlay: false,
  newTab: false,
  currentTab: tabFromStorage.length > 0 ? tabFromStorage[0].name : "",
  addGoal: false,
  selectedDate: new Date(),
  currentGoal: 0,
}

function reduce(state: DateStateType, action: ActionType): DateStateType {
  switch (action.type) {
    case Commands.NEXTMONTH: {
      return { ...state, today: add(state.today, { months: 1 }) }
    }
    case Commands.PREVMONTH: {
      return { ...state, today: sub(state.today, { months: 1 }) }
    }
    case Commands.NEWTAB: {
      return { ...state, overlay: true, newTab: true }
    }
    case Commands.TABINFO: {
      if (action.details === undefined) throw new Error("Tab details expected")
      localStorage.setItem(
        "tabs",
        JSON.stringify([...state.tabs, action.details])
      )

      return {
        ...state,
        overlay: false,
        newTab: false,
        currentTab: action.details.name,
        tabs: [...state.tabs, action.details],
      }
    }
    case Commands.SWITCHTAB: {
      if (action.tabName === undefined) throw new Error("Tab Name expected")
      return { ...state, currentTab: action.tabName }
    }

    case Commands.SAVECHANGE: {
      if (action.allNewTabs === undefined)
        throw new Error("All new Tabs expected")
      return { ...state, tabs: action.allNewTabs }
    }

    case Commands.SELECTDAY: {
      if (action.day === undefined) throw new Error("Date expected")
      return { ...state, selectedDate: action.day }
    }

    case Commands.SUBMITGOAL: {
      if (action.goal === undefined) throw new Error("Goal expected")
      return { ...state, currentGoal: action.goal, addGoal: true }
    }

    case Commands.GOALSUBMITTED: {
      return { ...state, currentGoal: 0, addGoal: false }
    }

    default:
      throw new Error("action type not found it should be one of Command enum")
  }
}

function DateContextProvider({ children }: { children: ReactNode }) {
  const [dateState, dispatch] = useReducer(reduce, initalState)

  return (
    <DateContext.Provider value={{ dispatch, dateState }}>
      {children}
    </DateContext.Provider>
  )
}

function useDate() {
  const context = useContext(DateContext)
  if (context === null)
    throw new Error("useDate should be use inside a provider")
  return context
}

export { DateContextProvider, useDate }
