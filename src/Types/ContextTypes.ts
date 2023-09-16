import { Dispatch } from "react"
import { TabTypes } from "./TabTypes"

type DateStateType = {
  today: Date
  tabs: TabTypes[]
  overlay: boolean
  newTab: boolean
}

const enum Commands {
  NEXTMONTH,
  PREVMONTH,
  NEWTAB,
}

type ActionType = {
  type: Commands
}

type DispatchType = Dispatch<ActionType>

type DateContextType = {
  dateState: DateStateType
  dispatch: DispatchType
}

export type { DateStateType, DateContextType, ActionType }
export { Commands }
