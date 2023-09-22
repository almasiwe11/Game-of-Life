import { useState, useEffect } from "react"
import { format, isSameDay, isAfter, isBefore } from "date-fns"
import { useDate } from "../../../Context/DateContextProvider"
import { icons } from "../../../Icons/Icons"
import { IconType } from "react-icons"
import { Commands } from "../../../Types/ContextTypes"
import { parseJSON } from "date-fns"
import { getInitialRating } from "./Logic/InitialRating"
import { updateStorage } from "./Logic/updateStorage"
import { getStyle, getBgColor } from "./Logic/Style"
import { Mood } from "../../../Types/TabTypes"

type PropTypes = {
  date: Date
  index: number
}

export default function Cell({ date, index }: PropTypes) {
  const formattedDay = format(date, "d")
  const isToday = isSameDay(new Date(), date)

  const { dateState, dispatch } = useDate()
  const { currentTab, goalInfo, selectedDate, today, skipped: skip } = dateState
  const { currentGoal, addGoal, skipped, dayOff } = goalInfo
  const thisTab = dateState.tabs.find((tab) => tab.name === currentTab)

  const marked = thisTab?.markedDays.find((marked) =>
    isSameDay(parseJSON(marked.day), date)
  )

  const [rating, setRating] = useState(getInitialRating({ thisTab, marked }))

  let Icon: IconType = icons[0]

  function getIcons() {
    if (marked) {
      Icon = icons[rating!]
    }
  }

  useEffect(() => {
    setRating(getInitialRating({ thisTab, marked }))
  }, [currentTab, setRating, marked, thisTab, today])

  useEffect(() => {
    if (addGoal) {
      handleRating()
      handleTab()
    }
  }, [addGoal])

  useEffect(() => {
    if (skip && isSameDay(date, selectedDate)) {
      setRating(Mood.SKIPPED)
      handleTab()
      dispatch({ type: Commands.SKIPUPDATED })
    }
  }, [skip])

  getIcons()

  function handleClick() {
    if (isAfter(date, new Date())) return

    if (
      !isSameDay(date, parseJSON(thisTab!.startDay)) &&
      isBefore(date, parseJSON(thisTab!.startDay))
    )
      return
    dispatch({ type: Commands.SELECTDAY, day: date })
    if (thisTab?.type !== "goal-number") {
      handleRating()
      handleTab()
    }
  }

  function handleTab() {
    updateStorage(
      thisTab,
      dateState,
      currentTab,
      dispatch,
      index,
      date,
      rating,
      selectedDate,
      currentGoal,
      skipped,
      dayOff
    )
    if (thisTab?.type === "goal-number") {
      dispatch({ type: Commands.GOALSUBMITTED })
    }
  }

  function handleRating() {
    if (thisTab?.type === "moodchecker") {
      rating === Mood.PERFECT
        ? setRating(Mood.SKIPPED)
        : setRating((prev) => prev! + 1)
    } else if (thisTab?.type === "yes-no") {
      rating === Mood.QUESTION && setRating(Mood.ANGRY)
      rating === Mood.ANGRY && setRating(Mood.GREAT)
      rating === Mood.GREAT && setRating(Mood.ANGRY)
    }
  }

  const cellStyle = {
    backgroundColor: getBgColor(rating),
  }

  return (
    <div
      className={`text-center text-white h-20 border ${getStyle({
        today,
        date,
      })}  select-none ${
        isSameDay(selectedDate, date) && !marked
          ? "border-red-600"
          : "border-border"
      } relative cursor-pointer group`}
      onClick={handleClick}
      style={cellStyle}
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
          className={`${
            rating === Mood.PERFECT ? "w-2/3 h-2/3" : "w-1/2 h-1/2"
          } ${rating === 0 && "opacity-0 group-hover:opacity-100"}  `}
        />
      )}
    </div>
  )
}
