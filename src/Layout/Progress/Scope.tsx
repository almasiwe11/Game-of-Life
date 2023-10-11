import { ScopeTypes } from "../../Types/HabitTypes"

type Props = {
  setScope: React.Dispatch<React.SetStateAction<ScopeTypes>>
  scope: ScopeTypes
}

export default function Scope({ setScope, scope }: Props) {
  return (
    <div className="flex gap-4 mb-8 flex-center">
      <button
        className={`${
          scope === "month" && "bg-gray-light text-dark"
        }  rounded-xl p-1 px-2.5`}
        onClick={() => setScope("month")}
      >
        Month
      </button>
      <button
        className={`${
          scope === "year" && "bg-gray-light text-dark"
        }  rounded-xl p-1 px-2.5`}
        onClick={() => setScope("year")}
      >
        Year
      </button>
      <button
        className={`${
          scope === "years" && "bg-gray-light text-dark"
        }  rounded-xl p-1 px-2.5`}
        onClick={() => setScope("years")}
      >
        Years
      </button>
    </div>
  )
}
