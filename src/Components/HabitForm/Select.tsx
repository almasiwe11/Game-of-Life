import { FieldValues, UseFormRegister } from "react-hook-form"

type Props = {
  register: UseFormRegister<FieldValues>
  name: string
  options: string[]
}

export default function Select({ register, name, options }: Props) {
  return (
    <select {...register(name)}>
      {options.map((option) => (
        <option value={option} key={option} className="capitalize">
          {option}
        </option>
      ))}
    </select>
  )
}
