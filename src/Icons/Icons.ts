import {
  FaSkullCrossbones,
  FaFaceAngry,
  FaFaceMeh,
  FaFaceSmile,
  FaFaceGrinHearts,
} from "react-icons/fa6"
import { FaSadCry } from "react-icons/fa"

import {
  BsEmojiSunglassesFill,
  BsHandThumbsDownFill,
  BsHandThumbsUpFill,
} from "react-icons/bs"
import { GiBrokenHeart } from "react-icons/gi"
import { SiJordan } from "react-icons/si"
import { RiOpenArmFill } from "react-icons/ri"
RiOpenArmFill

const moodIcons = [
  {
    icon: FaSkullCrossbones,
    background: "black",
    bg: "#000",
  },
  {
    icon: FaFaceAngry,
    background: "red-600",
    bg: "#dc2626",
  },
  {
    icon: FaSadCry,
    background: "red-900",
    bg: "#7f1d1d",
  },
  {
    icon: GiBrokenHeart,
    background: "orange-600",
    bg: "#ea580c",
  },
  {
    icon: BsHandThumbsDownFill,
    background: "amber-500",
    bg: "#f59e0b",
  },
  {
    icon: FaFaceMeh,
    background: "yellow-300",
    bg: "#fde047",
  },
  {
    icon: FaFaceSmile,
    background: "green-600",
    bg: "#16a34a",
  },
  {
    icon: BsHandThumbsUpFill,
    background: "teal-600",
    bg: "#0d9488",
  },

  {
    icon: RiOpenArmFill,
    background: "sky-600",
    bg: "#0284c7",
  },
  {
    icon: BsEmojiSunglassesFill,
    background: "fuchsia-600",
    bg: "#0369a1",
  },
  {
    icon: FaFaceGrinHearts,
    background: "cyan-500",
    bg: "#06b6d4",
  },
  {
    icon: SiJordan,
    background: "brand",
    bg: "#6d28d9",
  },
]

export { moodIcons }
