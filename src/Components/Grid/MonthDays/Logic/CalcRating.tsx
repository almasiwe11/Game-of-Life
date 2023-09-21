import { Mood, TabSettings, TabTypes } from "../../../../Types/TabTypes"

function calcRating(
  settings: TabSettings,
  mood: Mood,
  minRating: number,
  thisTab: TabTypes | undefined
) {
  if (thisTab!.type === "moodchecker") {
    switch (mood) {
      case Mood.QUESTION:
        return 0
      case Mood.SKIPPED:
        return minRating
      case Mood.ANGRY:
        return settings.angry
      case Mood.MEH:
        return settings.meh
      case Mood.SAD:
        return settings.sad
      case Mood.GREAT:
        return settings.great
      case Mood.FANTASTIC:
        return settings.fantastic
      case Mood.PERFECT:
        return settings.perfect
    }
  }
}

function calcGoalRating(
  goal: number,
  result: number,
  minRating: number,
  maxRating: number,
  skipped: boolean,
  dayOff: boolean
) {
  if (skipped) return minRating
  if (dayOff) return 0
  const rating = (result / goal) * maxRating
  return rating
}

export { calcGoalRating, calcRating }
