import Body from "./Components/Body/Body"
import Details from "./Components/Details/Details"
import NewTab from "./Components/NewTab/NewTab"
import Overlay from "./Components/Overlay/Overlay"
import Stats from "./Components/Stats/Stats"
import { useDate } from "./Context/DateContextProvider"

function App() {
  const { dateState } = useDate()
  const { overlay, newTab, tabs } = dateState
  return (
    <div className="flex flex-col justify-start items-start w-[90%] mx-auto pt-24 h-screen">
      <div className="flex w-full">
        <Body />
        {tabs.length > 0 && <Details />}
      </div>
      <Stats />
      {overlay && <Overlay />}
      {newTab && <NewTab />}
    </div>
  )
}

export default App
