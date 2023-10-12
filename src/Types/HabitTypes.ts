import { MarkedDaysOfMonth, MarkedHabit } from "./calendarType"

type HabitTypesTypes = "moodchecker" | "yes-no" | "goal"

type HabitFormTypes = {
  name: string
  type: HabitTypesTypes
  timesPerWeek: number
  goal?: number
  goalIncrement: number
  penaltyIncrement: number
  startDate: string
  skippedPenalty: number
  totalExp: number
  firstMarkedDate: string | undefined
}

type ScopeTypes = "month" | "year" | "years"
type DataArrTypes = MarkedDaysOfMonth[] | MarkedHabit[]

enum Mood {
  Skipped,
  Abysmal,
  Terrible,
  Sad,
  Disappointed,
  Meh,
  Ok,
  Decent,
  Great,
  Amazing,
  Perfect,
  Extraordinary = 13,
}

export type { HabitFormTypes, HabitTypesTypes, ScopeTypes, DataArrTypes }
export { Mood }
