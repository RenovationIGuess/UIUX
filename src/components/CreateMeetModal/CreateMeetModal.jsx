/* eslint-disable react/prop-types */

import { DatePicker, Input, Select } from "antd";
import { AiFillClockCircle, AiOutlineClose, AiOutlineLink, AiOutlineTeam } from "react-icons/ai";
import image from "../../constant/image";
import { BsFillHouseAddFill, BsTextParagraph } from "react-icons/bs";

const { RangePicker } = DatePicker;

const CreateMeetModal = ({
  meetInfo,
  setMeetInfo,
  toggleCreateMeetModal,
  onChange,
  onSearch,
  priorityItems,
  disabledDate,
  disabledRangeTime,
  setDatePickerValue,
  datePickerValue,
  dayjs,
  toast,
  handleCreateMeet,
}) => {
  return (
    <div className="create-meet-modal modal-background modal-hidden">
      <div className="modal-container">
        <div className="modal-header">
          <p className="text-base font-semibold">Create Meeting</p>
          <AiOutlineClose
            onClick={() => toggleCreateMeetModal()}
            className="text-2xl hover:text-bright-green cursor-pointer"
          />
        </div>
        <div className="modal-body">
          <div className="flex flex-col mb-4">
            <p className="font-medium mb-2">Meeting title</p>
            <Input
              placeholder="Enter meeting title"
              allowClear
              className="py-1 px-4 text-base"
              value={meetInfo.title}
              onChange={(e) =>
                setMeetInfo({ ...meetInfo, title: e.target.value })
              }
            />
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
              <Select
                showSearch
                placeholder="Select priority"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={priorityItems}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 mb-3">
            <AiFillClockCircle className="text-45-gray text-2xl" />
            <div className="flex flex-col">
              <p className="text-85-gray font-medium">Pick date & time</p>
              <RangePicker
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [
                    dayjs("00:00:00", "HH:mm:ss"),
                    dayjs("11:59:59", "HH:mm:ss"),
                  ],
                }}
                onChange={(e) => {
                  setDatePickerValue(e);
                }}
                value={datePickerValue}
                format="YYYY-MM-DD HH:mm:ss"
              />
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
                  <img
                    className="w-9 h-9 rounded-full"
                    src={image.poum}
                    alt="user-ava"
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
        <div className="modal-footer">
          <div className="flex gap-3 items-center">
            <button className="bg-[#9C9C9C] text-white text-sm py-2 px-4 rounded-md">
              Cancel
            </button>
            <button
              onClick={() => {
                toast("Created Successful!");
                handleCreateMeet();
              }}
              className="bg-bright-green text-white text-sm py-2 px-4 rounded-md"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMeetModal;
