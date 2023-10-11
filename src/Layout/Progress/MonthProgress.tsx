import { useSelector } from "react-redux"
import { RootState } from "../../RootState"
import { isSameMonth, parseJSON } from "date-fns"
import Graphs from "./Graphs"

export default function MonthProgress() {
  const { currentHabit, today } = useSelector(
    (state: RootState) => state.calendar
  )
  const markedMonth = currentHabit?.markedDays.find((day) =>
    isSameMonth(parseJSON(day.month), parseJSON(today))
  )?.marked

  return (
    <div>
      {markedMonth ? (
        <Graphs markedMonth={markedMonth} />
      ) : (
        <div className="text-4xl text-red-500 text-center mt-64">
          No Data!!!
        </div>
      )}
    </div>
  )
}
