import { HabitTypesTypes } from "../../Types/HabitTypes"

const formValidation = {
  name: { required: "Name is required" },
  skippedPenalty: {
    required: "Penalty is required",
  },
  goal: {
    validate: (value: number | "", { type }: { type: HabitTypesTypes }) => {
      if (value === "" && type === "goal") {
        return "Goal is required"
      }

      return true
    },
  },
  type: { required: true },
  timesPerWeek: { required: true },
}

export { formValidation }
