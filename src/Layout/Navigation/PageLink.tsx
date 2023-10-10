import { IconType } from "react-icons"
import { NavLink } from "react-router-dom"

type Props = {
  Icon: IconType
  name: string
  to: string
}

export default function PageLink({ Icon, name, to }: Props) {
  return (
    <NavLink
      to={to}
      className="flex hover:bg-gray-light duration-300 ease-in-out  items-center gap-3 font-poppins cursor-pointer p-2 px-7 rounded-full"
    >
      <Icon className="h-8 w-8" />
      <p className={``}>{name}</p>
    </NavLink>
  )
}
