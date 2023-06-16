import image from "../../constant/image"
import { FiChevronsRight } from "react-icons/fi";

const DefaultNavbar = ({ handleToggleSidebar }) => {
  return (
    <nav className="shrink-0 w-full flex items-center justify-between h-[56px] py-2 px-10 bg-white border-b border-solid border-[#f5f6fb]">
      <div className="flex items-center gap-3">
        <FiChevronsRight onClick={() => handleToggleSidebar('open')} className="open-sidebar-icon text-2xl hidden" />
        <p className="text-base font-medium">
          Teams / Joined Teams
        </p>
      </div>
      
      <div className="flex items-center">
        <p className="text-base font-medium mr-4">Username</p>
        <div className="w-8 h-8">
          <img src={image.poum} alt="user-ava" className="w-full h-full rounded-full" />
        </div>
      </div>
    </nav>
  )
}

export default DefaultNavbar