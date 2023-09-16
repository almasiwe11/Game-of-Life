import { ChangeEvent } from "react"
import { FormikTypes } from "../../../Types/FormTypes"
import { TabTypesForm, TabVariations } from "../../../Types/TabTypes"
type PropTypes = {
  label: string
  name: keyof TabTypesForm
  formik: FormikTypes
  initialValues?: (val: TabVariations) => TabTypesForm
  options: string[] | number[]
  setType?: React.Dispatch<React.SetStateAction<TabVariations>>
}

export default function Select({
  label,
  name,
  formik,
  options,
  initialValues,
  setType,
}: PropTypes) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    formik.handleChange
    if (name === "type") {
      setType!(e.target.value as TabVariations)
      handleTypeChange(e.target.value as TabVariations)
    }
  }

  function handleTypeChange(newType: TabVariations) {
    const newInitialValues = initialValues!(newType)
    formik.setValues(newInitialValues)
  }

  return (
    <div className="flex flex-col w-full gap-1">
      <label htmlFor="typeOptions">{label}</label>
      <select
        id="typeOptions"
        value={formik.values[name]}
        name={name}
        onChange={(e) => handleChange(e)}
        onBlur={formik.handleBlur}
        className="p-2 rounded-lg focus:outline-blue border-2 border-zinc-500 "
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
