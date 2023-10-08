import { useSelector } from "react-redux"
import { RootState } from "../../RootState"
import Button from "../Shared/Button"
import { Mood } from "../../Types/HabitTypes"
import { useState } from "react"

type Props = {
  setMood: React.Dispatch<React.SetStateAction<number>>
}

export default function MarkYesNo({ setMood }: Props) {
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const habit = currentHabit!

  const [selected, setSelected] = useState("none")
  return (
    <div className="flex-center gap-4">
      <Button
        text={`Skipped - ${habit.skippedPenalty} exp`}
        color="danger"
        onClick={() => {
          setMood(Mood.Skipped)
          setSelected("skipped")
        }}
        className={`${
          selected === "skipped" && "bg-white text-red-600 border-red-600"
        }`}
      ></Button>
      <Button
        text={`Done + 100`}
        color="brand"
        onClick={() => {
          setMood(Mood.Perfect)
          setSelected("done")
        }}
        className={`${
          selected === "done" && "bg-white text-brand border-brand"
        }`}
      ></Button>
    </div>
  )
}
