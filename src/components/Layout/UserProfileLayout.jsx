import { Outlet } from "react-router-dom";
import DefaultNavbar from "../Navbar/DefaultNavbar";
import Sidebar from "../Sidebar/Sidebar";
import { useState } from "react";
import BackgroundSection from "../BackgroundSection/BackgroundSection";
import image from "../../constant/image";
import { BiCommentDetail } from "react-icons/bi";
import { FiMinimize } from "react-icons/fi";
import { TiArrowSortedDown } from "react-icons/ti";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "../SearchBar/SearchBar";

const UserProfileLayout = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const handleMinimized = () => {
    const topbarElement = document.querySelector(".topbar");
    const headerElement = document.querySelector(".page-center-bg");
    const teamDetailContainer = document.querySelector(
      ".team-detail-container"
    );

    if (isMinimized) {
      topbarElement.classList.remove("topbar-minimized");
      headerElement.classList.remove("page-center-bg-hidden");
    } else {
      topbarElement.classList.add("topbar-minimized");
      headerElement.classList.add("page-center-bg-hidden");
    }

    teamDetailContainer.classList.toggle("team-detail-container--minimized");

    setIsMinimized((prev) => !prev);
  };

  const handleToggleSidebar = (type) => {
    const sidebar = document.querySelector(".sidebar-container");
    const openSidebarIcon = document.querySelector(".open-sidebar-icon");

    sidebar.classList.toggle("sidebar-container--closed");

    if (type === "open") {
      openSidebarIcon.classList.toggle("hidden");
    } else {
      setTimeout(() => {
        openSidebarIcon.classList.toggle("hidden");
      }, 300);
    }
  };

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-background-gray">
      <Sidebar handleToggleSidebar={handleToggleSidebar} />
      <div className="flex-1 flex flex-col">
        <DefaultNavbar handleToggleSidebar={handleToggleSidebar} />

        <section className="flex-1 flex flex-col">
          <BackgroundSection image={image.bgex3} />
          <div className="default-layout-topbar">
            <div
              className="topbar--wrap"
              style={{ height: "auto" }}
              data-top="356"
            >
              <div className="topbar">
                <div className="topbar__container">
                  <div className="account-center-topbar__container">
                    <div className="account-center-avatar-wrap">
                      <div className="account-center-avatar">
                        <img
                          className="avatar__img"
                          src={image.kafka}
                          alt="user-avatar"
                        />
                      </div>
                    </div>
                    <div className="account-center-user-wrap">
                      <div className="account-center-basic-rows account-center-basic-rows--top">
                        {/* User name and level? */}
                        <div className="account-center-basic-row1">
                          <span className="user-basic-nickname">Desperate</span>
                        </div>
                        {/* User sign, tags,... */}
                        <div className="account-center-basic-row2">
                          {/* Icon here */}
                          <BiCommentDetail className="icon-user__intro" />
                          {/* User sign here */}
                          <p>Testing sign function</p>
                        </div>
                      </div>
                      <div className="account-center-basic-rows account-center-basic-rows--bottom">
                        <div className="account-center-basic-item">
                          <SearchBar styles={{ width: 480 }} />
                        </div>
                      </div>
                    </div>
                    <div className="account-center-btn-group">
                      <div className="drop-expand">
                        <div
                          className="account-center-select-btn"
                          style={{ marginRight: "16px" }}
                          onClick={() => handleMinimized()}
                        >
                          <span className="flex items-center justify-center">
                            {isMinimized ? "Expand" : "Minimize"}
                            {/* Icon goes here */}
                            <FiMinimize className="icon-select__arrow" />
                          </span>
                        </div>
                        <div
                          className="account-center-select-btn"
                          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
                        >
                          <span className="flex items-center justify-center">
                            Options
                            {/* Icon goes here */}
                            <TiArrowSortedDown className="icon-select__arrow" />
                          </span>
                        </div>
                        {isOptionsOpen && (
                          <div className="float-dialog">
                            <ul className="flex flex-col">
                              <li className="py-1 px-3 flex items-center text-85-gray rounded-md hover:bg-bright-green hover:text-white cursor-pointer">
                                <p className="text-sm">Customize</p>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="team-detail-container">
            <div className="scroller">
              <Outlet />
            </div>
          </div>
        </section>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default UserProfileLayout;
