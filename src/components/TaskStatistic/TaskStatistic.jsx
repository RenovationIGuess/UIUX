/* eslint-disable react/prop-types */
import { Progress } from "antd";
import { BiChevronsDown } from "react-icons/bi";
import { IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

const TaskStatistic = ({ type }) => {
  return (
    <div className="w-full flex flex-col bg-white py-2 px-4 mb-4 rounded-xl">
      <div className="flex items-center justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
        <p className="uppercase font-semibold text-base">{type === 'task' ? "Tasks" : "Projects"}</p>
        <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-lg border-b-2 border-solid border-bright-green">
          <div className="flex flex-col">
            <h1 className="font-medium uppercase">Completed {type === 'task' ? "Tasks" : "Projects"}</h1>
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
        <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-lg border-b-2 border-solid border-[#D91212]">
          <div className="flex flex-col">
            <h1 className="font-medium uppercase">Aborted {type === 'task' ? "Tasks" : "Projects"}</h1>
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
        <Link to={type === 'task' ? "/team/1/tasks" : "/team/1/projects"} className="flex items-center justify-center py-2 px-4 text-sm bg-bright-green text-white hover:bg-less-bright-green cursor-pointer rounded-md">
          View Detail
        </Link>
      </div>
    </div>
  );
};

export default TaskStatistic;
