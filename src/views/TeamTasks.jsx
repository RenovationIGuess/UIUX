/* eslint-disable no-unused-vars */
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import image from "../constant/image";
import { FaFilter } from "react-icons/fa";
import { BiChevronsDown } from "react-icons/bi";
import {
  IoIosArrowUp,
} from "react-icons/io";
import {
  MdAlignHorizontalLeft,
  MdOutlineAddTask,
  MdOutlineAlignVerticalTop,
} from "react-icons/md";
import { DatePicker, Progress, Tooltip } from "antd";

import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import dayLocaleData from "dayjs/plugin/localeData";
import { useCallback, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DndColumn from "../components/DndColumn/DndColumn";
import PaginateFooter from "../components/PaginateFooter/PaginateFooter";
import { KrdStateContext } from "../contexts/ContextProvider";
import TaskItem from "../components/TaskItem/TaskItem";
import DndCalendar from "../components/DndCalendar/DndCalendar";
import CreateTaskModal from "../components/CreateTaskModal/CreateTaskModal";
import { motion } from "framer-motion";
import { TiArrowSortedDown } from "react-icons/ti";
import PropTypes from "prop-types";

dayjs.extend(dayLocaleData);

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
RightSideTaskItem.propTypes = {
  task: PropTypes.object,
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

const TeamTaskDetail = () => {
  const { tasks, projects, users } = KrdStateContext();

  const [isTaskOpen, setIsTaskOpen] = useState(true);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [createTaskOpen2, setCreateTaskOpen2] = useState(false);

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
          <motion.div
            variants={{
              taskOpen: { height: "auto" },
              taskClosed: { height: 0 },
            }}
            className={`${!isTaskOpen && "zero-height"}`}
          >
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
                    {myTasks.map((task, index) => (
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
      </motion.div>

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
        <div className="w-full bg-white rounded-xl flex flex-col px-4 mt-4 pb-4">
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

      {createTaskOpen2 && (
        <CreateTaskModal
          setMyTasks={setMyTasks}
          setCreateTaskOpen={setCreateTaskOpen2}
        />
      )}
    </>
  );
};

export default TeamTaskDetail;
