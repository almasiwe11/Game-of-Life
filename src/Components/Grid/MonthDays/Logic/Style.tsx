import { isSameMonth, add } from "date-fns"

function getBgColor(rating: number) {
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

function getStyle({ today, date }: { today: Date; date: Date }) {
  let style: string
  const nextMonth = add(today, { months: 1 })
  if (isSameMonth(date, nextMonth)) style = "hidden"
  else if (!isSameMonth(date, today)) style = "invisible"
  else style = "flex-center"
  return style
}

export { getStyle, getBgColor }
