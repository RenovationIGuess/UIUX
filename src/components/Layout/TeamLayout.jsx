import { Outlet } from "react-router-dom"
import DefaultNavbar from "../Navbar/DefaultNavbar"
import Sidebar from "../Sidebar/Sidebar"

const TeamLayout = () => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background-gray">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DefaultNavbar />
        <Outlet />
      </div>
    </div>
  )
}

export default TeamLayout