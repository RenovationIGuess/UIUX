/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./styles/TeamDetail.scss";
import { HiUserGroup } from "react-icons/hi";
import image from "../constant/image";
import { BiChevronsDown } from "react-icons/bi";
import { IoIosArrowUp } from "react-icons/io";
import { Input, Progress, Tooltip } from "antd";
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

const getListData = (value) => {
  let listData;
  switch (value.date()) {
    case 8:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
      ];
      break;
    case 10:
      listData = [
        {
          type: "warning",
          content: "This is warning event.",
        },
        {
          type: "success",
          content: "This is usual event.",
        },
        {
          type: "error",
          content: "This is error event.",
        },
      ];
      break;
    case 15:
      listData = [
        {
          type: "warning",
          content: "This is warning event",
        },
        {
          type: "success",
          content: "This is very long usual event。。....",
        },
        {
          type: "error",
          content: "This is error event 1.",
        },
        {
          type: "error",
          content: "This is error event 2.",
        },
        {
          type: "error",
          content: "This is error event 3.",
        },
        {
          type: "error",
          content: "This is error event 4.",
        },
      ];
      break;
    default:
  }
  return listData || [];
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const TimelineLabel = ({ content }) => {
  return (
    <p className="font-bold uppercase text-45-gray text-base mr-2">{content}</p>
  );
};

const TimelineChildren = ({
  name,
  status,
  priority,
  time,
  handleTaskModal,
}) => {
  return (
    <div className="flex flex-col" onClick={() => handleTaskModal()}>
      <div className="w-full h-[1px] mb-2 bg-45-gray"></div>
      <div className="rounded-xl bg-white flex-col flex border border-solid border-black py-2 px-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-base font-semibold">{name}</p>
          <BsThreeDots className="text-2xl" />
        </div>
        <div className="flex items-center gap-4">
          <img
            src={image.poum}
            alt="creator-avatar"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-45-gray text-sm font-bold uppercase">{time}</p>
          <div className="flex items-center gap-2">
            <Tooltip title={"Priority"} placement="top">
              <span className="uppercase text-sm py-1 px-4 border border-solid border-red-type text-red-type rounded-full">
                {priority}
              </span>
            </Tooltip>
            <Tooltip title={"Status"} placement="top">
              <span className="uppercase text-sm py-1 px-4 border border-solid border-yellow-type text-yellow-type rounded-full">
                {status}
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamDetail = () => {
  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  // true - a certain date | false - the calendar
  const [timeViewState, setTimeViewState] = useState(false);

  const onSelect = (newValue) => {
    setValue(newValue);
    setSelectedValue(newValue);
    setTimeViewState((prev) => !prev);
  };

  const onPanelChange = (newValue) => {
    setValue(newValue);
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const handleTaskModal = () => {
    const modalElement = document.querySelector(".modal-background");
    modalElement.classList.toggle("modal-hidden");
  };

  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className="w-full flex flex-col bg-white py-2 px-4 rounded-xl">
          <div className="flex items-center justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
            <p className="uppercase font-semibold text-base">Tasks</p>
            <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-lg border-b-2 border-solid border-bright-green">
              <div className="flex flex-col">
                <h1 className="font-medium uppercase">Completed tasks</h1>
                <p className="text-45-gray text-sm font-bold mt-1">100.504</p>
                <div className="flex items-center mt-1">
                  <IoIosArrowUp className="mr-4 text-2xl text-bright-green" />
                  <p className="font-bold mr-2">500</p>
                  <p className="font-medium text-sm text-45-gray">%</p>
                </div>
              </div>
              <Progress
                strokeColor={"#22C55E"}
                size={[48, 48]}
                type="circle"
                percent={75}
              />
            </div>
            <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-lg border-b-2 border-solid border-[#D91212]">
              <div className="flex flex-col">
                <h1 className="font-medium uppercase">Aborted tasks</h1>
                <p className="text-45-gray text-sm font-bold mt-1">100.504</p>
                <div className="flex items-center mt-1">
                  <IoIosArrowUp className="mr-4 text-2xl text-[#D91212]" />
                  <p className="font-bold mr-2">500</p>
                  <p className="font-medium text-sm text-45-gray">%</p>
                </div>
              </div>
              <Progress
                strokeColor={"#D91212"}
                size={[48, 48]}
                type="circle"
                percent={75}
              />
            </div>
            <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-lg border-b-2 border-solid border-[#FFB326]">
              <div className="flex flex-col">
                <h1 className="font-medium uppercase">In progress</h1>
                <p className="text-45-gray text-sm font-bold mt-1">100.504</p>
                <div className="flex items-center mt-1">
                  <IoIosArrowUp className="mr-4 text-2xl text-[#FFB326]" />
                  <p className="font-bold mr-2">500</p>
                  <p className="font-medium text-sm text-45-gray">%</p>
                </div>
              </div>
              <Progress
                strokeColor={"#FFB326"}
                size={[48, 48]}
                type="circle"
                percent={75}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 pb-2 border-t border-solid border-[#f5f6fb]">
            <p className="text-base font-medium">
              Total Tasks: 100.504.105.156.403
            </p>
            <button className="flex items-center justify-center py-2 px-4 text-sm bg-bright-green text-white hover:bg-less-bright-green cursor-pointer rounded-md">
              View Detail
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col bg-white p-4 rounded-xl mt-4 transition">
          {!timeViewState ? (
            <>
              <div className="flex items-center justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
                <p className="uppercase font-semibold text-base">Meetings</p>
                <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
              </div>
              <Calendar
                value={value}
                onSelect={onSelect}
                onPanelChange={onPanelChange}
                cellRender={cellRender}
              />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
                <div className="flex items-center gap-3">
                  <IoIosArrowDropleftCircle
                    onClick={() => setTimeViewState((prev) => !prev)}
                    className="text-2xl text-bright-green"
                  />
                  <p className="font-semibold text-base">
                    {selectedValue?.format("YYYY-MM-DD")}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-bright-green rounded-full cursor-pointer hover:bg-less-bright-green">
                    <FaFilter className="text-base text-white" />
                  </div>
                  <div className="flex">
                    <div className="flex items-center justify-center pl-4 pr-3 py-2 rounded-bl-full rounded-tl-full bg-bright-green">
                      <AiOutlineSearch className="text-base text-white" />
                    </div>
                    <input
                      className="rounded-tr-full rounded-br-full border-t border-b border-r border-solid border-bright-green text-sm h-[32px] w-[200px] focus:outline-none px-3"
                      placeholder="Enter team's name / id..."
                    />
                  </div>
                  <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
                </div>
              </div>
              <div className="mt-4 flex justify-start">
                <Timeline
                  mode={"left"}
                  items={[
                    {
                      label: <TimelineLabel content={"11am"} />,
                      children: (
                        <TimelineChildren
                          name={"Wake up"}
                          time={"11AM - 11:30AM"}
                          status={"done"}
                          priority={"high"}
                          handleTaskModal={handleTaskModal}
                        />
                      ),
                    },
                    {
                      label: <TimelineLabel content={"11am"} />,
                      children: (
                        <TimelineChildren
                          name={"Wake up"}
                          time={"11AM - 11:30AM"}
                          status={"done"}
                          priority={"high"}
                          handleTaskModal={handleTaskModal}
                        />
                      ),
                    },
                    {
                      label: <TimelineLabel content={"11am"} />,
                      children: (
                        <TimelineChildren
                          name={"Wake up"}
                          time={"11AM - 11:30AM"}
                          status={"done"}
                          priority={"high"}
                          handleTaskModal={handleTaskModal}
                        />
                      ),
                    },
                    {
                      label: <TimelineLabel content={"11am"} />,
                      children: (
                        <TimelineChildren
                          name={"Wake up"}
                          time={"11AM - 11:30AM"}
                          status={"done"}
                          priority={"high"}
                          handleTaskModal={handleTaskModal}
                        />
                      ),
                    },
                  ]}
                />
              </div>
            </>
          )}
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

      {/* Task's modal */}
      <div className="modal-background modal-hidden">
        <div className="modal-container">
          <div className="modal-header">
            <p className="text-base font-semibold">Task&apos;s Detail</p>
            <AiOutlineClose
              onClick={() => handleTaskModal()}
              className="text-2xl hover:text-bright-green cursor-pointer"
            />
          </div>
          <div className="modal-body">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-medium">Meeting with the Rock!!!</h1>
              <AiFillEdit className="text-2xl" />
            </div>
            <div className="flex items-center mb-4">
              <span className="py-2 px-4 bg-bright-green rounded-md mr-2 text-white font-medium">
                Event
              </span>
              <span className="py-2 px-4 font-medium text-45-gray">
                Discord
              </span>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-3">
                <p className="font-medium">Priority</p>
                <span className="rounded-full py-1 px-4 text-sm text-red-type border border-solid border-red-type uppercase">
                  High
                </span>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-medium">Status</p>
                <span className="rounded-full py-1 px-4 text-sm text-bright-green border border-solid border-bright-green uppercase">
                  Done
                </span>
              </div>
            </div>
            <div className="flex items-center mb-4">
              <img
                className="w-9 h-9 rounded-full mr-4"
                src={image.poum}
                alt="creator-avatar"
              />
              <div className="flex flex-col">
                <p>
                  <span className="font-medium">Mr.Poum</span>&nbsp;is the
                  creator
                </p>
                <p className="font-semibold text-sm text-45-gray">
                  Project Manager
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <AiFillClockCircle className="text-45-gray text-2xl" />
              <div className="flex flex-col">
                <div className="flex items-center gap-6 mb-1">
                  <p className="font-medium">Tuesday, January 21</p>
                  <p className="font-medium">9:00 PM - 4:00 AM</p>
                </div>
                <span className="text-sm font-medium text-45-gray">
                  Time zone - Vietnam
                </span>
              </div>
            </div>
            <p className="pl-10 font-medium text-blue-type mb-4">Find a time</p>
            <div className="w-full h-[1px] bg-light-gray mb-4"></div>
            <div className="flex flex-col mb-8">
              <div className="flex items-center gap-3 mb-3">
                <AiOutlineTeam className="text-2xl" />
                <Input
                  className="py-2 pl-4 pr-3"
                  placeholder="Enter team's name"
                  allowClear
                  // value={teamUserName}
                  // onChange={(e) => setTeamUserName(e.target.value)}
                />
              </div>
              <div className="pl-9 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={image.poum}
                      alt
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-medium">Mr.Poum</p>
                      <p className="text-xs text-dark-gray">Project Manager</p>
                    </div>
                  </div>
                  <AiOutlineClose className="text-xl" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <BsFillHouseAddFill className="text-2xl text-45-gray" />
              <p className="text-45-gray font-medium">Add rooms or locations</p>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <AiOutlineLink className="text-2xl text-45-gray" />
              <p className="text-45-gray font-medium">Add meeting links</p>
            </div>
            <div className="flex items-center gap-4">
              <BsTextParagraph className="text-2xl text-45-gray" />
              <p className="text-45-gray font-medium">
                Add attachments or description
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamDetail;
