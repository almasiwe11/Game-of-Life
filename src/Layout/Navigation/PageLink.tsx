import { useState } from "react"
import { IconType } from "react-icons"
import { NavLink } from "react-router-dom"

type Props = {
  Icon: IconType
  name: string
  to: string
}

const base =
  "flex hover:bg-gray-light duration-300 ease-in-out  items-center gap-3 font-poppins cursor-pointer p-2 px-7 rounded-full"

export default function PageLink({ Icon, name, to }: Props) {
  const [active, setActive] = useState(false)
  return (
    <NavLink
      to={to}
      className={({ isActive }) => {
        if (isActive) {
          setActive(true)
        } else {
          setActive(false)
        }
        return base + (isActive ? " bg-gray-light" : "")
      }}
    >
      <Icon className={`${active && "text-brand"} h-8 w-8`} />
      <p className={`${active && "font-semibold"}`}>{name}</p>
    </NavLink>
  )
}
