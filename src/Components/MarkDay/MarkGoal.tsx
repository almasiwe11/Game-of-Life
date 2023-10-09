import { useSelector } from "react-redux"
import Button from "../Shared/Button"
import { RootState } from "../../RootState"
import { useState } from "react"
import { Mood } from "../../Types/HabitTypes"

type Props = {
  setMood: React.Dispatch<React.SetStateAction<number>>
  handleDayMarking: () => void
}

export default function MarkGoal({ setMood, handleDayMarking }: Props) {
  const [result, setResult] = useState("")
  const [selected, setSelected] = useState("")

  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const habit = currentHabit!

  function handleSubmit(e: React.KeyboardEvent<HTMLInputElement>) {
    if (result === "") return
    if (Number(result) <= 0) return
    if (e.key === "Enter") {
      handleDayMarking()
    }
  }

  function handleChange(result: string) {
    const mood = Math.floor((Number(result) * 10) / habit.goal!)
    setSelected("")
    if (mood < 1) {
      setMood(1)
      setResult("1")
      return
    }
    setMood(mood)
    setResult(result)
    setSelected("")
  }

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
            handleChange(e.target.value)
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