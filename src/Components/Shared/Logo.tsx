import { SiJordan } from "react-icons/si"

export default function Logo() {
  return (
    <div className="flex flex-col items-center mb-12">
      <SiJordan className="h-24 w-24" />
      <p className="font-dance font-bold text-3xl">Game of Life</p>
    </div>
  )
}
