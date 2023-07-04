import { Link, Outlet, useLocation } from "react-router-dom";
import DefaultNavbar from "../Navbar/DefaultNavbar";
import Sidebar from "../Sidebar/Sidebar";
import { useEffect, useState } from "react";
import BackgroundSection from "../BackgroundSection/BackgroundSection";
import image from "../../constant/image";
import { BiCommentDetail, BiLogOutCircle } from "react-icons/bi";
import { FiMinimize } from "react-icons/fi";
import { TiArrowSortedDown, TiThSmall } from "react-icons/ti";
import { Badge, Popconfirm, Tooltip } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiFillBell,
  AiFillPushpin,
  AiOutlineCalendar,
  AiOutlineClear,
  AiOutlineClose,
  AiOutlineComment,
  AiOutlineSetting,
  AiOutlineTeam,
} from "react-icons/ai";

const TeamDetailLayout = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);
  const [current, setCurrent] = useState("");

  const location = useLocation();
  useEffect(() => {
    // console.log(location.pathname)
    if (location.pathname.includes("your-stats")) {
      setCurrent("your-stats");
    } else if (location.pathname.includes("tasks")) {
      setCurrent("tasks");
    } else if (location.pathname.includes("members")) {
      setCurrent("members");
    } else if (location.pathname.includes("projects")) {
      setCurrent("projects");
    } else if (location.pathname.includes("meetings")) {
      setCurrent("meetings");
    } else setCurrent("dashboard");
  }, [location]);

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

  const confirmOutTeam = () => {};

  const cancelOutTeam = () => {};

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-background-gray">
      <Sidebar handleToggleSidebar={handleToggleSidebar} />
      <div className="flex-1 flex flex-col">
        <DefaultNavbar handleToggleSidebar={handleToggleSidebar} />

        <section className="flex-1 flex flex-col">
          <BackgroundSection image={image.defaultBg} />
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
                          src={image.poum}
                          alt="user-avatar"
                        />
                      </div>
                    </div>
                    <div className="account-center-user-wrap">
                      <div className="account-center-basic-rows account-center-basic-rows--top">
                        {/* User name and level? */}
                        <div className="account-center-basic-row1">
                          <span className="user-basic-nickname">
                            Astral Express
                          </span>
                          <div className="flex items-center gap-4 ml-2">
                            <Badge
                              size={isMinimized ? "small" : "default"}
                              count={5}
                              style={{ top: 4, right: 4 }}
                            >
                              <AiFillBell
                                className={`relative cursor-pointer hover:text-bright-green ${
                                  isMinimized
                                    ? "text-2xl text-85-gray"
                                    : "text-4xl text-white"
                                }`}
                                onClick={() => setNotiOpen(!notiOpen)}
                              />
                              {notiOpen && (
                                <>
                                  <div className="w-[516px] bg-white hy-shadow p-4 rounded-xl noti-container--right">
                                    <div className="pb-4 mb-4 flex items-center justify-between bottom-border text-85-gray">
                                      <p className="font-semibold">
                                        Notification
                                      </p>
                                      <div className="flex items-center gap-4">
                                        <AiOutlineClear className="icon-style" />
                                        <AiOutlineSetting className="icon-style" />
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between px-6 bottom-border mb-4 pb-4">
                                      <Tooltip
                                        placement="top"
                                        title="Comments | Reply Noti"
                                      >
                                        <AiOutlineComment className="big-icon-style" />
                                      </Tooltip>
                                      <Tooltip
                                        placement="top"
                                        title="Team's Noti"
                                      >
                                        <AiOutlineTeam className="big-icon-style" />
                                      </Tooltip>
                                      <Tooltip
                                        placement="top"
                                        title="Calendar's Noti"
                                      >
                                        <AiOutlineCalendar className="big-icon-style" />
                                      </Tooltip>
                                      <Tooltip placement="top" title="All Noti">
                                        <TiThSmall className="big-icon-style" />
                                      </Tooltip>
                                    </div>
                                    <div className="flex flex-col">
                                      {/* hover:bg-bright-green hover:text-white text-85-gray */}
                                      <div className="flex items-center mb-4">
                                        <AiOutlineTeam className="big-icon-style mr-4" />
                                        <p className="leading-normal mr-3">
                                          Mr.Poum has invited you to join
                                          project ITSS :D?
                                        </p>
                                        <div className="flex items-center gap-2">
                                          <button className="accept-btn">
                                            Accept
                                          </button>
                                          <button className="decline-btn">
                                            Decline
                                          </button>
                                          <AiOutlineClose className="icon-style" />
                                        </div>
                                      </div>
                                      <div className="flex items-center mb-4">
                                        <div className="flex items-center">
                                          <AiOutlineTeam className="big-icon-style mr-4" />
                                          <p className="leading-normal mr-3">
                                            Mr.Poum has invited you to join
                                            Astral Express~
                                          </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <button className="accept-btn">
                                            Accept
                                          </button>
                                          <button className="decline-btn">
                                            Decline
                                          </button>
                                          <AiOutlineClose className="icon-style" />
                                        </div>
                                      </div>
                                      <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center">
                                          <AiOutlineCalendar className="big-icon-style mr-4" />
                                          <p className="leading-normal">
                                            The train started
                                          </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                          <AiOutlineClose className="icon-style" />
                                        </div>
                                      </div>
                                    </div>
                                    {/* Footer */}
                                    <div className="pt-4 flex items-center">
                                      <p className="font-bold cursor-pointer text-bright-green">
                                        View more...
                                      </p>
                                    </div>
                                  </div>
                                </>
                              )}
                            </Badge>
                            <Tooltip placement="top" title="Mark as Pinned">
                              <AiFillPushpin
                                className={`relative cursor-pointer hover:text-bright-green ${
                                  isMinimized
                                    ? "text-2xl text-85-gray"
                                    : "text-4xl text-white"
                                }`}
                              />
                            </Tooltip>
                          </div>
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
                          <Link
                            to="/team/1/dashboard"
                            className={`uppercase font-bold hover:text-bright-green${
                              current === "dashboard"
                                ? " text-bright-green"
                                : ""
                            }`}
                          >
                            Dashboard
                          </Link>
                        </div>
                        <div className="account-center-basic-item">
                          <Link
                            to="/team/1/meetings"
                            className={`uppercase font-bold hover:text-bright-green${
                              current === "meetings" ? " text-bright-green" : ""
                            }`}
                          >
                            Meetings
                          </Link>
                        </div>
                        <div className="account-center-basic-item">
                          <Link
                            to="/team/1/projects"
                            className={`uppercase font-bold hover:text-bright-green${
                              current === "projects" ? " text-bright-green" : ""
                            }`}
                          >
                            Projects
                          </Link>
                        </div>
                        <div className="account-center-basic-item">
                          <Link
                            to="/team/1/members"
                            className={`uppercase font-bold hover:text-bright-green${
                              current === "members" ? " text-bright-green" : ""
                            }`}
                          >
                            Members
                          </Link>
                        </div>
                        <div className="account-center-basic-item">
                          <Link
                            to="/team/1/tasks"
                            className={`uppercase font-bold hover:text-bright-green${
                              current === "tasks" ? " text-bright-green" : ""
                            }`}
                          >
                            Tasks
                          </Link>
                        </div>
                        <div className="account-center-basic-item">
                          <Link
                            to="/team/1/your-stats"
                            className={`uppercase font-bold hover:text-bright-green${
                              current === "your-stats"
                                ? " text-bright-green"
                                : ""
                            }`}
                          >
                            Your stats
                          </Link>
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
                              <Popconfirm
                                title="Out this team"
                                description="Are you sure to out team?"
                                onConfirm={confirmOutTeam}
                                onCancel={cancelOutTeam}
                                okText="Yes"
                                cancelText="No"
                                placement="bottom"
                              >
                                <li className="py-1 px-3 flex items-center text-85-gray rounded-md hover:bg-bright-green hover:text-white cursor-pointer">
                                  <BiLogOutCircle className="text-xl mr-1" />
                                  <p className="text-sm">Out Team</p>
                                </li>
                              </Popconfirm>
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

export default TeamDetailLayout;
