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
        ? (day.totalExp = day.totalExp + expMarked - updateExp)
        : day
    )
  )

  if (theFirstDay || isToday) {
    return state.currentHabit!.totalExp + expMarked
  } else if (latestDay) {
    return state.currentHabit!.totalExp + expMarked
  } else if (
    isAfter(parseJSON(state.currentHabit!.firstMarkedDate!), date) ||
    isSameDay(parseJSON(state.currentHabit!.firstMarkedDate!), date)
  ) {
    return expMarked
  } else {
    //between
    const prevDay = findPrevDay(state, date)
    return prevDay.totalExp + expMarked
  }
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

export { updateStorage, getFromStorage, initalCurrentHabbit, calcSelfExp }
