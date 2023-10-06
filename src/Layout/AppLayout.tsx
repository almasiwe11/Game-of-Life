import { Outlet } from "react-router"
import Header from "../Components/Header/Header"
import Navigation from "../Components/Navigation/Navigation"

export default function AppLayout() {
  return (
    <div className="grid grid-cols-app grid-rows-app  h-screen  font-poppins">
      <Navigation />
      <Outlet />
      <Header />
    </div>
  )
}
