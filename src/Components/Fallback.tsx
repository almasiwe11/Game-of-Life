import Navigation from "../Layout/Navigation/Navigation"
import Header from "../Layout/Header/Header"
import Spinner from "./Shared/Spinner"

export default function Fallback() {
  return (
    <div className="grid grid-cols-app grid-rows-app  h-screen  font-poppins">
      <Navigation />
      <Spinner />
      <Header />
    </div>
  )
}
