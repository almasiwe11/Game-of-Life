import useGrid from "../../../Hooks/useGrid"
import Cell from "./Cell"

export default function MonthDays() {
  const { monthDays } = useGrid()
  return (
    <>
      {monthDays.map((date, i) => (
        <Cell key={i} date={date} index={i} />
      ))}
    </>
  )
}
