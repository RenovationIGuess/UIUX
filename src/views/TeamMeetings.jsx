/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./styles/TeamDetail.scss";
import image from "../constant/image";
import { BiChevronsDown } from "react-icons/bi";
import { AiFillCheckCircle, AiOutlineArrowRight, AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import DndCalendar from "../components/DndCalendar/DndCalendar";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import events from "../constant/events";
import MeetDetail from "../components/MeetDetail/MeetDetail";
import CreateMeetModal from "../components/CreateMeetModal/CreateMeetModal";
import {
  MdAlignHorizontalLeft,
  MdOutlineAlignVerticalTop,
} from "react-icons/md";
import { DatePicker, Timeline, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { TbCalendarPlus } from "react-icons/tb";
import { FaFilter } from "react-icons/fa";
import { IoIosArrowDropleftCircle, IoIosArrowForward } from "react-icons/io";

const range = (start, end) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// eslint-disable-next-line arrow-body-style
const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf("day");
};

const disabledRangeTime = (_, type) => {
  if (type === "start") {
    return {
      disabledHours: () => range(0, 60).splice(4, 20),
      disabledMinutes: () => range(30, 60),
      disabledSeconds: () => [55, 56],
    };
  }
  return {
    disabledHours: () => range(0, 60).splice(20, 4),
    disabledMinutes: () => range(0, 31),
    disabledSeconds: () => [55, 56],
  };
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
  toggleMeetDetailModal,
}) => {
  // const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="w-full h-[1px] mb-2 bg-45-gray"></div>
      <div className="rounded-xl bg-white flex-col flex border border-solid border-black py-2 px-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <p className="text-xl font-semibold pr-4 mr-3 border-r border-[#f5f6fb]">
              {name}
            </p>
            <p className="text-base font-medium">
              Team&nbsp;-&nbsp;{" "}
              <Link to="/team/1/your-stats" className="text-bsae font-semibold hover:text-bright-green cursor-pointer">
                Astral Express~
              </Link>
            </p>
          </div>
          {/* <BsThreeDots className="text-2xl" /> */}
          <button className="cursor-pointer bg-red-type text-white py-1 px-3 rounded-lg">
            Delete
          </button>
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
              <span className="uppercase text-sm py-1 px-4 border border-solid border-bright-green text-bright-green rounded-full">
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
  // true - a certain date | false - the calendar
  // const [timeViewState, setTimeViewState] = useState(false);
  // Change between list view and calendar view state
  const [viewState, setViewState] = useState(false);
  // false - calendar | true - list
  const [calendarViewState, setCalendarViewState] = useState(false);

  const [datePickerValue, setDatePickerValue] = useState([
    dayjs("00:00:00", "HH:mm:ss"),
    dayjs("11:59:59", "HH:mm:ss"),
  ]);

  const [myEvents, setMyEvents] = useState(events);

  // Create meet form
  const [meetInfo, setMeetInfo] = useState({
    title: "",
    type: "Event",
    priority: "Low",
    start: "",
    end: "",
    links: "",
    // attachments: [],
  });

  const toggleMeetDetailModal = () => {
    const modalElement = document.querySelector(".meet-detail-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  const toggleCreateMeetModal = () => {
    const modalElement = document.querySelector(".create-meet-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  const handleCreateMeet = () => {
    toggleCreateMeetModal();

    setMyEvents((prev) => [
      ...prev,
      {
        title: meetInfo.title,
        start: new Date(datePickerValue[0]),
        end: new Date(datePickerValue[1]),
        priority: "High",
        status: "Done",
      },
    ]);
  };

  const onChange = (value) => {
    // console.log(`selected ${value}`);
    setMeetInfo({ ...meetInfo, priority: value });
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className="w-full flex flex-col bg-white py-2 px-4 rounded-xl">
          <div className="flex items-stretch justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
            <div className="flex items-center">
              <p className="uppercase font-semibold text-base mr-4">Meeting</p>
              <span
                onClick={() => setCalendarViewState(!calendarViewState)}
                className={`krd-button${
                  !calendarViewState ? "--active" : ""
                } mr-2`}
              >
                Calendar View
              </span>
              <span
                onClick={() => setCalendarViewState(!calendarViewState)}
                className={`krd-button${calendarViewState ? "--active" : ""}`}
              >
                List View
              </span>
            </div>
            <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
          </div>
          {!calendarViewState ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-4"></div>
                <div className="flex items-center gap-3">
                  <Tooltip placement="top" title="Hold a meet">
                    <div
                      onClick={() => toggleCreateMeetModal()}
                      className="p-1 bg-bright-green rounded-full cursor-pointer hover:bg-less-bright-green"
                    >
                      <TbCalendarPlus className="text-2xl text-white" />
                    </div>
                  </Tooltip>
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
                </div>
              </div>
              <DndCalendar
                myEvents={myEvents}
                setMyEvents={setMyEvents}
                handleCreateMeet={handleCreateMeet}
                toggleMeetDetailModal={toggleMeetDetailModal}
              />
              <div className="py-2"></div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-solid border-[#f5f6fb] mb-4">
                <div className="flex items-center gap-3">
                  <IoIosArrowDropleftCircle
                    onClick={() => setCalendarViewState(!calendarViewState)}
                    className="text-3xl text-bright-green"
                  />
                  <p className="font-medium">From</p>
                  <DatePicker
                    cellRender={(current) => {
                      const style = {};
                      if (current.date() === 1) {
                        style.border = "1px solid #1677ff";
                        style.borderRadius = "50%";
                      }
                      return (
                        <div className="ant-picker-cell-inner" style={style}>
                          {current.date()}
                        </div>
                      );
                    }}
                    defaultValue={dayjs()}
                  />
                  <p className="font-medium">To</p>
                  <DatePicker
                    cellRender={(current) => {
                      const style = {};
                      if (current.date() === 1) {
                        style.border = "1px solid #1677ff";
                        style.borderRadius = "50%";
                      }
                      return (
                        <div className="ant-picker-cell-inner" style={style}>
                          {current.date()}
                        </div>
                      );
                    }}
                    defaultValue={dayjs()}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Tooltip placement="top" title="Hold a meet">
                    <div
                      onClick={() => toggleCreateMeetModal()}
                      className="p-1 bg-bright-green rounded-full cursor-pointer hover:bg-less-bright-green"
                    >
                      <TbCalendarPlus className="text-2xl text-white" />
                    </div>
                  </Tooltip>
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
              <div className="flex items-center">
                <h1 className="text-2xl font-bold mr-6">2023-6-29</h1>
                <div className="flex items-center">
                  <p className="pr-4 mr-3 text-xl border-r border-[#f5f6fb]">
                    4 Meets
                  </p>
                  <div className="flex items-center gap-4">
                    <AiFillCheckCircle className="text-3xl text-bright-green" />
                    <p className="text-lg">4 Meets End</p>
                    <IoIosArrowForward className="text-2xl" />
                    <p className="text-lg">0 To go ~</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-start">
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
                          toggleMeetDetailModal={toggleMeetDetailModal}
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
                          toggleMeetDetailModal={toggleMeetDetailModal}
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
                          toggleMeetDetailModal={toggleMeetDetailModal}
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
                          toggleMeetDetailModal={toggleMeetDetailModal}
                        />
                      ),
                    },
                  ]}
                />
              </div>
              <div className="flex items-center pt-6 border-t border-[#f5f6fb]">
                <h1 className="text-2xl font-bold mr-6">2023-6-30</h1>
                <div className="flex items-center">
                  <p className="pr-4 mr-3 text-xl border-r border-[#f5f6fb]">
                    4 Meets
                  </p>
                  <div className="flex items-center gap-4">
                    <AiFillCheckCircle className="text-3xl text-bright-green" />
                    <p className="text-lg">4 Meets End</p>
                    <IoIosArrowForward className="text-2xl" />
                    <p className="text-lg">0 To go ~</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-start">
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
                          toggleMeetDetailModal={toggleMeetDetailModal}
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
                          toggleMeetDetailModal={toggleMeetDetailModal}
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
                          toggleMeetDetailModal={toggleMeetDetailModal}
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
                          toggleMeetDetailModal={toggleMeetDetailModal}
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
      <MeetDetail toggleMeetDetailModal={toggleMeetDetailModal} />

      {/* Create Meet's modal */}
      <CreateMeetModal
        meetInfo={meetInfo}
        setMeetInfo={setMeetInfo}
        toggleCreateMeetModal={toggleCreateMeetModal}
        onChange={onChange}
        onSearch={onSearch}
        priorityItems={priorityItems}
        disabledDate={disabledDate}
        disabledRangeTime={disabledRangeTime}
        setDatePickerValue={setDatePickerValue}
        datePickerValue={datePickerValue}
        dayjs={dayjs}
        toast={toast}
        handleCreateMeet={handleCreateMeet}
      />
    </>
  );
};

export default TeamDetail;
