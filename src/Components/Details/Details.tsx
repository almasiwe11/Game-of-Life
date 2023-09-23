import { useEffect } from "react"
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
  isSameDay,
} from "date-fns"

import { useState } from "react"
import { Commands, WeekStat } from "../../Types/ContextTypes"
import {
  DayInfo,
  MarkedGoalNumber,
  MarkedYesNo,
  MonthStats,
  TabTypes,
} from "../../Types/TabTypes"
import WeekStats from "./WeekStats"
import GoalInput from "./GoalInput"
import GoalSettings from "./GoalSettings"

export default function Details() {
  const { dateState, dispatch } = useDate()
  const { selectedDate, currentTab, today, tabs } = dateState
  const thisTab = dateState.tabs.find((tab) => tab.name === currentTab)
  const [goal, setGoal] = useState("")
  const inpsectMonthFormat = today
  const thisMonth = thisTab?.monthStats.find((month) =>
    isSameMonth(parseJSON(month.yearMonth), inpsectMonthFormat)
  )
  let resultThisDay = 0
  let totalAvg = 0
  let totalTimesPerWeek = 0
  let monthAvg
  const marked = thisTab?.markedDays.find((day) =>
    isSameDay(parseJSON(day.day), selectedDate)
  )
  if (marked) {
    if (thisTab?.type === "goal-number") {
      const markedDay = marked as MarkedGoalNumber
      resultThisDay = markedDay.numberResult
    } else {
      const markedDay = marked as MarkedYesNo
      resultThisDay = markedDay.rating
    }
  }

  let weekCompleted: WeekStat[] | undefined = thisMonth?.weekStats
    .map((week) => {
      const outOf = calcTimesPerWeek(week.week)
      const attempted = calcCompleted(week.week, week.ratings).completed
      const marked = week.ratings.length
      const missedDays = outOf - marked
      const totalRatingWeek =
        calcCompleted(week.week, week.ratings).rating +
        missedDays * thisTab!.minRating
      return {
        week: week.week,
        completed: attempted,
        outOf: outOf,
        avg: Math.round(totalRatingWeek / outOf),
        total: totalRatingWeek,
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
          avg: thisTab!.minRating,
          total: thisTab!.minRating * outOf,
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

    monthAvg = Math.round(totalAvg / totalTimesPerWeek)
    const oldMonthStats = thisTab!.monthStats
    const oldThisMonth = thisMonth!

    oldThisMonth.avgMonth
    let newThisMonth: MonthStats
    let newMonthStats: MonthStats[]
    if (monthAvg !== oldThisMonth!.avgMonth) {
      newThisMonth = { ...oldThisMonth, avgMonth: monthAvg }
      newMonthStats = oldMonthStats.map((month) =>
        isSameMonth(parseJSON(month.yearMonth), inpsectMonthFormat)
          ? newThisMonth
          : month
      )
      const thisTab = tabs.find((tab) => tab.name === currentTab)
      const newTab = { ...thisTab!, monthStats: newMonthStats }
      const allNewTabs: TabTypes[] = tabs.map((tab) =>
        tab.name === currentTab ? newTab : tab
      )
      localStorage.setItem("tabs", JSON.stringify(allNewTabs))
      dispatch({ type: Commands.SAVECHANGE, allNewTabs: allNewTabs })
    }
  }

  useEffect(() => {
    if (weekCompleted) {
      console.log(weekCompleted)
      dispatch({ type: Commands.WEEKSTATS, weekStats: weekCompleted })
    }
  }, [thisTab!.markedDays])

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
    const prevMonth = thisTab?.monthStats.find((month) =>
      isSameMonth(parseJSON(month.yearMonth), lastMonth)
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

  return (
    <div className="bg-dark self-stretch w-full">
      <div className="p-8 text-white">
        <h1 className="text-3xl font-bold text-center">
          {format(today, "LLLL")}
          <span className="ml-3">
            {isSameMonth(selectedDate, today) && format(selectedDate, "d")}
          </span>
        </h1>

        <h1 className="font-bold text-center mt-2 text-xl">
          {thisTab?.type === "goal-number"
            ? `Result ${resultThisDay}`
            : `Rating ${resultThisDay}`}
        </h1>

        <GoalInput
          thisTab={thisTab}
          goal={goal}
          setGoal={setGoal}
          dispatch={dispatch}
        />
        <WeekStats weekCompleted={weekCompleted} thisTab={thisTab} />
        <GoalSettings />

        {weekCompleted && (
          <div className="text-center text-lg mt-6">
            Average this month
            <span className="text-blue ml-4">{monthAvg}</span>
          </div>
        )}
      </div>
    </div>
  )
}
