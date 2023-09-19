import { isSameDay, parseJSON } from "date-fns"
import {
  TabTypes,
  MarkedDaysAny,
  FormTypes,
  MoodChecker,
  CellInfoAny,
} from "../../../../Types/TabTypes"
import {
  ActionType,
  Commands,
  DateStateType,
} from "../../../../Types/ContextTypes"
import { calcRating, calcGoalRating } from "./CalcRating"
function getModifiedRating({
  thisTab,
  rating,
}: {
  thisTab: TabTypes | undefined
  rating: number
}) {
  if (thisTab!.type === "moodchecker") {
    return rating === 8 ? 1 : rating! + 1
  } else if (thisTab!.type === "yes-no") {
    let right
    if (rating === 0) right = 3
    if (rating === 3) right = 7
    if (rating === 7) right = 2
    if (rating === 2) right = 3
    return right
  }
}

function getCellInfo({
  thisTab,
  rating,
  date,
  selectedDate,
  currentGoal,
  skipped,
  dayOff,
}: {
  thisTab: TabTypes | undefined
  rating: number
  date: Date
  selectedDate: Date
  currentGoal: number
  skipped: boolean
  dayOff: boolean
}) {
  const rightRating = getModifiedRating({ thisTab, rating })!
  const set = (thisTab as FormTypes & MoodChecker)!.settings
  let info
  if (thisTab?.type === "moodchecker") {
    info = {
      day: date,
      mood: rightRating,
      skippedRating: thisTab!.minRating,
      settings: set,
      rating: calcRating(set, rightRating, thisTab!.minRating, thisTab)!,
      streak: 0,
      week: { order: 3 },
    }
  } else if (thisTab?.type === "yes-no") {
    let rating: number
    if (rightRating === 0) rating = 0
    if (rightRating === 3) rating = thisTab.minRating
    else rating = thisTab.maxRating
    info = {
      day: date,
      streak: 0,
      mood: rightRating,
      rating: rating,
      week: { order: 3 },
    }
  } else if (thisTab?.type === "goal-number") {
    info = {
      day: selectedDate,
      streak: 0,
      rating: calcGoalRating(
        thisTab.goal,
        currentGoal,
        thisTab.minRating,
        thisTab.maxRating,
        skipped,
        dayOff
      ),
      settings: set,
      numberResult: currentGoal,
      goal: thisTab.goal,
      skipped: false,
      dayOff: false,
      week: { order: 3 },
    }
  }
  return info
}
function updateStorage(
  cellInfo: CellInfoAny,
  thisTab: TabTypes | undefined,
  dateState: DateStateType,
  currentTab: string,
  dispatch: (value: ActionType) => void
) {
  const oldTab: TabTypes = thisTab as TabTypes
  const update = oldTab.markedDays.some((marked) =>
    isSameDay(parseJSON(marked.day), cellInfo.day)
  )
  let newMarkedDays: MarkedDaysAny

  if (update) {
    newMarkedDays = oldTab.markedDays.map((marked) =>
      isSameDay(parseJSON(marked.day), cellInfo.day) ? cellInfo : marked
    ) as MarkedDaysAny
  } else {
    newMarkedDays = [...oldTab.markedDays, cellInfo!] as MarkedDaysAny
  }

  const newTab: TabTypes = {
    ...oldTab,
    markedDays: newMarkedDays,
  } as TabTypes

  const allNewTabs = dateState.tabs.map((tab) =>
    tab.name === currentTab ? newTab : tab
  )
  localStorage.setItem("tabs", JSON.stringify(allNewTabs))
  dispatch({ type: Commands.SAVECHANGE, allNewTabs: allNewTabs })
}

export { updateStorage, getCellInfo, getModifiedRating }
