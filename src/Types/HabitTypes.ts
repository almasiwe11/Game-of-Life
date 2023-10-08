type HabitTypesTypes = "moodchecker" | "yes-no" | "goal"

type HabitFormTypes = {
  name: string
  type: HabitTypesTypes
  timesPerWeek: number
  goal?: number
  startDate: string
  skippedPenalty: number
}

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

export type { HabitFormTypes, HabitTypesTypes }
export { Mood }
