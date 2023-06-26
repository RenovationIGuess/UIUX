/* eslint-disable react/prop-types */
import "./styles/TeamDetail.scss";
import image from "../constant/image";
import { BiChevronsDown } from "react-icons/bi";
import { AiOutlineArrowRight } from "react-icons/ai";
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
import { Tooltip } from "antd";

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
        <div className="w-full flex flex-col bg-white p-4 rounded-xl transition">
          <>
            <div className="flex items-center justify-between pb-4 border-b border-solid border-[#f5f6fb] mb-4">
              <div className="flex items-center">
                <p className="uppercase font-semibold text-base mr-4">
                  Meetings
                </p>
                <Tooltip placement="top" title="Calendar View">
                  <MdAlignHorizontalLeft
                    onClick={() => setViewState((prev) => !prev)}
                    className={`cursor-pointer text-2xl mr-4 hover:text-bright-green cursor-pointer${
                      !viewState && " text-bright-green"
                    }`}
                  />
                </Tooltip>
                <Tooltip placement="top" title="List View">
                  <MdOutlineAlignVerticalTop
                    onClick={() => setViewState((prev) => !prev)}
                    className={`cursor-pointer text-2xl hover:text-bright-green cursor-pointer${
                      viewState && " text-bright-green"
                    }`}
                  />
                </Tooltip>
              </div>
              <div className="flex items-center">
                <span
                  onClick={() => toggleCreateMeetModal()}
                  className="py-1 px-4 rounded-full bg-bright-green text-white cursor-pointer hover:bg-less-bright-green mr-2"
                >
                  Hold a meet
                </span>
                <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
              </div>
            </div>
            <DndCalendar
              myEvents={myEvents}
              setMyEvents={setMyEvents}
              handleCreateMeet={handleCreateMeet}
              toggleMeetDetailModal={toggleMeetDetailModal}
            />
          </>
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
