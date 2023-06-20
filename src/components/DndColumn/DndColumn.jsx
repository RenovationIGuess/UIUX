/* eslint-disable react/prop-types */
import { Draggable } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../../helpers/StrictModeDroppable";
import { Tooltip } from "antd";
import { IoMdInformationCircleOutline } from "react-icons/io";
import image from "../../constant/image";
import { BsThreeDots } from "react-icons/bs";
import "./DndColumn.scss"

const DndColumn = ({ droppableId, tasks, title }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-start ">
      <div className="flex flex-col justify-center items-center gap-3 mb-4">
        <p className="uppercase font-bold text-xl">{title}</p>
        <p className="font-bold text-45-gray text-xl">106</p>
      </div>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`p-4 flex flex-col gap-4 rounded-md w-full${
              snapshot.isDraggingOver ? " bg-bright-green" : " bg-[#F6F5F8]"
            }`}
          >
            {tasks?.length !== 0 ? (
              tasks.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="flex flex-col bg-white rounded-md shadow-lg px-4 py-2 relative max-w-[246px]"
                    >
                      <div className="flex items-center justify-between overflow-hidden mb-4">
                        <p className="font-semibold text-sm text-ellipsis overflow-hidden">
                          {item.name}
                        </p>
                        <BsThreeDots className="text-xl cursor-pointer hover:text-bright-green ml-4" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-45-gray font-medium">
                            {item.project}
                          </p>
                          <Tooltip placement="top" title={"Priority: High"}>
                            <IoMdInformationCircleOutline className="text-xl text-red-type" />
                          </Tooltip>
                        </div>
                        <div className="flex items-center gap-2">
                          <Tooltip
                            placement="top"
                            title={"Members Assigned: 9"}
                          >
                            <span className="px-2 py-1 bg-25-gray rounded-full text-xs font-semibold">
                              9
                            </span>
                          </Tooltip>
                          <Tooltip placement="top" title={"Creator: Mr.Poum"}>
                            <img
                              src={image.poum}
                              className="w-6 h-6 rounded-full"
                            />
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))
            ) : (
              <div className="w-full flex flex-col p-4">
                <div className="w-full flex flex-col items-center justify-center">
                  <img
                    className="w-[200px]"
                    src={image.nothing}
                    alt="nothing"
                  />
                  <p className="text-[#CDD4DF] text-sm text-center mt-2">
                    No tasks found
                  </p>
                </div>
              </div>
            )}
            <>{provided.placeholder}</>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DndColumn;
