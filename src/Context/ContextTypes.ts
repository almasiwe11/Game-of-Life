import { Dispatch } from "react"

type DateStateType = {
  today: Date
}

const enum Commands {
  NEXTMONTH,
  PREVMONTH,
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
