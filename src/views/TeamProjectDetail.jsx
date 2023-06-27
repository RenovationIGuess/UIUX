import "./styles/TeamDetail.scss";
import image from "../constant/image";
import { BiChevronsDown, BiRightArrow } from "react-icons/bi";
import { IoIosArrowUp } from "react-icons/io";
import { Progress, Tooltip } from "antd";
import { AiOutlineClose } from "react-icons/ai";

import { TiArrowSortedDown } from "react-icons/ti";
import { Link } from "react-router-dom";

const navigate = [
  {
    link: "/team/1/project/dashboard",
    title: "Dashboard",
  },
  {
    link: "/team/1/project/meetings",
    title: "meetings",
  },
  {
    link: "/team/1/project/members",
    title: "members",
  },
  {
    link: "/team/1/project/tasks",
    title: "tasks",
  },
  {
    link: "/team/1/project/your-stats",
    title: "your stats",
  },
];

const TeamProjectDetail = () => {
  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className="w-full flex flex-col bg-white pt-2 pb-3 px-4 rounded-xl">
          <div className="flex items-start gap-4">
            <img src={image.poum} className="w-[60px] h-[60px] rounded-full" />
            <div className="flex flex-1 flex-col">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-solid border-[#f5f6fb]">
                <div className="flex flex-col">
                  <p className="font-semibold text-xl">Mr.Poum</p>
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
                    <Link
                      key={index}
                      to={item.link}
                      className="uppercase font-bold hover:text-bright-green cursor-pointer"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
                <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
              </div>
              <div className="flex my-4 flex-col pl-4 border-l border-solid border-[#f5f6fb]">
                <h2 className="font-medium italic">Description</h2>
                <p className="text-sm mt-3">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col bg-white py-2 px-4 mt-4 rounded-xl">
          <div className="flex items-center justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
            <p className="uppercase font-semibold text-base">Tasks</p>
            <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-lg border-b-2 border-solid border-bright-green">
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
            <div className="flex-1 flex items-center justify-between p-2 rounded-md shadow-lg border-b-2 border-solid border-[#D91212]">
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
            <button className="flex items-center justify-center py-2 px-4 text-sm bg-bright-green text-white hover:bg-less-bright-green cursor-pointer rounded-md">
              View Detail
            </button>
          </div>
        </div>
        <div className="w-full flex flex-col bg-white p-4 rounded-xl mt-4 transition">
          

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
      <div className="modal-background modal-hidden">
        <div className="modal-container">
          <div className="modal-header">
            <p className="text-base font-semibold">Task&apos;s Detail</p>
            <AiOutlineClose className="text-2xl hover:text-bright-green cursor-pointer" />
          </div>
          <div className="modal-body"></div>
        </div>
      </div>
    </>
  );
};

export default TeamProjectDetail;
