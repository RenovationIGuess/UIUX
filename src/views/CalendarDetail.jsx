/* eslint-disable react/prop-types */
import { DatePicker, Modal, Progress, Timeline, Tooltip } from "antd";
import { BiChevronsDown } from "react-icons/bi";
import DndCalendar from "../components/DndCalendar/DndCalendar";
import { TiArrowSortedDown } from "react-icons/ti";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineArrowRight,
  AiOutlineSearch,
} from "react-icons/ai";
import image from "../constant/image";
import { useState } from "react";
import events from "../constant/events";
import { FaFilter } from "react-icons/fa";
import { IoIosArrowDropleftCircle, IoIosArrowForward } from "react-icons/io";
import dayjs from "dayjs";
import { KrdStateContext } from "../contexts/ContextProvider";
import { MdOutlineAddTask } from "react-icons/md";
import PaginateFooter from "../components/PaginateFooter/PaginateFooter";
import CreateNormalTaskModal from "../components/CreateNormalTaskModal/CreateNormalTaskModal";
import NormalTaskItem from "../components/NormalTaskItem/NormalTaskItem";
import EditNormalTaskModal from "../components/EditNormalTaskModal/EditNormalTaskModal";
import { TbCalendarPlus } from "react-icons/tb";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const RightSideTaskItem = ({ task }) => {
  return (
    <div className="flex items-center gap-6 justify-between">
      <p className="flex-1 text-sm">{task.name}</p>
      <div className="flex items-center gap-2">
        <Tooltip placement="top" title="Mark as Done">
          <AiFillCheckCircle className="cursor-pointer text-xl text-bright-green" />
        </Tooltip>
        <Tooltip placement="top" title="Abort">
          <AiFillCloseCircle className="cursor-pointer text-xl text-red-type" />
        </Tooltip>
      </div>
    </div>
  );
};

const RightSideMeetItem = ({ meet }) => {
  return (
    <div className="flex items-center justify-between rounded-md p-2 hover:bg-bright-green cursor-pointer text-85-gray hover:text-white">
      <div className="flex items-center">
        <img
          className="w-9 h-9 rounded-full border border-solid border-[#f5f6fb] mr-2"
          src={image.poum}
          alt="user-ava"
        />
        <div className="flex flex-col">
          <p className="font-semibold text-sm mb-1">{meet.title}</p>
          <p className="font-medium text-xs">12:30AM - 00:00PM</p>
        </div>
      </div>
      <AiOutlineArrowRight className="text-xl" />
    </div>
  );
};

const TimelineLabel = ({ startTime }) => {
  return (
    <p className="pl-4 font-bold uppercase text-45-gray text-base">
      {startTime}
      {startTime > 12 ? "PM" : "AM"}
    </p>
  );
};

const TimelineChildren = ({ event, setMeetDetailOpen, setSelectedMeet }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Are you sure you want to delete");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      toast("Delete Successfully!");
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <div
        className="flex flex-col"
        onClick={() => {
          setSelectedMeet(event);
          setMeetDetailOpen(true);
        }}
      >
        <div className="w-full h-[1px] mb-2 bg-45-gray"></div>
        <div className="rounded-xl bg-white flex-col flex border border-solid border-black py-2 px-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <p className="text-xl font-semibold pr-4 mr-3 border-r border-[#f5f6fb] cursor-pointer hover:text-bright-green">
                {event.title}
              </p>
              {Object.keys(event.team).length !== 0 && (
                <p className="text-base font-medium">
                  Team&nbsp;-&nbsp;{" "}
                  <Link
                    to="/team/1/your-stats"
                    className="text-bsae font-semibold hover:text-bright-green cursor-pointer"
                  >
                    {event.team.name}
                  </Link>
                </p>
              )}
              {Object.keys(event.workspace).length !== 0 && (
                <p className="text-base font-medium">
                  Workspace&nbsp;-&nbsp;{" "}
                  <Link
                    to="/calendar/1"
                    className="text-bsae font-semibold hover:text-bright-green cursor-pointer"
                  >
                    {event.workspace.name}
                  </Link>
                </p>
              )}
            </div>
            {/* <BsThreeDots className="text-2xl" /> */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                showModal();
              }}
              className="cursor-pointer bg-red-type text-white py-1 px-3 rounded-lg"
            >
              Delete
            </button>
          </div>
          <div className="flex items-center gap-4">
            <Tooltip placement="top" title="Creator Avatar">
              <img
                src={image.poum}
                alt="creator-avatar"
                className="w-8 h-8 rounded-full"
              />
            </Tooltip>
            <p className="text-45-gray text-sm font-bold uppercase">
              {dayjs(event.start).format("YYYY-MM-DD HH:mm")}&nbsp;-&nbsp;
              {dayjs(event.end).format("YYYY-MM-DD HH:mm")}
            </p>
            <div className="flex items-center gap-2">
              <Tooltip title={"Priority"} placement="top">
                <span className="uppercase text-sm py-1 px-4 border border-solid border-red-type text-red-type rounded-full">
                  {event.priority}
                </span>
              </Tooltip>
              <Tooltip title={"Status"} placement="top">
                <span className="uppercase text-sm py-1 px-4 border border-solid border-bright-green text-bright-green rounded-full">
                  {event.status}
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Delete Meet"
        centered
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

const CalendarDetail = () => {
  const { tasks } = KrdStateContext();

  const [isTaskOpen, setIsTaskOpen] = useState(true);
  const [isMeetOpen, setIsMeetOpen] = useState(true);

  const [myEvents, setMyEvents] = useState(events);
  const [myTasks, setMyTasks] = useState(tasks);
  const [calendarViewState, setCalendarViewState] = useState(false);
  const [taskViewState, setTaskViewState] = useState("list");

  const [createMeetOpen, setCreateMeetOpen] = useState(false);
  const [meetDetailOpen, setMeetDetailOpen] = useState(false);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);

  const [taskName, setTaskName] = useState("");
  const [priorityValue, setPriorityValue] = useState("");
  const [statusValue, setStatusValue] = useState("");

  const toggleCreateMeetModal = () => {
    const modalElement = document.querySelector(".create-meet-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  const toggleCreateNormalTaskModal = () => {
    const modalElement = document.querySelector(".create-normal-task-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  const toggleEditNormalTaskModal = () => {
    const modalElement = document.querySelector(".edit-normal-task-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  return (
    <>
      <motion.div
        initial={false}
        animate={isTaskOpen ? "taskOpen" : "taskClosed"}
        className="flex-1 flex flex-col"
      >
        <div className="w-full flex flex-col mb-4 bg-white py-2 px-4 rounded-xl">
          <div className="flex items-center justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
            <div className="flex items-center">
              <p className="uppercase font-semibold text-base mr-4">Tasks</p>
              <span
                onClick={() => setTaskViewState("list")}
                className={`krd-button${
                  taskViewState === "list" ? "--active" : ""
                } mr-2`}
              >
                View List
              </span>
              <span
                onClick={() => setTaskViewState("calendar")}
                className={`krd-button${
                  taskViewState === "calendar" ? "--active" : ""
                }`}
              >
                View Calendar
              </span>
            </div>
            <BiChevronsDown
              onClick={() => setIsTaskOpen(!isTaskOpen)}
              className="text-2xl hover:cursor-pointer hover:text-bright-green"
            />
          </div>
          <motion.div className={`${!isTaskOpen && "zero-height"}`}>
            {taskViewState === "list" ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
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
                  <div className="flex items-center">
                    <Tooltip placement="top" title="Add a Task">
                      <div
                        onClick={() => toggleCreateNormalTaskModal()}
                        className="p-1 bg-bright-green rounded-full mr-3 cursor-pointer hover:bg-less-bright-green"
                      >
                        <MdOutlineAddTask className="text-2xl text-white" />
                      </div>
                    </Tooltip>
                    <div className="p-2 bg-bright-green rounded-full mr-3 cursor-pointer hover:bg-less-bright-green">
                      <FaFilter className="text-base text-white" />
                    </div>
                    <div className="flex mr-3">
                      <div className="flex items-center justify-center pl-4 pr-3 py-2 rounded-bl-full rounded-tl-full bg-bright-green">
                        <AiOutlineSearch className="text-base text-white" />
                      </div>
                      <input
                        className="rounded-tr-full rounded-br-full border-t border-b border-r border-solid border-bright-green text-sm h-[32px] w-[200px] focus:outline-none px-3"
                        placeholder="Enter task's name / id..."
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center pt-4 mb-4 border-t border-[#f5f6fb]">
                  <h1 className="text-2xl font-bold mr-6">2023-6-29</h1>
                  <div className="flex items-center">
                    <p className="text-xl">4 Tasks</p>
                  </div>
                </div>
                {tasks.slice(0, 5).map((task, index) => (
                  <NormalTaskItem
                    task={task}
                    key={index}
                    toggleEditNormalTaskModal={toggleEditNormalTaskModal}
                  />
                ))}

                <PaginateFooter />
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center"></div>
                  <div className="flex items-center gap-3">
                    <Tooltip placement="top" title="Add a Task">
                      <div
                        onClick={() => toggleCreateNormalTaskModal()}
                        className="p-1 bg-bright-green rounded-full cursor-pointer hover:bg-less-bright-green"
                      >
                        <MdOutlineAddTask className="text-2xl text-white" />
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
                  type="task"
                  myEvents={myTasks}
                  setMyTasks={setMyTasks}
                  createTaskOpen={createTaskOpen}
                  setCreateTaskOpen={setCreateTaskOpen}
                />
                <div className="py-2"></div>
              </>
            )}
          </motion.div>
        </div>

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
            <BiChevronsDown onClick={() => setIsMeetOpen(!isMeetOpen)} className="text-2xl hover:cursor-pointer hover:text-bright-green" />
          </div>
          <div className={`${!isMeetOpen && "zero-height"}`}>
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
                  type="meet"
                  myEvents={myEvents}
                  setMyEvents={setMyEvents}
                  createMeetOpen={createMeetOpen}
                  setCreateMeetOpen={setCreateMeetOpen}
                  meetDetailOpen={meetDetailOpen}
                  setMeetDetailOpen={setMeetDetailOpen}
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
                    items={myEvents.slice(0, 4).map((e) => {
                      return {
                        label: (
                          <TimelineLabel startTime={dayjs(e.start).hour()} />
                        ),
                        children: (
                          <TimelineChildren
                            event={e}
                            // setMeetDetailOpen={setMeetDetailOpen2}
                            // setSelectedMeet={setSelectedMeet}
                          />
                        ),
                      };
                    })}
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
                    items={myEvents.slice(4, 8).map((e) => {
                      return {
                        label: (
                          <TimelineLabel startTime={dayjs(e.start).hour()} />
                        ),
                        children: (
                          <TimelineChildren
                            event={e}
                            // setMeetDetailOpen={setMeetDetailOpen2}
                            // setSelectedMeet={setSelectedMeet}
                          />
                        ),
                      };
                    })}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <div className="w-[336px] ml-6 shrink-0">
        <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4 mb-4">
          <div className="py-4 border-b border-solid border-[#f5f6fb] mb-4">
            {/* `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. */}
            <span className="font-semibold">Scoring</span>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex items-center">
              <Progress size={60} percent={50} type="circle" className="mr-4" />
              <p className="text-normal font-medium">
                You have complete 10/20 today&apos;s tasks
              </p>
            </div>
            <div className="w-full flex items-center">
              <Progress size={60} percent={50} type="circle" className="mr-4" />
              <p className="text-normal font-medium">
                You have attended 10/20 today&apos;s meets
              </p>
            </div>
          </div>
        </div>

        <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4">
          <div className="py-4 border-b border-solid border-[#f5f6fb] mb-4">
            {/* `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. */}
            <span className="font-semibold">Today&apos;s Tasks</span>
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col items-start">
              <div className="flex w-full items-center justify-between py-1 px-4 rounded-full border border-solid border-red-type text-red-type cursor-pointer">
                <span className="text-sm font-medium">High Priority</span>
                <TiArrowSortedDown className="text-xl" />
              </div>
              <div className="w-full pl-4 flex flex-col mt-2 gap-2 mb-3">
                {tasks
                  .filter((t) => t.priority === "high")
                  .splice(0, 2)
                  .map((t, index) => (
                    <RightSideTaskItem task={t} key={index} />
                  ))}
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex w-full items-center justify-between py-1 px-4 rounded-full border border-solid border-yellow-type text-yellow-type cursor-pointer">
                <span className="text-sm font-medium">Medium Priority</span>
                <TiArrowSortedDown className="text-xl" />
              </div>
              <div className="w-full pl-4 flex flex-col mt-2 gap-2 mb-3">
                {tasks
                  .filter((t) => t.priority === "medium")
                  .splice(0, 2)
                  .map((t, index) => (
                    <RightSideTaskItem task={t} key={index} />
                  ))}
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div className="flex w-full items-center justify-between py-1 px-4 rounded-full border border-solid border-bright-green text-bright-green cursor-pointer">
                <span className="text-sm font-medium">Low Priority</span>
                <TiArrowSortedDown className="text-xl" />
              </div>
              <div className="w-full pl-4 flex flex-col mt-2 gap-2 mb-3">
                {tasks
                  .filter((t) => t.priority === "low")
                  .splice(0, 2)
                  .map((t, index) => (
                    <RightSideTaskItem task={t} key={index} />
                  ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full mt-4 bg-white rounded-xl flex flex-col px-4 pb-4">
          <div className="py-4 border-b border-solid border-[#f5f6fb] mb-2">
            {/* `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. */}
            <span className="font-semibold">Upcoming Meets</span>
          </div>
          <div className="flex flex-col">
            {myEvents.slice(0, 3).map((e, index) => (
              <RightSideMeetItem meet={e} key={index} />
            ))}
          </div>
        </div>

        <div className="w-full mt-4 bg-white rounded-xl flex flex-col px-4 pb-4">
          <div className="py-4 border-b border-solid border-[#f5f6fb] mb-2">
            {/* `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. */}
            <span className="font-semibold">Today Notes</span>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <img className="w-[200px]" src={image.nothing} alt="nothing" />
            <p className="text-[#CDD4DF] text-sm text-center mb-2">
              You don&apos;t have any notes
            </p>
          </div>
        </div>
      </div>

      <EditNormalTaskModal
        toggleEditNormalTaskModal={toggleEditNormalTaskModal}
      />

      <CreateNormalTaskModal
        toggleCreateNormalTaskModal={toggleCreateNormalTaskModal}
        taskName={taskName}
        setTaskName={setTaskName}
        priorityValue={priorityValue}
        setPriorityValue={setPriorityValue}
        statusValue={statusValue}
        setStatusValue={setStatusValue}
      />
    </>
  );
};

export default CalendarDetail;
