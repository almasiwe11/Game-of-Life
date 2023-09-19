import {
  isSameISOWeek,
  sub,
  parseJSON,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  add,
} from "date-fns"
import { TabTypes } from "../../../../Types/TabTypes"

function getWeekOrder({
  selectedDate,
  thisTab,
}: {
  selectedDate: Date
  thisTab: TabTypes | undefined
}) {
  const firstDayOfMonthWeek = startOfWeek(startOfMonth(selectedDate))
  const lastDayOfMonthWeek = endOfWeek(endOfMonth(selectedDate))

  let weekOrder = 1
  let nextWeek = firstDayOfMonthWeek
  while (!isSameISOWeek(lastDayOfMonthWeek, nextWeek)) {
    weekOrder++
    nextWeek = add(nextWeek, { weeks: 1 })
  }

  console.log(weekOrder)
}

export { getWeekOrder }
