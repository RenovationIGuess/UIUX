import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";

const ConfirmModal = () => {
  return (
    <div className="create-task-modal modal-background modal-hidden">
      <div className="modal-container">
        <div className="modal-header">
          <p className="text-base font-semibold">Create Task</p>
          <AiOutlineClose className="text-2xl hover:text-bright-green cursor-pointer" />
        </div>
        <div className="modal-body"></div>
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
  );
};

export default ConfirmModal;
