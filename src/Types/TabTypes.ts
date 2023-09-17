const enum Mood {
  QUESTION,
  SKIPPED,
  DAYOFF,
  ANGRY,
  SAD,
  MEH,
  GREAT,
  FANTASTIC,
  PERFECT,
}

type FormTypes = {
  name: string
  maxRating: number
  minRating: number
  avgRating: number
  timesPerWeek: number
  maxDayOff: number
}

type TabVariations = "moodchecker" | "goal-number" | "yes-no"

type TabTypes = FormTypes & (MoodChecker | GoalNumber | YesNo)
type TabTypesForm = FormTypes & (MoodCheckerForm | GoalNumberForm | YesNoForm)

type TabSettings = {
  angry: number
  sad: number
  meh: number
  great: number
  fantastic: number
  perfect: number
}

type MoodChecker = {
  type: "moodchecker"
  settings: TabSettings
  markedDays: MarkedMoodChecker[]
}

type MoodCheckerForm = {
  type: "moodchecker"
  settings: TabSettings
}

type GoalNumber = {
  type: "goal-number"
  settings: TabSettings
  goal: number
  markedDays: MarkedGoalNumber[]
}

type GoalNumberForm = {
  type: "goal-number"
  settings: TabSettings
  goal: number
}

type YesNo = {
  type: "yes-no"
  markedDays: MarkedYesNo[]
}

type YesNoForm = {
  type: "yes-no"
}

type MarkedDays = {
  day: Date
  streak: number
}

type MarkedMoodChecker = MarkedDays & {
  mood: Mood
  rating: number
  settings: TabSettings
  skippedRating: number
}

type MarkedGoalNumber = MarkedDays & {
  numberResult: number | "day-off"
  goal: number
}

type MarkedYesNo = MarkedDays & {
  result: boolean | "day-off"
}

export type {
  TabTypes,
  FormTypes,
  TabTypesForm,
  TabVariations,
  TabSettings,
  MoodCheckerForm,
  GoalNumberForm,
}
export { Mood }
export type { MarkedMoodChecker, MoodChecker }
