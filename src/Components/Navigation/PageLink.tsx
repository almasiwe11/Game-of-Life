import { IconType } from "react-icons"

type Props = {
  Icon: IconType
  name: string
}

export default function PageLink({ Icon, name }: Props) {
  return (
    <div className="flex hover:bg-gray-light duration-300 ease-in-out  items-center gap-3 font-poppins cursor-pointer p-2 px-7 rounded-full">
      <Icon className="h-8 w-8" />
      <p className={``}>{name}</p>
    </div>
  )
}
