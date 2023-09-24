import * as Yup from "yup"
import { TabTypesForm, TabVariations } from "../../../Types/TabTypes"
import { useDate } from "../../../Context/DateContextProvider"

export default function useFormikLogic() {
  const { dateState } = useDate()

  function isUniqueName(val: string) {
    return !dateState.tabs.some((tab) => tab.name === val)
  }

  const settingsSchema = Yup.object().shape({
    settings: Yup.object().shape({
      angry: Yup.number()
        .required("Angry is required")
        .test({
          name: "fantasticConditional",
          message: "Angry should be a positive percentage",
          test: function (value) {
            const { type } = this.options.context!
            if (type === "goal-number") {
              return value >= 0
            }
            return true
          },
        })
        .test({
          name: "fantasticConditional",
          message: "Angry should be more than minRating",
          test: function (value) {
            const { type, minRating } = this.options.context!
            if (type === "moodchecker") {
              return value >= minRating
            }
            return true
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
          name: "fantasticConditional",
          message: "Perfect must be at least equal to 100% bro",
          test: function (value) {
            const { type, maxRating } = this.options.context!
            if (type === "goal-number") {
              return value >= maxRating
            }
            return true
          },
        }),
    }),
  })

  const checkGoal = Yup.object().shape({
    goal: Yup.number()
      .required("Goal is required")
      .typeError("Goal must be a number"),
  })

  const commonPropertiesSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .test({
        message: "The Habit with that name already exists",
        test: function (value) {
          return isUniqueName(value)
        },
      }),
    maxRating: Yup.number()
      .required("Max Rating is required")
      .test({
        message: "Max Rating should be higher than avgRating and minRating",
        test: function (value) {
          const { minRating, avgRating } = this.parent!
          return value > (minRating || avgRating)
        },
      }),
    minRating: Yup.number()
      .required("Min Rating is required")
      .test({
        message: "Min Ratnig should be less than 0 and avgRating",
        test: function (value) {
          const { maxRating, avgRating } = this.parent!
          return value < (maxRating || avgRating) && value < 0
        },
      }),
    avgRating: Yup.number()
      .required("Avg Rating is required")
      .test({
        message: "Avg Rating should be between Min and Max rating",
        test: function (value) {
          const { minRating, maxRating } = this.parent!
          return value <= maxRating && value > minRating
        },
      }),
  })

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

  function getInitialValues(type: TabVariations): TabTypesForm {
    switch (type) {
      case "moodchecker":
        return {
          type: "moodchecker",
          ...commonProperties,
          ...settings,
          ...settingsSchema.cast(settings),
          ...commonPropertiesSchema.cast(commonProperties),
        }
      case "goal-number":
        return {
          type: "goal-number",
          ...commonProperties,
          ...settings,
          ...settingsSchema.cast(settings),
          ...commonPropertiesSchema.cast(commonProperties),
          ...checkGoal.cast({ goal: 8 }),
        }
      case "yes-no":
        return {
          type: "yes-no",
          ...commonProperties,
          ...commonPropertiesSchema.cast(commonProperties),
        }
      default:
        throw new Error(`Invalid type: ${type}`)
    }
  }

  function getValidationSchema(type: TabVariations) {
    switch (type) {
      case "moodchecker":
        return commonPropertiesSchema.concat(settingsSchema)
      case "goal-number":
        return commonPropertiesSchema.concat(settingsSchema).concat(checkGoal)
      case "yes-no":
        return commonPropertiesSchema
      default:
        throw new Error(`Invalid type: ${type}`)
    }
  }
  return { getInitialValues, getValidationSchema }
}
