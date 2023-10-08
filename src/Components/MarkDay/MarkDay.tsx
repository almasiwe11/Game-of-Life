import { useSelector } from "react-redux"
import Button from "../Shared/Button"
import MarkedDayHeader from "./MarkedDayHeader"
import { RootState } from "../../RootState"
import MarkMoodChecker from "./MarkMoodChecker"
import MarkGoal from "./MarkGoal"

export default function MarkDay() {
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const habit = currentHabit!
  return (
    <div className="fixed z-50 inset-0 w-2/3 mx-auto py-16">
      <div className="bg-white p-6 rounded-xl flex flex-col gap-6">
        <MarkedDayHeader />
        {habit.type === "moodchecker" && <MarkMoodChecker />}
        {habit.type === "goal" && <MarkGoal />}
        {habit.type === "yes-no" && <MarkMoodChecker />}
        <Button text="Mark Day" color="light" />
      </div>
    </div>
  )
}
