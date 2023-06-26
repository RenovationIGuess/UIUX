/* eslint-disable react/prop-types */
import { AiFillClockCircle, AiFillEdit, AiOutlineClose, AiOutlineLink, AiOutlineTeam } from "react-icons/ai";
import image from "../../constant/image";
import { Input } from "antd";
import { BsFillHouseAddFill, BsTextParagraph } from "react-icons/bs";

const MeetDetail = ({ toggleMeetDetailModal }) => {
  return (
    <div className="modal-background modal-hidden">
      <div className="modal-container">
        <div className="modal-header">
          <p className="text-base font-semibold">Meet&apos;s Detail</p>
          <AiOutlineClose
            onClick={() => toggleMeetDetailModal()}
            className="text-2xl hover:text-bright-green cursor-pointer"
          />
        </div>
        <div className="modal-body">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-medium">Meeting with the Rock!!!</h1>
            <AiFillEdit className="text-2xl" />
          </div>
          <div className="flex items-center mb-4">
            <span className="py-2 px-4 bg-bright-green rounded-md mr-2 text-white font-medium">
              Event
            </span>
            <span className="py-2 px-4 font-medium text-45-gray">Discord</span>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <p className="font-medium">Priority</p>
              <span className="rounded-full py-1 px-4 text-sm text-red-type border border-solid border-red-type uppercase">
                High
              </span>
            </div>
            <div className="flex items-center gap-3">
              <p className="font-medium">Status</p>
              <span className="rounded-full py-1 px-4 text-sm text-bright-green border border-solid border-bright-green uppercase">
                Done
              </span>
            </div>
          </div>
          <div className="flex items-center mb-4">
            <img
              className="w-9 h-9 rounded-full mr-4"
              src={image.poum}
              alt="creator-avatar"
            />
            <div className="flex flex-col">
              <p>
                <span className="font-medium">Mr.Poum</span>&nbsp;is the creator
              </p>
              <p className="font-semibold text-sm text-45-gray">
                Project Manager
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <AiFillClockCircle className="text-45-gray text-2xl" />
            <div className="flex flex-col">
              <div className="flex items-center gap-6 mb-1">
                <p className="font-medium">Tuesday, January 21</p>
                <p className="font-medium">9:00 PM - 4:00 AM</p>
              </div>
              <span className="text-sm font-medium text-45-gray">
                Time zone - Vietnam
              </span>
            </div>
          </div>
          <p className="pl-10 font-medium text-blue-type mb-4">Find a time</p>
          <div className="w-full h-[1px] bg-light-gray mb-4"></div>
          <div className="flex flex-col mb-8">
            <div className="flex items-center gap-3 mb-3">
              <AiOutlineTeam className="text-2xl" />
              <Input
                className="py-2 pl-4 pr-3"
                placeholder="Enter team's name"
                allowClear
                // value={teamUserName}
                // onChange={(e) => setTeamUserName(e.target.value)}
              />
            </div>
            <div className="pl-9 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img className="w-9 h-9 rounded-full" src={image.poum} alt />
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-medium">Mr.Poum</p>
                    <p className="text-xs text-dark-gray">Project Manager</p>
                  </div>
                </div>
                <AiOutlineClose className="text-xl" />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <BsFillHouseAddFill className="text-2xl text-45-gray" />
            <p className="text-45-gray font-medium">Add rooms or locations</p>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <AiOutlineLink className="text-2xl text-45-gray" />
            <p className="text-45-gray font-medium">Add meeting links</p>
          </div>
          <div className="flex items-center gap-4">
            <BsTextParagraph className="text-2xl text-45-gray" />
            <p className="text-45-gray font-medium">
              Add attachments or description
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetDetail;
