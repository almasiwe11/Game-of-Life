import { twMerge } from "tailwind-merge"

type Color = {
  light: string
  dark: string
  danger: string
  brand: string
}

type Props = {
  text: string
  color?: keyof Color
  onClick?: () => void
  type?: "button" | "submit"
  className?: string
}

export default function Button({
  text,
  color = "light",
  onClick,
  type = "button",
  className,
}: Props) {
  const base = `p-2 px-5 rounded-lg text-base font-normal border border-transparent `
  const style: Color = {
    light:
      base +
      "bg-gray-dark text-white hover:bg-white duration-300 ease-in-out hover:text-dark border-gray-dark",
    dark: base + "bg-dark ",
    danger: base + "bg-red-600 text-white",
    brand: base + "bg-brand text-white",
  }

  const mergedClassName = twMerge(style[color], className)
  return (
    <>
      {onClick ? (
        <button className={mergedClassName} onClick={onClick} type={type}>
          {text}
        </button>
      ) : (
        <button className={`${style[color]} ${className}`} type={type}>
          {text}
        </button>
      )}
    </>
  )
}
