import { isSameMonth, add } from "date-fns"
import { Mood } from "../../../../Types/TabTypes"

function getBgColor(rating: number) {
  switch (rating) {
    case 0:
      return "transparent"
    case Mood.SKIPPED:
      return "black"
    case Mood.ANGRY:
      return "red"
    case Mood.SAD:
      return "#b45309"
    case Mood.MEH:
      return "#eab308"
    case Mood.GREAT:
      return "green"
    case Mood.FANTASTIC:
      return "#06b6d4"
    case Mood.PERFECT:
      return "#7c3aed"
    default:
      return "transparent"
  }
}

function getStyle({ today, date }: { today: Date; date: Date }) {
  let style: string
  const nextMonth = add(today, { months: 1 })
  if (isSameMonth(date, nextMonth)) style = "hidden"
  else if (!isSameMonth(date, today)) style = "invisible"
  else style = "flex-center"
  return style
}

export { getStyle, getBgColor }
