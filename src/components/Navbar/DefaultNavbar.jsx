/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import image from "../../constant/image";
import { FiChevronsRight } from "react-icons/fi";
import {
  AiFillBackward,
  AiFillBell,
  AiFillForward,
  AiFillSetting,
  AiOutlineCalendar,
  AiOutlineClear,
  AiOutlineClose,
  AiOutlineComment,
  AiOutlineInfoCircle,
  AiOutlineLogout,
  AiOutlineSetting,
  AiOutlineTeam,
} from "react-icons/ai";
import { Badge, Tooltip } from "antd";
import { TiThSmall } from "react-icons/ti";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DefaultNavbar = ({ handleToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentUrl, setCurrentUrl] = useState([]);
  const [notiOpen, setNotiOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  useEffect(() => {
    setCurrentUrl(location.pathname.slice(1).split("/"));
  }, [location]);

  return (
    <nav className="shrink-0 w-full flex items-center justify-between h-[56px] py-2 px-10 bg-white border-b border-solid border-[#f5f6fb]">
      <div className="flex items-center gap-4">
        <FiChevronsRight
          onClick={() => handleToggleSidebar("open")}
          className="open-sidebar-icon text-2xl hidden"
        />
        <Tooltip placement="bottom" title="To previous page">
          <button
            className={`pr-3 pl-2 py-1 flex items-center gap-1 justify-center 
          bg-bright-green hover:bg-less-bright-green 
          cursor-pointer text-white rounded-md ${
            location.key === "default" && "pointer-events-none opacity-80"
          }`}
            onClick={() => navigate(-1)}
          >
            <AiFillBackward className="text-2xl" />
          </button>
        </Tooltip>

        <p className="text-base font-medium">
          {currentUrl.map((u, i) => {
            if (i !== currentUrl.length - 1) {
              return (
                <span key={i}>
                  <Link
                    className="hover:text-bright-green"
                    to={`/${currentUrl.slice(0, i + 1).join("/")}`}
                  >
                    {u.charAt(0).toUpperCase() + u.slice(1)}
                  </Link>
                  &nbsp;/&nbsp;
                </span>
              );
            } else {
              return (
                <span key={i} className="text-base font-medium">
                  <Link
                    className="hover:text-bright-green"
                    to={`/${currentUrl.join("/")}`}
                  >
                    {u.charAt(0).toUpperCase() + u.slice(1)}
                  </Link>
                </span>
              );
            }
          })}
        </p>
        <Tooltip placement="bottom" title="To next page">
          <button
            className={`pl-3 pr-2 py-1 flex items-center gap-1 justify-center 
          bg-bright-green hover:bg-less-bright-green 
          cursor-pointer text-white rounded-md ${
            location.key === "default" && "pointer-events-none opacity-80"
          }`}
            onClick={() => navigate(+1)}
          >
            <AiFillForward className="text-2xl" />
          </button>
        </Tooltip>
      </div>

      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Badge count={5}>
            <AiFillBell
              className="relative text-2xl cursor-pointer hover:text-bright-green"
              onClick={() => setNotiOpen(!notiOpen)}
            />
            {notiOpen && (
              <>
                <div className="w-[516px] bg-white hy-shadow p-4 rounded-xl noti-container--left">
                  <div className="pb-4 mb-4 flex items-center justify-between bottom-border text-85-gray">
                    <p className="font-semibold">Notification</p>
                    <div className="flex items-center gap-4">
                      <AiOutlineClear className="icon-style" />
                      <AiOutlineSetting className="icon-style" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-6 bottom-border mb-4 pb-4">
                    <Tooltip placement="top" title="Comments | Reply Noti">
                      <AiOutlineComment className="big-icon-style" />
                    </Tooltip>
                    <Tooltip placement="top" title="Team's Noti">
                      <AiOutlineTeam className="big-icon-style" />
                    </Tooltip>
                    <Tooltip placement="top" title="Calendar's Noti">
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
                        Mr.Poum has invited you to join project ITSS :D?
                      </p>
                      <div className="flex items-center gap-2">
                        <button className="accept-btn">Accept</button>
                        <button className="decline-btn">Decline</button>
                        <AiOutlineClose className="icon-style" />
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      <div className="flex items-center">
                        <AiOutlineTeam className="big-icon-style mr-4" />
                        <p className="leading-normal mr-3">
                          Mr.Poum has invited you to join Astral Express~
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="accept-btn">Accept</button>
                        <button className="decline-btn">Decline</button>
                        <AiOutlineClose className="icon-style" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <AiOutlineCalendar className="big-icon-style mr-4" />
                        <p className="leading-normal">The train started</p>
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
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => setUserModalOpen(!userModalOpen)}
        >
          <p className="text-base font-medium mr-4">Ramy</p>
          <div className="w-8 h-8 relative">
            <img
              src={image.poum}
              alt="user-ava"
              className="w-full h-full rounded-full"
            />
            {userModalOpen && (
              <>
                <div className="w-[364px] rounded-xl bg-white user-modal-container hy-shadow">
                  <div className="py-4 mb-2 flex items-center justify-between bottom-border text-85-gray">
                    <p className="ml-4 font-semibold">My Info</p>
                  </div>
                  <div className="flex flex-col px-1">
                    <div className="rounded-md hover:bg-bright-green py-2 px-3 hover:text-white flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <AiOutlineInfoCircle className="icon-style" />
                        <p>User Info</p>
                      </div>
                      <IoIosArrowForward className="icon-style" />
                    </div>
                    <div className="rounded-md hover:bg-bright-green py-2 px-3 hover:text-white flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <AiFillSetting className="icon-style" />
                        <p>User Setting</p>
                      </div>
                      <IoIosArrowForward className="icon-style" />
                    </div>
                  </div>
                  <div className="mt-2 p-4 top-border">
                    <div className="flex items-center hover:text-bright-green">
                      <AiOutlineLogout className="icon-style mr-4" />
                      <p>Logout</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DefaultNavbar;
