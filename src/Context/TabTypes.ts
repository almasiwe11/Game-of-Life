const enum Mood {
  SKIPPED,
  DAYOFF,
  ANGRY,
  SAD,
  MEH,
  GREAT,
  FANTASTIC,
  PERFECT,
}

type TabTypes = {
  maxRating: number
  minRating: number
  avgRating: number
  timesPerWeek: number
  maxDayOff: number
} & (MoodChecker | GoalNumber | YesNo)

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

type GoalNumber = {
  type: "goal-number"
  settings: TabSettings
  goal: number
  markedDays: MarkedGoalNumber[]
}

type YesNo = {
  type: "yes-no"
  markedDays: MarkedYesNo[]
}

type MarkedDays = {
  day: Date
  streak: number
}

type MarkedMoodChecker = MarkedDays & {
  mood: Mood
}

type MarkedGoalNumber = MarkedDays & {
  numberResult: number | "day-off"
  goal: number
}

type MarkedYesNo = MarkedDays & {
  result: boolean | "day-off"
}

export type { TabTypes }
export { Mood }
