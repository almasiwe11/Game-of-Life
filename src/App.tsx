import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import Body from "./Layout/Body/Body"
import { RootState } from "./RootState"
import HabitForm from "./Components/HabitForm/HabitForm"
import Overlay from "./Components/Overlay"
import AppLayout from "./Layout/AppLayout"
import DeleteHabit from "./Components/DeleteHabit"

function App() {
  const { overlay, newHabit, deleteWindow } = useSelector(
    (state: RootState) => state.calendar
  )
  return (
    <div className="">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Body />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
      {/*  */}
      {newHabit && <HabitForm />}
      {overlay && <Overlay />}
      {deleteWindow && <DeleteHabit />}
    </div>
  )
}

export default App
