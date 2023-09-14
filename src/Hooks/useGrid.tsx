import { add, startOfMonth, startOfWeek, format } from "date-fns"
import { useDate } from "../Context/DateContextProvider"

export default function useGrid() {
  const { dateState } = useDate()
  const { today } = dateState
  const firstDayOfMonth = startOfMonth(today)
  const firstDayCalendar = startOfWeek(firstDayOfMonth, { weekStartsOn: 1 })
  const sixWeeks = Array.from({ length: 42 }, (_, i) => i)
  const monthDays = sixWeeks.map((num) => add(firstDayCalendar, { days: num }))

  const weekDays = Array.from({ length: 7 }, (_, i) =>
    format(add(firstDayCalendar, { days: i }), "EEE")
  )
  return { monthDays, weekDays }
}
