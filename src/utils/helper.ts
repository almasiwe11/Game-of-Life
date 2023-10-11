import { WritableDraft } from "immer/dist/internal.js"
import { Calendar, HabitTab } from "../Types/CalendarType"
import { parseJSON } from "date-fns"

function updateStorage(allHabits: HabitTab[]) {
  localStorage.setItem("allHabits", JSON.stringify(allHabits))
}

function getFromStorage() {
  return JSON.parse(localStorage.getItem("allHabits") || "[]")
}

function initalCurrentHabbit() {
  return getFromStorage().length > 0 ? getFromStorage()[0] : null
}

function findLastDay(state: WritableDraft<Calendar>) {
  const allMonth = state.currentHabit!.markedDays
  const lastMonth = allMonth[allMonth.length - 1]
  const lastDay = lastMonth.marked[lastMonth.marked.length - 1]
  return lastDay
}

function calculateTotalSelfExp(
  date: Date,
  markedDayExp: number,
  state: WritableDraft<Calendar>
) {
  const lastMarkedDay = parseJSON(findLastDay(state).date)
  console.log(lastMarkedDay)
  return 20
}

export {
  updateStorage,
  getFromStorage,
  initalCurrentHabbit,
  findLastDay,
  calculateTotalSelfExp,
}

// when I mark a day, if that day is today or the last day of all marked days than I do a simple addition
// otherwise, I have to find prevDay and get its rating
// thann do what have be done and pass the new total rating to the next day
// it will ripple and do the same for the next day untill it updates all next days
