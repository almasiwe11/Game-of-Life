import { HabitFormTypes, Mood } from "./HabitTypes"

type Calendar = {
  today: string
  newHabit: boolean
  overlay: boolean
  allHabits: HabitTab[]
  currentHabit: HabitTab | null
  deleteWindow: boolean
  markDay: boolean
  selectedDay: string
  selectedDayIsMarked: MarkedDaysOfMonth | undefined
}

type HabitTab = HabitFormTypes & {
  markedDays: MarkedHabit[]
}

type MarkedHabit = {
  month: string
  marked: MarkedDaysOfMonth[]
}

type MarkedDaysOfMonth = {
  date: string
  day: number
  week: number
  expEarned: number
  result?: number | null
  totalExp: number
  mood: Mood
  level: number
}

type DeleteActions = "try-delete" | "no-delete" | "delete"

export type {
  Calendar,
  HabitTab,
  DeleteActions,
  MarkedDaysOfMonth,
  MarkedHabit,
}
