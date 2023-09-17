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
} from "../../../Types/TabTypes"
import { parseJSON } from "date-fns"

type PropTypes = {
  date: Date
}

export default function Cell({ date }: PropTypes) {
  const formattedDay = format(date, "d")
  const isToday = isSameDay(new Date(), date)

  const { dateState, dispatch } = useDate()
  const { currentTab } = dateState
  const thisTab = dateState.tabs.find((tab) => tab.name === currentTab)

  const marked = thisTab?.markedDays.find((marked) =>
    isSameDay(parseJSON(marked.day), date)
  )

  const [rating, setRating] = useState(getInitialRating())

  let Icon: IconType = icons[0]

  function getInitialRating() {
    if (thisTab?.type === "moodchecker") {
      if (marked) {
        const markedMood = marked as MarkedMoodChecker
        return markedMood.mood
      } else {
        return 0
      }
    } else {
      return 0
    }
  }

  function getIcons() {
    if (thisTab?.type === "moodchecker") {
      const markedMood = marked as MarkedMoodChecker
      if (markedMood) {
        Icon = icons[markedMood!.mood]
      }
    }
  }

  useEffect(() => {
    setRating(getInitialRating())
  }, [currentTab, setRating, getInitialRating])

  getIcons()

  function handleClick() {
    if (thisTab?.type === "moodchecker") {
      handleMoodChecker()
    }
  }

  function calcRating(settings: TabSettings, mood: Mood, minRating: number) {
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

  function handleMoodChecker() {
    handleMoodRating()
    updateStorage()
  }

  function handleMoodRating() {
    rating === 8 ? setRating(1) : setRating((prev) => prev + 1)
  }

  function updateStorage() {
    const rightRating = rating === 8 ? 1 : rating + 1
    const set = (thisTab as FormTypes & MoodChecker)!.settings
    const cellInfo: MarkedMoodChecker = {
      day: date,
      mood: rightRating,
      skippedRating: thisTab!.minRating,
      settings: set,
      rating: calcRating(set, rightRating, thisTab!.minRating),
      streak: 0,
    }
    const oldTab: FormTypes & MoodChecker = thisTab as FormTypes & MoodChecker
    const update = oldTab.markedDays.some((marked) =>
      isSameDay(parseJSON(marked.day), cellInfo.day)
    )
    let newMarkedDays: MarkedMoodChecker[]

    if (update) {
      newMarkedDays = oldTab.markedDays.map((marked) =>
        isSameDay(parseJSON(marked.day), cellInfo.day) ? cellInfo : marked
      )
    } else {
      newMarkedDays = [...oldTab.markedDays, cellInfo]
    }

    const newTab: FormTypes & MoodChecker = {
      ...oldTab,
      markedDays: newMarkedDays,
    }
    const allNewTabs = dateState.tabs.map((tab) =>
      tab.name === currentTab ? newTab : tab
    )
    localStorage.setItem("tabs", JSON.stringify(allNewTabs))
    dispatch({ type: Commands.SAVECHANGE, allNewTabs: allNewTabs })
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
