import { useSelector } from "react-redux"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"
import { RootState } from "../../RootState"
import NoHabits from "../NoHabits"
import { isSameMonth, parseJSON } from "date-fns"

export default function Progress() {
  const arr = [
    { num: 5, b: 22 },
    { num: 30, b: 33 },
  ]

  const { currentHabit, today } = useSelector(
    (state: RootState) => state.calendar
  )
  const markedMonth = currentHabit?.markedDays
    .find((day) => isSameMonth(parseJSON(day.month), parseJSON(today)))
    ?.marked.slice()
    .sort((a, b) => a.day - b.day)

  return (
    <div className="bg-dark text-white px-10 py-6">
      {currentHabit && currentHabit.markedDays.length > 0 ? (
        <>
          <LineChart data={markedMonth} width={600} height={500}>
            <Line
              type="monotone"
              dataKey="totalExp"
              stroke="#2196F3"
              name="Total Experience"
              yAxisId="exp"
            />
            <Line
              type="monotone"
              dataKey="level"
              stroke="#FF5733"
              name="Level"
              yAxisId="level"
            />

            <CartesianGrid stroke="rgb(64,64,64)" />
            <XAxis dataKey="day" />

            <YAxis
              yAxisId="exp"
              label={{ value: "Total Exp", angle: -90, position: "insideLeft" }}
            />
            <YAxis
              yAxisId="level"
              orientation="right"
              label={{ value: "Level", angle: 90, position: "insideRight" }}
              domain={[1, "auto"]}
            />

            <Tooltip />
            <Legend />
          </LineChart>
        </>
      ) : (
        <NoHabits />
      )}
    </div>
  )
}
