import { createSlice } from "@reduxjs/toolkit"
import { add, parseJSON, sub } from "date-fns"
import { Calendar, HabitTab } from "../Types/calendarType"
import { HabitFormTypes } from "../Types/HabitTypes"

const initialState: Calendar = {
  today: JSON.stringify(new Date()),
  newHabit: false,
  overlay: false,
  allHabits: [],
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
    },
  },
})

export const { addMonth, subMonth, newHabit, createHabit } =
  calendarSlice.actions

export default calendarSlice.reducer
