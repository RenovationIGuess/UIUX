import { Modal, Progress, Tooltip } from "antd";
import PropTypes from "prop-types";
import { AiFillCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useState } from "react";
import { toast } from "react-toastify";

// Used to display for list view
const TaskItem = ({ task }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Are you sure you want to delete");

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
      toast("Delete Successfully!");
    }, 1000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <div className="joined-team-item">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              to="/team/1/tasks/1"
              className="text-2xl font-medium hover:text-bright-green"
            >
              {task.name}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to={`/team/1/tasks/${task.id}`}
              className="flex items-center justify-center py-2 px-4 rounded-md bg-bright-green text-white hover:bg-less-bright-green"
            >
              <span>View Details</span>
            </Link>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showModal();
              }}
              className="flex items-center justify-center py-2 px-4 rounded-md bg-red-type text-white"
            >
              <span>Delete</span>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <Tooltip placement="top" title={"Project Name"}>
              <span className="py-1 px-4 font-medium border border-solid border-45-gray rounded-full text-45-gray">
                {task.project.name}
              </span>
            </Tooltip>
            <Tooltip placement="top" title={"Priority"}>
              <span
                className={`py-1 px-4 font-medium border border-solid 
              ${
                task.priority === "high"
                  ? "border-red-type rounded-full text-red-type"
                  : task.priority === "medium"
                  ? "border-yellow-type rounded-full text-yellow-type"
                  : "border-bright-green rounded-full text-bright-green"
              } uppercase`}
              >
                {task.priority}
              </span>
            </Tooltip>
            <Tooltip placement="top" title={"Type"}>
              <span
                className={`py-1 px-4 font-medium border border-solid uppercase
          ${
            task.status === "aborted"
              ? "border-red-type rounded-full text-red-type"
              : task.status === "done"
              ? "border-bright-green rounded-full text-bright-green"
              : task.status === "to do"
              ? "border-45-gray rounded-full text-45-gray"
              : "border-yellow-type rounded-full text-yellow-type"
          }`}
              >
                {task.status}
              </span>
            </Tooltip>
          </div>
          <div className="flex items-center gap-2 text-85-gray">
            <p>
              {dayjs(task.start).format("YYYY-MM-DD HH:mm")}&nbsp;-&nbsp;
              {dayjs(task.end).format("YYYY-MM-DD HH:mm")}
            </p>
            <AiFillCalendar className="text-2xl" />
          </div>
        </div>
        <div className="flex items-center mt-4 justify-between w-full">
          <div className="flex items-center gap-4 whitespace-nowrap">
            <img
              className="w-9 h-9 rounded-full"
              src={task.creator.image}
              alt="kururin"
            />
            <p className="text-base font-medium">
              {task.creator.name} is the Creator
            </p>
            <Progress style={{ width: 150 }} percent={task.completion} />
          </div>
          <div className="flex items-center mt-3 whitespace-nowrap">
            <div className="flex items-center relative">
              <img
                src={task.assignee[0].image}
                data-index="1"
                className="w-8 h-8 rounded-full"
              />
              <img
                src={task.supporter[0].image}
                data-index="1"
                className="w-8 h-8 rounded-full"
                style={{ transform: "translateX(-50%)" }}
              />
              <img
                src={task.reviewer[0].image}
                data-index="1"
                className="w-8 h-8 rounded-full"
                style={{ transform: "translateX(-100%)" }}
              />
            </div>
            <p
              className="text-bsae font-medium"
              style={{ marginLeft: "-12px" }}
            >
              {task.assignee.length +
                task.supporter.length +
                task.reviewer.length}{" "}
              members assigned
            </p>
          </div>
        </div>
      </div>

      <Modal
        title="Delete Task"
        centered
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object,
};

export default TaskItem;
