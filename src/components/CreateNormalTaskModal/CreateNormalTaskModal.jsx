/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Input, Select, DatePicker } from "antd";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import image from "../../constant/image";
import PropTypes from "prop-types";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const CreateNormalTaskModal = ({
  toggleCreateNormalTaskModal,
  taskName,
  setTaskName,
  priorityValue,
  setPriorityValue,
  statusValue,
  setStatusValue,
}) => {
  return (
    <div className="create-normal-task-modal modal-background modal-hidden">
      <div className="modal-container">
        <div className="modal-header">
          <p className="text-base font-semibold">Create Task</p>
          <AiOutlineClose
            onClick={() => toggleCreateNormalTaskModal()}
            className="text-2xl hover:text-bright-green cursor-pointer"
          />
        </div>
        <div className="modal-body">
          <div className="flex flex-col">
            <div className="flex flex-col mb-6">
              <p className="font-medium mb-2">Task Name</p>
              <Input
                placeholder="Enter task name"
                allowClear
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
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
                    value={priorityValue}
                    onChange={(value) => setPriorityValue(value)}
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
                    value={statusValue}
                    onChange={(value) => setStatusValue(value)}
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
            <button onClick={() => toggleCreateNormalTaskModal()} className="bg-[#9C9C9C] text-white text-sm py-2 px-4 rounded-md">
              Cancel
            </button>
            <button
              onClick={() => {
                toast("Created Successful!");
                toggleCreateNormalTaskModal();
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

CreateNormalTaskModal.propTypes = {
  toggleCreateTaskModal: PropTypes.func,
};

export default CreateNormalTaskModal;
