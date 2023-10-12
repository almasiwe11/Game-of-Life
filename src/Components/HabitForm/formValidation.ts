import { useSelector } from "react-redux"
import { HabitTypesTypes } from "../../Types/HabitTypes"
import { RootState } from "../../RootState"

function useFormValidation() {
  const { allHabits } = useSelector((state: RootState) => state.calendar)
  const formValidation = {
    name: {
      required: "Name is required",
      validate: (value: string) => {
        if (allHabits.some((habit) => habit.name === value)) {
          return "The habit already exist, chose a different name"
        }
      },
    },
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
    penaltyIncrement: {
      required: "Skipped Penalty",
      min: {
        value: 0,
        message: "Must be a least 0",
      },
    },
    goalIncrement: {
      validate: (value: number | "", { type }: { type: HabitTypesTypes }) => {
        if (value === "" && type === "goal") {
          return "Goal increment is required"
        }

        if (Number(value) < 0 && type === "goal") {
          return "Should be at least 0 "
        }

        return true
      },
    },
  }

  return formValidation
}

export default useFormValidation
