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

type PropTypes = {
  array: any[] | undefined
  yaxis: string
  xaxis: string
  name: string
}
export default function LineGraph({ array, yaxis, xaxis, name }: PropTypes) {
  return (
    <LineChart data={array} width={600} height={300}>
      <Line type="monotone" dataKey={yaxis} stroke="#2196F3" name={name} />

      <CartesianGrid stroke="rgb(64,64,64)"></CartesianGrid>
      <XAxis dataKey={xaxis}></XAxis>
      <YAxis dataKey={yaxis}></YAxis>
      <Tooltip />
      <Legend />
    </LineChart>
  )
}
