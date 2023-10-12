import { IconType } from "react-icons"
import { Mood } from "../../../Types/HabitTypes"
import { moodIcons } from "../../../Icons/Icons"
import { MarkedDaysOfMonth } from "../../../Types/calendarType"

function styleCell(isMarked: MarkedDaysOfMonth | undefined) {
  let Icon!: IconType
  let background!: string
  if (isMarked) {
    if (isMarked.mood >= Mood.Extraordinary) {
      Icon = moodIcons[moodIcons.length - 1].icon
      background = moodIcons[moodIcons.length - 1].bg
    } else if (
      isMarked.mood >= Mood.Perfect &&
      isMarked.mood < Mood.Extraordinary
    ) {
      Icon = moodIcons[Mood.Perfect].icon
      background = moodIcons[Mood.Perfect].bg
    } else {
      Icon = moodIcons[isMarked.mood].icon
      background = moodIcons[isMarked.mood].bg
    }
  }

  const bg = {
    backgroundColor: isMarked ? background : "rgb(30, 31, 33)",
  }

  return { bg, Icon }
}

export { styleCell }
