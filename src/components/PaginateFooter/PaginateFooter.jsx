import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const PaginateFooter = () => {
  return (
    <div className="flex items-center justify-center py-4 border-t border-solid border-[#f5f6fb] mt-4">
      <div className="p-2 rounded-[3px] border border-solid border-black mr-2 cursor-pointer hover:border-bright-green hover:text-bright-green">
        <IoIosArrowBack className="text-base" />
      </div>
      <div className="px-3 py-1 rounded-[3px] border border-solid border-black mr-2 cursor-pointer hover:border-bright-green hover:text-bright-green">
        <span className="text-base">1</span>
      </div>
      <div className="px-3 py-1 rounded-[3px] border border-solid border-black mr-2 cursor-pointer hover:border-bright-green hover:text-bright-green">
        <span className="text-base">2</span>
      </div>
      <div className="px-3 py-1 rounded-[3px] border border-solid border-black mr-2 cursor-pointer hover:border-bright-green hover:text-bright-green">
        <span className="text-base">3</span>
      </div>
      <div className="px-3 py-1 rounded-[3px] border border-solid border-black mr-2 cursor-pointer hover:border-bright-green hover:text-bright-green">
        <span className="text-base">4</span>
      </div>
      <div className="px-3 py-1 rounded-[3px] border border-solid border-black mr-2 cursor-pointer hover:border-bright-green hover:text-bright-green">
        <span className="text-base">5</span>
      </div>
      <div className="p-2 rounded-[3px] border border-solid border-black cursor-pointer hover:border-bright-green hover:text-bright-green">
        <IoIosArrowForward className="text-base" />
      </div>
    </div>
  );
};

export default PaginateFooter;
