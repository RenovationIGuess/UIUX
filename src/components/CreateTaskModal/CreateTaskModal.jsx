/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Input, Select, DatePicker } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import image from "../../constant/image";
import PropTypes from "prop-types";
import { useState } from "react";
import dayjs from "dayjs";
import { KrdStateContext } from "../../contexts/ContextProvider";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const CreateTaskModal = ({
  start,
  end,
  setMyTasks,
  setCreateTaskOpen,
  // setCreateTaskOpen2,
}) => {
  const { users, projects } = KrdStateContext();

  const [taskInfo, setTaskInfo] = useState({
    name: "",
    priority: "Low",
    status: "to do",
    completion: 0,
    start: dayjs(start),
    end: dayjs(end),
    assignee: [],
    supporter: [],
    reviewer: [],
    project: "",
  });

  const handleCreateTask = () => {
    toast("Created Successful!");
    setMyTasks((prev) => [
      ...prev,
      {
        ...taskInfo,
        creator: {
          name: "Mr.Poumy",
          image: image.poum,
        },
      },
    ]);
    setCreateTaskOpen(false);
    // setCreateTaskOpen2(false);
  };

  return (
    <div className="create-task-modal modal-background">
      <div className="modal-container">
        <div className="modal-header">
          <p className="text-base font-semibold">Create Task</p>
          <AiOutlineClose
            onClick={() => {
              setCreateTaskOpen(false);
              // setCreateTaskOpen2(false);
            }}
            className="text-2xl hover:text-bright-green cursor-pointer"
          />
        </div>
        <div className="modal-body">
          <div className="flex flex-col">
            <div className="flex flex-col mb-6">
              <p className="font-medium mb-2">Choose Project</p>
              <Select
                showSearch
                allowClear
                // mode="multiple"
                style={{ width: "100%" }}
                placeholder="Choose or search project"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                value={taskInfo.project}
                onChange={(value) =>
                  setTaskInfo({ ...taskInfo, project: value })
                }
                options={projects.map((p) => {
                  return {
                    value: p.name,
                    label: p.name,
                  };
                })}
              />
            </div>
            <div className="flex flex-col mb-6">
              <p className="font-medium mb-2">Task Name</p>
              <Input
                placeholder="Enter task name"
                allowClear
                value={taskInfo.name}
                onChange={(e) =>
                  setTaskInfo({ ...taskInfo, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col mb-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <p className="font-medium mr-4">Priority</p>
                  <Select
                    className="min-w-[100px]"
                    showSearch
                    allowClear
                    placeholder="Select a priority"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    value={taskInfo.priority}
                    onChange={(value) =>
                      setTaskInfo({ ...taskInfo, priority: value })
                    }
                    options={[
                      {
                        value: "Low",
                        label: "Low",
                      },
                      {
                        value: "Medium",
                        label: "Medium",
                      },
                      {
                        value: "High",
                        label: "High",
                      },
                    ]}
                  />
                </div>
                <div className="flex items-center">
                  <p className="font-medium mr-4">Status</p>
                  <Select
                    className="min-w-[100px]"
                    allowClear
                    showSearch
                    placeholder="Select a status"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    value={taskInfo.status}
                    onChange={(value) =>
                      setTaskInfo({ ...taskInfo, status: value })
                    }
                    options={[
                      {
                        value: "to do",
                        label: "TODO",
                      },
                      {
                        value: "in progress",
                        label: "IN PROGRESS",
                      },
                      {
                        value: "in review",
                        label: "IN REVIEW",
                      },
                      {
                        value: "done",
                        label: "DONE",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            <p className="font-medium mb-2">Human Resource</p>
            <div className="grid grid-rows-2 grid-cols-2 gap-4 mb-6">
              <div className="flex flex-col">
                <p className="text-sm font-medium mb-2">Assignee</p>
                <Select
                  mode="multiple"
                  className="mb-2"
                  placeholder="Choose an Assignee"
                  allowClear
                  options={users.map((mem) => {
                    return {
                      value: mem.name,
                      label: mem.name,
                    };
                  })}
                  value={taskInfo.assignee}
                  onChange={(value) => {
                    setTaskInfo({
                      ...taskInfo,
                      assignee: value,
                    });
                  }}
                />
                <div className="flex flex-col gap-2">
                  {taskInfo.assignee.map((a, i) => {
                    const index = users.findIndex((u) => u.name === a);
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <img
                            src={users[index].image}
                            alt="ava"
                            className="w-8 h-8 rounded-full mr-4"
                          />
                          <p className="text-sm">{users[index].name}</p>
                        </div>
                        <AiOutlineClose
                          onClick={() =>
                            setTaskInfo({
                              ...taskInfo,
                              assignee: taskInfo.assignee.filter(
                                (mem) => mem !== a
                              ),
                            })
                          }
                          className="text-xl cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium mb-2">Reviewer</p>
                <Select
                  mode="multiple"
                  className="mb-2"
                  placeholder="Choose an Assignee"
                  allowClear
                  options={users.map((mem) => {
                    return {
                      value: mem.name,
                      label: mem.name,
                    };
                  })}
                  value={taskInfo.reviewer}
                  onChange={(value) => {
                    setTaskInfo({
                      ...taskInfo,
                      reviewer: value,
                    });
                  }}
                />
                <div className="flex flex-col gap-2">
                  {taskInfo.reviewer.map((a, i) => {
                    const index = users.findIndex((u) => u.name === a);
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <img
                            src={users[index].image}
                            alt="ava"
                            className="w-8 h-8 rounded-full mr-4"
                          />
                          <p className="text-sm">{users[index].name}</p>
                        </div>
                        <AiOutlineClose
                          onClick={() =>
                            setTaskInfo({
                              ...taskInfo,
                              reviewer: taskInfo.reviewer.filter(
                                (mem) => mem !== a
                              ),
                            })
                          }
                          className="text-xl cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-medium mb-2">Supporter</p>
                <Select
                  mode="multiple"
                  className="mb-2"
                  placeholder="Choose an Assignee"
                  allowClear
                  options={users.map((mem) => {
                    return {
                      value: mem.name,
                      label: mem.name,
                    };
                  })}
                  value={taskInfo.supporter}
                  onChange={(value) => {
                    setTaskInfo({
                      ...taskInfo,
                      supporter: value,
                    });
                  }}
                />
                <div className="flex flex-col gap-2">
                  {taskInfo.supporter.map((a, i) => {
                    const index = users.findIndex((u) => u.name === a);
                    return (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <img
                            src={users[index].image}
                            alt="ava"
                            className="w-8 h-8 rounded-full mr-4"
                          />
                          <p className="text-sm">{users[index].name}</p>
                        </div>
                        <AiOutlineClose
                          onClick={() =>
                            setTaskInfo({
                              ...taskInfo,
                              supporter: taskInfo.supporter.filter(
                                (mem) => mem !== a
                              ),
                            })
                          }
                          className="text-xl cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-6">
              <p className="font-medium mb-2">Date & Time</p>
              <RangePicker
                showTime={{
                  hideDisabledOptions: true,
                  defaultValue: [start, end],
                }}
                onChange={(e) => {
                  setTaskInfo({
                    ...taskInfo,
                    start: e[0],
                    end: e[1],
                  });
                }}
                value={[taskInfo.start, taskInfo.end]}
                format="YYYY-MM-DD HH:mm:ss"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-medium mb-2">Task Description</p>
              <TextArea
                placeholder="Enter task description"
                rows={4}
                allowClear
                maxLength={6}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => {
                setCreateTaskOpen(false);
                // setCreateTaskOpen2(false);
              }}
              className="bg-[#9C9C9C] text-white text-sm py-2 px-4 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleCreateTask();
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

CreateTaskModal.propTypes = {
  toggleCreateTaskModal: PropTypes.func,
};

export default CreateTaskModal;
