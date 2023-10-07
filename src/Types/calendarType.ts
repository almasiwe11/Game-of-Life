import { HabitFormTypes } from "./HabitTypes"

type Calendar = {
  today: string
  newHabit: boolean
  overlay: boolean
  allHabits: HabitTab[]
}

type HabitTab = HabitFormTypes & {
  markedDays: []
}

export type { Calendar, HabitTab }
