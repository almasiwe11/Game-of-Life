import { useSelector } from "react-redux"
import { RootState } from "../../../RootState"

export default function LevelTracker() {
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const { totalExp } = currentHabit!

  function calculateLevel(xp: number) {
    let xpPerLevel = 500
    let level = 1

    while (xp >= xpPerLevel) {
      xp -= xpPerLevel
      level++
      xpPerLevel += 200
    }
    console.log(`xp untill next lvl ${xpPerLevel} \n current xp ${xp}`)
    return level
  }

  const xp = 6800
  const playerLevel = calculateLevel(xp)
  console.log(`Player is at level ${playerLevel}`)

  return (
    <div className="text-white font-bold flex flex-col items-center">
      <span>{totalExp}</span>
      <span>{"lvl"}</span>
    </div>
  )
}
