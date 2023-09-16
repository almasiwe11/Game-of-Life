import * as Yup from "yup"
import { TabTypesForm, TabVariations } from "../../../Types/TabTypes"

const commonProperties = {
  name: "",
  maxRating: 100,
  minRating: -100,
  avgRating: 80,
  timesPerWeek: 7,
  maxDayOff: 2,
}

const settings = {
  settings: {
    angry: 20,
    sad: 40,
    meh: 55,
    great: 75,
    fantastic: 90,
    perfect: 100,
  },
}

function initialValues(type: TabVariations): TabTypesForm {
  switch (type) {
    case "moodchecker":
      return {
        type: "moodchecker",
        ...commonProperties,
        ...settings,
        ...settingsSchema.cast(settings),
      }
    case "goal-number":
      return {
        type: "goal-number",
        ...commonProperties,
        minRating: 0,
        goal: 8,
        ...settings,
        ...settingsSchema.cast(settings),
      }
    case "yes-no":
      return {
        type: "yes-no",
        ...commonProperties,
      }
    default:
      throw new Error(`Invalid type: ${type}`)
  }
}

const settingsSchema = Yup.object().shape({
  settings: Yup.object().shape({
    angry: Yup.number()
      .required("Angry is required")
      .test({
        name: "minRating",
        message: "Angry has to more than MinRating",
        test: function (value) {
          const { minRating } = this.options.context!
          return value >= minRating
        },
      }),
    sad: Yup.number()
      .required("Sad is required")
      .min(Yup.ref("angry"), "Sad must be greater than Angry"),
    meh: Yup.number()
      .required("Meh is required")
      .min(Yup.ref("sad"), "Meh must be greater than Sad"),
    great: Yup.number()
      .required("Great is required")
      .min(Yup.ref("meh"), "Great must be greater than Meh"),
    fantastic: Yup.number()
      .required("Fantastic is required")
      .min(Yup.ref("great"), "Fantastic must be greater than Great"),
    perfect: Yup.number()
      .required("Perfect is required")
      .min(Yup.ref("fantastic"), "Perfect must be greater than Fantastic")
      .test({
        name: "maxRating",
        message: "Perfect must be less than Max Rating",
        test: function (value) {
          const { maxRating } = this.options.context!
          return value <= maxRating
        },
      }),
  }),
})

export { initialValues, settingsSchema }
