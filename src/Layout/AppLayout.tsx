import { Outlet } from "react-router"
import Header from "./Header/Header"
import Navigation from "./Navigation/Navigation"

export default function AppLayout() {
  return (
    <div className="grid grid-cols-app grid-rows-app  h-screen  font-poppins">
      <Navigation />
      <Outlet />
      <Header />
    </div>
  )
}
