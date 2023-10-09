import { useSelector } from "react-redux"
import { RootState } from "../../../RootState"

export default function LevelTracker() {
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  if (currentHabit?.markedDays.length === 0 || !currentHabit) return
  const { totalExp } = currentHabit!

  let xpPerLevel = 500
  let xp = totalExp

  function calculateLevel() {
    let level = 1

    while (xp >= xpPerLevel) {
      xp -= xpPerLevel
      level++
      xpPerLevel += 200
    }
    return level
  }

  const playerLevel = calculateLevel()

  return (
    <div className="text-white font-bold flex flex-col items-center">
      <div className="flex gap-4 items-center">
        <span className="text-center">Level {playerLevel}</span>
        <progress value={xp} max={xpPerLevel} className=""></progress>
        <span className="">{`${xp}/${xpPerLevel}`}</span>
      </div>
    </div>
  )
}
