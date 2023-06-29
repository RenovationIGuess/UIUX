/* eslint-disable react/prop-types */
import { Button, Input, Progress, Select, DatePicker } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "react-toastify";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const EditNormalTaskModal = ({ toggleEditNormalTaskModal }) => {
  const [percent, setPercent] = useState(0);

  const completionIncrease = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 10;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };

  const completionDecline = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent - 10;
      if (newPercent < 0) {
        return 0;
      }
      return newPercent;
    });
  };

  return (
    <>
      <div className="edit-normal-task-modal modal-background modal-hidden">
        <div className="modal-container">
          <div className="modal-header">
            <p className="text-base font-semibold">Edit Task</p>
            <AiOutlineClose
              onClick={() => toggleEditNormalTaskModal()}
              className="text-2xl hover:text-bright-green cursor-pointer"
            />
          </div>
          <div className="modal-body">
            <div className="flex flex-col">
              <div className="flex flex-col mb-6">
                <p className="font-medium mb-2">Task Name</p>
                <Input placeholder="Enter task name" allowClear />
              </div>
              <div className="flex flex-col mb-6">
                <div className="flex items-center gap-12">
                  <div className="flex items-center">
                    <p className="font-medium mr-4">Priority</p>
                    <Select
                      showSearch
                      placeholder="Select a priority"
                      optionFilterProp="children"
                      // onChange={onChange}
                      // onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
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
                      showSearch
                      placeholder="Select a status"
                      optionFilterProp="children"
                      // onChange={onChange}
                      // onSearch={onSearch}
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      options={[
                        {
                          value: "TODO",
                          label: "TODO",
                        },
                        {
                          value: "IN PROGRESS",
                          label: "IN PROGRESS",
                        },
                        {
                          value: "IN REVIEW",
                          label: "IN REVIEW",
                        },
                        {
                          value: "DONE",
                          label: "DONE",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <p className="font-medium mb-2">Completion</p>
                <Progress percent={percent} />
                <Button.Group>
                  <Button
                    onClick={completionDecline}
                    icon={<MinusOutlined />}
                  />
                  <Button
                    onClick={completionIncrease}
                    icon={<PlusOutlined />}
                  />
                </Button.Group>
              </div>
              <div className="flex flex-col mb-6">
                <p className="font-medium mb-2">Deadline</p>
                <RangePicker showTime />
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
              <button className="bg-[#9C9C9C] text-white text-sm py-2 px-4 rounded-md">
                Cancel
              </button>
              <button
                onClick={() => {
                  toast("Created Successful!");
                }}
                className="bg-bright-green text-white text-sm py-2 px-4 rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditNormalTaskModal;
