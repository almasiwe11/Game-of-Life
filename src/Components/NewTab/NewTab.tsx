import { useState } from "react"
import { sub } from "date-fns"
import { Formik, Form } from "formik"
import { TabVariations, TabTypes, TabTypesForm } from "../../Types/TabTypes"
import { Commands } from "../../Types/ContextTypes"
import FormMain from "./FormMain/FormMain"
import Settings from "./Settings/Settings"
import { useDate } from "../../Context/DateContextProvider"
import Errors from "./Errors/Errors"
import useFormikLogic from "./FormikLogic/useFormikLogic"
export default function NewTab() {
  const { dispatch, dateState } = useDate()

  function onSubmit(values: TabTypesForm) {
    const isUniqeName = !dateState.tabs.some((tab) => tab.name === values.name)
    if (isUniqeName) {
      const withMarkedDays: TabTypes = {
        ...values,
        markedDays: [],
        monthStats: [],
        startDay: sub(new Date(), { months: 20 }),
      }
      dispatch({ type: Commands.TABINFO, details: withMarkedDays })
    }
  }

  const [type, setType] = useState<TabVariations>("moodchecker")
  const { getInitialValues, getValidationSchema } = useFormikLogic()

  return (
    <div className="fixed bg-white max-w-5xl w-[90%] mx-auto rounded-xl p-8">
      <Formik
        initialValues={getInitialValues(type)}
        onSubmit={onSubmit}
        validationSchema={getValidationSchema(type)}
      >
        {(formik) => (
          <Form>
            <div className="flex flex-col">
              <FormMain
                formik={formik}
                initialValues={getInitialValues}
                setType={setType}
              />
              <Settings formik={formik} />
              {formik.errors && <Errors errors={formik.errors}></Errors>}
              <button
                type="submit"
                className=" p-2.5 px-5 border border-blue text-white bg-blue text-lg mt-8 self-center duration-300 ease-in-out hover:bg-transparent hover:text-blue"
              >
                Create Habit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
