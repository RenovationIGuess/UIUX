/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./styles/TeamDetail.scss";
import image from "../constant/image";
import { BiChevronsDown, BiRightArrow } from "react-icons/bi";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { DatePicker, Modal, Progress, Timeline, Tooltip } from "antd";
import { FaFilter } from "react-icons/fa";
import { AiFillCheckCircle, AiOutlineSearch } from "react-icons/ai";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import PaginateFooter from "../components/PaginateFooter/PaginateFooter";
import {
  MdAlignHorizontalLeft,
  MdOutlineAddTask,
  MdOutlineAlignVerticalTop,
} from "react-icons/md";
import CreateTaskModal from "../components/CreateTaskModal/CreateTaskModal";
import dayjs from "dayjs";
import { KrdStateContext } from "../contexts/ContextProvider";
import TaskItem from "../components/TaskItem/TaskItem";
import { DragDropContext } from "react-beautiful-dnd";
import DndColumn from "../components/DndColumn/DndColumn";
import DndCalendar from "../components/DndCalendar/DndCalendar";
import events from "../constant/events";
import { TbCalendarPlus } from "react-icons/tb";
import { motion } from "framer-motion";
import CreateMeetModal from "../components/CreateMeetModal/CreateMeetModal";
import MeetDetail from "../components/MeetDetail/MeetDetail";
import { toast } from "react-toastify";

const navigate = [
  {
    title: "meetings",
  },
  {
    title: "projects",
  },
  {
    title: "tasks",
  },
];

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

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

// function getMyTasks(task) {
//   return task.creator.id === user.id ||
//          task.assignee.id === user.id ||
// }

const UserProfile = () => {
  const { tasks, projects, users } = KrdStateContext();

  const [createMeetOpen, setCreateMeetOpen] = useState(false);
  const [createMeetOpen2, setCreateMeetOpen2] = useState(false);
  const [meetDetailOpen, setMeetDetailOpen] = useState(false);
  const [meetDetailOpen2, setMeetDetailOpen2] = useState(false);
  const [selectedMeet, setSelectedMeet] = useState({});
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [createTaskOpen2, setCreateTaskOpen2] = useState(false);

  const [myEvents, setMyEvents] = useState(events);
  const [myTasks, setMyTasks] = useState(tasks);

  const [taskState, setTaskState] = useState([
    tasks.filter((item) => item.status === "to do"),
    tasks.filter((item) => item.status === "in progress"),
    tasks.filter((item) => item.status === "in review"),
    tasks.filter((item) => item.status === "done"),
  ]);

  const [trashState, setTrashState] = useState(image.trashkun);

  // false - statistic | true - list
  const [taskViewState, setTaskViewState] = useState("statistic");
  const [taskDetailViewState, setTaskDetailViewState] = useState(false);
  // false - calendar | true - list
  const [calendarViewState, setCalendarViewState] = useState(false);

  const [isTaskOpen, setIsTaskOpen] = useState(true);
  const [isMeetingOpen, setIsMeetingOpen] = useState(true);

  const onDragEnd = useCallback((result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // start index
    const sInd = +source.droppableId;
    // end index
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      // Drag same column
      const items = reorder(taskState[sInd], source.index, destination.index);
      const newState = [...taskState];
      newState[sInd] = items;
      setTaskState(newState);
    } else {
      // Drag to another column
      const result = move(
        taskState[sInd],
        taskState[dInd],
        source,
        destination
      );
      const newState = [...taskState];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setTaskState(newState);
    }
  }, []);

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
                onClick={() => setTaskViewState("statistic")}
                className={`krd-button${
                  taskViewState === "statistic" ? "--active" : ""
                } mr-2`}
              >
                View Statistics
              </span>
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
            {taskViewState === "statistic" ? (
              <>
                <div className="flex items-center gap-4 mb-4">
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
                <div className="flex items-center gap-4">
                  <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-lg border-b-2 border-solid border-bright-green">
                    <div className="flex flex-col">
                      <h1 className="font-medium uppercase">Completed tasks</h1>
                      <p className="text-45-gray text-sm font-bold mt-1">
                        100.504
                      </p>
                      <div className="flex items-center mt-1">
                        <IoIosArrowUp className="mr-4 text-2xl text-bright-green" />
                        <p className="font-bold mr-2">500</p>
                        <p className="font-medium text-sm text-45-gray">%</p>
                      </div>
                    </div>
                    <Progress
                      strokeColor={"#22C55E"}
                      size={48}
                      type="circle"
                      percent={75}
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-lg border-b-2 border-solid border-[#D91212]">
                    <div className="flex flex-col">
                      <h1 className="font-medium uppercase">Aborted tasks</h1>
                      <p className="text-45-gray text-sm font-bold mt-1">
                        100.504
                      </p>
                      <div className="flex items-center mt-1">
                        <IoIosArrowUp className="mr-4 text-2xl text-[#D91212]" />
                        <p className="font-bold mr-2">500</p>
                        <p className="font-medium text-sm text-45-gray">%</p>
                      </div>
                    </div>
                    <Progress
                      strokeColor={"#D91212"}
                      size={48}
                      type="circle"
                      percent={75}
                    />
                  </div>
                  <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-lg border-b-2 border-solid border-[#FFB326]">
                    <div className="flex flex-col">
                      <h1 className="font-medium uppercase">In progress</h1>
                      <p className="text-45-gray text-sm font-bold mt-1">
                        100.504
                      </p>
                      <div className="flex items-center mt-1">
                        <IoIosArrowUp className="mr-4 text-2xl text-[#FFB326]" />
                        <p className="font-bold mr-2">500</p>
                        <p className="font-medium text-sm text-45-gray">%</p>
                      </div>
                    </div>
                    <Progress
                      strokeColor={"#FFB326"}
                      size={48}
                      type="circle"
                      percent={75}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 pb-2 border-t border-solid border-[#f5f6fb]">
                  <p className="text-base font-medium">
                    Total Tasks: 100.504.105.156.403
                  </p>
                </div>
              </>
            ) : taskViewState === "list" ? (
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
                    <Tooltip placement="top" title="View as List">
                      <MdAlignHorizontalLeft
                        onClick={() => setTaskDetailViewState((prev) => !prev)}
                        className={`cursor-pointer text-2xl hover:text-bright-green cursor-pointer${
                          !taskDetailViewState && " text-bright-green"
                        }`}
                      />
                    </Tooltip>
                    <Tooltip placement="top" title="View as status">
                      <MdOutlineAlignVerticalTop
                        onClick={() => setTaskDetailViewState((prev) => !prev)}
                        className={`cursor-pointer text-2xl hover:text-bright-green cursor-pointer${
                          taskDetailViewState && " text-bright-green"
                        }`}
                      />
                    </Tooltip>
                  </div>
                  <div className="flex items-center">
                    <Tooltip placement="top" title="Add a Task">
                      <div
                        onClick={() => setCreateTaskOpen2(true)}
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
                {!taskDetailViewState ? (
                  <>
                    <div className="flex items-center pt-4 mb-4 border-t border-[#f5f6fb]">
                      <h1 className="text-2xl font-bold mr-6">2023-6-29</h1>
                      <div className="flex items-center">
                        <p className="text-xl">4 Tasks</p>
                      </div>
                    </div>
                    {myTasks.slice(0, 5).map((task, index) => (
                      <TaskItem task={task} key={index} />
                    ))}
                  </>
                ) : (
                  <>
                    <DragDropContext onDragEnd={onDragEnd}>
                      <div
                        onMouseOver={() => setTrashState(image.trashcan)}
                        onMouseOut={() => setTrashState(image.trashkun)}
                        className="flex flex-col items-center justify-center py-2 mb-4 hover:bg-[#F6F5F8] rounded-md"
                      >
                        <div className="flex items-center gap-4">
                          <p className="text-6xl text-[#CDD4DF] font-medium uppercase">
                            Give me
                          </p>
                          <img src={trashState} className="w-[148px]" />
                          <p className="text-6xl text-[#CDD4DF] font-medium uppercase">
                            your task
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        {taskState.map((state, index) => (
                          <DndColumn
                            droppableId={`${index}`}
                            tasks={state}
                            title={index}
                            key={index}
                          />
                        ))}
                      </div>
                    </DragDropContext>
                  </>
                )}
                <PaginateFooter />
              </>
            ) : (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center"></div>
                  <div className="flex items-center gap-3">
                    <Tooltip placement="top" title="Add a Task">
                      <div
                        onClick={() => setCreateTaskOpen(true)}
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

        <motion.div
          initial={false}
          animate={isMeetingOpen ? "meetOpen" : "meetClosed"}
          className="w-full flex flex-col bg-white py-2 px-4 rounded-xl"
        >
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
            <BiChevronsDown
              onClick={() => setIsMeetingOpen(!isMeetingOpen)}
              className="text-2xl hover:cursor-pointer hover:text-bright-green"
            />
          </div>
          <motion.div className={`${!isMeetingOpen && "zero-height"}`}>
            {!calendarViewState ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-4"></div>
                  <div className="flex items-center gap-3">
                    <Tooltip placement="top" title="Hold a meet">
                      <div
                        onClick={() => setCreateMeetOpen(true)}
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
                        onClick={() => setCreateMeetOpen2(true)}
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
                            setMeetDetailOpen={setMeetDetailOpen2}
                            setSelectedMeet={setSelectedMeet}
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
                            setMeetDetailOpen={setMeetDetailOpen2}
                            setSelectedMeet={setSelectedMeet}
                          />
                        ),
                      };
                    })}
                  />
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </motion.div>

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

      {createTaskOpen2 && (
        <CreateTaskModal
          setMyTasks={setMyTasks}
          setCreateTaskOpen={setCreateTaskOpen2}
        />
      )}
      {createMeetOpen2 && (
        <CreateMeetModal
          setMyEvents={setMyEvents}
          setCreateMeetOpen={setCreateMeetOpen2}
        />
      )}
      {meetDetailOpen2 && (
        <MeetDetail
          event={selectedMeet}
          setMeetDetailOpen={setMeetDetailOpen2}
        />
      )}
    </>
  );
};

export default UserProfile;
