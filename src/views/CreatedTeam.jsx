import image from "../constant/image";
import "./styles/JoinedTeam.scss";
import { FaFilter, FaRegDotCircle } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { Input } from "antd";
import "./styles/JoinedTeam.scss";
import {
  AiOutlineArrowRight,
  AiOutlineSearch,
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineClose,
  AiOutlineLink,
  AiOutlineTeam,
} from "react-icons/ai";
import { useState } from "react";
import dummyData from "../constant/dummyData";

const CreatedTeam = () => {
  // Use for join team input modal
  const [teamName, setTeamName] = useState("");
  const [teamUserName, setTeamUserName] = useState("");
  const [createdTeam, setCreatedTeam] = useState(dummyData.dummyTeamsData);
  const [searchTeamValue, setSearchTeamValue] = useState('');

  const handleCreateTeamModal = () => {
    const modalElement = document.querySelector(".modal-background");
    modalElement.classList.toggle("modal-hidden");
  };

  return (
    <>
      <div className="joined-team-container">
        <div className="flex justify-center items-start max-w-[1208px]">
          <div className="flex-1 w-[848px] rounded-2xl flex flex-col">
            <div className="flex items-center justify-between w-full mb-4">
              <h1 className="text-3xl font-bold">Created Teams</h1>
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
                      value={searchTeamValue}
                      onChange={(e) => {
                        setSearchTeamValue(e.target.value);
                        setCreatedTeam(
                          dummyData.dummyTeamsData.filter((t) =>
                            t.name.includes(e.target.value)
                          )
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                {createdTeam.map((t, index) => (
                  <>
                    <div className="joined-team-item" key={index}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <Link to="/team/1/your-stats" className="text-2xl hover:text-bright-green font-medium">
                            {t.name}
                          </Link>
                          <div className="flex items-center gap-4">
                            <img
                              className="w-9 h-9 rounded-full"
                              src={t.creator.image}
                              alt="kururin"
                            />
                            <p className="text-base font-medium">
                              {t.creator.name} is the Owner
                            </p>
                          </div>
                        </div>
                        <button className="flex items-center justify-center py-2 px-4 rounded-md bg-bright-green text-white hover:bg-less-bright-green">
                          <Link to={`/team/${t.id}/dashboard`}>View Details</Link>
                        </button>
                      </div>
                      <div className="w-full flex items-center mt-3 whitespace-nowrap">
                        <div className="flex relative">
                          {t.members.map((m, mIndex) => {
                            if (mIndex <= 2) {
                              return (
                                <img
                                  key={mIndex}
                                  src={m.image}
                                  data-index={m.id}
                                  className="w-8 h-8 rounded-full"
                                  style={{ transform: `translateX(${mIndex*(-50)}%)` }}
                                />
                              )
                            }
                          })}
                        </div>
                        <p
                          className="text-bsae font-medium"
                          style={{ marginLeft: t.members.length >= 3 ? "-12px" : t.members.length === 1 ? "1rem" : "0px" }}
                        >
                          {t.members.length} members
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
                  </>
                ))}
              </div>

              {/* Navigator */}
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
          </div>
          <div className="w-[336px] ml-6 shrink-0">
            <button
              onClick={() => handleCreateTeamModal()}
              className="w-full py-2 flex items-center justify-center rounded-full bg-bright-green text-white hover:bg-less-bright-green"
            >
              <div className="flex items-center">
                <p className="text-base mr-2">Create a team</p>
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
                  className="flex items-center justify-between px-3 py-1 rounded-md hover:bg-bright-green hover:text-white"
                >
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <h1 className="text-sm font-medium mb-2">
                        Astral Express
                      </h1>
                      <div className="flex items-center">
                        <img
                          src={image.poum}
                          alt="team-ava"
                          className="w-[20px] h-[20px] rounded-full mr-3"
                        />
                        <p className="text-xs font-medium">
                          Mr.Poum is the owner
                        </p>
                      </div>
                    </div>
                  </div>
                  <AiOutlineArrowRight className="text-2xl" />
                </Link>
              </div>
            </div>
            <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4 mt-4">
              <div className="py-4 border-b border-solid border-[#f5f6fb] mb-3">
                <span className="font-semibold">Teams that you have events today</span>
              </div>
              <div className="w-full flex flex-col items-center justify-center">
                <img className="w-[200px]" src={image.nothing} alt="nothing" />
                <p className="text-[#CDD4DF] text-sm text-center mb-2">
                  No teams found
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Created Team Modal */}
      <div className="modal-background modal-hidden">
        <div className="modal-container">
          <div className="modal-header">
            <p className="text-base font-semibold">Create Team</p>
            <AiOutlineClose
              onClick={() => handleCreateTeamModal()}
              className="text-2xl hover:text-bright-green cursor-pointer"
            />
          </div>
          <div className="modal-body">
            <div className="flex flex-col gap-3 mb-4">
              <p className="text-sm font-medium">Team&apos;s Name</p>
              <Input
                className="py-2 pl-4 pr-3"
                placeholder="Enter team's name"
                allowClear
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
            </div>
            <div className="flex flex-col mb-4">
              <div className="flex items-center gap-3 mb-3">
                <AiOutlineTeam className="text-2xl" />
                <Input
                  className="py-2 pl-4 pr-3"
                  placeholder="Enter team's name"
                  allowClear
                  value={teamUserName}
                  onChange={(e) => setTeamUserName(e.target.value)}
                />
              </div>
              <div className="pl-9 flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-9 h-9 rounded-full"
                      src={image.poum}
                      alt
                    />
                    <div className="flex flex-col gap-1">
                      <p className="text-base font-medium">Mr.Poum</p>
                      <p className="text-xs text-dark-gray">Project Manager</p>
                    </div>
                  </div>
                  <AiOutlineClose className="text-xl" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <AiOutlineLink className="text-2xl" />
              <Input
                className="py-2 pl-4 pr-3"
                value={"https://localhost:3000"}
                disabled
              />
            </div>
          </div>
          <div className="modal-footer">
            <div className="flex gap-3 items-center">
              <button className="bg-[#9C9C9C] text-white text-sm py-2 px-4 rounded-md">
                Cancel
              </button>
              <button className="bg-bright-green text-white text-sm py-2 px-4 rounded-md">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatedTeam;
