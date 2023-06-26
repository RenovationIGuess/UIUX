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
  MdOutlineAlignVerticalTop,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { Progress, Tooltip } from "antd";

import { Calendar, Col, Radio, Row, Select } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import dayLocaleData from "dayjs/plugin/localeData";
import { useCallback, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import dummyData from "../constant/dummyData";
import DndColumn from "../components/DndColumn/DndColumn";
import PaginateFooter from "../components/PaginateFooter/PaginateFooter";

dayjs.extend(dayLocaleData);

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
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  // true - vertical | false - horizontal
  const [viewState, setViewState] = useState(false);
  const [tasks, setTasks] = useState(dummyData.dummyTasksData);

  const onPanelChange = (value, mode) => {
    // console.log(value.format("YYYY-MM-DD"), mode);
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
      <div
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
                size={[48, 48]}
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
                size={[48, 48]}
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
                size={[48, 48]}
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
    </>
  );
};

export default TeamTaskDetail;
