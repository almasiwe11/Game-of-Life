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

export default function Stats() {
  const { dateState } = useDate()
  const { weekStat, currentTab, tabs } = dateState
  const thisTab = tabs.find((tab) => tab.name === currentTab)
  console.log(weekStat)
  return (
    <div className="bg-dark w-full text-white p-8">
      <div className="flex">
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
      </div>
    </div>
  )
}
