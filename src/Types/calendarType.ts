import { HabitFormTypes } from "./HabitTypes"

type Calendar = {
  today: string
  newHabit: boolean
  overlay: boolean
  allHabits: HabitTab[]
  currentHabit: HabitTab | null
}

type HabitTab = HabitFormTypes & {
  markedDays: []
}

export type { Calendar, HabitTab }
