import AllTabs from "./AllTabs/AllTabs"
import CurrentMonth from "./CurrentMonth/CurrentMonth"

import MonthSwitcher from "./MonthSwitcher/MonthSwitcher"

export default function Header() {
  return (
    <div className="bg-dark py-5 flex justify-between items-center relative  px-7">
      <CurrentMonth />
      <AllTabs />
      <MonthSwitcher />
    </div>
  )
}
