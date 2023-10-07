import { FieldValues, UseFormRegister } from "react-hook-form"

type Props = {
  register: UseFormRegister<FieldValues>
  name: string
  options: string[] | number[]
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formValidation: any
  setHabitType?: React.Dispatch<React.SetStateAction<string>>
}

export default function Select({
  register,
  name,
  options,
  label,
  formValidation,
  setHabitType,
}: Props) {
  function handleChange(habit: string) {
    if (!setHabitType) return
    setHabitType(habit)
  }

  return (
    <div className="w-full flex flex-col gap-1 ">
      <label htmlFor={name} className="px-3">
        {label}
      </label>
      <select
        {...register(name, formValidation[name])}
        onChange={(e) => handleChange(e.target.value)}
        className="p-1.5 px-3 border-2 border-dark rounded-l focus:border-brand rounded-lg"
      >
        {options.map((option) => (
          <option value={option} key={option} className="capitalize">
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
