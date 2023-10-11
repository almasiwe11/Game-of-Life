import { useState } from "react"
import { DataArrTypes, ScopeTypes } from "../../Types/HabitTypes"
import LineGraph from "./LineGraph"
import Scope from "./Scope"
import { RootState } from "../../RootState"
import { useSelector } from "react-redux"
import { isSameYear, parseJSON } from "date-fns"
import { MarkedDaysOfMonth, MarkedHabit } from "../../Types/CalendarType"

type Props = {
  markedMonth: MarkedDaysOfMonth[]
}

export default function Graphs({ markedMonth }: Props) {
  const { currentHabit, today } = useSelector(
    (state: RootState) => state.calendar
  )
  const thisYear = currentHabit!.markedDays.filter((month) =>
    isSameYear(parseJSON(month.month), parseJSON(today))
  )
  const [scope, setScope] = useState<ScopeTypes>("month")

  let dataArr: DataArrTypes = markedMonth
  let xAxis: keyof MarkedHabit | keyof MarkedDaysOfMonth = "day"
  let yAxisTotalExp: keyof MarkedHabit | keyof MarkedDaysOfMonth = "totalExp"
  let yAxisLevel: keyof MarkedHabit | keyof MarkedDaysOfMonth = "level"
  let yAxisExpEarned: keyof MarkedHabit | keyof MarkedDaysOfMonth = "expEarned"

  if (scope === "year") {
    dataArr = thisYear
    xAxis = "monthName"
  }

  return (
    <>
      <Scope setScope={setScope} scope={scope} />
      <div className="flex gap-4 flex-wrap">
        <LineGraph
          name="totalExp"
          dataArr={markedMonth}
          xaxis="day"
          yaxis="totalExp"
          color="#4f46e5"
          minValue={0}
        ></LineGraph>
        <LineGraph
          name="Level"
          dataArr={markedMonth}
          xaxis="day"
          yaxis="level"
          color="blue"
          minValue={1}
        ></LineGraph>
        <LineGraph
          name="Experience Earned"
          dataArr={markedMonth}
          xaxis="day"
          yaxis="expEarned"
          color="yellow"
          minValue={1}
        ></LineGraph>
      </div>
    </>
  )
}
