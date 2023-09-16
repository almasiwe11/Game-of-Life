import { Formik, Form } from "formik"
import { initialValues, settingsSchema } from "./FormikLogic/FormikLogic"
import FormMain from "./FormMain/FormMain"
import Settings from "./Settings/Settings"

export default function NewTab() {
  function onSubmit() {
    console.log("heehe")
  }

  return (
    <div className="fixed bg-white max-w-5xl w-[90%] mx-auto rounded-xl p-8">
      <Formik
        initialValues={initialValues("goal-number")}
        onSubmit={onSubmit}
        validationSchema={settingsSchema}
      >
        {(formik) => (
          <Form>
            <div className="flex flex-col ">
              <FormMain formik={formik} initialValues={initialValues} />
              <Settings formik={formik} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
