/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import "./styles/TeamDetail.scss";
import image from "../constant/image";
import { BiChevronsDown, BiRightArrow, BiTask } from "react-icons/bi";
import {
  IoIosArrowBack,
  IoIosArrowDropleftCircle,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import { DatePicker, Progress, Timeline, Tooltip } from "antd";
import { FaFilter } from "react-icons/fa";
import {
  AiFillCheckCircle,
  AiFillCrown,
  AiFillProject,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";
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
import clsx from "clsx";
import events from "../constant/events";
import { TbCalendarPlus } from "react-icons/tb";
import DndCalendar from "../components/DndCalendar/DndCalendar";
import CreateMeetModal from "../components/CreateMeetModal/CreateMeetModal";
import MeetDetail from "../components/MeetDetail/MeetDetail";
import { toast } from "react-toastify";
import CreateProjectModal from "../components/CreateProjectModal/CreateProjectModal";

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

const navigate = [
  {
    title: "projects",
  },
  {
    title: "tasks",
  },
  {
    title: "meetings",
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
              <Link
                to="/team/1/your-stats"
                className="text-bsae font-semibold hover:text-bright-green cursor-pointer"
              >
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

const TeamYourStats = () => {
  const { tasks, projects, users } = KrdStateContext();

  const [myEvents, setMyEvents] = useState(events);
  const [myProjects, setMyProjects] = useState(projects);
  const [myTasks, setMyTasks] = useState(tasks);

  const [projectName, setProjectName] = useState("");
  const [taskName, setTaskName] = useState("");
  const [priorityValue, setPriorityValue] = useState("");
  const [statusValue, setStatusValue] = useState("");
  const [deadlineValue, setDeadlineValue] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [assigneeValue, setAssigneeValue] = useState([]);
  const [reviewerValue, setReviewerValue] = useState([]);
  const [supporterValue, setSupporterValue] = useState([]);

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
  const [datePickerValue, setDatePickerValue] = useState([
    dayjs("00:00:00", "HH:mm:ss"),
    dayjs("11:59:59", "HH:mm:ss"),
  ]);

  // const [myTasks, setMyTasks] = useState(tasks);
  const [taskState, setTaskState] = useState([
    tasks.filter((item) => item.status === "to do"),
    tasks.filter((item) => item.status === "in progress"),
    tasks.filter((item) => item.status === "in review"),
    tasks.filter((item) => item.status === "done"),
  ]);

  // false - statistic | true - list
  const [viewState, setViewState] = useState(false); // For the project view mode :))
  const [taskViewState, setTaskViewState] = useState("statistic");
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

  const [viewMode, setViewMode] = useState("tasks");

  const [trashState, setTrashState] = useState(image.trashkun);

  const toggleMeetDetailModal = () => {
    const modalElement = document.querySelector(".meet-detail-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  const toggleCreateMeetModal = () => {
    const modalElement = document.querySelector(".create-meet-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  const toggleCreateProjectModal = () => {
    const modalElement = document.querySelector(".create-project-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  const handleCreateMeet = () => {
    toggleCreateMeetModal();

    // setMyEvents((prev) => [
    //   ...prev,
    //   {
    //     title: meetInfo.title,
    //     start: new Date(datePickerValue[0]),
    //     end: new Date(datePickerValue[1]),
    //     priority: "High",
    //     status: "Done",
    //   },
    // ]);
  };

  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className="w-full flex flex-col bg-white pt-2 pb-3 px-4 rounded-xl">
          <div className="flex items-start gap-4">
            <img src={image.poum} className="w-[60px] h-[60px] rounded-full" />
            <div className="flex flex-1 flex-col">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-solid border-[#f5f6fb]">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <p className="font-semibold text-xl mr-2">Mr.Poum</p>
                    <AiFillCrown className="text-2xl text-yellow-type" />
                  </div>
                  <p className="text-45-gray text-sm font-medium mt-1">
                    Alone We Go
                  </p>
                </div>
                <div className="py-1 px-4 flex items-center gap-3 rounded-full bg-bright-green text-white hover:bg-less-bright-green cursor-pointer">
                  <span className="text-sm font-normal">Options</span>
                  <TiArrowSortedDown className="text-xl" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  {navigate.map((item, index) => (
                    <p
                      onClick={() => {
                        setViewMode(item.title);
                      }}
                      key={index}
                      className={clsx(
                        viewMode === item.title && "text-bright-green",
                        "uppercase font-bold hover:text-bright-green cursor-pointer"
                      )}
                    >
                      {item.title}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {viewMode === "projects" ? (
          <>
            <div className="mt-4 max-w-full w-full flex flex-col bg-white py-2 px-4 rounded-xl">
              <div className="flex items-center justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
                <div className="flex items-center">
                  <p className="uppercase font-semibold text-base mr-4">
                    Projects
                  </p>
                  <Tooltip placement="top" title="Project that you have meets | tasks today">
                    <span
                      onClick={() => setViewState(!viewState)}
                      className={`krd-button${
                        !viewState ? "--active" : ""
                      } mr-2`}
                    >
                      Today
                    </span>
                  </Tooltip>
                  <Tooltip placement="top" title="All projects you joined">
                    <span
                      onClick={() => setViewState(!viewState)}
                      className={`krd-button${
                        viewState ? "--active" : ""
                      } mr-2`}
                    >
                      All
                    </span>
                  </Tooltip>
                </div>

                <div className="flex items-center">
                  <Tooltip placement="top" title="Add a Project">
                    <div
                      onClick={() => toggleCreateProjectModal()}
                      className="p-1 bg-bright-green rounded-full mr-3 cursor-pointer hover:bg-less-bright-green"
                    >
                      <AiFillProject className="text-2xl text-white" />
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
                      placeholder="Enter team's name / id..."
                    />
                  </div>
                  <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
                </div>
              </div>

              <div className="flex flex-col">
                {projects.map((project, index) => (
                  <div key={index} className="joined-team-item">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <h1 className="text-2xl font-medium">{project.name}</h1>
                        <span
                          className={`py-2 px-4 uppercase font-medium rounded-full border border-solid ${
                            project.progress === "in progress"
                              ? "border-yellow-type text-yellow-type"
                              : "border-bright-green text-bright-green"
                          }`}
                        >
                          {project.progress}
                        </span>
                      </div>
                      <button className="flex items-center justify-center py-2 px-4 rounded-md bg-bright-green text-white hover:bg-less-bright-green">
                        <Link to={`/team/1/projects/${project.id}`}>
                          View Details
                        </Link>
                      </button>
                    </div>
                    <div className="flex items-center mt-3">
                      <BiTask className="text-3xl mr-2 text-85-gray" />
                      <p className="text-xl pr-3 mr-4 border-r border-[#f5f6fb]">
                        {project.tasks.length} Tasks
                      </p>
                      <Tooltip
                        placement="top"
                        title={`${
                          project.tasks.filter((t) => t.status === "done")
                            .length
                        } Tasks Done`}
                      >
                        <div className="flex items-center gap-2 mr-4">
                          <p className="text-xl">
                            {
                              project.tasks.filter((t) => t.status === "done")
                                .length
                            }
                          </p>
                          <div className="w-6 h-6 rounded-full border p-1 border-bright-green">
                            <div className="w-full h-full rounded-full bg-bright-green"></div>
                          </div>
                        </div>
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        title={`${
                          project.tasks.filter(
                            (t) =>
                              t.status === "in review" ||
                              t.status === "in progress"
                          ).length
                        } Tasks In Progress | Review`}
                      >
                        <div className="flex items-center gap-2 mr-4">
                          <p className="text-xl">
                            {
                              project.tasks.filter(
                                (t) =>
                                  t.status === "in review" ||
                                  t.status === "in progress"
                              ).length
                            }
                          </p>
                          <div className="w-6 h-6 rounded-full border p-1 border-yellow-type">
                            <div className="w-full h-full rounded-full bg-yellow-type"></div>
                          </div>
                        </div>
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        title={`${
                          project.tasks.filter((t) => t.status === "to do")
                            .length
                        } Tasks To Do`}
                      >
                        <div className="flex items-center gap-2">
                          <p className="text-xl">
                            {
                              project.tasks.filter((t) => t.status === "to do")
                                .length
                            }
                          </p>
                          <div className="w-6 h-6 rounded-full border p-1 border-45-gray">
                            <div className="w-full h-full rounded-full bg-45-gray"></div>
                          </div>
                        </div>
                      </Tooltip>
                    </div>
                    <div className="flex items-center mt-4 justify-between w-full">
                      <div className="flex items-center gap-4">
                        <img
                          className="w-9 h-9 rounded-full"
                          src={image.poum}
                          alt="kururin"
                        />
                        <p className="text-base font-medium">
                          Mr.Poum is the Owner
                        </p>
                      </div>
                      <div className="flex items-center mt-3 whitespace-nowrap">
                        <div className="flex items-center relative">
                          <img
                            src={project.members[0].image}
                            data-index="1"
                            className="w-8 h-8 rounded-full"
                          />
                          <img
                            src={project.members[1].image}
                            data-index="1"
                            className="w-8 h-8 rounded-full"
                            style={{ transform: "translateX(-50%)" }}
                          />
                          <img
                            src={project.members[2].image}
                            data-index="1"
                            className="w-8 h-8 rounded-full"
                            style={{ transform: "translateX(-100%)" }}
                          />
                        </div>
                        <p
                          className="text-bsae font-medium"
                          style={{ marginLeft: "-12px" }}
                        >
                          {project.members.length} members
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center py-4 border-t border-solid border-[#f5f6fb] mt-4">
                <div className="p-2 rounded-[3px] border border-solid border-black mr-2 cursor-pointer hover:border-bright-green hover:text-bright-green">
                  <IoIosArrowBack className="text-base" />
                </div>
                <div className="px-3 py-1 rounded-[3px] border border-solid border-black mr-2 cursor-pointer hover:border-bright-green hover:text-bright-green">
                  <span className="text-base">1</span>
                </div>
                <div className="px-3 py-1 rounded-[3px] border border-solid border-black mr-2 cursor-pointer hover:border-bright-green hover:text-bright-green">
                  <span className="text-base">2</span>
                </div>
                <div className="px-3 py-1 rounded-[3px] border border-solid border-black mr-2 cursor-pointer hover:border-bright-green hover:text-bright-green">
                  <span className="text-base">3</span>
                </div>
                <div className="px-3 py-1 rounded-[3px] border border-solid border-black mr-2 cursor-pointer hover:border-bright-green hover:text-bright-green">
                  <span className="text-base">4</span>
                </div>
                <div className="px-3 py-1 rounded-[3px] border border-solid border-black mr-2 cursor-pointer hover:border-bright-green hover:text-bright-green">
                  <span className="text-base">5</span>
                </div>
                <div className="p-2 rounded-[3px] border border-solid border-black cursor-pointer hover:border-bright-green hover:text-bright-green">
                  <IoIosArrowForward className="text-base" />
                </div>
              </div>
            </div>
          </>
        ) : viewMode === "tasks" ? (
          <>
            <div className="w-full flex flex-col mb-4 bg-white py-2 px-4 rounded-xl mt-4">
              <div className="flex items-center justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
                <div className="flex items-center">
                  <p className="uppercase font-semibold text-base mr-4">
                    Tasks
                  </p>
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
                <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
              </div>
              {taskViewState === "statistic" ? (
                <>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-lg border-b-2 border-solid border-bright-green">
                      <div className="flex flex-col">
                        <h1 className="font-medium uppercase">
                          Completed tasks
                        </h1>
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
                            <div
                              className="ant-picker-cell-inner"
                              style={style}
                            >
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
                            <div
                              className="ant-picker-cell-inner"
                              style={style}
                            >
                              {current.date()}
                            </div>
                          );
                        }}
                        defaultValue={dayjs()}
                      />
                      <Tooltip placement="top" title="View as List">
                        <MdAlignHorizontalLeft
                          onClick={() =>
                            setTaskDetailViewState((prev) => !prev)
                          }
                          className={`cursor-pointer text-2xl hover:text-bright-green cursor-pointer${
                            !taskDetailViewState && " text-bright-green"
                          }`}
                        />
                      </Tooltip>
                      <Tooltip placement="top" title="View as status">
                        <MdOutlineAlignVerticalTop
                          onClick={() =>
                            setTaskDetailViewState((prev) => !prev)
                          }
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
                      <div className="flex items-center pt-4 mb-4 border-t border-[#f5f6fb]">
                        <h1 className="text-2xl font-bold mr-6">2023-6-29</h1>
                        <div className="flex items-center">
                          <p className="text-xl">4 Tasks</p>
                        </div>
                      </div>
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
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center"></div>
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
                    myEvents={myTasks}
                    setMyEvents={setMyTasks}
                    handleCreateMeet={handleCreateMeet}
                    toggleMeetDetailModal={toggleMeetDetailModal}
                  />
                  <div className="py-2"></div>
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="w-full mt-4 flex flex-col bg-white py-2 px-4 rounded-xl">
              <div className="flex items-stretch justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
                <div className="flex items-center">
                  <p className="uppercase font-semibold text-base mr-4">
                    Meeting
                  </p>
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
                    className={`krd-button${
                      calendarViewState ? "--active" : ""
                    }`}
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
                            <div
                              className="ant-picker-cell-inner"
                              style={style}
                            >
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
                            <div
                              className="ant-picker-cell-inner"
                              style={style}
                            >
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
          </>
        )}
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

      {/* Add a project modal */}
      <CreateProjectModal toggleCreateProjectModal={toggleCreateProjectModal} />
    </>
  );
};

export default TeamYourStats;
