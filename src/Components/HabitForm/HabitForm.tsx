import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { useState } from "react"
import { useDispatch } from "react-redux"
import Button from "../Shared/Button"
import { createHabit } from "../../Calendar/calendarSlice"
import Input from "./Input"
import { SiJordan } from "react-icons/si"
import Select from "./Select"
import "react-datepicker/dist/react-datepicker.css"
import StartDate from "./StartDate"
import { HabitTypesTypes } from "../../Types/HabitTypes"
import Errors from "./Errors"

export default function HabitForm() {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState, control } = useForm()

  const { errors } = formState

  const handleHabitCreation: SubmitHandler<FieldValues> = (values) => {
    dispatch(createHabit())
  }

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

  const habitTypes = ["moodchecker", "yes-no", "goal"]
  const timesPerWeek = Array.from({ length: 7 }, (_, i) => i + 1)

  const [habitType, setHabitType] = useState("moodchecker")

  return (
    <form
      className="z-50 fixed inset-0"
      onSubmit={handleSubmit(handleHabitCreation)}
    >
      <div className="w-2/3 m-32 bg-white mx-auto rounded-xl py-4 px-8 h-full flex flex-col gap-4">
        <div className="flex-center mb-2">
          <SiJordan className="h-16 w-16" />
        </div>

        <div className="flex justify-between gap-3 items-end">
          <Input
            name="name"
            placeholder="name"
            register={register}
            label="Habit Name"
            formValidation={formValidation}
          />
          <Select
            options={habitTypes}
            name="type"
            register={register}
            label="Habit Type"
            formValidation={formValidation}
            setHabitType={setHabitType}
          />
          <StartDate control={control} />
        </div>

        <div className="flex justify-between gap-3 items-end">
          <Select
            options={timesPerWeek}
            name="timesPerWeek"
            register={register}
            label="Times per Week"
            formValidation={formValidation}
          />
          {habitType === "goal" && (
            <Input
              name="goal"
              type="number"
              placeholder="goal"
              register={register}
              label="Goal"
              formValidation={formValidation}
            />
          )}

          <Input
            name="skippedPenalty"
            placeholder="penalty"
            register={register}
            label="Skipped penalty"
            type="number"
            formValidation={formValidation}
          />
        </div>

        <Button text="Create Habit" type="submit" />

        <Errors errors={errors} />
      </div>
    </form>
  )
}
