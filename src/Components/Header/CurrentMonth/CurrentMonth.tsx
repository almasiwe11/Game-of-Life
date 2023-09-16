import { useDate } from "../../../Context/DateContextProvider"
import { format } from "date-fns"

export default function CurrentMonth() {
  const { dateState } = useDate()
  const formattedDate = format(dateState.today, "MMMM y")
  return <span className="text-white text-3xl font-bold"> {formattedDate}</span>
}
