/* eslint-disable react/prop-types */
import { Input, Select } from "antd";
import { AiOutlineClose, AiOutlineTeam } from "react-icons/ai";
import { toast } from "react-toastify";
import image from "../../constant/image";

const { TextArea } = Input;

const CreateProjectModal = ({ toggleCreateProjectModal }) => {
  return (
    <div className="create-project-modal modal-background modal-hidden">
      <div className="modal-container">
        <div className="modal-header">
          <p className="text-base font-semibold">Create Project</p>
          <AiOutlineClose
            onClick={() => toggleCreateProjectModal()}
            className="text-2xl hover:text-bright-green cursor-pointer"
          />
        </div>
        <div className="modal-body">
          <div className="flex flex-col">
            <div className="flex flex-col mb-6">
              <p className="font-medium mb-2">Project Name</p>
              <Input placeholder="Enter project name" allowClear />
            </div>
            <div className="flex flex-col mb-8">
              <div className="flex items-center gap-3 mb-3">
                <AiOutlineTeam className="text-2xl" />
                <Select
                  className="w-full"
                  placeholder="Enter member's name"
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
                toggleCreateProjectModal();
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

export default CreateProjectModal;
