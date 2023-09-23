import { useDate } from "../../Context/DateContextProvider"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { isSameYear, parseJSON, format, isAfter } from "date-fns"

export default function Stats() {
  const { dateState } = useDate()
  const { weekStat, currentTab, tabs, today } = dateState
  const thisTab = tabs.find((tab) => tab.name === currentTab)
  const thisYear = thisTab?.monthStats.filter((month) =>
    isSameYear(parseJSON(month.yearMonth), today)
  )
  const sortedYear = thisYear?.sort((a, b) => {
    const dateA = parseJSON(a.yearMonth)
    const dateB = parseJSON(b.yearMonth)

    return isAfter(dateA, dateB) ? 1 : -1
  })
  const formattedYear = sortedYear?.map((month) => {
    const formatted = {
      ...month,
      yearMonth: format(parseJSON(month.yearMonth), "MMM"),
    }
    return formatted
  })

  return (
    <div className="bg-dark w-full text-white p-8">
      <div className="">
        {weekStat.length > 0 && (
          <LineChart data={weekStat} width={600} height={300}>
            <Line type="monotone" dataKey="avg" stroke="#2196F3" />

            <CartesianGrid stroke="rgb(64,64,64)"></CartesianGrid>
            <XAxis dataKey="week"></XAxis>
            <YAxis dataKey="avg"></YAxis>
            <Tooltip />
            <Legend />
          </LineChart>
        )}
        {weekStat.length > 0 && thisTab?.type === "goal-number" && (
          <LineChart data={weekStat} width={600} height={300}>
            <Line type="monotone" dataKey="goalAvg" stroke="red" />

            <CartesianGrid stroke="rgb(64,64,64)"></CartesianGrid>
            <XAxis dataKey="week"></XAxis>
            <YAxis dataKey="goalAvg"></YAxis>
            <Tooltip />
            <Legend />
          </LineChart>
        )}
        {formattedYear && formattedYear!.length > 0 && (
          <LineChart data={formattedYear} width={600} height={300}>
            <Line type="monotone" dataKey="avgMonth" stroke="#2196F3" />

            <CartesianGrid stroke="rgb(64,64,64)"></CartesianGrid>
            <XAxis dataKey="yearMonth"></XAxis>
            <YAxis dataKey="avgMonth"></YAxis>
            <Tooltip />
            <Legend />
          </LineChart>
        )}
      </div>
    </div>
  )
}
