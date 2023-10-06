import { createSlice } from "@reduxjs/toolkit"
import { add, parseJSON, sub } from "date-fns"
import { Calendar } from "./calendarType"

const initialState: Calendar = {
  today: JSON.stringify(new Date()),
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
  },
})

export const { addMonth, subMonth } = calendarSlice.actions

export default calendarSlice.reducer
