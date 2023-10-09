import { useSelector } from "react-redux"
import { RootState } from "../../../RootState"
import { useEffect, useRef } from "react"

export default function LevelTracker() {
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const { totalExp } = currentHabit!

  let xpPerLevel = 500
  let xp = totalExp
  let level = 1

  function calculateLevel() {
    while (xp >= xpPerLevel) {
      xp -= xpPerLevel
      level++
      xpPerLevel += 200
    }
    return level
  }

  const playerLevel = calculateLevel()

  const prevRef = useRef(1)

  useEffect(() => {
    prevRef.current = level
  }, [level])

  const levelUp = level > prevRef.current

  const progressContainerStyle = {
    position: "relative",
    width: "200px",
    height: "4px",
    backgroundColor: "yellow",
    borderRadius: "7px",
  }

  const progressBarVauleStyle = {
    position: "absolute",
    left: "0",
    height: "100%",
    borderRadius: "7px",
    backgroundColor: "blue",
    width: getProgressWidth(),
    transition: "0.3s ease-in-out",
  }

  function getProgressWidth() {
    if (!levelUp) {
      return `${(xp * 100) / xpPerLevel}%`
    }
  }

  return (
    <div className="text-white font-bold flex flex-col items-center">
      <div className="flex gap-4 items-center">
        <span className="text-center">Level {playerLevel}</span>
        {/* <progress value={xp} max={xpPerLevel} className=""></progress> */}
        <div style={progressContainerStyle}>
          <span style={progressBarVauleStyle}></span>
        </div>
        <span className="">{`${xp}/${xpPerLevel}`}</span>
      </div>
    </div>
  )
}
