import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  add,
  format,
  getISOWeek,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  parseJSON,
  startOfMonth,
  sub,
} from "date-fns"
import {
  Calendar,
  DeleteActions,
  HabitTab,
  MarkedDaysOfMonth,
  MarkedHabit,
} from "../Types/CalendarType"
import { HabitFormTypes } from "../Types/HabitTypes"
import {
  calcMonthExp,
  calculateTotalSelfExp,
  findLastDay,
  getFromStorage,
  initalCurrentHabbit,
  updateStorage,
} from "../utils/helper"
import { AddMarkDay } from "../Types/calendarSliceTypes"
import { calculateLevel } from "../utils/helperLevel"

const allHabits = getFromStorage()

const initialState: Calendar = {
  today: JSON.stringify(new Date()),
  newHabit: allHabits.length > 0 ? false : true,
  overlay: allHabits.length > 0 ? false : true,
  allHabits: allHabits,
  currentHabit: initalCurrentHabbit(),
  deleteWindow: false,
  markDay: false,
  selectedDay: JSON.stringify(new Date()),
  selectedDayIsMarked: undefined,
}

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addMonth(state) {
      state.today = JSON.stringify(add(parseJSON(state.today), { months: 1 }))
    },
    subMonth(state) {
      state.today = JSON.stringify(sub(parseJSON(state.today), { months: 1 }))
    },
    newHabit(state) {
      state.newHabit = true
      state.overlay = true
    },
    createHabit(state, action: PayloadAction<HabitFormTypes>) {
      const newHabit = action.payload
      const withMarkedDays: HabitTab = { ...newHabit, markedDays: [] }
      state.newHabit = false
      state.overlay = false
      state.allHabits.push(withMarkedDays)
      state.currentHabit = withMarkedDays
      updateStorage(state.allHabits)
    },
    updateCurrentHabit(state, action: PayloadAction<string>) {
      state.currentHabit = state.allHabits.find(
        (habit) => habit.name === action.payload
      )!
    },

    deleteHabit(state, action: PayloadAction<DeleteActions>) {
      switch (action.payload) {
        case "try-delete":
          state.deleteWindow = true
          state.overlay = true
          return
        case "no-delete":
          state.deleteWindow = false
          state.overlay = false
          return
        case "delete":
          state.deleteWindow = false
          state.overlay = false
          state.allHabits = state.allHabits.filter(
            (habit) => habit.name !== state.currentHabit!.name
          )
          state.currentHabit = state.allHabits[0]
          updateStorage(state.allHabits)
          return
      }
    },

    openMarkDay(state, action: PayloadAction<string>) {
      state.selectedDay = action.payload
      state.markDay = true
      state.overlay = true
      state.selectedDayIsMarked = state
        .currentHabit!.markedDays.find((day) =>
          isSameMonth(parseJSON(day.month), parseJSON(state.selectedDay))
        )
        ?.marked.find((day) =>
          isSameDay(parseJSON(day.date), parseJSON(state.selectedDay))
        )
    },

    addMarkDay(state, action: PayloadAction<AddMarkDay>) {
      const date = parseJSON(action.payload.day)
      const expMarkedDay = action.payload.exp
      const mood = action.payload.mood

      if (
        state.currentHabit!.firstMarkedDate === undefined ||
        isBefore(date, parseJSON(state.currentHabit!.firstMarkedDate))
      ) {
        state.currentHabit!.firstMarkedDate = JSON.stringify(date)
      }

      const dayOrder = Number(format(date, "d"))

      const totalSelfExp = calculateTotalSelfExp(
        date,
        expMarkedDay,
        state,
        mood
      )

      const markedDay: MarkedDaysOfMonth = {
        date: JSON.stringify(date),
        day: dayOrder,
        week: getISOWeek(date),
        expEarned: action.payload.exp,
        totalExp: totalSelfExp,
        mood: action.payload.mood,
        level: calculateLevel(totalSelfExp).level,
      }

      const markedMonth: MarkedHabit = {
        month: JSON.stringify(startOfMonth(date)),
        monthName: format(startOfMonth(date), "MMMM"),
        marked: [markedDay],
      }

      const exists = state.currentHabit!.markedDays.find((month) =>
        isSameMonth(parseJSON(month.month), date)
      )
      if (exists) {
        const existingMonth = state.currentHabit!.markedDays.find((month) =>
          isSameMonth(parseJSON(month.month), date)
        )!
        const update = existingMonth.marked.find((day) =>
          isSameDay(parseJSON(day.date), date)
        )

        if (update) {
          existingMonth.marked = state
            .currentHabit!.markedDays.find((month) =>
              isSameMonth(parseJSON(month.month), date)
            )!
            .marked.map((day) =>
              isSameDay(parseJSON(day.date), date) ? markedDay : day
            )
        } else {
          existingMonth.marked.push(markedDay)
        }
        state.currentHabit!.markedDays = state.currentHabit!.markedDays.map(
          (month) => {
            return {
              ...month,
              marked: month.marked.sort((a, b) => a.day - b.day),
            }
          }
        )
      } else {
        state.currentHabit!.markedDays.push(markedMonth)
        state.currentHabit!.markedDays.sort((a, b) =>
          isAfter(parseJSON(a.month), parseJSON(b.month)) ? 1 : -1
        )
      }

      calendarSlice.caseReducers.updateAllHabits(state)
      state.markDay = false
      state.overlay = false
    },

    updateAllHabits(state) {
      state.allHabits = state.allHabits.map((habit) =>
        habit.name === state.currentHabit!.name ? state.currentHabit! : habit
      )
      updateStorage(state.allHabits)
    },

    calcTotalExp() {
      console.log("calculation")
    },

    updateTotal(state) {
      const finalDay = findLastDay(state)
      state.currentHabit!.totalExp = finalDay.totalExp
      calendarSlice.caseReducers.updateAllHabits(state)
    },
  },
})

export const {
  addMonth,
  calcTotalExp,
  updateTotal,
  subMonth,
  newHabit,
  createHabit,
  updateCurrentHabit,
  deleteHabit,
  openMarkDay,
  addMarkDay,
} = calendarSlice.actions

export default calendarSlice.reducer
