import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import image from "../constant/image";
import { FaFilter, FaRegDotCircle } from "react-icons/fa";
import { BiChevronsDown } from "react-icons/bi";

const TeamTaskDetail = () => {
  return (
    <>
      <div className="w-full flex flex-col bg-white py-2 px-4 rounded-xl">
        <div className="flex items-center justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
          <p className="uppercase font-semibold text-base">Tasks</p>
          <div className="flex items-center">
            <div className="p-2 bg-bright-green rounded-full mr-3 cursor-pointer hover:bg-less-bright-green">
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

        <div className="flex flex-col">
          <div className="joined-team-item">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <h1 className="text-2xl font-medium">Astral Express</h1>
                <div className="flex items-center gap-4">
                  <img
                    className="w-9 h-9 rounded-full"
                    src={image.poum}
                    alt="kururin"
                  />
                  <p className="text-base font-medium">Mr.Poum is the Owner</p>
                </div>
              </div>
              <button className="flex items-center justify-center py-2 px-4 rounded-md bg-bright-green text-white hover:bg-less-bright-green">
                View Details
              </button>
            </div>
            <div className="w-full flex items-center mt-3 whitespace-nowrap">
              <div className="flex relative">
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
                100k members
              </p>
            </div>
            <div className="flex items-center mt-4 justify-between w-full">
              <div className="flex items-center gap-4">
                <FaRegDotCircle className="text-2xl" />
                <p>100k Tasks Assigned</p>
              </div>
              <div className="flex items-center gap-4">
                <AiFillCheckCircle className="text-2xl text-bright-green" />
                <p>100k Tasks Completed</p>
              </div>
              <div className="flex items-center gap-4">
                <AiFillCloseCircle className="text-2xl text-[#FF5D6C]" />
                <p>100k Tasks Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamTaskDetail;
