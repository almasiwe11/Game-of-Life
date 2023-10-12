import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import Body from "./Layout/Body/Body"
import { RootState } from "./RootState"
import HabitForm from "./Components/HabitForm/HabitForm"
import Overlay from "./Components/Overlay"
import AppLayout from "./Layout/AppLayout"
import DeleteHabit from "./Components/DeleteHabit"
import MarkDay from "./Components/MarkDay/MarkDay"
import Today from "./Layout/Today/Today"
import Progress from "./Layout/Progress/Progress"
import usePrevWeeksCheck from "./Hooks/usePrevWeeksCheck"

function App() {
  const { overlay, newHabit, deleteWindow, markDay } = useSelector(
    (state: RootState) => state.calendar
  )

  usePrevWeeksCheck()

  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Body />}></Route>
            <Route path="today" element={<Today />}></Route>
            <Route path="progress" element={<Progress />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/*  */}
      {newHabit && <HabitForm />}
      {overlay && <Overlay />}
      {deleteWindow && <DeleteHabit />}
      {markDay && <MarkDay />}
    </div>
  )
}

export default App
