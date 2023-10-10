import { useSelector } from "react-redux"
import { RootState } from "../../../RootState"
import { useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"

const levelUpAnimation = (width: number, prevxp: number) => keyframes`
  0%{
    width:${prevxp}%
  }
  50%{
    width:100%;
  }
  51%{
    width:0%
  }
  100% {
    width:${width}%
  }
`

const levelDownAnimation = (width: number, prevxp: number) => keyframes`
  0%{
    width:${prevxp}%
  }
  50%{
    width:0%;
  }
  51%{
    width:100%
  }
  100% {
    width:${width}%
  }
`
const ProgressBarContainer = styled.div`
  position: relative;
  width: 200px;
  height: 4px;
  background-color: yellow;
  border-radius: 7px;
`

const ProgressBarValue = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    !["levelUp", "prevXpLevelUp", "levelDown", "prevXpLevelDown"].includes(
      prop
    ),
})<{
  width: number
  levelUp: boolean
  levelDown: boolean
  prevXpLevelUp: number
  prevXpLevelDown: number
}>`
  width: ${(props) => props.width}%;
  position: absolute;
  left: 0;
  height: 100%;
  border-radius: 7px;
  animation: ${(props) =>
      props.levelUp
        ? levelUpAnimation(props.width, props.prevXpLevelUp)
        : props.levelDown
        ? levelDownAnimation(props.width, props.prevXpLevelDown)
        : "none"}
    1.3s ease-in-out;
  background-color: blue;
  transition: 1.3s ease;
`

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

  const prevLevelRef = useRef(Infinity)
  const prevXpRef = useRef(1)

  useEffect(() => {
    prevLevelRef.current = level
    prevXpRef.current = xp
  }, [level, xp])

  const levelUp = level > prevLevelRef.current
  const levelDown =
    level < prevLevelRef.current && prevLevelRef.current !== Infinity

  const prevXpLevelUp = (prevXpRef.current * 100) / (xpPerLevel - 200)
  const prevXpLevelDown = (prevXpRef.current * 100) / (xpPerLevel + 200)
  function getProgressWidth() {
    if (!levelUp) {
      return `${(xp * 100) / xpPerLevel}%`
    }
  }

  return (
    <div className="text-white font-bold flex flex-col items-center">
      <div className="flex gap-4 items-center">
        <span className="text-center">Level {playerLevel}</span>
        <ProgressBarContainer>
          <ProgressBarValue
            width={(xp * 100) / xpPerLevel}
            levelDown={levelDown}
            levelUp={levelUp}
            prevXpLevelUp={prevXpLevelUp}
            prevXpLevelDown={prevXpLevelDown}
          ></ProgressBarValue>
        </ProgressBarContainer>
        <span className="">{`${xp}/${xpPerLevel}`}</span>
      </div>
    </div>
  )
}
