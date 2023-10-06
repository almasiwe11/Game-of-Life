import Header from "./CalendarHeader/CalendarHeader"
import Grid from "./Grid/Grid"
export default function Body() {
  return (
    <section className=" h-full flex flex-col  row-start-2 col-start-2">
      <Header />
      <Grid />
    </section>
  )
}
