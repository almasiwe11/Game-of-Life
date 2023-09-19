import Body from "./Components/Body/Body"
import Details from "./Components/Details/Details"
import NewTab from "./Components/NewTab/NewTab"
import Overlay from "./Components/Overlay/Overlay"
import { useDate } from "./Context/DateContextProvider"

function App() {
  const { dateState } = useDate()
  const { overlay, newTab } = dateState
  return (
    <div className="flex justify-center items-start pt-24 h-screen">
      <div className="flex  w-[90%] mx-auto">
        <Body />
        <Details />
      </div>
      {overlay && <Overlay />}
      {newTab && <NewTab />}
    </div>
  )
}

export default App
