import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../RootState"
import {
  add,
  isSameDay,
  isSameISOWeek,
  isSameWeek,
  parseJSON,
  startOfWeek,
  sub,
} from "date-fns"
import { addMarkDay } from "../Calendar/calendarSlice"
import { HabitTab } from "../Types/CalendarTypes"

export default function usePrevWeeksCheck() {
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const dispatch = useDispatch()

  function prevWeekCheck() {
    const habitStartDate = parseJSON(currentHabit!.startDate!)
    if (isSameWeek(new Date(), parseJSON(habitStartDate))) return

    let observedWeek = sub(new Date(), { weeks: 1 })

    while (
      !isSameISOWeek(observedWeek, sub(parseJSON(habitStartDate), { weeks: 1 }))
    ) {
      let markedDaysOfWeek: Date[] = []
      const markDays = currentHabit!.markedDays
      for (let i = 0; i < markDays.length; i++) {
        const sameWeek = markDays[i].marked
          .filter((day) => isSameISOWeek(parseJSON(day.date), observedWeek))
          .map((day) => parseJSON(day.date))
        markedDaysOfWeek = markedDaysOfWeek.concat(sameWeek)
      }
      const weekObligation = calcWeekObligation(
        observedWeek,
        habitStartDate,
        currentHabit!
      )
      const completedDaysInWeek = markedDaysOfWeek.length
      if (completedDaysInWeek >= weekObligation) return
      const missedDays = weekObligation - completedDaysInWeek
      const allWeekDays = getAllWeekDays(observedWeek, habitStartDate)

      const freeDays = allWeekDays.filter(
        (day) => !markedDaysOfWeek.some((marked) => isSameDay(marked, day))
      )

      for (let i = 0; i < missedDays; i++) {
        dispatch(
          addMarkDay({
            day: JSON.stringify(freeDays[i]),
            mood: 0,
            exp: -Number(currentHabit!.skippedPenalty),
          })
        )
      }

      //
      observedWeek = sub(observedWeek, { weeks: 1 })
    }
  }

  useEffect(() => {
    if (currentHabit) prevWeekCheck()
  }, [currentHabit, prevWeekCheck])
}

function getAllWeekDays(observedWeek: Date, startOfHabit: Date) {
  const monday = startOfWeek(observedWeek, { weekStartsOn: 1 })
  const start = isSameISOWeek(observedWeek, startOfHabit)
    ? startOfHabit
    : monday
  const allDaysOfWeek = []
  let day = start
  while (isSameISOWeek(day, observedWeek)) {
    allDaysOfWeek.push(day)
    day = add(day, { days: 1 })
  }

  return allDaysOfWeek
}

function calcWeekObligation(
  observedWeek: Date,
  startOfHabit: Date,
  habit: HabitTab
) {
  if (isSameISOWeek(startOfHabit, observedWeek)) {
    const possibleDays = getAllWeekDays(observedWeek, startOfHabit)
    const expected = (possibleDays.length * habit.timesPerWeek) / 7
    const expectedReps = expected < 1 ? 1 : Math.round(expected)
    return expectedReps
  }

  return habit.timesPerWeek
}

//markedays
//get Today and substract one week from it
//see the start day of it is not the same week than
// filter the week 44 and see it's length
// if length is the same as times per week than perfect return

// times per weeks is 3 and the length of week 44 is 2
// which means that 1 day has been missed
// make an array of days of the week
// remove those days that are marked
// chose first 3-2 days from that array and dispatch mark as skipped

// else if the week observed is starting week
// than expected markdays is endOfWeek-startday
// find expected markdays using proporion
