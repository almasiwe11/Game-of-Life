import { useSelector } from "react-redux"
import LineGraph from "./LineGraph"
import { RootState } from "../../RootState"
import { isSameMonth, isSameYear, parseJSON } from "date-fns"

export default function MonthProgress() {
  const { currentHabit, today } = useSelector(
    (state: RootState) => state.calendar
  )
  const markedMonth = currentHabit?.markedDays.find((day) =>
    isSameMonth(parseJSON(day.month), parseJSON(today))
  )?.marked

  const thisYear = currentHabit?.markedDays.filter((month) =>
    isSameYear(parseJSON(month.month), parseJSON(today))
  )
  console.log(thisYear)

  return (
    <div>
      {markedMonth ? (
        <div className="flex gap-4 flex-wrap">
          <LineGraph
            name="totalExp"
            markedMonth={markedMonth}
            xaxis="day"
            yaxis="totalExp"
            color="#4f46e5"
            minValue={0}
          ></LineGraph>
          <LineGraph
            name="Level"
            markedMonth={markedMonth}
            xaxis="day"
            yaxis="level"
            color="blue"
            minValue={1}
          ></LineGraph>
          <LineGraph
            name="Experience Earned"
            markedMonth={markedMonth}
            xaxis="day"
            yaxis="expEarned"
            color="yellow"
            minValue={1}
          ></LineGraph>
        </div>
      ) : (
        <div className="text-4xl text-red-500 text-center mt-64">
          No Data!!!
        </div>
      )}
    </div>
  )
}
