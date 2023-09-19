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
  const firstDayOfMonthWeek = startOfWeek(startOfMonth(selectedDate), {
    weekStartsOn: 1,
  })
  const lastDayOfMonthWeek = endOfWeek(endOfMonth(selectedDate), {
    weekStartsOn: 1,
  })

  let weekOrder = 1
  const weekFirst = []
  let nextWeek = firstDayOfMonthWeek
  while (!isSameISOWeek(lastDayOfMonthWeek, nextWeek)) {
    weekOrder++
    nextWeek = add(nextWeek, { weeks: 1 })
  }
}

export { getWeekOrder }
