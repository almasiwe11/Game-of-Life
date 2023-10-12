import { useEffect, useRef } from "react"
import styled, { keyframes } from "styled-components"
import { HabitTab } from "../../../Types/CalendarTypes"
import { calculateLevel } from "../../../utils/helperLevel"
import { useDispatch, useSelector } from "react-redux"
import { adjustGoal, adjustPenalty } from "../../../Calendar/calendarSlice"
import { RootState } from "../../../RootState"

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
    ![
      "levelUp",
      "prevXpLevelUp",
      "levelDown",
      "prevXpLevelDown",
      "tabChanged",
    ].includes(prop),
})<{
  width: number
  levelUp: boolean
  levelDown: boolean
  prevXpLevelUp: number
  prevXpLevelDown: number
  tabChanged: boolean
}>`
  width: ${(props) => props.width}%;
  position: absolute;
  left: 0;
  height: 100%;
  border-radius: 7px;
  animation: ${(props) =>
      props.tabChanged
        ? "none"
        : props.levelUp
        ? levelUpAnimation(props.width, props.prevXpLevelUp)
        : props.levelDown
        ? levelDownAnimation(props.width, props.prevXpLevelDown)
        : "none"}
    1.3s ease-in-out;
  background-color: blue;
  transition: ${(props) => (props.tabChanged ? "none" : "1.3s ease")};
`

type Props = {
  habit: HabitTab
}

export default function LevelTracker({ habit }: Props) {
  const { totalExp } = habit

  const { level, xp, xpPerLevel } = calculateLevel(totalExp)
  const prevLevelRef = useRef(Infinity)
  const prevXpRef = useRef(1)
  const prevTab = useRef("")
  const dispatch = useDispatch()
  const { currentHabit } = useSelector((state: RootState) => state.calendar)
  const thisHabitType = currentHabit!.type

  const levelUp = level > prevLevelRef.current
  const levelDown =
    level < prevLevelRef.current && prevLevelRef.current !== Infinity

  useEffect(() => {
    prevLevelRef.current = level
    prevTab.current = habit.name
    prevXpRef.current = xp

    if (levelUp) {
      dispatch(adjustPenalty("increase"))
      thisHabitType === "goal" && dispatch(adjustGoal("increase"))
    }

    if (levelDown) {
      dispatch(adjustPenalty("decrease"))
      thisHabitType === "goal" && dispatch(adjustGoal("decrease"))
    }
  }, [
    level,
    xp,
    habit.name,
    levelUp,
    levelDown,
    dispatch,
    thisHabitType,
    currentHabit,
  ])

  const prevXpLevelUp = (prevXpRef.current * 100) / (xpPerLevel - 200)
  const prevXpLevelDown = (prevXpRef.current * 100) / (xpPerLevel + 200)
  const tabChanged = prevTab.current !== habit.name

  return (
    <div className="text-white font-bold flex flex-col items-center">
      <div className="flex gap-4 items-center">
        <span className="text-center">Level {level}</span>
        <ProgressBarContainer>
          <ProgressBarValue
            width={(xp * 100) / xpPerLevel}
            levelDown={levelDown}
            levelUp={levelUp}
            prevXpLevelUp={prevXpLevelUp}
            prevXpLevelDown={prevXpLevelDown}
            tabChanged={tabChanged}
          ></ProgressBarValue>
        </ProgressBarContainer>
        <span className="">{`${xp}/${xpPerLevel}`}</span>
      </div>
    </div>
  )
}
