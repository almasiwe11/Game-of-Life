import MonthDays from "./MonthDays/MonthDays"
import WeekDays from "./WeekDays/WeekDays"

export default function Grid() {
  return (
    <div className="bg-dark grid grid-cols-7   ">
      <WeekDays />
      <MonthDays />
    </div>
  )
}
