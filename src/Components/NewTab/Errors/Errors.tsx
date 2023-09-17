import { FormikErrors } from "formik"
import { TabTypesForm } from "../../../Types/TabTypes"

export default function Errors({
  errors,
}: {
  errors: FormikErrors<TabTypesForm>
}) {
  console.log(errors)
  return <div>Errors</div>
}
