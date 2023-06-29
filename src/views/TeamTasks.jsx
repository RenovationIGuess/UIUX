/* eslint-disable no-unused-vars */
import {
  AiFillCalendar,
  AiOutlineAppstoreAdd,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";
import image from "../constant/image";
import { FaFilter } from "react-icons/fa";
import { BiChevronsDown } from "react-icons/bi";
import {
  IoIosArrowBack,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
import {
  MdAlignHorizontalLeft,
  MdOutlineAddTask,
  MdOutlineAlignVerticalTop,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { DatePicker, Progress, Tooltip } from "antd";

import { Calendar, Col, Radio, Row, Select } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import dayLocaleData from "dayjs/plugin/localeData";
import { useCallback, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import dummyData from "../constant/dummyData";
import DndColumn from "../components/DndColumn/DndColumn";
import PaginateFooter from "../components/PaginateFooter/PaginateFooter";
import { KrdStateContext } from "../contexts/ContextProvider";
import TaskItem from "../components/TaskItem/TaskItem";
import { TbCalendarPlus } from "react-icons/tb";
import DndCalendar from "../components/DndCalendar/DndCalendar";
import CreateTaskModal from "../components/CreateTaskModal/CreateTaskModal";

dayjs.extend(dayLocaleData);

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

const TeamTaskDetail = () => {
  const { tasks, projects, users } = KrdStateContext();

  const [myTasks, setMyTasks] = useState(tasks);
  const [taskViewState, setTaskViewState] = useState("statistic");
  const [taskDetailViewState, setTaskDetailViewState] = useState(false);

  // const [myTasks, setMyTasks] = useState(tasks);
  const [taskState, setTaskState] = useState([
    tasks.filter((item) => item.status === "to do"),
    tasks.filter((item) => item.status === "in progress"),
    tasks.filter((item) => item.status === "in review"),
    tasks.filter((item) => item.status === "done"),
  ]);

  const [trashState, setTrashState] = useState(image.trashkun);

  const [projectName, setProjectName] = useState('');
  const [taskName, setTaskName] = useState('');
  const [priorityValue, setPriorityValue] = useState('');
  const [statusValue, setStatusValue] = useState('');
  const [deadlineValue, setDeadlineValue] = useState([]);
  const [taskDescription, setTaskDescription] = useState('');
  const [assigneeValue, setAssigneeValue] = useState([]);
  const [reviewerValue, setReviewerValue] = useState([]);
  const [supporterValue, setSupporterValue] = useState([]);

  const toggleCreateTaskModal = () => {
    const modalElement = document.querySelector(".create-task-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  const toggleCreateMeetModal = () => {
    const modalElement = document.querySelector(".create-meet-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  const toggleMeetDetailModal = () => {
    const modalElement = document.querySelector(".meet-detail-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  const handleCreateMeet = () => {
    toggleCreateMeetModal();
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

    // if (sInd === dInd) {
    //   // Drag same column
    //   const items = reorder(state[sInd], source.index, destination.index);
    //   const newState = [...state];
    //   newState[sInd] = items;
    //   setState(newState);
    // } else {
    //   // Drag to another column
    //   const result = move(state[sInd], state[dInd], source, destination);
    //   const newState = [...state];
    //   newState[sInd] = result[sInd];
    //   newState[dInd] = result[dInd];

    //   setState(newState.filter(group => group.length));
    // }
  }, []);

  return (
    <>
      {/* <div
        className={`max-w-full w-full flex flex-col bg-white py-2 px-4 rounded-xl`}
      >
        <div className="flex items-center justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
          <div className="flex items-center">
            <p className="uppercase font-semibold text-base mr-4">Tasks</p>

            <Tooltip placement="top" title="View as List">
              <MdAlignHorizontalLeft
                onClick={() => setViewState((prev) => !prev)}
                className={`cursor-pointer text-2xl mr-4 hover:text-bright-green cursor-pointer${
                  !viewState && " text-bright-green"
                }`}
              />
            </Tooltip>
            <Tooltip placement="top" title="View as status">
              <MdOutlineAlignVerticalTop
                onClick={() => setViewState((prev) => !prev)}
                className={`cursor-pointer text-2xl hover:text-bright-green cursor-pointer${
                  viewState && " text-bright-green"
                }`}
              />
            </Tooltip>
          </div>

          <div className="flex items-center">
            <div className="p-1 bg-bright-green rounded-full mr-3 cursor-pointer hover:bg-less-bright-green">
              <AiOutlineAppstoreAdd className="text-2xl text-white" />
            </div>
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
          <div className="flex items-center justify-end gap-3 mb-4">
            <p className="font-medium">21/09/2024</p>
            <div className="relative flex items-center justify-center">
              <AiFillCalendar
                onClick={() => setIsCalendarVisible((prev) => !prev)}
                className="text-2xl hover:cursor-pointer hover:text-bright-green"
              />
              {isCalendarVisible && (
                <div
                  className="bg-white rounded-xl py-2 px-4 w-[312px] shadow-xl absolute top-10 flex flex-col"
                  style={{ zIndex: 1000 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-85-gray font-medium">
                      Pick a date
                    </p>
                    <AiOutlineClose
                      className="hover:cursor-pointer"
                      onClick={() => setIsCalendarVisible(false)}
                    />
                  </div>
                  <Calendar
                    fullscreen={false}
                    headerRender={({ value, type, onChange, onTypeChange }) => {
                      const start = 0;
                      const end = 12;
                      const monthOptions = [];
                      let current = value.clone();
                      const localeData = value.localeData();
                      const months = [];
                      for (let i = 0; i < 12; i++) {
                        current = current.month(i);
                        months.push(localeData.monthsShort(current));
                      }
                      for (let i = start; i < end; i++) {
                        monthOptions.push(
                          <Select.Option
                            key={i}
                            value={i}
                            className="month-item"
                          >
                            {months[i]}
                          </Select.Option>
                        );
                      }
                      const year = value.year();
                      const month = value.month();
                      const options = [];
                      for (let i = year - 10; i < year + 10; i += 1) {
                        options.push(
                          <Select.Option
                            key={i}
                            value={i}
                            className="year-item"
                          >
                            {i}
                          </Select.Option>
                        );
                      }
                      return (
                        <div
                          style={{
                            padding: 8,
                          }}
                        >
                          <Row gutter={8}>
                            <Col>
                              <Radio.Group
                                size="small"
                                onChange={(e) => onTypeChange(e.target.value)}
                                value={type}
                              >
                                <Radio.Button value="month">Month</Radio.Button>
                                <Radio.Button value="year">Year</Radio.Button>
                              </Radio.Group>
                            </Col>
                            <Col>
                              <Select
                                size="small"
                                dropdownMatchSelectWidth={false}
                                className="my-year-select"
                                value={year}
                                onChange={(newYear) => {
                                  const now = value.clone().year(newYear);
                                  onChange(now);
                                }}
                              >
                                {options}
                              </Select>
                            </Col>
                            <Col>
                              <Select
                                size="small"
                                dropdownMatchSelectWidth={false}
                                value={month}
                                onChange={(newMonth) => {
                                  const now = value.clone().month(newMonth);
                                  onChange(now);
                                }}
                              >
                                {monthOptions}
                              </Select>
                            </Col>
                          </Row>
                        </div>
                      );
                    }}
                    onPanelChange={onPanelChange}
                  />
                </div>
              )}
            </div>
          </div>
          {!viewState ? (
            <>
              <div className="joined-team-item">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <h1 className="text-2xl font-medium">
                      Implement everything you have “_”
                    </h1>
                  </div>
                  <button className="flex items-center justify-center py-2 px-4 rounded-md bg-bright-green text-white hover:bg-less-bright-green">
                    <Link to="/team/1/tasks/1">View Details</Link>
                  </button>
                </div>
                <div className="flex items-center mt-3 gap-2">
                  <Tooltip placement="top" title={"Project Name"}>
                    <span className="py-1 px-4 font-medium border border-solid border-45-gray rounded-full text-45-gray">
                      Project UI / UX
                    </span>
                  </Tooltip>
                  <Tooltip placement="top" title={"Priority"}>
                    <span className="py-1 px-4 font-medium border border-solid border-red-type rounded-full text-red-type uppercase">
                      high
                    </span>
                  </Tooltip>
                  <Tooltip placement="top" title={"Type"}>
                    <span className="py-1 px-4 font-medium border border-solid border-45-gray rounded-full text-45-gray uppercase">
                      to do
                    </span>
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
                        src={image.poum}
                        data-index="1"
                        className="w-8 h-8 rounded-full"
                      />
                      <img
                        src={image.poum}
                        data-index="1"
                        className="w-8 h-8 rounded-full"
                        style={{ transform: "translateX(-50%)" }}
                      />
                      <img
                        src={image.poum}
                        data-index="1"
                        className="w-8 h-8 rounded-full"
                        style={{ transform: "translateX(-100%)" }}
                      />
                    </div>
                    <p
                      className="text-bsae font-medium"
                      style={{ marginLeft: "-12px" }}
                    >
                      100k members assigned
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex gap-4">
                  <DndColumn
                    droppableId="todo"
                    tasks={tasks.filter((item) => item.status === "todo")}
                    title="to do"
                  />
                  <DndColumn
                    droppableId="in_progress"
                    tasks={tasks.filter(
                      (item) => item.status === "in_progress"
                    )}
                    title="in progress"
                  />
                  <DndColumn
                    droppableId="in_review"
                    tasks={tasks.filter((item) => item.status === "in_review")}
                    title="in review"
                  />
                  <DndColumn
                    droppableId="done"
                    tasks={tasks.filter((item) => item.status === "done")}
                    title="done"
                  />
                </div>
              </DragDropContext>
            </>
          )}
        </div>

        <PaginateFooter />
      </div> */}

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
            <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
          </div>
          {taskViewState === "statistic" ? (
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
                <div className="flex items-center">
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

      <div className="w-[336px] ml-6 shrink-0">
        <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4">
          <div className="py-4 border-b border-solid border-[#f5f6fb] mb-3">
            {/* `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. */}
            <span className="font-semibold">Task&apos;s Statistics</span>
          </div>
          <div className="w-full flex gap-4 flex-col">
            <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-md border-b-2 border-solid border-bright-green">
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
                size={48}
                type="circle"
                percent={75}
              />
            </div>
            <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-md border-b-2 border-solid border-[#D91212]">
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
                size={48}
                type="circle"
                percent={75}
              />
            </div>
            <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-md border-b-2 border-solid border-[#FFB326]">
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
                size={48}
                type="circle"
                percent={75}
              />
            </div>
          </div>
          <div className="pt-4 border-t border-solid border-[#f5f6fb] mt-4">
            <span className="font-semibold">Total Tasks: 123.345.345.653</span>
          </div>
        </div>
        <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4 mt-4">
          <div className="py-4 border-b border-solid border-[#f5f6fb] mb-3">
            <span className="font-semibold">Upcoming Tasks</span>
          </div>
          <div className="w-full flex flex-col items-center justify-center">
            <img className="w-[200px]" src={image.nothing} alt="nothing" />
            <p className="text-[#CDD4DF] text-sm text-center mb-2">
              You don&apos;t have any upcoming tasks
            </p>
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
    </>
  );
};

export default TeamTaskDetail;
