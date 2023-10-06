import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useSelector } from "react-redux"
import Body from "./Layout/Body/Body"
import { RootState } from "./RootState"
import HabitForm from "./Components/HabitForm/HabitForm"
import Overlay from "./Components/Shared/Overlay"
import AppLayout from "./Layout/AppLayout"

function App() {
  const { overlay, newHabit } = useSelector(
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
    </div>
  )
}

export default App
