/* eslint-disable react/prop-types */
import {
  AiFillClockCircle,
  AiFillEdit,
  AiOutlineClose,
  AiOutlineLink,
  AiOutlineTeam,
} from "react-icons/ai";
import image from "../../constant/image";
import { ColorPicker, DatePicker, Input, Modal, Select, Tooltip } from "antd";
import { BsFillHouseAddFill, BsTextParagraph } from "react-icons/bs";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import dayjs from "dayjs";

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

const MeetDetail = ({ 
  setMeetDetailOpen, 
  // setMeetDetailOpen2, 
  event 
}) => {
  const [editState, setEditState] = useState(false);
  const [dateColor, setDateColor] = useState("#1677ff00");
  const [meetColor, setMeetColor] = useState("#1677ff00");
  const [modalOpen, setModalOpen] = useState(false);

  const dateHexString = useMemo(
    () => (typeof dateColor === "string" ? dateColor : dateColor.toHexString()),
    [dateColor]
  );

  const meetHexString = useMemo(
    () => (typeof meetColor === "string" ? meetColor : meetColor.toHexString()),
    [meetColor]
  );

  return (
    <>
      {!editState ? (
        <div className="meet-detail-modal modal-background">
          <div className="modal-container">
            <div className="modal-header">
              <p className="text-base font-semibold">Meet&apos;s Detail</p>
              <AiOutlineClose
                onClick={() => {
                  setMeetDetailOpen(false);
                  // setMeetDetailOpen2(false);
                }}
                className="text-2xl hover:text-bright-green cursor-pointer"
              />
            </div>
            <div className="modal-body">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-medium">
                  {event.title || event.name}
                </h1>
                <Tooltip placement="top" title="Edit">
                  <AiFillEdit
                    onClick={() => setEditState(!editState)}
                    className="icon-style"
                  />
                </Tooltip>
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex items-center">
                  <p className="text-base font-medium mr-4">
                    Date border color
                  </p>
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
                  <span
                    className={`rounded-full py-1 px-4 text-sm border uppercase ${
                      event.priority === "high"
                        ? "border-red-type text-red-type"
                        : event.priority === "medium"
                        ? "border-yellow-type text-yellow-type"
                        : "border-bright-green text-bright-green"
                    }`}
                  >
                    {event.priority}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-medium">Status</p>
                  <span
                    className={`rounded-full py-1 px-4 text-sm border uppercase ${
                      event.status === "done"
                        ? "border-bright-green text-bright-green"
                        : event.status === "to do"
                        ? "border-45-gray text-45-gray"
                        : "border-yellow-type text-yellow-type"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <img
                  className="w-9 h-9 rounded-full mr-4"
                  src={event.creator.image}
                  alt="creator-avatar"
                />
                <div className="flex flex-col">
                  <p>
                    <span className="font-medium">{event.creator.name}</span>
                    &nbsp;is the creator
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
                    {/* <p className="font-medium">Tuesday, January 21</p> */}
                    <p className="font-medium">
                      {dayjs(event.start).format("YYYY-MM-DD HH:mm")}
                      &nbsp;-&nbsp;
                      {dayjs(event.end).format("YYYY-MM-DD HH:mm")}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-45-gray">
                    Time zone - Vietnam
                  </span>
                </div>
              </div>
              <p className="pl-10 font-medium text-bright-green mb-4">
                Repeat 7 days
              </p>
              <div className="w-full h-[1px] bg-light-gray mb-4"></div>
              <div className="flex flex-col mb-8">
                <div className="flex items-start gap-4 mb-3">
                  <AiOutlineTeam className="text-2xl" />
                  <div className="grid grid-cols-3 gap-4">
                    {event.members.length === 0 ? (
                      <>
                        <p className="">No members assigned</p>
                      </>
                    ) : (
                      event.members.map((m, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <img
                            className="w-9 h-9 rounded-full"
                            src={m.image}
                            alt="mem-ava"
                          />
                          <div className="flex flex-col gap-1">
                            <p className="text-base font-medium">{m.name}</p>
                            <p className="text-xs text-dark-gray">
                              Project Manager
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <BsFillHouseAddFill className="text-2xl text-45-gray" />
                <p className="text-45-gray font-medium">
                  Add rooms or locations
                </p>
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
      ) : (
        <div className="meet-detail-modal modal-background">
          <div className="modal-container">
            <div className="modal-header">
              <p className="text-base font-semibold">Edit Meeting</p>
              <AiOutlineClose
                onClick={() => {
                  setMeetDetailOpen(false);
                  // setMeetDetailOpen2(false);
                }}
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
                />
              </div>
              <div className="flex flex-col mb-4">
                <div className="flex items-center">
                  <p className="text-base font-medium mr-4">
                    Date border color
                  </p>
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
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={[
                      {
                        label: "Low",
                        value: "Low",
                      },
                      {
                        label: "Medium",
                        value: "Medium",
                      },
                      {
                        label: "High",
                        value: "High",
                      },
                    ]}
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
                  <p className="text-85-gray font-medium mb-2">
                    Pick date & time
                  </p>
                  <RangePicker
                    showTime={{
                      hideDisabledOptions: true,
                      defaultValue: [dayjs(event.start), dayjs(event.end)],
                    }}
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
                        <p className="text-xs text-dark-gray">
                          Project Manager
                        </p>
                      </div>
                    </div>
                    <AiOutlineClose className="text-xl" />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <BsFillHouseAddFill className="text-2xl text-45-gray" />
                <p className="text-45-gray font-medium">
                  Add rooms or locations
                </p>
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
                  onClick={() => setModalOpen(true)}
                  className="bg-[#9C9C9C] text-white text-sm py-2 px-4 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    toast("Edit Successful!");
                    // handleCreateMeet();
                  }}
                  className="bg-bright-green text-white text-sm py-2 px-4 rounded-md"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        title="Confirm Modal"
        centered
        open={modalOpen}
        onOk={() => {
          setModalOpen(false);
          setEditState(false);
        }}
        onCancel={() => {
          setModalOpen(false);
          setEditState(false);
        }}
      >
        <p>Are you sure to quit edit</p>
      </Modal>
    </>
  );
};

export default MeetDetail;
