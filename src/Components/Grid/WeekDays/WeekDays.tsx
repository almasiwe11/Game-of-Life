import useGrid from "../../../Hooks/useGrid"

export default function WeekDays() {
  const { weekDays } = useGrid()
  return (
    <>
      {weekDays.map((day) => (
        <div key={day} className="text-center text-blue mb-2">
          {day}
        </div>
      ))}
    </>
  )
}
