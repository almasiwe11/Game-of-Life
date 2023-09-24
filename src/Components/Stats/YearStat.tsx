import LineGraph from "./LineGraph"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function YearStat({ formattedYear, thisTab }: any) {
  return (
    <>
      {formattedYear && formattedYear!.length > 0 && (
        <LineGraph
          array={formattedYear}
          xaxis="yearMonth"
          yaxis="avgMonth"
          name="Avg Rating this Year"
        />
      )}
      {formattedYear && thisTab?.type === "goal-number" && (
        <LineGraph
          array={formattedYear}
          xaxis="yearMonth"
          yaxis="avgNumberRes"
          name="Avg Result this Year"
          noAvg={true}
        />
      )}
    </>
  )
}
