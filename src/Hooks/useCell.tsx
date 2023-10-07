import { format, isAfter, isBefore, isSameDay, parseJSON } from "date-fns"
import { useSelector } from "react-redux"
import { RootState } from "../RootState"

export default function useCell(date: Date) {
  const formattedDay = format(date, "d")
  const isToday = isSameDay(new Date(), date)
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const { startDate: startDateState } = currentHabit!
  const startDate = parseJSON(startDateState)
  const isStartDay = isSameDay(startDate, date)
  const isBeforeStartDay = isBefore(date, startDate) && !isStartDay
  const isAfterToday = isAfter(date, new Date())
  const outOfScope = isBeforeStartDay || isAfterToday

  return { outOfScope, isToday, formattedDay, isStartDay }
}
