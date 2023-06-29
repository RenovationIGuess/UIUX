/* eslint-disable no-unused-vars */
import {
  AiFillCalendar,
  AiFillProject,
  AiOutlineAppstoreAdd,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";
import image from "../constant/image";
import { FaFilter } from "react-icons/fa";
import { BiChevronsDown, BiTask } from "react-icons/bi";
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
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import dayLocaleData from "dayjs/plugin/localeData";
import { useState } from "react";
import { KrdStateContext } from "../contexts/ContextProvider";
import CreateProjectModal from "../components/CreateProjectModal/CreateProjectModal";
import { BsRecordCircle } from "react-icons/bs";

dayjs.extend(dayLocaleData);

const TeamProjects = () => {
  const { projects } = KrdStateContext();

  const [viewState, setViewState] = useState(false);

  const toggleCreateProjectModal = () => {
    const modalElement = document.querySelector(".create-project-modal");
    modalElement.classList.toggle("modal-hidden");
  };

  return (
    <>
      <div
        className={`max-w-full w-full flex flex-col bg-white py-2 px-4 rounded-xl`}
      >
        <div className="flex items-center justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
          <div className="flex items-center">
            <p className="uppercase font-semibold text-base mr-4">Projects</p>
          </div>

          <div className="flex items-center">
            <Tooltip placement="top" title="Add a Project">
              <div onClick={() => toggleCreateProjectModal()} className="p-1 bg-bright-green rounded-full mr-3 cursor-pointer hover:bg-less-bright-green">
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
                  <Link to={`/team/1/projects/${project.id}`}>View Details</Link>
                </button>
              </div>
              <div className="flex items-center mt-3">
                <BiTask className="text-3xl mr-2 text-85-gray" />
                <p className="text-xl pr-3 mr-4 border-r border-[#f5f6fb]">{project.tasks.length} Tasks</p>
                <Tooltip placement="top" title={`${project.tasks.filter((t) => t.status === "done").length} Tasks Done`}>
                  <div className="flex items-center gap-2 mr-4">
                    <p className="text-xl">{project.tasks.filter((t) => t.status === "done").length}</p>
                    <div className="w-6 h-6 rounded-full border p-1 border-bright-green">
                      <div className="w-full h-full rounded-full bg-bright-green"></div>
                    </div>
                  </div>
                </Tooltip>
                <Tooltip placement="top" title={`${project.tasks.filter((t) => t.status === "in review" || t.status === "in progress").length} Tasks In Progress | Review`}>
                  <div className="flex items-center gap-2 mr-4">
                    <p className="text-xl">{project.tasks.filter((t) => t.status === "in review" || t.status === "in progress").length}</p>
                    <div className="w-6 h-6 rounded-full border p-1 border-yellow-type">
                      <div className="w-full h-full rounded-full bg-yellow-type"></div>
                    </div>
                  </div>
                </Tooltip>
                <Tooltip placement="top" title={`${project.tasks.filter((t) => t.status === "to do").length} Tasks To Do`}>
                  <div className="flex items-center gap-2">
                    <p className="text-xl">{project.tasks.filter((t) => t.status === "to do").length}</p>
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
                  <p className="text-base font-medium">Mr.Poum is the Owner</p>
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

      <div className="w-[336px] ml-6 shrink-0">
        <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4">
          <div className="py-4 border-b border-solid border-[#f5f6fb] mb-3">
            {/* `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. */}
            <span className="font-semibold">Project&apos;s Statistics</span>
          </div>
          <div className="w-full flex gap-4 flex-col">
            <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-md border-b-2 border-solid border-bright-green">
              <div className="flex flex-col">
                <h1 className="font-medium uppercase">Completed Projects</h1>
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
                <h1 className="font-medium uppercase">Aborted Projects</h1>
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
            <span className="font-semibold">Recently Viewed Projects</span>
          </div>
          <div className="flex flex-col gap-3">
            {projects.slice(0, 3).map((p, index) => (
              <>
                <div key={index} className="flex flex-col py-1 px-3 small-black-border rounded-md">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{p.name}</p>
                    <span className="py-1 px-3 text-xs font-medium rounded-full border border-yellow-type uppercase text-yellow-type">{p.progress}</span>
                  </div>
                  <div className="flex items-center mt-1">
                    <img 
                      src={p.avatar}
                      className="w-6 h-6 rounded-full mr-3"
                      alt="project image"
                    />
                    <p className="text-sm">Poum is the creator</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <BiTask className="text-xl mr-2" />
                    <p className="text-sm mr-3 pr-3 border-r border-[#f5f6fb]">{p.tasks.length} Tasks</p>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <BsRecordCircle className="text-sm text-bright-green" />
                        <p className="text-sm">1</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsRecordCircle className="text-sm text-yellow-type" />
                        <p className="text-sm">1</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <BsRecordCircle className="text-sm text-45-gray" />
                        <p className="text-sm">1</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="pt-4 border-t border-solid border-[#f5f6fb] mt-3">
            <span className="font-semibold text-bright-green">View More...</span>
          </div>
        </div>
      </div>

      {/* Add a project modal */}
      <CreateProjectModal toggleCreateProjectModal={toggleCreateProjectModal} />
    </>
  );
};

export default TeamProjects;
