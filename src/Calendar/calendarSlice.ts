import { createSlice } from "@reduxjs/toolkit"
import { add, parseJSON, sub } from "date-fns"
import { Calendar, HabitTab } from "../Types/calendarType"
import { HabitFormTypes } from "../Types/HabitTypes"
import {
  getFromStorage,
  initalCurrentHabbit,
  updateStorage,
} from "../utils/helper"

const initialState: Calendar = {
  today: JSON.stringify(new Date()),
  newHabit: false,
  overlay: false,
  allHabits: getFromStorage(),
  currentHabit: initalCurrentHabbit(),
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
    createHabit(state, action) {
      const habit: HabitFormTypes = action.payload
      const withMarkedDays: HabitTab = { ...habit, markedDays: [] }
      state.newHabit = false
      state.overlay = false
      state.allHabits.push(withMarkedDays)
      updateStorage(state.allHabits)
    },
    updateCurrentHabit(state, action) {
      state.currentHabit = state.allHabits.find(
        (habit) => habit.name === action.payload
      )!
    },
  },
})

export const { addMonth, subMonth, newHabit, createHabit, updateCurrentHabit } =
  calendarSlice.actions

export default calendarSlice.reducer
