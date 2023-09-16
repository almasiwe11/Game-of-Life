import { Field } from "formik"
import { FormikTypes } from "../../../Types/FormTypes"
import { TabTypesForm } from "../../../Types/TabTypes"
type PropTypes = {
  label: string
  name: keyof TabTypesForm
  placeholder: string
  formik: FormikTypes
  type?: string
}

export default function Input({
  label,
  name,
  placeholder,
  formik,
  type = "number",
}: PropTypes) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label>{label}</label>
      <Field
        type={`${type}`}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        name={name}
        placeholder={placeholder}
        className="p-2 border-2 border-zinc-500 rounded-xl focus:outline-blue "
      />
    </div>
  )
}
