import { Dispatch } from "react"
import { TabTypes } from "./TabTypes"

type DateStateType = {
  today: Date
  tabs: TabTypes[]
  overlay: boolean
  newTab: boolean
  currentTab: string
}

const enum Commands {
  NEXTMONTH,
  PREVMONTH,
  NEWTAB,
  TABINFO,
  SWITCHTAB,
}

type ActionType = {
  type: Commands
  details?: TabTypes
  tabName?: string
}

type DispatchType = Dispatch<ActionType>

type DateContextType = {
  dateState: DateStateType
  dispatch: DispatchType
}

export type { DateStateType, DateContextType, ActionType }
export { Commands }
