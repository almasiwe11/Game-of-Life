import { format, isSameDay } from "date-fns"

type PropTypes = {
  date: Date
}

export default function Cell({ date }: PropTypes) {
  const formattedDay = format(date, "d")
  const isToday = isSameDay(new Date(), date)
  return (
    <div className="text-center text-white h-20 border border-border relative cursor-pointer ">
      <span
        className={`absolute top-2 right-4 rounded-full h-6   w-6 ${
          isToday && "bg-red-600"
        }`}
      >
        {formattedDay}
      </span>
    </div>
  )
}
