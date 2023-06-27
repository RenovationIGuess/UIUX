/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./styles/TeamDetail.scss";
import image from "../constant/image";
import { BiChevronsDown, BiRightArrow } from "react-icons/bi";
import { IoIosArrowDropleftCircle, IoIosArrowUp } from "react-icons/io";
import { DatePicker, Progress, Timeline, Tooltip } from "antd";
import { FaFilter } from "react-icons/fa";
import { AiOutlineClose, AiOutlineSearch } from "react-icons/ai";
import { useCallback, useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
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
import CreateMeetModal from "../components/CreateMeetModal/CreateMeetModal";
import MeetDetail from "../components/MeetDetail/MeetDetail";
import { toast } from "react-toastify";
import { BsThreeDots } from "react-icons/bs";
import { TbCalendarPlus } from "react-icons/tb";

const navigate = [
  {
    link: "/team/1/project/meetings",
    title: "meetings",
  },
  {
    link: "/team/1/project/meetings",
    title: "projects",
  },
  {
    link: "/team/1/project/tasks",
    title: "tasks",
  },
];

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
  return (
    <div className="flex flex-col" onClick={() => toggleMeetDetailModal()}>
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

// function getMyTasks(task) {
//   return task.creator.id === user.id ||
//          task.assignee.id === user.id ||
// }

const UserProfile = () => {
  const { tasks, projects, users } = KrdStateContext();

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

  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [priorityValue, setPriorityValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [assigneeValue, setAssigneeValue] = useState([]);
  const [reviewerValue, setReviewerValue] = useState([]);
  const [supporterValue, setSupporterValue] = useState([]);

  // const [myTasks, setMyTasks] = useState(tasks);
  const [taskState, setTaskState] = useState([
    tasks.filter((item) => item.status === "to do"),
    tasks.filter((item) => item.status === "in progress"),
    tasks.filter((item) => item.status === "in review"),
    tasks.filter((item) => item.status === "done"),
  ]);

  const [trashState, setTrashState] = useState(image.trashkun);

  // false - statistic | true - list
  const [taskViewState, setTaskViewState] = useState(false);
  const [taskDetailViewState, setTaskDetailViewState] = useState(false);
  // false - calendar | true - list
  const [calendarViewState, setCalendarViewState] = useState(false);

  const toggleCreateTaskModal = () => {
    const modalElement = document.querySelector(".create-task-modal");
    modalElement.classList.toggle("modal-hidden");
  };

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

  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className="w-full flex flex-col mb-4 bg-white py-2 px-4 rounded-xl">
          <div className="flex items-center justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
            <div className="flex items-center">
              <p className="uppercase font-semibold text-base mr-4">Tasks</p>
              <span
                onClick={() => setTaskViewState(!taskViewState)}
                className={`krd-button${!taskViewState ? "--active" : ""} mr-2`}
              >
                View Statistics
              </span>
              <span
                onClick={() => setTaskViewState(!taskViewState)}
                className={`krd-button${taskViewState ? "--active" : ""}`}
              >
                View List
              </span>
            </div>
            <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
          </div>
          {!taskViewState ? (
            <>
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
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
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
                      onClick={() => toggleCreateTaskModal()}
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
                  {tasks.map((task, index) => (
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
          )}
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
            <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
          </div>
          {!calendarViewState ? (
            <>
              <DndCalendar
                myEvents={myEvents}
                setMyEvents={setMyEvents}
                handleCreateMeet={handleCreateMeet}
                toggleMeetDetailModal={toggleMeetDetailModal}
              />
            </>
          ) : (
            <>
              <div className="flex items-center justify-between pb-4 border-b border-solid border-[#f5f6fb] mb-4">
                <div className="flex items-center gap-3">
                  <IoIosArrowDropleftCircle
                    onClick={() => setCalendarViewState(!calendarViewState)}
                    className="text-3xl text-bright-green"
                  />
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
                      onClick={() => toggleCreateTaskModal()}
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
      <CreateTaskModal
        toggleCreateTaskModal={toggleCreateTaskModal}
        projects={projects}
        projectName={projectName}
        setProjectName={setProjectName}
        taskName={taskName}
        setTaskName={setTaskName}
        priorityValue={priorityValue}
        setPriorityValue={setPriorityValue}
        statusValue={statusValue}
        setStatusValue={setStatusValue}
        members={users}
        deadlineValue={deadlineValue}
        setDeadlineValue={setDeadlineValue}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        assigneeValue={assigneeValue}
        setAssigneeValue={setAssigneeValue}
        reviewerValue={reviewerValue}
        setReviewerValue={setReviewerValue}
        supporterValue={supporterValue}
        setSupporterValue={setSupporterValue}
      />

      {/* Meet's modal */}
      <MeetDetail toggleMeetDetailModal={toggleMeetDetailModal} />

      {/* Create Meet's modal */}
      <CreateMeetModal
        meetInfo={meetInfo}
        setMeetInfo={setMeetInfo}
        toggleCreateMeetModal={toggleCreateMeetModal}
        // onChange={onChange}
        // onSearch={onSearch}
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

export default UserProfile;
