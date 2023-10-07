type HabitTypesTypes = "moodchecker" | "yes-no" | "goal"

type HabitFormTypes = {
  name: string
  type: HabitTypesTypes
  timesPerWeek: number
  goal?: number
  startDate: Date
  skippedPenalty: number
}

export type { HabitFormTypes, HabitTypesTypes }
