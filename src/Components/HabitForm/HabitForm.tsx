import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { useDispatch } from "react-redux"
import Button from "../Shared/Button"
import { createHabit } from "../../Calendar/calendarSlice"
import Input from "./Input"
import { SiJordan } from "react-icons/si"
import Select from "./Select"
import "react-datepicker/dist/react-datepicker.css"
import StartDate from "./StartDate"
import Errors from "./Errors"
import { HabitFormTypes } from "../../Types/HabitTypes"
import useFormValidation from "./formValidation"

export default function HabitForm() {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState, control } = useForm()

  const { errors } = formState
  const formValidation = useFormValidation()

  const handleHabitCreation: SubmitHandler<FieldValues> = (values) => {
    const { name, type, timesPerWeek, skippedPenalty, startDate } = values
    const newVal: HabitFormTypes = {
      name,
      type,
      goal: values.goal ? values.goal : "",
      totalExp: 0,
      timesPerWeek,
      skippedPenalty,
      startDate: JSON.stringify(startDate),
      firstMarkedDate: undefined,
    }
    dispatch(createHabit(newVal))
  }

  const habitTypes = ["moodchecker", "yes-no", "goal"]
  const timesPerWeek = Array.from({ length: 7 }, (_, i) => i + 1)

  const [habitType, setHabitType] = useState("moodchecker")

  return (
    <form
      className="z-50 fixed inset-0 py-24"
      onSubmit={handleSubmit(handleHabitCreation)}
    >
      <div className="w-2/3   bg-white mx-auto rounded-xl py-4 px-8 h-full flex flex-col gap-4">
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

        <Button text="Create Habit" type="submit" className="self-center" />

        <Errors errors={errors} />
      </div>
    </form>
  )
}
