/* eslint-disable react/prop-types */
import "./styles/TeamDetail.scss";
import image from "../constant/image";
import { BiChevronsDown, BiRightArrow } from "react-icons/bi";
import { IoIosArrowUp } from "react-icons/io";
import { Progress, Tag, Tooltip } from "antd";
import { Badge, Calendar } from "antd";
import { Timeline } from "antd";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import {
  AiOutlineClose,
  AiOutlineSearch,

} from "react-icons/ai";
import {

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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={image.poum} className="w-[72px] h-[72px] rounded-full" />
              <div className="flex flex-col">
                <div className="flex items-center gap-4 mb-1">
                  <p className="font-semibold">Mr.Poum</p>
                  <span className="text-sm font-medium py-1 px-4 border border-solid border-red-type text-red-type rounded-full">Team&apos;s Owner</span>
                </div>
                <p className="text-45-gray text-sm font-medium">Alone We Go</p>
                <div className="flex items-center mt-2">
                  <Tag color={"#657ef8"}>
                    {"Boss".toUpperCase()}
                  </Tag>
                  <Tag color={"#657ef8"}>
                    {"Boss".toUpperCase()}
                  </Tag>
                  <Tag color={"#657ef8"}>
                    {"Boss".toUpperCase()}
                  </Tag>
                  <Tag color={"#657ef8"}>
                    {"Boss".toUpperCase()}
                  </Tag>
                </div>
              </div>
            </div>
            <div className="py-1 px-4 flex items-center gap-3 rounded-full bg-bright-green text-white hover:bg-less-bright-green cursor-pointer">
              <span className="text-sm font-normal">Options</span>
              <TiArrowSortedDown className="text-xl" />
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col bg-white py-2 px-4 mt-4 rounded-xl">
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
            <span className="font-semibold">Info</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between py-2 px-4 bg-[#F1F4F9] rounded-md">
              <p className="text-45-gray font-medium text-sm">ID</p>
              <p className="text-85-gray text-sm">1</p>
            </div>
            <div className="flex items-center justify-between py-2 px-4 bg-[#F1F4F9] rounded-md">
            <p className="text-45-gray font-medium text-sm">Role</p>
              <p className="text-85-gray text-sm">Project Manager</p>
            </div>
            <div className="flex items-center justify-between py-2 px-4 bg-[#F1F4F9] rounded-md">
            <p className="text-45-gray font-medium text-sm">Email</p>
              <p className="text-85-gray text-sm">ntr@gmail.com</p>
            </div>
            <div className="flex items-center justify-between py-2 px-4 bg-[#F1F4F9] rounded-md">
            <p className="text-45-gray font-medium text-sm">Phone Num</p>
              <p className="text-85-gray text-sm">132454365</p>
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4 mt-4">
          <div className="py-4 border-b border-solid border-[#f5f6fb] mb-3">
            {/* `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. */}
            <span className="font-semibold">Social Media</span>
          </div>
          <div className="flex py-2 px-4 items-center justify-between rounded-md hover:bg-bright-green hover:text-white">
            <div className="flex items-center gap-4">
              <img className="rounded-full h-9 w-9" src={image.google} />
              <p className="font-semibold">Google</p>
            </div>
            <BiRightArrow className="text-xl" />
          </div>
          <div className="flex py-2 px-4 items-center justify-between rounded-md hover:bg-bright-green hover:text-white">
            <div className="flex items-center gap-4">
              <img className="rounded-full h-9 w-9" src={image.apple} />
              <p className="font-semibold">Apple</p>
            </div>
            <BiRightArrow className="text-xl" />
          </div>
          <div className="flex py-2 px-4 items-center justify-between rounded-md hover:bg-bright-green hover:text-white">
            <div className="flex items-center gap-4">
              <img className="rounded-full h-9 w-9" src={image.twitter} />
              <p className="font-semibold">Twitter</p>
            </div>
            <BiRightArrow className="text-xl" />
          </div>
          <div className="flex py-2 px-4 items-center justify-between rounded-md hover:bg-bright-green hover:text-white">
            <div className="flex items-center gap-4">
              <img className="rounded-full h-9 w-9" src={image.facebook} />
              <p className="font-semibold">Facebook</p>
            </div>
            <BiRightArrow className="text-xl" />
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
            
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamDetail;
