import {
  isSameDay,
  parseJSON,
  getWeekOfMonth,
  startOfMonth,
  isSameMonth,
} from "date-fns"
import {
  TabTypes,
  MarkedDaysAny,
  FormTypes,
  MoodChecker,
  CellInfoAny,
  MonthStats,
  WeekInfo,
  DayInfo,
  Mood,
  MarkedGoalNumber,
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
    return rating === Mood.PERFECT ? Mood.SKIPPED : rating! + 1
  } else if (thisTab!.type === "yes-no") {
    let right
    if (rating === Mood.QUESTION) right = Mood.ANGRY
    if (rating === Mood.ANGRY) right = Mood.GREAT
    if (rating === Mood.GREAT) right = Mood.ANGRY
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
  skip,
}: {
  thisTab: TabTypes | undefined
  rating: number
  date: Date
  selectedDate: Date
  currentGoal: number
  skipped: boolean
  dayOff: boolean
  skip: boolean
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
    }
  } else if (thisTab?.type === "yes-no") {
    let rating: number
    if (rightRating === Mood.QUESTION) rating = 0
    if (rightRating === Mood.ANGRY) rating = thisTab.minRating
    else rating = thisTab.maxRating
    info = {
      day: date,
      streak: 0,
      mood: rightRating,
      rating: rating,
    }
  } else if (thisTab?.type === "goal-number") {
    info = {
      day: selectedDate,
      streak: 0,
      rating: skip
        ? thisTab.minRating
        : calcGoalRating(
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
      skipped: skip,
      dayOff: false,
    }
  }
  return info
}
function updateStorage(
  thisTab: TabTypes | undefined,
  dateState: DateStateType,
  currentTab: string,
  dispatch: (value: ActionType) => void,
  index: number,
  date: Date,
  rating: number,
  selectedDate: Date,
  currentGoal: number,
  skipped: boolean,
  dayOff: boolean
) {
  const skip = dateState.skipped
  const cellInfo: CellInfoAny = getCellInfo({
    thisTab,
    rating,
    date,
    selectedDate,
    currentGoal,
    skipped,
    dayOff,
    skip,
  })!
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

  const weekOrder = Math.floor(index / 7) + 1
  const goalWeekOrder = getWeekOfMonth(selectedDate, { weekStartsOn: 1 })

  const newTab: TabTypes = {
    ...oldTab,
    markedDays: newMarkedDays,
    monthStats:
      thisTab!.type === "goal-number"
        ? updateMonthStats({
            weekOrder: goalWeekOrder,
            thisTab,
            date: selectedDate,
            cellInfo,
          })
        : updateMonthStats({ weekOrder, thisTab, date, cellInfo }),
  } as TabTypes

  const allNewTabs = dateState.tabs.map((tab) =>
    tab.name === currentTab ? newTab : tab
  )

  saveChanges(allNewTabs, dispatch)
}

function saveChanges(
  allNewTabs: TabTypes[],
  dispatch: (value: ActionType) => void
) {
  localStorage.setItem("tabs", JSON.stringify(allNewTabs))
  dispatch({ type: Commands.SAVECHANGE, allNewTabs: allNewTabs })
}

function updateMonthStats({
  weekOrder,
  thisTab,
  date,
  cellInfo,
}: {
  weekOrder: number
  thisTab: TabTypes | undefined
  date: Date
  cellInfo: CellInfoAny
}) {
  const currentYearMonth = startOfMonth(date)
  const oldMonthStats = thisTab!.monthStats
  let newMonthStats: MonthStats[]

  const updateMonthStats = oldMonthStats.find((month) =>
    isSameMonth(parseJSON(month.yearMonth), currentYearMonth)
  )

  const numbCellInfo = cellInfo as MarkedGoalNumber

  const dayInfo: DayInfo = {
    day: date,
    rate: cellInfo.rating,
    numberResult:
      thisTab!.type === "goal-number" ? numbCellInfo.numberResult : 0,
  }

  if (!updateMonthStats) {
    newMonthStats = [
      ...oldMonthStats,
      {
        yearMonth: currentYearMonth,
        weekStats: [{ week: weekOrder, ratings: [dayInfo] }],
        avgMonth: 3,
        avgNumberRes: 0,
      },
    ]
  } else {
    const oldMonth = oldMonthStats.find((month) =>
      isSameMonth(parseJSON(month.yearMonth), currentYearMonth)
    ) // initial MONTH
    const allOldWeeks = oldMonth!.weekStats
    let allNewWeeks: WeekInfo[]
    let newWeek: WeekInfo
    const weekUpdate = oldMonth!.weekStats.find(
      (week) => week.week === weekOrder
    ) // this week already exists
    if (weekUpdate) {
      let newWeekRatings: DayInfo[]
      const oldWeekRatings = weekUpdate.ratings

      // day already exist
      const dayUpdate = oldWeekRatings.find((day) =>
        isSameDay(date, parseJSON(day.day))
      )
      if (dayUpdate) {
        newWeekRatings = oldWeekRatings.map((day) =>
          isSameDay(date, parseJSON(day.day)) ? dayInfo : day
        )
      } else {
        newWeekRatings = [...oldWeekRatings, dayInfo]
      }
      //
      newWeek = { week: weekOrder, ratings: newWeekRatings }
      allNewWeeks = allOldWeeks.map((week) =>
        week.week === weekOrder ? newWeek : week
      )
    } else {
      newWeek = { week: weekOrder, ratings: [dayInfo] }
      allNewWeeks = [...allOldWeeks, newWeek]
    }
    const newMonth: MonthStats = {
      ...updateMonthStats,
      yearMonth: currentYearMonth,
      weekStats: allNewWeeks,
    }
    newMonthStats = oldMonthStats.map((month) =>
      isSameMonth(parseJSON(month.yearMonth), currentYearMonth)
        ? newMonth
        : month
    )
  }

  return newMonthStats
}

export { updateStorage, getCellInfo, getModifiedRating, saveChanges }
