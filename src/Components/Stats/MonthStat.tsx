import { WeekStat } from "../../Types/ContextTypes"
import { TabTypes } from "../../Types/TabTypes"
import LineGraph from "./LineGraph"

export default function MonthStat({
  weekStat,
  thisTab,
}: {
  weekStat: WeekStat[]
  thisTab: TabTypes | undefined
}) {
  return (
    <>
      {weekStat.length > 0 && (
        <LineGraph
          array={weekStat}
          xaxis="week"
          yaxis="avg"
          name="Avg Rating of Weeks"
        />
      )}
      {weekStat.length > 0 && thisTab?.type === "goal-number" && (
        <LineGraph
          array={weekStat}
          xaxis="week"
          yaxis="goalAvg"
          name="Avg Result of Weeks"
          noAvg={true}
        />
      )}
    </>
  )
}
