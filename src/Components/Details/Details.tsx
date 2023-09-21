import { useDate } from "../../Context/DateContextProvider"
import {
  format,
  sub,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  isSameISOWeek,
  add,
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

  const weekCompleted = thisMonth?.weekStats
    .map((week) => {
      return {
        week: week.week,
        completed: calcCompleted(week.week, week.ratings).completed,
        avg: Math.round(
          calcCompleted(week.week, week.ratings).rating / thisTab!.timesPerWeek
        ),
      }
    })
    .sort((a, b) => a.week - b.week)

  function calcCompleted(week: number, ratings: DayInfo[]) {
    const weekAttempt = ratings.filter((rating) => rating.rate > 0).length
    const weekTotal = ratings.reduce((acc, rate) => {
      return acc + rate.rate
    }, 0)
    if (week === 1) {
      const lastMonth = sub(today, { months: 1 })
      const prevMonthFormat = format(lastMonth, "LLLL, y")
      const prevMonth = thisTab?.monthStats.find(
        (month) => month.yearMonth === prevMonthFormat
      )
      const maxWeeksLastMonth = lastWeekNumber(lastMonth)
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
    } else if (week === lastWeekNumber(today)) {
      const nextMonth = add(today, { months: 1 })
      const nextMonthFormat = format(nextMonth, "LLLL, y")
      const nextMonthStats = thisTab?.monthStats.find(
        (month) => month.yearMonth === nextMonthFormat
      )
      const firstWeek = nextMonthStats?.weekStats.find(
        (week) => week.week === 1
      )
      let nextMonthLastWeek: number
      let nextMonthWeekTotal: number
      if (firstWeek) {
        nextMonthLastWeek = firstWeek.ratings.filter(
          (rate) => rate.rate > 0
        ).length
        nextMonthWeekTotal = firstWeek.ratings.reduce((acc, rate) => {
          return acc + rate.rate
        }, 0)
      } else (nextMonthLastWeek = 0), (nextMonthWeekTotal = 0)
      return {
        completed: weekAttempt + nextMonthLastWeek,
        rating: weekTotal + nextMonthWeekTotal,
      }
    } else return { completed: weekAttempt, rating: weekTotal }
  }

  function linkMonth({ weekAttempt, weekTotal, link }) {
    const lastMonth = sub(today, { months: 1 })
    const prevMonthFormat = format(lastMonth, "LLLL, y")
    const prevMonth = thisTab?.monthStats.find(
      (month) => month.yearMonth === prevMonthFormat
    )
    const maxWeeksLastMonth = lastWeekNumber(lastMonth)
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
                <span> {thisTab?.timesPerWeek} </span>
                <span>
                  {week.avg}/{thisTab?.avgRating}{" "}
                </span>
              </Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
