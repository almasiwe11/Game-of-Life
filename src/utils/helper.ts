import { WritableDraft } from "immer/dist/internal.js"
import { Calendar, HabitTab } from "../Types/CalendarType"
import {
  add,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  parseJSON,
  sub,
} from "date-fns"
import { Mood } from "../Types/HabitTypes"

function updateStorage(allHabits: HabitTab[]) {
  localStorage.setItem("allHabits", JSON.stringify(allHabits))
}

function getFromStorage() {
  return JSON.parse(localStorage.getItem("allHabits") || "[]")
}

function initalCurrentHabbit() {
  return getFromStorage().length > 0 ? getFromStorage()[0] : null
}

function calculateTotalSelfExp(
  date: Date,
  markedDayExp: number,
  state: WritableDraft<Calendar>,
  mood: Mood
) {
  const theOnlyDay = state.currentHabit!.markedDays.length === 0

  if (theOnlyDay) {
    return markedDayExp
  }

  const firstMarkedDate = findFirstMarkedDay(state)
  const newFirstDay =
    isBefore(date, parseJSON(firstMarkedDate.date)) ||
    isSameDay(date, parseJSON(firstMarkedDate.date))

  if (newFirstDay) {
    rippleUpdateNextDays(state, date, markedDayExp)
    return mood === Mood.Skipped ? 0 : markedDayExp
  }

  if (!newFirstDay) {
    const prevMarkedDay = findPrevDay(state, date)
    const correctExp = getRightExp(prevMarkedDay.totalExp, markedDayExp, mood)
    const newTotalExp = correctExp
    rippleUpdateNextDays(state, date, newTotalExp)
    return newTotalExp
  }

  return 666
}

function findPrevDay(state: WritableDraft<Calendar>, date: Date) {
  let observedDay = sub(date, { days: 1 })
  while (!isAlreadyMarked(state, observedDay)) {
    observedDay = sub(observedDay, { days: 1 })
  }
  const prevDay = isAlreadyMarked(state, observedDay)!
  return prevDay
}

function rippleUpdateNextDays(
  state: WritableDraft<Calendar>,
  date: Date,
  newTotalExp: number
) {
  const lastMarkedDate = parseJSON(findLastDay(state).date)
  if (isSameDay(date, lastMarkedDate) || isAfter(date, lastMarkedDate)) return
  let nextDay = findNextMarkedDay(state, date)
  let newExpTotal = newTotalExp
  while (nextDay) {
    const correctXp = getRightExp(newExpTotal, nextDay.expEarned, nextDay.mood)
    nextDay.totalExp = correctXp
    newExpTotal = nextDay.totalExp
    nextDay = findNextMarkedDay(state, parseJSON(nextDay.date))
  }
}

function isAlreadyMarked(state: WritableDraft<Calendar>, observed: Date) {
  const isMarked = state
    .currentHabit!.markedDays.find((day) =>
      isSameMonth(parseJSON(day.month), observed)
    )
    ?.marked.find((day) => isSameDay(parseJSON(day.date), observed))
  return isMarked
}

function getRightExp(total: number, self: number, mood: Mood) {
  const sum = total + self
  if (mood === Mood.Skipped) {
    return -self > total ? 0 : sum
  }

  return sum
}

function findLastDay(state: WritableDraft<Calendar>) {
  const allMonth = state.currentHabit!.markedDays
  const lastMonth = allMonth[allMonth.length - 1]
  const lastDay = lastMonth.marked[lastMonth.marked.length - 1]
  return lastDay
}

function findNextMarkedDay(state: WritableDraft<Calendar>, date: Date) {
  if (isSameDay(date, parseJSON(findLastDay(state).date))) return undefined
  let observedDay = add(date, { days: 1 })
  while (!isAlreadyMarked(state, observedDay)) {
    observedDay = add(observedDay, { days: 1 })
  }
  const prevDay = isAlreadyMarked(state, observedDay)!
  return prevDay
}

function findFirstMarkedDay(state: WritableDraft<Calendar>) {
  const allMonth = state.currentHabit!.markedDays
  const firstMonth = allMonth[0]
  const firstDay = firstMonth.marked[0]
  return firstDay
}

export {
  updateStorage,
  getFromStorage,
  initalCurrentHabbit,
  findLastDay,
  calculateTotalSelfExp,
}
