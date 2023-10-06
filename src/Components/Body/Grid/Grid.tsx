import Cell from "./GridCell"
import useGrid from "../../../Hooks/useGrid"

export default function Grid() {
  const { monthDays, weekDays } = useGrid()
  return (
    <div className="bg-dark grid grid-cols-7 grow grid-rows-grid">
      {weekDays.map((day) => (
        <div key={day} className="text-center text-blue">
          {day}
        </div>
      ))}
      {monthDays.map((date, i) => (
        <Cell key={i} date={date} />
      ))}
    </div>
  )
}
