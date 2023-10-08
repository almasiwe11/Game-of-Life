import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { add, parseJSON, sub } from "date-fns"
import { Calendar, DeleteActions, HabitTab } from "../Types/CalendarType"
import { HabitFormTypes } from "../Types/HabitTypes"
import {
  getFromStorage,
  initalCurrentHabbit,
  updateStorage,
} from "../utils/helper"

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
    },
  },
})

export const {
  addMonth,
  subMonth,
  newHabit,
  createHabit,
  updateCurrentHabit,
  deleteHabit,
  openMarkDay,
} = calendarSlice.actions

export default calendarSlice.reducer
