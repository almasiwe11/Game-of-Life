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
  weekStat: WeekStat[]
  settingsIsOpen: boolean
}

type WeekStat = {
  week: number
  completed: number
  outOf: number
  avg: number
  total: number
  goalAvg: number
  goalTotal: number
  avgDesired: number
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
  WEEKSTATS,
  OPENSETTINGS,
  CLOSEDSETTINGS,
  OVERLAYON,
  OVERLAYOFF,
  SETCURRENTTAB,
}

type ActionType = {
  type: Commands
  details?: TabTypes
  tabName?: string
  tabType?: TabVariations
  allNewTabs?: TabTypes[]
  day?: Date
  goal?: number
  weekStats?: WeekStat[]
}

type DispatchType = Dispatch<ActionType>

type DateContextType = {
  dateState: DateStateType
  dispatch: DispatchType
}

export type {
  DateStateType,
  DateContextType,
  ActionType,
  WeekStat,
  DispatchType,
}
export { Commands }
