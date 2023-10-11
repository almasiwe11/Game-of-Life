import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { MarkedDaysOfMonth } from "../../Types/CalendarType"

type Props = {
  markedMonth: MarkedDaysOfMonth[]
  xaxis: string
  yaxis: string
  color: string
  name: string
  minValue?: number | string
}

export default function LineGraph({
  markedMonth,
  xaxis,
  yaxis,
  color,
  name,
  minValue = "auto",
}: Props) {
  return (
    <LineChart data={markedMonth} width={370} height={400}>
      <Line type="monotone" dataKey={yaxis} stroke={color} name={name} />

      <CartesianGrid stroke="rgb(64,64,64)" />
      <XAxis dataKey={xaxis} />

      <YAxis dataKey={yaxis} domain={[minValue, "auto"]} />

      <Tooltip />
      <Legend />
    </LineChart>
  )
}
