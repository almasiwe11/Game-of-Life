import Body from "./Components/Body/Body"
import Details from "./Components/Details/Details"
import NewTab from "./Components/NewTab/NewTab"
import Overlay from "./Components/Overlay/Overlay"
import { useDate } from "./Context/DateContextProvider"

function App() {
  const { dateState } = useDate()
  const { overlay, newTab } = dateState
  console.log(dateState)
  return (
    <div className="flex items-center h-screen">
      <div className="flex items-center  w-[90%] mx-auto">
        <Body />
        <Details />
      </div>
      {overlay && <Overlay />}
      {newTab && <NewTab />}
    </div>
  )
}

export default App
