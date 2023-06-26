/* eslint-disable react/prop-types */
import { BsThreeDots } from "react-icons/bs";
import image from "../../constant/image";
import { Tooltip } from "antd";

const TimelineComponent = ({
  name,
  status,
  priority,
  time,
  handleTaskModal,
}) => {
  return (
    <div className="flex flex-col" onClick={() => handleTaskModal()}>
      <div className="w-full h-[1px] mb-2 bg-45-gray"></div>
      <div className="rounded-xl bg-white flex-col flex border border-solid border-black py-2 px-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-base font-semibold">{name}</p>
          <BsThreeDots className="text-2xl" />
        </div>
        <div className="flex items-center gap-4">
          <img
            src={image.poum}
            alt="creator-avatar"
            className="w-8 h-8 rounded-full"
          />
          <p className="text-45-gray text-sm font-bold uppercase">{time}</p>
          <div className="flex items-center gap-2">
            <Tooltip title={"Priority"} placement="top">
              <span className="uppercase text-sm py-1 px-4 border border-solid border-red-type text-red-type rounded-full">
                {priority}
              </span>
            </Tooltip>
            <Tooltip title={"Status"} placement="top">
              <span className="uppercase text-sm py-1 px-4 border border-solid border-yellow-type text-yellow-type rounded-full">
                {status}
              </span>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineComponent;
