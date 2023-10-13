import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "./RootState"
import HabitForm from "./Components/HabitForm/HabitForm"
import Overlay from "./Components/Overlay"
import DeleteHabit from "./Components/DeleteHabit"
import MarkDay from "./Components/MarkDay/MarkDay"
import usePrevWeeksCheck from "./Hooks/usePrevWeeksCheck"
import Fallback from "./Components/Fallback"

const Progress = lazy(() => import("./Layout/Progress/Progress"))
const Today = lazy(() => import("./Layout/Today/Today"))
const Body = lazy(() => import("./Layout/Body/Body"))
const AppLayout = lazy(() => import("./Layout/AppLayout"))

function App() {
  const { overlay, newHabit, deleteWindow, markDay } = useSelector(
    (state: RootState) => state.calendar
  )

  usePrevWeeksCheck()

  return (
    <div className="">
      <BrowserRouter>
        <Suspense fallback={<Fallback />}>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Body />}></Route>
              <Route path="today" element={<Today />}></Route>
              <Route path="progress" element={<Progress />}></Route>
            </Route>
          </Routes>
        </Suspense>
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
