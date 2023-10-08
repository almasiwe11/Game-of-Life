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
  Angry,
  Disappointed,
  Meh,
  Ok,
  Decent,
  Great,
  Amazing,
  Perfect,
  Extraordinary,
}

export type { HabitFormTypes, HabitTypesTypes }
export { Mood }
