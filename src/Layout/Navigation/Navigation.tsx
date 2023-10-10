import { BsGraphUpArrow } from "react-icons/bs"
import { BsCalendarDay } from "react-icons/bs"
import { GiStrongMan } from "react-icons/gi"
import Logo from "../../Components/Shared/Logo"
import PageLink from "./PageLink"

export default function Navigation() {
  return (
    <div className="row-span-2 flex justify-center">
      <div className="flex flex-col pt-4 gap-3">
        <Logo />
        <PageLink Icon={GiStrongMan} name="Today" to="today" />
        <PageLink Icon={BsCalendarDay} name="Calendar" to="/" />
        <PageLink Icon={BsGraphUpArrow} name="Progress" to="progress" />
      </div>
    </div>
  )
}
