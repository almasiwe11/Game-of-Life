import { FieldValues, UseFormRegister } from "react-hook-form"

type Props = {
  placeholder: string
  type?: string
  register: UseFormRegister<FieldValues>
  name: string
}

export default function Input({
  placeholder,
  type = "text",
  register,
  name,
}: Props) {
  return (
    <input
      className=""
      type={type}
      placeholder={placeholder}
      {...register(name)}
    />
  )
}
