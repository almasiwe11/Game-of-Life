import { Dispatch } from "react"
import { TabTypes, TabVariations } from "./TabTypes"

type DateStateType = {
  today: Date
  tabs: TabTypes[]
  overlay: boolean
  newTab: boolean
  currentTab: string
  selectedDate: Date
  goalInfo: GoalInfo
  currentMonthStats: WeekInfo[]
  skipped: boolean
}

type WeekInfo = {
  week: number
  ratings: number[]
}

type GoalInfo = {
  addGoal: boolean
  currentGoal: number
  dayOff: boolean
  skipped: boolean
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
  SKIPPED,
  SKIPUPDATED,
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
