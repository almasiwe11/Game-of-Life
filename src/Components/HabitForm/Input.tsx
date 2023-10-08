import { FieldValues, UseFormRegister } from "react-hook-form"

type Props = {
  placeholder: string
  type?: string
  register: UseFormRegister<FieldValues>
  name: string
  label: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formValidation: any
}

export default function Input({
  placeholder,
  type = "text",
  register,
  name,
  label,
  formValidation,
}: Props) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="px-3">
        {" "}
        {label}{" "}
      </label>
      <input
        className="p-1.5 px-3 rounded-lg border-2 border-dark focus:outline-brand"
        autoComplete="new-password"
        type={type}
        placeholder={placeholder}
        {...register(name, formValidation[name])}
      />
    </div>
  )
}
