import { HabitFormTypes } from "./HabitTypes"

type Calendar = {
  today: string
  newHabit: boolean
  overlay: boolean
  allHabits: HabitTab[]
  currentHabit: HabitTab | null
  deleteWindow: boolean
}

type HabitTab = HabitFormTypes & {
  markedDays: []
}

type DeleteActions = "try-delete" | "no-delete" | "delete"

export type { Calendar, HabitTab, DeleteActions }
