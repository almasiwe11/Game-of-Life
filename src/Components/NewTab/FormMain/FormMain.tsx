import Select from "../Select/Select"
import Input from "../Input/Input"
import { TabTypesForm, TabVariations } from "../../../Types/TabTypes"
import { FormikTypes } from "../../../Types/FormTypes"

const tabOptions: TabVariations[] = ["moodchecker", "goal-number", "yes-no"]
const weekDays = [1, 2, 3, 4, 5, 6, 7]
const dayOff = [1, 2, 3]

type PropTypes = {
  formik: FormikTypes
  initialValues?: (val: TabVariations) => TabTypesForm
}

export default function FormMain({ formik, initialValues }: PropTypes) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="flex w-full gap-5">
        <Input
          name="name"
          type="text"
          label="name"
          placeholder="Coding"
          formik={formik}
        />
        <Select
          name="type"
          label="Select Type"
          formik={formik}
          options={tabOptions}
          initialValues={initialValues}
        />
      </div>
      <div className="flex w-full gap-2">
        <Input
          name="minRating"
          label="Minimal Rating"
          formik={formik}
          placeholder="-100"
        />
        <Input
          name="maxRating"
          label="Maximum Rating"
          formik={formik}
          placeholder="100"
        />
        <Input
          name="avgRating"
          label="Avg Desired "
          formik={formik}
          placeholder="-100"
        />

        {formik.values.type === "goal-number" && (
          <div className="flex flex-col w-full gap-1">
            <label>Goal Everyday</label>
            <input
              value={formik.values["goal"]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="angry"
              placeholder="40"
              type="text"
              className="p-2 border-2 border-zinc-500 rounded-xl focus:outline-blue "
            />
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Select
          name="timesPerWeek"
          label="Times Per Week"
          formik={formik}
          options={weekDays}
        />
        <Select
          name="timesPerWeek"
          label="Day off Max"
          formik={formik}
          options={dayOff}
        />
      </div>
    </div>
  )
}
