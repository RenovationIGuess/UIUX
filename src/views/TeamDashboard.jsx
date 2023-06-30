/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./styles/TeamDetail.scss";
import { HiUserGroup } from "react-icons/hi";
import image from "../constant/image";
import { BiChevronsDown } from "react-icons/bi";
import { Input, Tooltip } from "antd";
import { Badge, Calendar } from "antd";
import { Timeline } from "antd";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import {
  AiOutlineClose,
  AiOutlineSearch,
  AiFillClockCircle,
  AiOutlineTeam,
  AiOutlineLink,
  AiFillEdit,
} from "react-icons/ai";
import {
  BsFillHouseAddFill,
  BsTextParagraph,
  BsThreeDots,
} from "react-icons/bs";
import { useState } from "react";
import dayjs from "dayjs";
import TaskStatistic from "../components/TaskStatistic/TaskStatistic";
import DndCalendar from "../components/DndCalendar/DndCalendar";
import MeetDetail from "../components/MeetDetail/MeetDetail";

const TeamDetail = () => {
  // true - a certain date | false - the calendar
  const [timeViewState, setTimeViewState] = useState(false);

  const toggleMeetDetailModal = () => {
    const modalElement = document.querySelector(".meet-detail-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  return (
    <>
      <div className="flex-1 flex flex-col">
        <TaskStatistic />
        <div className="w-full flex flex-col bg-white p-4 rounded-xl mt-4 transition">
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
    </>
  );
};

export default TeamDetail;
