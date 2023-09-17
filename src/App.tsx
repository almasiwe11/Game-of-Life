import Body from "./Components/Body/Body"
import NewTab from "./Components/NewTab/NewTab"
import Overlay from "./Components/Overlay/Overlay"
import { useDate } from "./Context/DateContextProvider"

function App() {
  const { dateState } = useDate()
  const { overlay, newTab } = dateState
  console.log(dateState)
  return (
    <div className="flex-center h-screen">
      <Body />
      {overlay && <Overlay />}
      {newTab && <NewTab />}
    </div>
  )
}

export default App
