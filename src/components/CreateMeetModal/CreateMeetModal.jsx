/* eslint-disable react/prop-types */

import { ColorPicker, DatePicker, Input, Select, Tooltip } from "antd";
import {
  AiFillClockCircle,
  AiOutlineClose,
  AiOutlineLink,
  AiOutlineTeam,
} from "react-icons/ai";
import { BsFillHouseAddFill, BsTextParagraph } from "react-icons/bs";
import { useMemo, useState } from "react";
import { KrdStateContext } from "../../contexts/ContextProvider";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import image from "../../constant/image";

const { RangePicker } = DatePicker;

// const range = (start, end) => {
//   const result = [];
//   for (let i = start; i < end; i++) {
//     result.push(i);
//   }
//   return result;
// };

// eslint-disable-next-line arrow-body-style
// const disabledDate = (current) => {
//   // Can not select days before today and today
//   return current && current < dayjs().endOf("day");
// };

// const disabledRangeTime = (_, type) => {
//   if (type === "start") {
//     return {
//       disabledHours: () => range(0, 60).splice(4, 20),
//       disabledMinutes: () => range(30, 60),
//       disabledSeconds: () => [55, 56],
//     };
//   }
//   return {
//     disabledHours: () => range(0, 60).splice(20, 4),
//     disabledMinutes: () => range(0, 31),
//     disabledSeconds: () => [55, 56],
//   };
// };

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

const priorityItems = [
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
];

const CreateMeetModal = ({
  start,
  end,
  setMyEvents,
  setCreateMeetOpen,
  // setCreateMeetOpen2,
}) => {
  const { users } = KrdStateContext();

  const [meetInfo, setMeetInfo] = useState({
    title: "",
    type: "Event",
    priority: "Low",
    members: [],
    start: "",
    end: "",
    links: "",
    // attachments: [],
  });

  const [datePickerValue, setDatePickerValue] = useState([
    dayjs(start),
    dayjs(end),
  ]);

  const [selectedMembers, setSelectedMembers] = useState([]);

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

  const handleCreateMeet = () => {
    // toggleCreateMeetModal();
    toast("Created Successful!");

    setMyEvents((prev) => [
      ...prev,
      {
        ...meetInfo,
        start: datePickerValue[0].toDate(),
        end: datePickerValue[1].toDate(),
        creator: {
          name: "Mr.Poum",
          image: image.poum,
        },
        members: selectedMembers.length
          ? selectedMembers.map((m) => {
              const index = users.findIndex((u) => u.name === m);
              return {
                name: users[index].name,
                image: users[index].image,
              };
            })
          : [],
      },
    ]);

    setCreateMeetOpen(false);
    // setCreateMeetOpen2(false);
  };

  // const toggleCreateMeetModal = () => {
  //   const modalElement = document.querySelector(".create-meet-modal");
  //   modalElement.classList.toggle("modal-hidden");
  // };

  const onPriorityChange = (value) => {
    setMeetInfo({ ...meetInfo, priority: value });
  };

  return (
    <div className="create-meet-modal modal-background">
      <div className="modal-container">
        <div className="modal-header">
          <p className="text-base font-semibold">Create Meeting</p>
          <AiOutlineClose
            onClick={() => {
              // toggleCreateMeetModal()
              setCreateMeetOpen(false);
              // setCreateMeetOpen2(false);
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
              value={meetInfo.title}
              onChange={(e) =>
                setMeetInfo({ ...meetInfo, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col mb-4">
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
                onChange={onPriorityChange}
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
              <p className="text-85-gray font-medium mb-2">Pick Date & Time</p>
              <RangePicker
                // disabledDate={disabledDate}
                // disabledTime={disabledRangeTime}
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [start, end],
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
          <div className="flex flex-col mb-6">
            <div className="flex items-center gap-3 mb-3">
              <AiOutlineTeam className="text-2xl" />
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Enter member's name"
                allowClear
                options={users.map((u) => {
                  return {
                    value: u.name,
                    label: u.name,
                  };
                })}
                value={selectedMembers}
                onChange={setSelectedMembers}
              />
            </div>
            <div className="pl-9 grid grid-cols-2 gap-4">
              {selectedMembers.length !== 0 &&
                selectedMembers.map((m, i) => {
                  const index = users.findIndex((u) => u.name === m);
                  return (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          className="w-9 h-9 rounded-full"
                          src={users[index].image}
                          alt="user-ava"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-medium">
                            {users[index].name}
                          </p>
                          <p className="text-xs text-dark-gray">
                            Project Manager
                          </p>
                        </div>
                      </div>
                      <AiOutlineClose
                        onClick={() =>
                          setSelectedMembers(
                            selectedMembers.filter((mem) => mem !== m)
                          )
                        }
                        className="text-xl cursor-pointer"
                      />
                    </div>
                  );
                })}
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
              onClick={() => {
                // toggleCreateMeetModal()
                setCreateMeetOpen(false);
                // setCreateMeetOpen2(false);
              }}
              className="bg-[#9C9C9C] text-white text-sm py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => {
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
