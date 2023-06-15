import { Link } from "react-router-dom";
import "./styles/TeamDetail.scss";
import { HiUserGroup } from "react-icons/hi";
import image from "../constant/image";
import BackgroundSection from "../components/BackgroundSection/BackgroundSection";
import { useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { FiMinimize } from "react-icons/fi";
import { TiArrowSortedDown } from "react-icons/ti";

const TeamDetail = () => {
  const [isMinimized, setIsMinimized] = useState(false);

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

  return (
    <section className="flex-1 flex flex-col">
      <BackgroundSection image={image.defaultBg} />
      <div className="default-layout-topbar">
        <div className="topbar--wrap" style={{ height: "auto" }} data-top="356">
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
                        to="/"
                        className="uppercase font-bold hover:text-bright-green"
                      >
                        Dashboard
                      </Link>
                    </div>
                    <div className="account-center-basic-item">
                      <Link
                        to="/"
                        className="uppercase font-bold hover:text-bright-green"
                      >
                        Meetings
                      </Link>
                    </div>
                    <div className="account-center-basic-item">
                      <Link
                        to="/"
                        className="uppercase font-bold hover:text-bright-green"
                      >
                        Projects
                      </Link>
                    </div>
                    <div className="account-center-basic-item">
                      <Link
                        to="/"
                        className="uppercase font-bold hover:text-bright-green"
                      >
                        Members
                      </Link>
                    </div>
                    <div className="account-center-basic-item">
                      <Link
                        to="/"
                        className="uppercase font-bold hover:text-bright-green"
                      >
                        Tasks
                      </Link>
                    </div>
                    <div className="account-center-basic-item">
                      <Link
                        to="/"
                        className="uppercase font-bold hover:text-bright-green"
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
                      title="Thu nhỏ phần avatar và background"
                      onClick={() => handleMinimized()}
                    >
                      <span className="flex items-center justify-center">
                        {isMinimized ? "Mở rộng" : "Thu nhỏ"}
                        {/* Icon goes here */}
                        <FiMinimize className="icon-select__arrow" />
                      </span>
                    </div>
                    <div className="account-center-select-btn">
                      <span className="flex items-center justify-center">
                        Chỉnh sửa
                        {/* Icon goes here */}
                        <TiArrowSortedDown className="icon-select__arrow" />
                      </span>
                    </div>
                    <div className="float-dialog">
                      <ul className="account-center-submenu">
                        <li className="account-center-submenu-item">
                          Hoàn thiện thông tin cá nhân
                        </li>
                        <li className="account-center-submenu-item">
                          Decorate lại trang private
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="team-detail-container">
        <div className="flex-1 flex flex-col">
          <div className="w-full bg-white py-2 px-4 rounded-xl">
            
          </div>
        </div>
        <div className="w-[336px] ml-6 shrink-0">
          <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4">
            <div className="py-4 border-b border-solid border-[#f5f6fb] mb-3">
              {/* `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. */}
              <span className="font-semibold">Team&apos;s Overview</span>
            </div>
            <div className="w-full flex gap-2 items-center justify-between">
              <div className="p-2 flex-1 rounded-md bg-[#FAFAFA] overflow-hidden">
                <div className="inline-flex p-2 items-center justify-center rounded-full bg-[#92A5F9]">
                  <HiUserGroup className="text-2xl text-white" />
                </div>
                <p className="font-medium text-base text-ellipsis overflow-hidden mt-2">
                  100.503.534.655
                </p>
                <p className="font-semibold text-base my-1 text-45-gray">
                  Member
                </p>
                <Link
                  to="/teams"
                  className="text-base text-bright-green font-medium"
                >
                  View more
                </Link>
              </div>
              <div className="h-full p-2 flex-1 rounded-md bg-[#FAFAFA]">
                <div className="flex items-center">
                  <div className="h-10 w-10">
                    <img
                      data-index="1"
                      className="w-full h-full rounded-full"
                      src={image.poum}
                    />
                  </div>
                  <div className="h-10 w-10">
                    <img
                      data-index="2"
                      className="w-full h-full rounded-full"
                      src={image.poum}
                      style={{ transform: "translateX(-50%)" }}
                    />
                  </div>
                </div>
                <p className="font-medium text-base text-ellipsis overflow-hidden mt-2">
                  2
                </p>
                <p className="font-semibold text-base my-1 text-45-gray">
                  Team&apos;s Owner
                </p>
                <Link to="/teams" className="text-base font-medium">
                  Mr.Poum,...
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamDetail;
