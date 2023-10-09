import { useSelector } from "react-redux"
import { RootState } from "../../../RootState"

export default function LevelTracker() {
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  if (currentHabit?.markedDays.length === 0 || !currentHabit) return
  const { totalExp } = currentHabit!

  function calculateLevel(xp: number) {
    let xpPerLevel = 500
    let level = 1

    while (xp >= xpPerLevel) {
      xp -= xpPerLevel
      level++
      xpPerLevel += 200
    }
    return level
  }

  const xp = 6800
  const playerLevel = calculateLevel(xp)

  return (
    <div className="text-white font-bold flex flex-col items-center">
      <span>{totalExp}</span>
      <span>{"lvl"}</span>
    </div>
  )
}
