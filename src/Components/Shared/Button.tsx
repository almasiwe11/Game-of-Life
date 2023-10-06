type Color = {
  light: string
  dark: string
}

type Props = {
  text: string
  color: keyof Color
}

export default function Button({ text, color }: Props) {
  const base = `p-2 px-5 rounded-lg text-base font-normal `
  const style: Color = {
    light: base + "bg-gray-dark text-white",
    dark: base + "bg-dark text-wh",
  }

  return <button className={style[color]}>{text}</button>
}
