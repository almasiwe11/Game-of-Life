const logicState = {
  today: "15/09/23",
  tabs: [
    {
      coding: {
        type: "moodchecker",
        maxRating: 100,
        minRating: -100,
        avgRatingGoal: 90,
        timesPerWeek: 7,
        maxDayOff: 2,
        markedDays: [
          {
            day: "14/09/23",
            streak: 20,
            mood: "MOOD.PERFECT",
          },
        ],
      },
    },
    {
      running: {
        type: "goal-number",
        maxRating: 50,
        minRating: -55,
        avgRatingGoal: 35,
        timesPerWeek: 3,
        maxDayOff: 2,
        goal: 8,
        markedDays: [
          {
            day: "15/09/23",
            goal: 8,
            streak: 4,
            numberResult: 5,
          },
        ],
      },
    },
    {
      fasting: {
        type: "yes-no",
        maxRating: 30,
        minRating: -20,
        avgRatingGoal: 40,
        timesPerWeek: 2,
        maxDayOff: 2,
        markedDays: [
          {
            day: "16/09/23",
            streak: 0,
            result: "day-off",
          },
        ],
      },
    },
    {
      noFap: {
        type: "yes-no",
        maxRating: 10,
        minRating: -70,
        avgRatingGoal: 30,
        timesPerWeek: 7,
        maxDayOff: 0,
        markedDays: {
          day: "15/09/23",
          streak: 1,
          result: true,
        },
      },
    },
  ],
}
