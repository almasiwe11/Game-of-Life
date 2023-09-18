import { useState, useEffect } from "react"
import { format, isSameDay } from "date-fns"
import { useDate } from "../../../Context/DateContextProvider"
import { icons } from "../../../Icons/Icons"
import { Mood } from "../../../Types/TabTypes"
import { IconType } from "react-icons"
import { Commands } from "../../../Types/ContextTypes"
import {
  MarkedMoodChecker,
  MoodChecker,
  TabSettings,
  FormTypes,
  TabTypes,
  MarkedDaysAny,
  MarkedGoalNumber,
  CellInfoAny,
} from "../../../Types/TabTypes"
import { parseJSON } from "date-fns"

type PropTypes = {
  date: Date
}

export default function Cell({ date }: PropTypes) {
  const formattedDay = format(date, "d")
  const isToday = isSameDay(new Date(), date)

  const { dateState, dispatch } = useDate()
  const { currentTab, addGoal, currentGoal, selectedDate } = dateState
  const thisTab = dateState.tabs.find((tab) => tab.name === currentTab)
  console.log(dateState.tabs)

  const marked = thisTab?.markedDays.find((marked) =>
    isSameDay(parseJSON(marked.day), date)
  )

  const [rating, setRating] = useState(getInitialRating())

  let Icon: IconType = icons[0]

  function getInitialRating() {
    if (thisTab?.type === "moodchecker" || thisTab?.type === "yes-no") {
      if (marked) {
        const markedMood = marked as MarkedMoodChecker
        return markedMood.mood
      } else {
        return 0
      }
    } else {
      const markedGoal = marked as MarkedGoalNumber
      if (markedGoal) {
        if (typeof markedGoal.numberResult === "number") {
          const goal = markedGoal.goal
          const result = markedGoal.numberResult
          const { sad, meh, great, fantastic, perfect } = markedGoal.settings
          if (result <= (sad * goal) / 100) {
            return Mood.ANGRY
          }
          if (result <= (meh * goal) / 100 && result >= (sad * goal) / 100) {
            return Mood.SAD
          }
          if (result <= (great * goal) / 100 && result >= (meh * goal) / 100) {
            return Mood.MEH
          }
          if (
            result <= (fantastic * goal) / 100 &&
            result >= (great * goal) / 100
          ) {
            return Mood.GREAT
          }
          if (
            result < (perfect * goal) / 100 &&
            result >= (fantastic * goal) / 100
          ) {
            return Mood.FANTASTIC
          }
          if (result >= (perfect * goal) / 100) {
            return Mood.PERFECT
          }
        }
      } else {
        return 0
      }
      return 0
    }
  }

  function getIcons() {
    if (marked) {
      Icon = icons[rating!]
    }
  }

  useEffect(() => {
    setRating(getInitialRating())
  }, [currentTab, setRating, getInitialRating])

  useEffect(() => {
    if (addGoal) {
      handleRating()
      handleTab()
    }
  }, [addGoal])

  getIcons()

  function handleClick() {
    dispatch({ type: Commands.SELECTDAY, day: date })
    if (thisTab?.type !== "goal-number") {
      handleRating()
      handleTab()
    }
  }

  function calcRating(settings: TabSettings, mood: Mood, minRating: number) {
    if (thisTab!.type === "moodchecker") {
      switch (mood) {
        case Mood.QUESTION:
          return 0
        case Mood.DAYOFF:
          return 0
        case Mood.SKIPPED:
          return minRating
        case Mood.ANGRY:
          return settings.angry
        case Mood.MEH:
          return settings.meh
        case Mood.SAD:
          return settings.sad
        case Mood.GREAT:
          return settings.great
        case Mood.FANTASTIC:
          return settings.fantastic
        case Mood.PERFECT:
          return settings.perfect
      }
    }
  }

  function getModifiedRating() {
    if (thisTab!.type === "moodchecker") {
      return rating === 8 ? 1 : rating! + 1
    } else if (thisTab!.type === "yes-no") {
      let right
      if (rating === 0) right = 3
      if (rating === 3) right = 7
      if (rating === 7) right = 2
      if (rating === 2) right = 3
      return right
    }
  }

  function getCellInfo() {
    const rightRating = getModifiedRating()!
    const set = (thisTab as FormTypes & MoodChecker)!.settings
    let info
    if (thisTab?.type === "moodchecker") {
      info = {
        day: date,
        mood: rightRating,
        skippedRating: thisTab!.minRating,
        settings: set,
        rating: calcRating(set, rightRating, thisTab!.minRating)!,
        streak: 0,
      }
    } else if (thisTab?.type === "yes-no") {
      info = {
        day: date,
        streak: 0,
        mood: rightRating,
        rating: 2,
      }
    } else if (thisTab?.type === "goal-number") {
      info = {
        day: selectedDate,
        streak: 0,
        rating: 2,
        settings: set,
        numberResult: currentGoal,
        goal: thisTab.goal,
      }
    }
    return info
  }

  function handleTab() {
    const cellInfo: CellInfoAny = getCellInfo()!
    updateStorage(cellInfo)
    if (thisTab?.type === "goal-number") {
      dispatch({ type: Commands.GOALSUBMITTED })
    }
  }

  function updateStorage(cellInfo: CellInfoAny) {
    const oldTab: TabTypes = thisTab as TabTypes
    const update = oldTab.markedDays.some((marked) =>
      isSameDay(parseJSON(marked.day), cellInfo.day)
    )
    let newMarkedDays: MarkedDaysAny

    if (update) {
      newMarkedDays = oldTab.markedDays.map((marked) =>
        isSameDay(parseJSON(marked.day), cellInfo.day) ? cellInfo : marked
      ) as MarkedDaysAny
    } else {
      newMarkedDays = [...oldTab.markedDays, cellInfo!] as MarkedDaysAny
    }

    const newTab: TabTypes = {
      ...oldTab,
      markedDays: newMarkedDays,
    } as TabTypes

    const allNewTabs = dateState.tabs.map((tab) =>
      tab.name === currentTab ? newTab : tab
    )
    localStorage.setItem("tabs", JSON.stringify(allNewTabs))
    dispatch({ type: Commands.SAVECHANGE, allNewTabs: allNewTabs })
  }

  function handleRating() {
    if (thisTab?.type === "moodchecker") {
      rating === 8 ? setRating(1) : setRating((prev) => prev! + 1)
    } else if (thisTab?.type === "yes-no") {
      rating === 0 && setRating(3)
      rating === 3 && setRating(7)
      rating === 7 && setRating(2)
      rating === 2 && setRating(3)
    }
  }

  function getBgColor() {
    switch (rating) {
      case 0:
        return "transparent"
      case 1:
        return "black"
      case 2:
        return "white"
      case 3:
        return "red"
      case 4:
        return "#b45309"
      case 5:
        return "#eab308"
      case 6:
        return "green"
      case 7:
        return "#06b6d4"
      case 8:
        return "#7c3aed"
      default:
        return "transparent"
    }
  }

  const bgCell = {
    backgroundColor: getBgColor(),
  }

  return (
    <div
      className={`text-center text-white h-20 border select-none border-border relative cursor-pointer flex-center  group`}
      onClick={handleClick}
      style={bgCell}
    >
      <span
        className={`absolute top-2 right-4 rounded-full h-6   w-6 ${
          isToday && "bg-red-600"
        }`}
      >
        {formattedDay}
      </span>

      {Icon && (
        <Icon
          className={`${rating === 8 ? "w-2/3 h-2/3" : "w-1/2 h-1/2"} ${
            rating === 0 && "opacity-0 group-hover:opacity-100"
          } ${rating === 2 && "text-blue"} `}
        />
      )}
    </div>
  )
}
