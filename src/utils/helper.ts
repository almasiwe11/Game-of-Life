import { WritableDraft } from "immer/dist/internal.js"
import { Calendar, HabitTab } from "../Types/CalendarType"
import { isAfter, isSameDay, isSameMonth, parseJSON, sub } from "date-fns"

function updateStorage(allHabits: HabitTab[]) {
  localStorage.setItem("allHabits", JSON.stringify(allHabits))
}

function getFromStorage() {
  return JSON.parse(localStorage.getItem("allHabits") || "[]")
}

function initalCurrentHabbit() {
  return getFromStorage().length > 0 ? getFromStorage()[0] : null
}

function updateFutureCells(
  state: WritableDraft<Calendar>,
  oldExp: number,
  markedDayExp: number,
  oldMarkedDayExp: number
) {
  const skipped = markedDayExp === -Number(state.currentHabit!.skippedPenalty)
  const adjust = markedDayExp - oldMarkedDayExp

  const newExp = oldExp + adjust
  if (newExp < 0) return 0
  return newExp
}

function calcSelfExp(
  state: WritableDraft<Calendar>,
  date: Date,
  expMarked: number,
  dayOrder: number
) {
  //if day is not marked

  const theFirstDay = state.currentHabit!.markedDays.length === 0
  const isToday = isSameDay(date, new Date())
  const latestDay = isLastDay(state, date, dayOrder)

  const updateExp = state.selectedDayIsMarked
    ? state.selectedDayIsMarked!.expEarned
    : 0

  state.currentHabit!.markedDays.map((month) =>
    month.marked.map((day) =>
      isAfter(parseJSON(day.date), date)
        ? (day.totalExp = updateFutureCells(
            state,
            day.totalExp,
            expMarked,
            updateExp
          ))
        : day
    )
  )

  if (theFirstDay || isToday) {
    if (state.selectedDayIsMarked)
      return state.currentHabit!.totalExp - updateExp + expMarked
    return state.currentHabit!.totalExp + expMarked
  } else if (latestDay) {
    if (state.selectedDayIsMarked) return calcFromPrev(state, date, expMarked)
    return state.currentHabit!.totalExp + expMarked
  } else if (
    isAfter(parseJSON(state.currentHabit!.firstMarkedDate!), date) ||
    isSameDay(parseJSON(state.currentHabit!.firstMarkedDate!), date)
  ) {
    // is before the first marked day
    return expMarked
  } else {
    //between
    return calcFromPrev(state, date, expMarked)
  }
}

function calcFromPrev(
  state: WritableDraft<Calendar>,
  date: Date,
  expMarked: number
) {
  const prevDay = findPrevDay(state, date)
  return prevDay.totalExp + expMarked
}

function isLastDay(
  state: WritableDraft<Calendar>,
  date: Date,
  dayOrder: number
) {
  const notTheLastDay = state.currentHabit!.markedDays.find((month) =>
    isAfter(parseJSON(month.month), date)
  )
  if (notTheLastDay) return false
  const thisMonth = state.currentHabit!.markedDays.find((month) =>
    isSameMonth(parseJSON(month.month), date)
  )

  const notLastInMonth = thisMonth?.marked.find((day) => day.day > dayOrder)
  if (notLastInMonth) return false
  return true
}

function findPrevDay(state: WritableDraft<Calendar>, date: Date) {
  let observedDay = sub(date, { days: 1 })
  while (!isAlreadyMarked(state, observedDay)) {
    observedDay = sub(observedDay, { days: 1 })
  }
  const prevDay = isAlreadyMarked(state, observedDay)!
  return prevDay
}

function isAlreadyMarked(state: WritableDraft<Calendar>, observed: Date) {
  const isMarked = state
    .currentHabit!.markedDays.find((day) =>
      isSameMonth(parseJSON(day.month), observed)
    )
    ?.marked.find((day) => isSameDay(parseJSON(day.date), observed))
  return isMarked
}

function findLastDay(state: WritableDraft<Calendar>) {
  const allMonth = state.currentHabit!.markedDays
  const lastMonth = allMonth[allMonth.length - 1]
  const lastDay = lastMonth.marked[lastMonth.marked.length - 1]
  return lastDay
}

export {
  updateStorage,
  getFromStorage,
  initalCurrentHabbit,
  calcSelfExp,
  findLastDay,
}

// if marked rating is === skippedRating
// check if the skull is the first day
// if it's the first day than don't substract anything out of future cells

// else
// get the prevDay total rating
// if its less than 0 than we should substract the prevRating instead of skippedRating
