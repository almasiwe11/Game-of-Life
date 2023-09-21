import { useDate } from "../../Context/DateContextProvider"
import {
  format,
  sub,
  startOfMonth,
  endOfMonth,
  isSameISOWeek,
  add,
  differenceInDays,
  parseJSON,
  isSameMonth,
  getWeekOfMonth,
} from "date-fns"
import { KeyboardEvent, useState } from "react"
import { Commands } from "../../Types/ContextTypes"
import { DayInfo } from "../../Types/TabTypes"
import { Fragment } from "react"

export default function Details() {
  const { dateState, dispatch } = useDate()
  const { selectedDate, currentTab, today } = dateState
  const thisTab = dateState.tabs.find((tab) => tab.name === currentTab)
  const formattedDay = format(selectedDate, "do MMMM")
  const [goal, setGoal] = useState("")
  const inpsectMonthFormat = format(today, "LLLL, y")
  const thisMonth = thisTab?.monthStats.find(
    (month) => month.yearMonth === inpsectMonthFormat
  )

  let totalAvg = 0
  let totalTimesPerWeek = 0

  let weekCompleted = thisMonth?.weekStats
    .map((week) => {
      const outOf = calcTimesPerWeek(week.week)
      return {
        week: week.week,
        completed: calcCompleted(week.week, week.ratings).completed,
        outOf: outOf,
        avg: Math.round(calcCompleted(week.week, week.ratings).rating / outOf),
        total: calcCompleted(week.week, week.ratings).rating,
      }
    })
    .sort((a, b) => a.week - b.week)

  function weekUpdated() {
    const { first, last } = rightInterval()
    const arr = Array.from({ length: last - first + 1 }, (_, i) => first + i)
    if (weekCompleted) {
      const mapped = arr.map((week) => {
        const outOf = calcTimesPerWeek(week)
        const missed = {
          week: week,
          completed: 0,
          outOf: outOf,
          avg: 0,
          total: 0,
        }
        const there = weekCompleted!.find((compl) => compl.week === week)
        return there ? there : missed
      })
      return mapped
    }
  }
  if (weekCompleted) {
    weekCompleted = weekUpdated()
    totalAvg = weekCompleted!.reduce((acc, rate) => {
      return acc + rate.total
    }, 0)
    totalTimesPerWeek = weekCompleted!.reduce((acc, timesPerWeek) => {
      return acc + timesPerWeek.outOf
    }, 0)
  }

  function rightInterval() {
    let first = 1
    let last = lastWeekNumber(today)

    if (isSameMonth(parseJSON(thisTab!.startDay), new Date())) {
      first = getWeekOfMonth(parseJSON(thisTab!.startDay), { weekStartsOn: 1 })
      last = getWeekOfMonth(new Date(), { weekStartsOn: 1 })
      return { first, last }
    } else if (isSameMonth(new Date(), today)) {
      last = getWeekOfMonth(new Date(), { weekStartsOn: 1 })
      return { first, last }
    }
    return { first, last }
  }

  function calcCompleted(week: number, ratings: DayInfo[]) {
    const weekAttempt = ratings.filter((rating) => rating.rate > 0).length
    const weekTotal = ratings.reduce((acc, rate) => {
      return acc + rate.rate
    }, 0)
    if (week === 1) {
      return linkMonth({ weekAttempt, weekTotal, link: "firstWeek" })
    } else if (week === lastWeekNumber(today)) {
      return linkMonth({ weekAttempt, weekTotal, link: "lastWeek" })
    } else return { completed: weekAttempt, rating: weekTotal }
  }

  function calcTimesPerWeek(week: number) {
    const firstDay = startOfMonth(today)
    const observedWeek = add(firstDay, { weeks: week - 1 })
    let times = thisTab!.timesPerWeek
    if (isSameISOWeek(new Date(), parseJSON(thisTab!.startDay))) {
      const diff =
        differenceInDays(new Date(), parseJSON(thisTab!.startDay)) + 1
      times = Math.round((diff * thisTab!.timesPerWeek) / 7)
    } else {
      if (isSameISOWeek(new Date(), observedWeek)) {
        const dayOfWeekNumber = parseInt(format(new Date(), "i"))
        times = Math.round((dayOfWeekNumber * times) / 7)
      }
      if (isSameISOWeek(parseJSON(thisTab!.startDay), observedWeek)) {
        const dayOfWeekNumber = parseInt(
          format(parseJSON(thisTab!.startDay), "i")
        )
        times = Math.round(((7 - dayOfWeekNumber) * times) / 7) + 1
      }
    }
    return times
  }

  function linkMonth({
    weekAttempt,
    weekTotal,
    link,
  }: {
    weekAttempt: number
    weekTotal: number
    link: "firstWeek" | "lastWeek"
  }) {
    const lastMonth =
      link === "firstWeek"
        ? sub(today, { months: 1 })
        : add(today, { months: 1 })
    const prevMonthFormat = format(lastMonth, "LLLL, y")
    const prevMonth = thisTab?.monthStats.find(
      (month) => month.yearMonth === prevMonthFormat
    )
    const maxWeeksLastMonth =
      link === "firstWeek" ? lastWeekNumber(lastMonth) : 1
    const lastWeek = prevMonth?.weekStats.find(
      (week) => week.week === maxWeeksLastMonth
    )
    let lastMonthLastWeek: number
    let lastMonthWeekTotal: number
    if (lastWeek) {
      lastMonthLastWeek = lastWeek.ratings.filter(
        (rate) => rate.rate > 0
      ).length
      lastMonthWeekTotal = lastWeek.ratings.reduce((acc, rate) => {
        return acc + rate.rate
      }, 0)
    } else (lastMonthLastWeek = 0), (lastMonthWeekTotal = 0)
    return {
      completed: weekAttempt + lastMonthLastWeek,
      rating: weekTotal + lastMonthWeekTotal,
    }
  }

  function lastWeekNumber(month: Date) {
    const firstDayOfMonthWeek = startOfMonth(month)

    const lastDayOfMonthWeek = endOfMonth(month)
    let maxWeeks = 1
    let nextWeek = firstDayOfMonthWeek
    while (!isSameISOWeek(lastDayOfMonthWeek, nextWeek)) {
      maxWeeks++
      nextWeek = add(nextWeek, { weeks: 1 })
    }
    return maxWeeks
  }

  function handleEnter(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setGoal("")
      dispatch({ type: Commands.SUBMITGOAL, goal: Number(goal) })
    }
  }

  return (
    <div className="bg-dark self-stretch w-full">
      <div className="p-8 text-white">
        <h1 className="text-3xl font-bold text-center">
          Details of {formattedDay}{" "}
        </h1>

        {thisTab?.type === "goal-number" && (
          <div className="flex-center flex-col  mt-4 gap-3">
            <span className="text-2xl">Goal {thisTab.goal}</span>

            <div className="flex gap-2  ">
              <span className="">Result</span>
              <input
                className="p-1 px-2 rounded-lg outline-transparent text-black  focus:outline-blue"
                type="number"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                onKeyDown={handleEnter}
              ></input>
            </div>
          </div>
        )}

        {weekCompleted && (
          <div className="grid grid-cols-4 mt-5 text-center text-lg">
            <span> Week </span>
            <span> attempted </span>
            <span> out of </span>
            <span>Average Rating</span>
            {weekCompleted?.map((week) => (
              <Fragment key={week.week}>
                <span> {week.week} </span>
                <span> {week.completed} </span>
                <span> {week.outOf} </span>
                <span>
                  {week.avg}/{thisTab?.avgRating}{" "}
                </span>
              </Fragment>
            ))}
          </div>
        )}
        {weekCompleted && (
          <div className="text-center text-lg mt-6">
            Average this month
            <span className="text-blue ml-4">
              {Math.round(totalAvg / totalTimesPerWeek)}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
