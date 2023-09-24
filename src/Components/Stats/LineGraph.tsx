/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { useDate } from "../../Context/DateContextProvider"

type PropTypes = {
  array: any[] | undefined
  yaxis: string
  xaxis: string
  name: string
  noAvg?: boolean
}
export default function LineGraph({
  array,
  yaxis,
  xaxis,
  name,
  noAvg = false,
}: PropTypes) {
  const { dateState } = useDate()
  const thisTab = dateState.tabs.find(
    (tab) => tab.name === dateState.currentTab
  )
  return (
    <LineChart data={array} width={600} height={500}>
      <Line type="monotone" dataKey={yaxis} stroke="#2196F3" name={name} />
      {!noAvg && (
        <Line
          type="monotone"
          dataKey={"avgDesired"}
          stroke="red"
          name={"Average Desired"}
        />
      )}

      <CartesianGrid stroke="rgb(64,64,64)"></CartesianGrid>
      <XAxis dataKey={xaxis}></XAxis>
      <YAxis dataKey={yaxis} domain={["auto", thisTab!.maxRating]}></YAxis>
      <Tooltip />
      <Legend />
    </LineChart>
  )
}
