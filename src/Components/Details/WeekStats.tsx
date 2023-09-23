import { Fragment } from "react"
import { WeekStat } from "../../Types/ContextTypes"
import { TabTypes } from "../../Types/TabTypes"

export default function WeekStats({
  weekCompleted,
  thisTab,
}: {
  weekCompleted: WeekStat[] | undefined
  thisTab: TabTypes | undefined
}) {
  return (
    <>
      {weekCompleted && (
        <div className="grid grid-cols-4 mt-5 text-center text-lg">
          <span> Week </span>
          <span> attempted </span>
          <span> out of </span>
          <span>Average Rating</span>
          {weekCompleted?.map((week) => (
            <Fragment key={week.week}>
              <span> {week.week} </span>
              <span> {week.completed} </span>
              <span> {week.outOf} </span>
              <span>
                {week.avg}/{thisTab?.avgRating}{" "}
              </span>
            </Fragment>
          ))}
        </div>
      )}
    </>
  )
}
