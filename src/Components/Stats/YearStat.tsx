import LineGraph from "./LineGraph"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function YearStat({ formattedYear }: any) {
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
      {formattedYear && formattedYear!.length > 0 && (
        <LineGraph
          array={formattedYear}
          xaxis="yearMonth"
          yaxis="avgNumberRes"
          name="Avg Result this Year"
        />
      )}
    </>
  )
}
