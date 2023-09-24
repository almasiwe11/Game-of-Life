import { useEffect } from "react"

import Body from "./Components/Body/Body"
import Details from "./Components/Details/Details"
import NewTab from "./Components/NewTab/NewTab"
import Overlay from "./Components/Overlay/Overlay"
import Stats from "./Components/Stats/Stats"
import { useDate } from "./Context/DateContextProvider"
import { Commands } from "./Types/ContextTypes"

function App() {
  const { dateState, dispatch } = useDate()
  const { overlay, newTab, tabs } = dateState

  useEffect(() => {
    if (tabs.length === 0) {
      dispatch({ type: Commands.NEWTAB })
    }
  }, [dispatch, tabs])

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
