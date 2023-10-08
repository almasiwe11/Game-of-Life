import { useSelector } from "react-redux"
import Button from "../Shared/Button"
import { RootState } from "../../RootState"
import { useState } from "react"
import { Mood } from "../../Types/HabitTypes"

type Props = {
  setMood: React.Dispatch<React.SetStateAction<number>>
}

export default function MarkGoal({ setMood }: Props) {
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const habit = currentHabit!

  function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (result === "") return
    if (e.key === "Enter") {
      const mood = Math.floor(Number(result) / habit.goal!) * 10
      setMood(mood)
    }
  }

  const [result, setResult] = useState("")
  const [selected, setSelected] = useState("")

  return (
    <div className="flex gap-6 items-end justify-center">
      <div className="flex flex-col gap-1">
        <p className="">Goal - {habit.goal}</p>
        <input
          type="number"
          placeholder="result"
          name="result"
          className="border border-dark p-2 px-3 rounded-lg"
          onChange={(e) => {
            setResult(e.target.value)
            setSelected("")
          }}
          onKeyDown={handleSubmit}
        />
      </div>
      <Button
        text={`Skipped - ${currentHabit?.skippedPenalty} exp`}
        color="danger"
        onClick={() => {
          setMood(Mood.Skipped)
          setSelected("skipped")
        }}
        className={`${
          selected === "skipped" && "bg-white text-red-600 border-red-600"
        }`}
      />
    </div>
  )
}
