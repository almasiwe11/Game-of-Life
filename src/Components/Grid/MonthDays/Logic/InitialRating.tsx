import {
  MarkedGoalNumber,
  MarkedMoodChecker,
  Mood,
  TabTypes,
  MarkedYesNo,
} from "../../../../Types/TabTypes"

function getInitialRating({
  thisTab,
  marked,
}: {
  thisTab: TabTypes | undefined
  marked: MarkedMoodChecker | MarkedGoalNumber | MarkedYesNo | undefined
}) {
  if (thisTab?.type === "moodchecker" || thisTab?.type === "yes-no") {
    if (marked) {
      const markedMood = marked as MarkedMoodChecker
      return markedMood.mood
    } else {
      return 0
    }
  } else {
    const markedGoal = marked as MarkedGoalNumber
    if (markedGoal) {
      const goal = markedGoal.goal
      const skipped = markedGoal.skipped
      const result = markedGoal.numberResult
      const { sad, meh, great, fantastic, perfect } = markedGoal.settings
      if (skipped) {
        return Mood.SKIPPED
      }
      if (result <= (sad * goal) / 100) {
        return Mood.ANGRY
      }
      if (result <= (meh * goal) / 100 && result >= (sad * goal) / 100) {
        return Mood.SAD
      }
      if (result <= (great * goal) / 100 && result >= (meh * goal) / 100) {
        return Mood.MEH
      }
      if (
        result <= (fantastic * goal) / 100 &&
        result >= (great * goal) / 100
      ) {
        return Mood.GREAT
      }
      if (
        result < (perfect * goal) / 100 &&
        result >= (fantastic * goal) / 100
      ) {
        return Mood.FANTASTIC
      }
      if (result >= (perfect * goal) / 100) {
        return Mood.PERFECT
      }
    } else {
      return 0
    }
    return 0
  }
}

export { getInitialRating }
