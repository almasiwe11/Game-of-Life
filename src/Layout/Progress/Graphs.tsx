import { useState } from "react"
import { DataArrTypes, ScopeTypes } from "../../Types/HabitTypes"
import LineGraph from "./LineGraph"
import Scope from "./Scope"
import { RootState } from "../../RootState"
import { useSelector } from "react-redux"
import { isSameYear, parseJSON } from "date-fns"
import {
  GraphKeys,
  MappedMarkedHabit,
  MarkedDaysOfMonth,
} from "../../Types/calendarType"
import { calcMonthExp, calcMonthExpGain } from "../../utils/helper"
import { calculateLevel } from "../../utils/helperLevel"

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
  let xAxis: GraphKeys = "day"
  let yAxisTotalExp: GraphKeys = "totalExp"
  let yAxisLevel: GraphKeys = "level"
  let yAxisExpEarned: GraphKeys = "expEarned"

  if (scope === "year") {
    const mappedThisYear: MappedMarkedHabit[] = thisYear.map((month) => {
      const totalMonth = calcMonthExp(month)
      return {
        ...month,
        totalMonth: totalMonth,
        monthGained: calcMonthExpGain(month, totalMonth),
        levelMonth: calculateLevel(totalMonth).level,
      }
    })

    dataArr = mappedThisYear
    xAxis = "monthName"
    yAxisExpEarned = "monthGained"
    yAxisLevel = "levelMonth"
    yAxisTotalExp = "totalMonth"
  }

  return (
    <>
      <Scope setScope={setScope} scope={scope} />
      <div className="flex gap-4 flex-wrap">
        <LineGraph
          name="totalExp"
          dataArr={dataArr}
          xaxis={xAxis}
          yaxis={yAxisTotalExp}
          color="#4f46e5"
          minValue={0}
        ></LineGraph>
        <LineGraph
          name="Level"
          dataArr={dataArr}
          xaxis={xAxis}
          yaxis={yAxisLevel}
          color="blue"
          minValue={1}
        ></LineGraph>
        <LineGraph
          name="Experience Earned"
          dataArr={dataArr}
          xaxis={xAxis}
          yaxis={yAxisExpEarned}
          color="yellow"
          minValue={1}
        ></LineGraph>
      </div>
    </>
  )
}
