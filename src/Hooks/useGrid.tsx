import { add, startOfMonth, startOfWeek, format, parseJSON } from "date-fns"
import { useSelector } from "react-redux"
import { RootState } from "../RootState"

export default function useGrid() {
  const todayState = useSelector((state: RootState) => state.calendar.today)
  const today = parseJSON(todayState)
  const firstDayOfMonth = startOfMonth(today)
  const firstDayCalendar = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 })
  const sixWeeks = Array.from({ length: 42 }, (_, i) => i)
  const monthDays = sixWeeks.map((num) => add(firstDayCalendar, { days: num }))

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    format(add(firstDayCalendar, { days: i }), "EEE")
  )
  return { monthDays, weekDays }
}
