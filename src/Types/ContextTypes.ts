import { Dispatch } from "react"
import { TabTypes, TabVariations } from "./TabTypes"

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
  SAVECHANGE,
}

type ActionType = {
  type: Commands
  details?: TabTypes
  tabName?: string
  tabType?: TabVariations
  allNewTabs?: TabTypes[]
}

type DispatchType = Dispatch<ActionType>

type DateContextType = {
  dateState: DateStateType
  dispatch: DispatchType
}

export type { DateStateType, DateContextType, ActionType }
export { Commands }
