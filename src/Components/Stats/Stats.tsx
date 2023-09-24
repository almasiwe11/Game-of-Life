import { useState } from "react"
import { useDate } from "../../Context/DateContextProvider"

import { isSameYear, parseJSON, format, isAfter, isSameMonth } from "date-fns"
import MonthStat from "./MonthStat"
import YearStat from "./YearStat"

export default function Stats() {
  const [year, setYear] = useState(false)
  const { dateState } = useDate()
  const { weekStat, currentTab, tabs, today } = dateState
  const thisTab = tabs.find((tab) => tab.name === currentTab)
  const thisYear = thisTab?.monthStats.filter((month) =>
    isSameYear(parseJSON(month.yearMonth), today)
  )
  const sortedYear = thisYear?.sort((a, b) => {
    const dateA = parseJSON(a.yearMonth)
    const dateB = parseJSON(b.yearMonth)

    return isAfter(dateA, dateB) ? 1 : -1
  })
  const formattedYear = sortedYear?.map((month) => {
    const formatted = {
      ...month,
      yearMonth: format(parseJSON(month.yearMonth), "MMM"),
    }
    return formatted
  })
  const monthHasMarked = thisTab?.markedDays.find((day) =>
    isSameMonth(parseJSON(day.day), today)
  )

  return (
    <>
      {thisTab && monthHasMarked ? (
        <div className="bg-dark w-full text-white p-8">
          <div className="flex-center gap-5 mt-3  pl-16">
            <button
              className={`${
                year && "bg-white"
              } p-1.5 px-3 rounded-xl text-blue cursor-pointer`}
              onClick={() => setYear(true)}
            >
              Year
            </button>
            <button
              className={`${
                !year && "bg-white"
              } p-1.5 px-3 rounded-xl text-blue cursor-pointer`}
              onClick={() => setYear(false)}
            >
              Month
            </button>
          </div>
          <div className="flex-center mb-8 mt-5 text-xl font-bold">
            {year ? format(today, "yyyy") : format(today, "MMM")}{" "}
          </div>
          <div className="flex-center ">
            {year ? (
              <YearStat formattedYear={formattedYear} thisTab={thisTab} />
            ) : (
              <MonthStat weekStat={weekStat} thisTab={thisTab} />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
