import {
  AiFillFileImage,
  AiFillFileZip,
  AiFillSmile,
  AiOutlineLink,
  AiOutlinePlus,
} from "react-icons/ai";
import image from "../constant/image";
import { FaComment, FaEdit, FaTrash } from "react-icons/fa";
import { BiChevronsDown } from "react-icons/bi";
import { BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { Tooltip } from "antd";
import { useState } from "react";
import { TiArrowSortedDown } from "react-icons/ti";
import { Input } from "antd";
const { TextArea } = Input;
import "./styles/TeamTaskDetail.scss";
import { motion } from "framer-motion";

const TeamTaskDetail = () => {
  const [cmtState, setCmtState] = useState("Newest");
  const [editState, setEditState] = useState(false);

  return (
    <>
      <motion.div className="w-full flex flex-col bg-white py-2 px-4 rounded-xl">
        <div className="flex items-center justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
          <p className="uppercase font-semibold text-base">
            Task&apos;s Detail
          </p>
          <div className="flex items-center">
            <div className="relative">
              <BsThreeDots onClick={() => setEditState(!editState)} className="relative text-2xl hover:cursor-pointer hover:text-bright-green mr-3" />
              {editState && <div className="task-option">
                <div className="flex items-center px-3 py-1 rounded-md hover:bg-bright-green hover:text-white text-85-gray mb-1 cursor-pointer">
                  <FaEdit className="text-lg mr-3" />
                  <p className="text-sm">Edit Task</p>
                </div>
                <div className="flex items-center px-3 py-1 rounded-md hover:bg-bright-green hover:text-white text-85-gray cursor-pointer">
                  <FaTrash className="text-lg mr-3" />
                  <p className="text-sm">Remove Task</p>
                </div>
              </div>}
            </div>
            
            <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
          </div>
        </div>

        <div className="flex flex-col px-4">
          <div className="flex items-center gap-6 mb-4">
            <Tooltip placement="top" title="Creator: Mr.Poum">
              <img src={image.poum} className="w-12 h-12 rounded-full" />
            </Tooltip>
            <h1 className="text-2xl font-bold uppercase text-85-gray">
              UI / UX PROJECT
            </h1>
          </div>
          <p className="text-lg font-semibold mb-4">
            Add Figma to show demo of the app
          </p>
          <div className="flex items-center mb-4 gap-6">
            <AiFillFileZip className="text-2xl text-45-gray hover:text-bright-green cursor-pointer" />
            <AiOutlineLink className="text-2xl text-45-gray hover:text-bright-green cursor-pointer" />
            <AiFillFileImage className="text-2xl text-45-gray hover:text-bright-green cursor-pointer" />
          </div>
          <p className="text-base font-normal break-words whitespace-pre-wrap">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
          <div className="flex flex-col mb-4"></div>
          <div className="flex flex-col">
            <div className="flex items-center justify-between pb-4 mb-3 border-b border-solid border-[#f5f6fb]">
              <p className="font-bold">Comments</p>
              <div className="flex gap-3 items-center relative">
                <p className="font-medium text-45-gray">Newest</p>
                <TiArrowSortedDown className="text-2xl text-45-gray" />
              </div>
            </div>
            <div className="flex flex-col mb-4">
              <TextArea
                rows={4}
                className="text-base"
                placeholder="Enter your comment here"
                maxLength={6}
              />
            </div>
            {/* Comments */}
            <div className="flex">
              <img src={image.poum} className="w-10 h-10 rounded-full mr-4" />
              <div className="flex flex-col">
                <div className="w-full flex items-center justify-between mb-4">
                  <div className="flex flex-col">
                    <p className="font-semibold">Kurukuru~</p>
                    <p className="text-xs font-medium text-45-gray">2d ago</p>
                  </div>
                  <BsThreeDotsVertical className="icon" />
                </div>
                <p className="paragraph mb-4">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry&apos;s
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 py-1 px-2 text-45-gray hover:text-bright-green hover:border-bright-green cursor-pointer rounded-full border border-solid border-[#8592A3]">
                      <AiFillSmile className="text-xl" />
                      <p className="text-sm">100</p>
                    </div>
                    <div className="flex items-center gap-1 py-1 px-2 text-45-gray hover:text-bright-green hover:border-bright-green cursor-pointer rounded-full border border-solid border-[#8592A3]">
                      <AiFillSmile className="text-xl" />
                      <p className="text-sm">100</p>
                    </div>
                    <div className="flex items-center gap-1 py-1 px-2 text-45-gray hover:text-bright-green hover:border-bright-green cursor-pointer rounded-full border border-solid border-[#8592A3]">
                      <AiFillSmile className="text-xl" />
                      <AiOutlinePlus className="text-xl" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-45-gray cursor-pointer hover:text-bright-green">
                    <FaComment className="text-xl" />
                    <p className="text-sm">100</p>
                  </div>
                </div>
                {/* Replies */}
                <div className="flex pl-4 border-l border-solid border-[#f5f6fb]">
                  <img
                    src={image.poum}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="flex flex-col">
                    <div className="w-full flex items-center justify-between mb-4">
                      <div className="flex flex-col">
                        <p className="font-semibold">Kurukuru~</p>
                        <p className="text-xs font-medium text-45-gray">
                          2d ago
                        </p>
                      </div>
                      <BsThreeDotsVertical className="icon" />
                    </div>
                    <p className="paragraph mb-4">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the
                      industry&apos;s standard dummy text ever since the 1500s,
                      when an unknown printer took a galley of type and
                      scrambled it to make a type specimen book. It has survived
                      not only five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                      popularised in the 1960s with the release of Letraset
                      sheets containing Lorem Ipsum passages, and more recently
                      with desktop publishing software like Aldus PageMaker
                      including versions of Lorem Ipsum.
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 py-1 px-2 text-45-gray hover:text-bright-green hover:border-bright-green cursor-pointer rounded-full border border-solid border-[#8592A3]">
                          <AiFillSmile className="text-xl" />
                          <p className="text-sm">100</p>
                        </div>
                        <div className="flex items-center gap-1 py-1 px-2 text-45-gray hover:text-bright-green hover:border-bright-green cursor-pointer rounded-full border border-solid border-[#8592A3]">
                          <AiFillSmile className="text-xl" />
                          <p className="text-sm">100</p>
                        </div>
                        <div className="flex items-center gap-1 py-1 px-2 text-45-gray hover:text-bright-green hover:border-bright-green cursor-pointer rounded-full border border-solid border-[#8592A3]">
                          <AiFillSmile className="text-xl" />
                          <AiOutlinePlus className="text-xl" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-45-gray cursor-pointer hover:text-bright-green">
                        <FaComment className="text-xl" />
                        <p className="text-sm">100</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-2 pt-4 flex items-center justify-center border-t border-solid border-[#f5f6fb] mt-4">
          <span className="text-45-gray">~This is the end~</span>
        </div>
      </motion.div>

      <div className="w-[336px] ml-6 shrink-0">
        <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4 mb-4">
          <div className="py-4 border-b border-solid border-[#f5f6fb] mb-3">
            {/* `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. */}
            <span className="font-semibold">Task&apos;s Info</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between py-2 px-4 bg-[#F1F4F9] rounded-md">
              <p className="text-45-gray font-medium text-sm">Status</p>
              <p className="py-1 px-3 rounded-md bg-bright-green text-white text-sm uppercase">
                done
              </p>
            </div>
            <div className="flex items-center justify-between py-2 px-4 bg-[#F1F4F9] rounded-md">
              <p className="text-45-gray font-medium text-sm">Priority</p>
              <p className="text-white bg-red-type py-1 px-3 rounded-md text-sm">
                High
              </p>
            </div>
            <div className="flex items-center justify-between py-2 px-4 bg-[#F1F4F9] rounded-md">
              <Tooltip placement="top" title="Story Point">
                <p className="text-45-gray font-medium text-sm">SP</p>
              </Tooltip>
              <p className="text-85-gray text-sm">3 days</p>
            </div>
            <div className="flex items-center justify-between py-2 px-4 bg-[#F1F4F9] rounded-md">
              <p className="text-45-gray font-medium text-sm">Created Date</p>
              <p className="text-85-gray text-sm">21/05/2100</p>
            </div>
          </div>
        </div>
        <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4">
          <div className="py-4 border-b border-solid border-[#f5f6fb] mb-3">
            {/* `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. */}
            <span className="font-semibold">HR</span>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <div className="cursor-pointer flex items-center justify-between py-2 px-4 bg-[#F1F4F9] rounded-md">
                <p className="text-45-gray font-medium text-sm">Assignee</p>
                <div className="flex items-center">
                  <p className="text-85-gray text-sm mr-2">3</p>
                  <TiArrowSortedDown
                    onClick={(e) => e.currentTarget.classList.toggle("rotate")}
                    className="text-xl text-85-gray icon-transition"
                  />
                </div>
              </div>
              <div className="pl-4 flex items-center">
                <img
                  src={image.kuru}
                  className="mr-4 w-8 h-8 rounded-full border border-solid border-[#f5f6fb]"
                />
                <p>Heruta~~</p>
              </div>
              <div className="cursor-pointer flex items-center justify-between py-2 px-4 bg-[#F1F4F9] rounded-md">
                <p className="text-45-gray font-medium text-sm">Reviewer</p>
                <div className="flex items-center">
                  <p className="text-85-gray text-sm mr-2">0</p>
                  <TiArrowSortedDown
                    onClick={(e) => e.currentTarget.classList.toggle("rotate")}
                    className="text-xl text-85-gray icon-transition"
                  />
                </div>
              </div>
              <div className="cursor-pointer flex items-center justify-between py-2 px-4 bg-[#F1F4F9] rounded-md">
                <p className="text-45-gray font-medium text-sm">Reporter</p>
                <div className="flex items-center">
                  <p className="text-85-gray text-sm mr-2">0</p>
                  <TiArrowSortedDown
                    onClick={(e) => e.currentTarget.classList.toggle("rotate")}
                    className="text-xl text-85-gray icon-transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4 mt-4"></div> */}
      </div>
    </>
  );
};

export default TeamTaskDetail;
