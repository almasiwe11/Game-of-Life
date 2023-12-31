import { Field } from "formik"

import { FormikTypes } from "../../../Types/FormTypes"
import {
  TabSettings,
  MoodCheckerForm,
  GoalNumberForm,
} from "../../../Types/TabTypes"

type PropTypes = {
  formik: FormikTypes
}

export default function Settings({ formik }: PropTypes) {
  let keysArray
  if (
    formik.values.type === "goal-number" ||
    formik.values.type === "moodchecker"
  ) {
    const settings = formik.values.settings
    keysArray = Object.keys(settings)
  }

  return (
    <>
      {formik.values.type === "goal-number" ||
      formik.values.type === "moodchecker" ? (
        <div className="mt-6 flex-center w-full">
          <div className="grid gap-2 grid-cols-6">
            {keysArray?.map((key) => (
              <div key={key} className="flex flex-col w-full gap-1">
                <label>
                  {key}
                  {formik.values.type === "goal-number" && " %"}
                </label>
                <Field
                  value={
                    key === "perfect" && formik.values.type === "moodchecker"
                      ? formik.values.maxRating
                      : (formik.values as MoodCheckerForm | GoalNumberForm)
                          .settings[key as keyof TabSettings]
                  }
                  disabled={
                    key === "perfect" && formik.values.type === "moodchecker"
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name={`settings.${key}`}
                  placeholder="40"
                  type="number"
                  className="p-2 border-2 border-zinc-500 rounded-xl focus:outline-blue disabled:bg-zinc-400"
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </>
  )
}
