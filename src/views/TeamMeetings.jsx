/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./styles/TeamDetail.scss";
import image from "../constant/image";
import { BiChevronsDown } from "react-icons/bi";
import { Input, Select, Tooltip } from "antd";
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
  AiOutlineArrowRight,
} from "react-icons/ai";
import {
  BsFillHouseAddFill,
  BsTextParagraph,
  BsThreeDots,
} from "react-icons/bs";
import { useState } from "react";
import dayjs from "dayjs";
import { TiArrowSortedDown } from "react-icons/ti";

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
  handleMeetDetailModal,
}) => {
  return (
    <div className="flex flex-col" onClick={() => handleMeetDetailModal()}>
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

const priorityItems = [
  {
    label: "Low",
    value: "Low",
  },
  {
    label: "Medium",
    value: "Medium",
  },
  {
    label: "High",
    value: "High",
  },
];

const TeamDetail = () => {
  const [value, setValue] = useState(() => dayjs());
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  // true - a certain date | false - the calendar
  const [timeViewState, setTimeViewState] = useState(false);

  // Create meet form
  const [meetInfo, setMeetInfo] = useState({
    title: "",
    type: "Event",
    priority: "Low",
    time: "",
    links: "",
    // attachments: [],
  });

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

  const handleMeetDetailModal = () => {
    const modalElement = document.querySelector(".meet-detail-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  const handleCreateMeetModal = () => {
    const modalElement = document.querySelector(".create-meet-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  const onChange = (value) => {
    // console.log(`selected ${value}`);
    setMeetInfo({...meetInfo, priority: value});
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };

  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className="w-full flex flex-col bg-white p-4 rounded-xl transition">
          {!timeViewState ? (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-solid border-[#f5f6fb] mb-4">
                <p className="uppercase font-semibold text-base">Meetings</p>
                <div className="flex items-center">
                  <span
                    onClick={() => handleCreateMeetModal()}
                    className="py-1 px-4 rounded-full bg-bright-green text-white cursor-pointer hover:bg-less-bright-green mr-2"
                  >
                    Hold a meet
                  </span>
                  <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
                </div>
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
                          handleMeetDetailModal={handleMeetDetailModal}
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
                          handleMeetDetailModal={handleMeetDetailModal}
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
                          handleMeetDetailModal={handleMeetDetailModal}
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
                          handleMeetDetailModal={handleMeetDetailModal}
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
        <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4 mb-4">
          <div className="py-4 border-b border-solid border-[#f5f6fb] mb-2">
            {/* `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. */}
            <span className="font-semibold">Upcoming Meetings</span>
          </div>
          <div className="w-full flex flex-col">
            <div className="flex items-center justify-between rounded-md p-2 hover:bg-bright-green cursor-pointer text-85-gray hover:text-white mb-1">
              <div className="flex items-center">
                <img
                  className="w-9 h-9 rounded-full border border-solid border-[#f5f6fb] mr-2"
                  src={image.poum}
                  alt="user-ava"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-sm mb-1">
                    Daily meet with Mr.Poum
                  </p>
                  <p className="font-medium text-xs">12:30AM - 00:00PM</p>
                </div>
              </div>
              <AiOutlineArrowRight className="text-xl" />
            </div>
            <div className="flex items-center justify-between rounded-md p-2 hover:bg-bright-green cursor-pointer text-85-gray hover:text-white">
              <div className="flex items-center">
                <img
                  className="w-9 h-9 rounded-full border border-solid border-[#f5f6fb] mr-2"
                  src={image.poum}
                  alt="user-ava"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-sm mb-1">
                    Daily meet with Mr.Poum
                  </p>
                  <p className="font-medium text-xs">12:30AM - 00:00PM</p>
                </div>
              </div>
              <AiOutlineArrowRight className="text-xl" />
            </div>
            <div className="flex items-center justify-between rounded-md p-2 hover:bg-bright-green cursor-pointer text-85-gray hover:text-white">
              <div className="flex items-center">
                <img
                  className="w-9 h-9 rounded-full border border-solid border-[#f5f6fb] mr-2"
                  src={image.poum}
                  alt="user-ava"
                />
                <div className="flex flex-col">
                  <p className="font-semibold text-sm mb-1">
                    Daily meet with Mr.Poum
                  </p>
                  <p className="font-medium text-xs">12:30AM - 00:00PM</p>
                </div>
              </div>
              <AiOutlineArrowRight className="text-xl" />
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4">
          <div className="py-4 border-b border-solid border-[#f5f6fb] mb-4">
            {/* `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. */}
            <span className="font-semibold">Today&apos;s Tasks</span>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col items-start mb-3">
              <div className="flex w-full items-center justify-between py-1 px-4 rounded-full border border-solid border-red-type text-red-type cursor-pointer">
                <span className="text-sm font-medium">High Priority</span>
                <TiArrowSortedDown className="text-xl" />
              </div>
            </div>
            <div className="flex flex-col items-start mb-3">
              <div className="flex w-full items-center justify-between py-1 px-4 rounded-full border border-solid border-yellow-type text-yellow-type cursor-pointer">
                <span className="text-sm font-medium">Medium Priority</span>
                <TiArrowSortedDown className="text-xl" />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex w-full items-center justify-between py-1 px-4 rounded-full border border-solid border-bright-green text-bright-green cursor-pointer">
                <span className="text-sm font-medium">Low Priority</span>
                <TiArrowSortedDown className="text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meet's modal */}
      <div className="meet-detail-modal modal-background modal-hidden">
        <div className="modal-container">
          <div className="modal-header">
            <p className="text-base font-semibold">Meet&apos;s Detail</p>
            <AiOutlineClose
              onClick={() => handleMeetDetailModal()}
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
                      alt="user-ava"
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

      {/* Create Meet's modal */}
      <div className="create-meet-modal modal-background modal-hidden">
        <div className="modal-container">
          <div className="modal-header">
            <p className="text-base font-semibold">Create Meeting</p>
            <AiOutlineClose
              onClick={() => handleCreateMeetModal()}
              className="text-2xl hover:text-bright-green cursor-pointer"
            />
          </div>
          <div className="modal-body">
            <div className="flex flex-col mb-4">
              <p className="font-medium mb-2">Meeting title</p>
              <Input
                placeholder="Enter meeting title"
                allowClear
                className="py-1 px-4 text-base"
              />
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
                <Select
                  showSearch
                  placeholder="Select priority"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={priorityItems}
                />
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
                      alt="user-ava"
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
          <div className="modal-footer">
            <div className="flex gap-3 items-center">
              <button className="bg-[#9C9C9C] text-white text-sm py-2 px-4 rounded-md">
                Cancel
              </button>
              <button
                onClick={() => handleCreateMeetModal()}
                className="bg-bright-green text-white text-sm py-2 px-4 rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamDetail;
