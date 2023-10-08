import { useSelector } from "react-redux"
import Button from "../Shared/Button"
import MarkedDayHeader from "./MarkedDayHeader"
import { RootState } from "../../RootState"
import MarkMoodChecker from "./MarkMoodChecker"
import MarkGoal from "./MarkGoal"
import MarkYesNo from "./MarkYesNo"
import { useState } from "react"

export default function MarkDay() {
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const habit = currentHabit!

  const [mood, setMood] = useState(10)
  return (
    <div className="fixed z-50 inset-0 w-2/3 mx-auto py-16">
      <div className="bg-white p-6 rounded-xl flex flex-col gap-6">
        <MarkedDayHeader />
        {habit.type === "moodchecker" && <MarkMoodChecker setMood={setMood} />}
        {habit.type === "goal" && <MarkGoal setMood={setMood} />}
        {habit.type === "yes-no" && <MarkYesNo setMood={setMood} />}
        <Button text="Mark Day" color="light" />
      </div>
    </div>
  )
}
