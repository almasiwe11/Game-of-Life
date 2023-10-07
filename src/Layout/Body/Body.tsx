import { useSelector } from "react-redux"
import Header from "./CalendarHeader/CalendarHeader"
import Grid from "./Grid/Grid"
import { RootState } from "../../RootState"
export default function Body() {
  const allHabits = useSelector((state: RootState) => state.calendar.allHabits)
  return (
    <section className=" h-full flex flex-col  row-start-2 col-start-2">
      <Header />
      {allHabits.length > 0 && <Grid />}
    </section>
  )
}
