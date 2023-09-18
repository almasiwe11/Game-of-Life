import { Dispatch } from "react"
import { TabTypes, TabVariations } from "./TabTypes"

type DateStateType = {
  today: Date
  tabs: TabTypes[]
  overlay: boolean
  newTab: boolean
  currentTab: string
  addGoal: boolean
  selectedDate: Date
  currentGoal: number
}

const enum Commands {
  NEXTMONTH,
  PREVMONTH,
  NEWTAB,
  TABINFO,
  SWITCHTAB,
  SAVECHANGE,
  SELECTDAY,
  SUBMITGOAL,
  GOALSUBMITTED,
}

type ActionType = {
  type: Commands
  details?: TabTypes
  tabName?: string
  tabType?: TabVariations
  allNewTabs?: TabTypes[]
  day?: Date
  goal?: number
}

type DispatchType = Dispatch<ActionType>

type DateContextType = {
  dateState: DateStateType
  dispatch: DispatchType
}

export type { DateStateType, DateContextType, ActionType }
export { Commands }
