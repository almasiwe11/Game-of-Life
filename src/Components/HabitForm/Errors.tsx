import { FieldErrors, FieldValues } from "react-hook-form"

type Props = {
  errors: FieldErrors<FieldValues>
}

export default function Errors({ errors }: Props) {
  if (!errors) return
  const messages = Object.keys(errors).map(
    (key) => errors[key]?.message
  ) as string[]
  return (
    <ul className="text-red-400">
      {messages.length > 0 &&
        messages.map((message, i) => <li key={i}>{message}</li>)}
    </ul>
  )
}
