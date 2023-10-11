import { useSelector } from "react-redux"

import { RootState } from "../../RootState"
import NoHabits from "../NoHabits"
import CalendarHeader from "../Body/CalendarHeader/CalendarHeader"
import MonthProgress from "./MonthProgress"

export default function Progress() {
  const { currentHabit } = useSelector((state: RootState) => state.calendar)

  return (
    <div className="bg-dark text-white px-10 py-6">
      {currentHabit && currentHabit.markedDays.length > 0 ? (
        <>
          <CalendarHeader />
          <MonthProgress />
        </>
      ) : (
        <NoHabits />
      )}
    </div>
  )
}
