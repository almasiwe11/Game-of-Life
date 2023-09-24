import { useDate } from "../../../Context/DateContextProvider"
import Tab from "./Tab"

export default function AllTabs() {
  const { dateState } = useDate()
  const { tabs } = dateState
  return (
    <div className=" flex-center gap-2 ">
      <div className="flex gap-2  w-full flex-wrap ">
        {tabs.map((tab) => (
          <Tab key={tab.name} tab={tab} />
        ))}
      </div>
    </div>
  )
}
