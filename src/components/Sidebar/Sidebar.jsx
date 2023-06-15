import image from "../../constant/image";
import "./Sidebar.scss";
import { FiChevronsLeft } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai"
import { IoIosCreate } from "react-icons/io"
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="flex items-center justify-end pt-2">
        <FiChevronsLeft className="text-2xl hover:text-bright-green hover:cursor-pointer" />
      </div>
      <div className="flex flex-col items-center justify-center mb-4">
        <div className="sidebar-logo-wrp">
          <img className="sidebar-logo-gif" src={image.kuru} alt="kururin" />
        </div>
        <h1 className="sidebar-logo-title">Kurenda~</h1>
      </div>

      <div className="flex flex-col w-full whitespace-nowrap">
        <div className="sidebar-item">
          <FaUsers className="text-2xl mr-3" />
          <p className="flex-1 text-base overflow-hidden text-ellipsis font-medium">
            Teams
          </p>
        </div>
        <div className="flex flex-col pl-8 w-full">
          <div className="flex flex-col">
            <div className="sidebar-item">
              <AiOutlineTeam className="text-2xl mr-3" />
              <Link to="/teams/joined-teams" className="flex-1 text-base overflow-hidden text-ellipsis font-medium">
                Joined Teams
              </Link>
            </div>
            <div className="flex flex-col pl-8">
              <div className="sidebar-item">
                <div className="w-6 h-6 mr-3">
                  <img src={image.poum} alt="teams-logo" className="w-full h-full rounded-full " />
                </div>
                <p className="flex-1 text-base overflow-hidden text-ellipsis font-medium">
                  Astral Express
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="sidebar-item">
              <IoIosCreate className="text-2xl mr-3" />
              <Link to="/teams/created-teams" className="flex-1 text-base overflow-hidden text-ellipsis font-medium">
                Created Teams
              </Link>
            </div>
            <div className="flex flex-col pl-8">
              <div className="sidebar-item">
                <div className="w-6 h-6 mr-3">
                  <img src={image.poum} alt="teams-logo" className="w-full h-full rounded-full " />
                </div>
                <p className="flex-1 text-base overflow-hidden text-ellipsis font-medium">
                  Astral Express
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
