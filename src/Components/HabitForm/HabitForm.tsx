import { useDispatch } from "react-redux"
import Button from "../Shared/Button"
import { createHabit } from "../../Calendar/calendarSlice"
import { useForm } from "react-hook-form"
import Input from "./Input"
import { SiJordan } from "react-icons/si"
import Select from "./Select"

export default function HabitForm() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  function handleHabitCreation(values) {
    console.log(values)
    dispatch(createHabit())
  }

  function handleErrors(err) {
    console.log(err)
  }

  const habitTypes = ["moodchecker", "yes-no", "goal"]

  return (
    <form
      className="z-50 fixed inset-0"
      onSubmit={handleSubmit(handleHabitCreation, handleErrors)}
    >
      <div className="w-2/3 m-32 bg-white mx-auto rounded-xl py-4 px-8">
        <div className="flex-center">
          <SiJordan className="h-16 w-16" />
        </div>
        <Input name="name" placeholder="name" register={register} />
        <Select options={habitTypes} name="type" register={register} />

        <Button text="Create Habit" type="submit" />
      </div>
    </form>
  )
}
