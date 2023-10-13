import { useDispatch, useSelector } from "react-redux"
import Button from "../Shared/Button"
import MarkedDayHeader from "./MarkedDayHeader"
import { RootState } from "../../RootState"
import MarkMoodChecker from "./MarkMoodChecker"
import MarkGoal from "./MarkGoal"
import MarkYesNo from "./MarkYesNo"
import { useState } from "react"
import { addMarkDay } from "../../Calendar/calendarSlice"
import { Mood } from "../../Types/HabitTypes"

export default function MarkDay() {
  const dispatch = useDispatch()
  const { currentHabit, selectedDay } = useSelector(
    (state: RootState) => state.calendar
  )
  const [mood, setMood] = useState(currentHabit!.type === "goal" ? 0 : 1)
  const habit = currentHabit!

  function handleDayMarking() {
    if (mood < 0) return
    let exp
    if (mood === Mood.Skipped) {
      exp = -habit.skippedPenalty
    } else if (mood >= Mood.Extraordinary) {
      exp = 200
    } else {
      exp = mood * 10
    }
    dispatch(addMarkDay({ day: JSON.stringify(selectedDay), mood, exp }))
  }

  return (
    <div className="fixed z-50 inset-0 w-2/3 mx-auto py-16">
      <div className="bg-white p-6 rounded-xl flex flex-col gap-6">
        <MarkedDayHeader />
        {habit.type === "moodchecker" && <MarkMoodChecker setMood={setMood} />}
        {habit.type === "goal" && (
          <MarkGoal setMood={setMood} handleDayMarking={handleDayMarking} />
        )}
        {habit.type === "yes-no" && <MarkYesNo setMood={setMood} />}
        <Button
          text="Mark Day"
          color="light"
          onClick={() => handleDayMarking()}
        />
      </div>
    </div>
  )
}
