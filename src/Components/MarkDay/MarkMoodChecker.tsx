import { useState } from "react"
import { useSelector } from "react-redux"
import { Mood } from "../../Types/HabitTypes"
import { RootState } from "../../RootState"
import Button from "../Shared/Button"

type Props = {
  setMood: React.Dispatch<React.SetStateAction<number>>
}

export default function MarkMoodChecker({ setMood }: Props) {
  const enumArray = Object.values(Mood)
  const halfLen = enumArray.length / 2
  const rateDay = []
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const habit = currentHabit!

  for (let i = 0; i < halfLen; i++) {
    const obj = {
      mood: "",
      exp: 0,
    }
    const moodName = enumArray[i]
    const exp = (enumArray[i + halfLen] as number) * 10

    obj.mood = moodName as string
    obj.exp = exp
    rateDay.push(obj)
  }

  function handleChange(mood: number) {
    setSelected("")
    setMood(mood)
  }

  rateDay.pop()
  rateDay.shift()

  const [selected, setSelected] = useState("")
  return (
    <div className="flex flex-col gap-4">
      <select
        className="border border-dark py-2 rounded-lg px-3"
        onChange={(e) => {
          handleChange(Number(e.target.value))
        }}
      >
        {rateDay.map((rate) => (
          <option value={rate.exp / 10} key={rate.exp}>
            {rate.mood} - {rate.exp}
          </option>
        ))}
      </select>

      <div className="flex gap-3 justify-center">
        <Button
          text={`Skipped - ${habit.skippedPenalty}`}
          color="danger"
          onClick={() => {
            setMood(Mood.Skipped)
            setSelected("skipped")
          }}
          className={`${
            selected === "skipped" && "bg-white text-red-600 border-red-600"
          }`}
        />
        <Button
          text="Extraordinary + 200"
          color="brand"
          onClick={() => {
            setMood(Mood.Extraordinary)
            setSelected("extra")
          }}
          className={`${
            selected === "extra" && "bg-white text-brand border-brand"
          }`}
        />
      </div>
    </div>
  )
}
