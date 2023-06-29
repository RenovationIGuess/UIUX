import {
  AiFillCalendar,
  AiOutlineArrowRight,
  AiOutlineSearch,
} from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import image from "../constant/image";
import { Link } from "react-router-dom";
import PaginateFooter from "../components/PaginateFooter/PaginateFooter";
import { BiTask } from "react-icons/bi";
import { GrNotes } from "react-icons/gr";
import { useState } from "react";
import dummyData from "../constant/dummyData";

const CalendarList = () => {
  const [Workspaces, setWorkspaces] = useState(dummyData.dummyWorkspacesData);

  return (
    <>
      <div className="joined-team-container">
        <div className="flex justify-center items-start max-w-[1208px]">
          <div className="flex-1 w-[848px] rounded-2xl flex flex-col">
            <div className="flex items-center justify-between w-full mb-4">
              <h1 className="text-3xl font-bold">Your Workspaces</h1>
            </div>
            <div className="flex-1 w-full rounded-xl bg-white px-4">
              <div className="flex items-center justify-end py-4 border-b border-solid border-[#f5f6fb] mb-4">
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
                </div>
              </div>
              <div className="flex flex-col">
                {Workspaces.map((w, index) => (
                  <>
                    <div key={index} className="joined-team-item">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <h1 className="text-2xl font-medium">{w.name}</h1>
                        </div>
                        <div className="flex items-center gap-3">
                          <Link
                            to="/calendar/1"
                            className="flex items-center justify-center py-1 px-3 rounded-md bg-bright-green text-white hover:bg-less-bright-green"
                          >
                            <span>View Details</span>
                          </Link>
                          <button className="flex items-center justify-center py-1 px-3 rounded-md bg-red-type text-white">
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center mt-4 justify-between w-full">
                        <div className="flex items-center gap-4">
                          <BiTask className="text-2xl" />
                          <p>100k Tasks</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <AiFillCalendar className="text-2xl text-85-gray" />
                          <p>100k Meets</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <GrNotes className="text-2xl text-[#FF5D6C]" />
                          <p>100k Notes</p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <PaginateFooter />
            </div>
          </div>

          <div className="w-[336px] ml-6 shrink-0">
            <button
              // onClick={() => handleJoindedTeamModal()}
              className="w-full py-2 flex items-center justify-center rounded-full bg-bright-green text-white hover:bg-less-bright-green"
            >
              <div className="flex items-center">
                <p className="text-base mr-2">Create a Workspaces</p>
                <AiOutlineArrowRight className="text-xl" />
              </div>
            </button>
            <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4 mt-4">
              <div className="py-4 border-b border-solid border-[#f5f6fb] mb-3">
                <span className="font-semibold">Recently View</span>
              </div>
              <div className="w-full flex flex-col">
                <Link
                  to="/team/1/dashboard"
                  className="flex items-center justify-between px-3 pt-1 pb-2 rounded-md hover:bg-bright-green hover:text-white"
                >
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <h1 className="text-sm font-medium mb-2">
                        Astral Express
                      </h1>
                      <div className="flex items-center">
                        <div className="flex items-center gap-2 mr-3">
                          <BiTask className="text-lg" />
                          <p className="text-sm font-medium">100</p>
                        </div>
                        <div className="flex items-center gap-2 mr-3">
                          <AiFillCalendar className="text-lg" />
                          <p className="text-sm font-medium">100</p>
                        </div>
                        <div className="flex items-center gap-2 mr-3">
                          <GrNotes className="text-lg" />
                          <p className="text-sm font-medium">100</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <AiOutlineArrowRight className="text-2xl" />
                </Link>
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
        </div>
      </div>
    </>
  );
};

export default CalendarList;
