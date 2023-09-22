import { useDate } from "../../Context/DateContextProvider"

export default function Stats() {
  const { dateState } = useDate()
  const { weekStat } = dateState
  console.log(weekStat)
  return <div className="bg-dark w-full text-white p-8">Stats</div>
}
