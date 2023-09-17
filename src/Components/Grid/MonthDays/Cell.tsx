import { useState } from "react"
import { format, isSameDay } from "date-fns"
import { useDate } from "../../../Context/DateContextProvider"
import { icons } from "../../../Icons/Icons"
import { Mood } from "../../../Types/TabTypes"
import { IconType } from "react-icons"
import { MarkedMoodChecker, MoodChecker } from "../../../Types/TabTypes"

type PropTypes = {
  date: Date
}

export default function Cell({ date }: PropTypes) {
  const [rating, setRating] = useState(0)

  const formattedDay = format(date, "d")
  const isToday = isSameDay(new Date(), date)

  const { dateState } = useDate()
  const { currentTab } = dateState
  const thisTab = dateState.tabs.find((tab) => tab.name === currentTab)

  let Icon: IconType = icons[rating]

  function handleClick() {
    if (thisTab?.type === "moodchecker") {
      handleMoodChecker()
    }
  }

  function handleMoodChecker() {
    handleMoodRating()
    const dayValues: MarkedMoodChecker = {
      day: date,
      streak: 0,
      mood: 0, //depends on rating have to make calculations look at settings and then see what should be the mood
      rating: 0, // depends on rating
      settings: (thisTab as MoodChecker)!.settings,
    }
  }

  function handleMoodRating() {
    rating === 8 ? setRating(1) : setRating((prev) => prev + 1)
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
