import { FormikErrors } from "formik"
import { TabTypesForm } from "../../../Types/TabTypes"

type PropTypes = {
  errors: FormikErrors<TabTypesForm>
}

function getErrorMessages(object: FormikErrors<TabTypesForm>) {
  const values: string[] = []

  function getVal(object: FormikErrors<TabTypesForm>) {
    for (const key in object) {
      const oneKey = object[key as keyof FormikErrors<TabTypesForm>]
      if (typeof oneKey === "object") {
        getVal(oneKey)
      } else {
        values.push(oneKey!)
      }
    }
  }

  getVal(object)
  return values
}

export default function Errors({ errors }: PropTypes) {
  const errArr = getErrorMessages(errors)
  return (
    <ul className="mt-5 grid grid-cols-4 text-red-500 list-disc">
      {errArr.map((err) => (
        <li key={err}>{err}</li>
      ))}
    </ul>
  )
}
