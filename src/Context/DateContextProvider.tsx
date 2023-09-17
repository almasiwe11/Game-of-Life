import { createContext, useReducer, ReactNode, useContext } from "react"
import {
  DateStateType,
  ActionType,
  DateContextType,
  Commands,
} from "../Types/ContextTypes"
import { add, sub } from "date-fns"

const DateContext = createContext<DateContextType | null>(null)

const initalState: DateStateType = {
  today: new Date(),
  tabs: [],
  overlay: false,
  newTab: false,
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
      return {
        ...state,
        overlay: false,
        newTab: false,
        tabs: [...state.tabs, action.details],
      }
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
