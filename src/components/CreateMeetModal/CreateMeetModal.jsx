/* eslint-disable react/prop-types */

import { ColorPicker, DatePicker, Input, Select, Tooltip } from "antd";
import {
  AiFillClockCircle,
  AiOutlineClose,
  AiOutlineLink,
  AiOutlineTeam,
} from "react-icons/ai";
import image from "../../constant/image";
import { BsFillHouseAddFill, BsTextParagraph } from "react-icons/bs";
import { useMemo, useState } from "react";

const { RangePicker } = DatePicker;

const colorArray = [
  "#000000",
  "#000000E0",
  "#000000A6",
  "#00000073",
  "#00000040",
  "#00000026",
  "#0000001A",
  "#00000012",
  "#0000000A",
  "#00000005",
  "#F5222D",
  "#FA8C16",
  "#FADB14",
  "#8BBB11",
  "#52C41A",
  "#13A8A8",
  "#1677FF",
  "#2F54EB",
  "#722ED1",
  "#EB2F96",
  "#F5222D4D",
  "#FA8C164D",
  "#FADB144D",
  "#8BBB114D",
  "#52C41A4D",
  "#13A8A84D",
  "#1677FF4D",
  "#2F54EB4D",
  "#722ED14D",
  "#EB2F964D",
];

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
  // const { token } = theme.useToken();
  const [dateColor, setDateColor] = useState("#1677ff00");
  const [meetColor, setMeetColor] = useState("#1677ff00");

  const dateHexString = useMemo(
    () => (typeof dateColor === "string" ? dateColor : dateColor.toHexString()),
    [dateColor]
  );

  const meetHexString = useMemo(
    () => (typeof meetColor === "string" ? meetColor : meetColor.toHexString()),
    [meetColor]
  );

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
          <div className="flex flex-col mb-4">
            {/* <span className="py-2 px-4 bg-bright-green rounded-md mr-2 text-white font-medium">
              Event
            </span>
            <span className="py-2 px-4 font-medium text-45-gray">Discord</span> */}
            <div className="flex items-center">
              <p className="text-base font-medium mr-4">Date border color</p>
              <ColorPicker
                allowClear
                trigger="hover"
                value={dateHexString}
                onChange={setDateColor}
                className="mr-2"
                presets={[
                  {
                    label: "Recommended",
                    colors: colorArray,
                  },
                  {
                    label: "Recent",
                    colors: [],
                  },
                ]}
              />
              <p>{dateHexString}</p>
            </div>
            <div className="flex items-center mt-3">
              <p className="text-base font-medium mr-4">
                Meet background color
              </p>
              <ColorPicker
                allowClear
                trigger="hover"
                value={meetColor}
                onChange={setMeetColor}
                className="mr-2"
                presets={[
                  {
                    label: "Recommended",
                    colors: colorArray,
                  },
                  {
                    label: "Recent",
                    colors: [],
                  },
                ]}
              />
              <p>{meetHexString}</p>
            </div>
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
            <div className="flex items-center gap-3">
              <p className="font-medium">Repeat</p>
              <Tooltip placement="top" title="Enter number of durations">
                <Input placeholder="Enter a number" />
              </Tooltip>
              <Select
                showSearch
                placeholder="Select duration"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "Day",
                    label: "Day",
                  },
                  {
                    value: "Week",
                    label: "Week",
                  },
                  {
                    value: "Month",
                    label: "Month",
                  },
                  {
                    value: "Year",
                    label: "Year",
                  },
                ]}
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
          <p className="pl-10 font-medium text-bright-green mb-4 cursor-pointer">
            Find a timezone
          </p>
          <div className="w-full h-[1px] bg-light-gray mb-4"></div>
          <div className="flex flex-col mb-8">
            <div className="flex items-center gap-3 mb-3">
              <AiOutlineTeam className="text-2xl" />
              <Select
                // className="py-2 pl-4 pr-3"
                style={{ width: "100%" }}
                placeholder="Enter member's name"
                allowClear
                // value={teamUserName}
                // onChange={(e) => setTeamUserName(e.target.value)}
              />
            </div>
            <div className="pl-9 grid grid-cols-2 gap-4">
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
            <button
              onClick={() => toggleCreateMeetModal()}
              className="bg-[#9C9C9C] text-white text-sm py-2 px-4 rounded-md"
            >
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
