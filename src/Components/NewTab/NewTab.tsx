import { useState } from "react"
import { Formik, Form } from "formik"
import { TabVariations } from "../../Types/TabTypes"
import {
  getInitialValues,
  getValidationSchema,
} from "./FormikLogic/FormikLogic" // Import getValidationSchema
import FormMain from "./FormMain/FormMain"
import Settings from "./Settings/Settings"

export default function NewTab() {
  function onSubmit() {
    console.log("heehe")
  }

  // Determine the initial type
  const [type, setType] = useState<TabVariations>("moodchecker")

  return (
    <div className="fixed bg-white max-w-5xl w-[90%] mx-auto rounded-xl p-8">
      <Formik
        initialValues={getInitialValues(type)}
        onSubmit={onSubmit}
        validationSchema={getValidationSchema(type)} // Use the function to get the validation schema
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
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
