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
  if (theFirstDay || isToday) {
    return state.currentHabit!.totalExp + expMarked
  } else if (latestDay) {
    return state.currentHabit!.totalExp + expMarked
  } else {
    const prevDay = findPrevDay(state, date)
    return prevDay.totalExp + expMarked
  }
  //user can't mark days that are ahead of today
  //1) check if there are any days marked in the habit if this day is first than toal iexp is expGained
  //1.1) so if the marked day is today than just add the total exp to the expGained
  //else if the marked day is the latest day from all marked days than add expGained aswell

  //else there are days before and after marked day
  //in that case find the previous day by substracting one day from marked day untill the day is found
  //add that days total exp with current exp and get new exp for the marked day
  //also update all days that are ahead of the marked day buy adding to their total exp current expGained

  //if day is already marked
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
  while (isAlreadyMarked(state, observedDay)) {
    observedDay = sub(observedDay, { days: 1 })
  }
  return isAlreadyMarked(state, observedDay)!
}

function isAlreadyMarked(state: WritableDraft<Calendar>, day: Date) {
  const isMarked = state
    .currentHabit!.markedDays.find((day) =>
      isSameMonth(parseJSON(day.month), parseJSON(state.selectedDay))
    )
    ?.marked.find((day) =>
      isSameDay(parseJSON(day.date), parseJSON(state.selectedDay))
    )

  return isMarked
}

export { updateStorage, getFromStorage, initalCurrentHabbit, calcSelfExp }
