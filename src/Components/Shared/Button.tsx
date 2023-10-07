type Color = {
  light: string
  dark: string
}

type Props = {
  text: string
  color?: keyof Color
  onClick?: () => void
  type?: "button" | "submit"
}

export default function Button({
  text,
  color = "light",
  onClick,
  type = "button",
}: Props) {
  const base = `p-2 px-5 rounded-lg text-base font-normal `
  const style: Color = {
    light: base + "bg-gray-dark text-white",
    dark: base + "bg-dark text-wh",
  }

  return (
    <>
      {onClick ? (
        <button className={style[color]} onClick={onClick} type={type}>
          {text}
        </button>
      ) : (
        <button className={style[color]} type={type}>
          {text}
        </button>
      )}
    </>
  )
}
