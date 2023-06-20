import { Space, Table, Tag } from "antd";
import { HiUserGroup } from "react-icons/hi";
import { Link } from "react-router-dom";
import image from "../constant/image";
import { BiChevronsDown } from "react-icons/bi";
import { useState } from "react";
import { FaFilter } from "react-icons/fa";
import {
  AiOutlineSearch,
  AiOutlineUserAdd,
} from "react-icons/ai";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
    filters: [
      {
        text: "Joe",
        value: "Joe",
      },
      {
        text: "Jim",
        value: "Jim",
      },
      {
        text: "Submenu",
        value: "Submenu",
        children: [
          {
            text: "Green",
            value: "Green",
          },
          {
            text: "Black",
            value: "Black",
          },
        ],
      },
    ],
    // specify the condition of filtering result
    // here is that finding the name started with `value`
    onFilter: (value, record) => record.name.indexOf(value) === 0,
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Assigned Tasks",
    dataIndex: "assigned_tasks",
    key: "assigned_tasks",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Completed Tasks",
    dataIndex: "completed_tasks",
    key: "completed_tasks",
    render: (text) => <p>{text}</p>,
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: "1",
    id: "1",
    name: "John Brown",
    role: "Team Leader",
    completed_tasks: "120.543",
    assigned_tasks: "154.534.534",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    id: "2",
    name: "Jim Green",
    role: "Team Leader",
    completed_tasks: "120.543",
    assigned_tasks: "154.534.534",
    tags: ["loser"],
  },
  {
    key: "3",
    id: "3",
    name: "Joe Black",
    role: "Team Leader",
    completed_tasks: "120.543",
    assigned_tasks: "154.534.534",
    tags: ["cool", "teacher"],
  },
];

const TeamMembers = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // false - joined | true - requesting
  const [viewState, setViewState] = useState(false);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className="w-full flex flex-col bg-white py-2 px-4 rounded-xl">
          <div className="flex items-center justify-between pt-2 pb-4 border-b border-solid border-[#f5f6fb] mb-4">
            <div className="flex items-center">
              <p className="uppercase font-semibold text-base mr-4">Members</p>
              <div className="flex items-center">
                <span
                  onClick={() => setViewState((prev) => !prev)}
                  className={`cursor-pointer rounded-full py-1 px-4 ${
                    !viewState && " bg-bright-green text-white"
                  }`}
                >
                  Joined
                </span>
                <span
                  onClick={() => setViewState((prev) => !prev)}
                  className={`cursor-pointer rounded-full py-1 px-4 ${
                    viewState && " bg-bright-green text-white"
                  }`}
                >
                  Requesting
                </span>
              </div>
            </div>
            <div className="flex items-center">
              <div className="p-1 bg-bright-green rounded-full mr-3 cursor-pointer hover:bg-less-bright-green">
                <AiOutlineUserAdd className="text-2xl text-white" />
              </div>
              <div className="p-2 bg-bright-green rounded-full mr-3 cursor-pointer hover:bg-less-bright-green">
                <FaFilter className="text-base text-white" />
              </div>
              <div className="flex mr-3">
                <div className="flex items-center justify-center pl-4 pr-3 py-2 rounded-bl-full rounded-tl-full bg-bright-green">
                  <AiOutlineSearch className="text-base text-white" />
                </div>
                <input
                  className="rounded-tr-full rounded-br-full border-t border-b border-r border-solid border-bright-green text-sm h-[32px] w-[200px] focus:outline-none px-3"
                  placeholder="Enter team's name / id..."
                />
              </div>
              <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
            </div>
          </div>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>

      <div className="w-[336px] ml-6 shrink-0">
        <div className="w-full bg-white rounded-xl flex flex-col px-4 pb-4">
          <div className="py-4 border-b border-solid border-[#f5f6fb] mb-3">
            {/* `'` can be escaped with `&apos;`, `&lsquo;`, `&#39;`, `&rsquo;`. */}
            <span className="font-semibold">Team&apos;s Overview</span>
          </div>
          <div className="w-full flex gap-2 items-center justify-between">
            <div className="p-2 flex-1 rounded-md bg-[#FAFAFA] overflow-hidden">
              <div className="inline-flex p-2 items-center justify-center rounded-full bg-[#92A5F9]">
                <HiUserGroup className="text-2xl text-white" />
              </div>
              <p className="font-medium text-base text-ellipsis overflow-hidden mt-2">
                100.503.534.655
              </p>
              <p className="font-semibold text-base my-1 text-45-gray">
                Member
              </p>
              <Link
                to="/teams"
                className="text-base text-bright-green font-medium"
              >
                View more
              </Link>
            </div>
            <div className="h-full p-2 flex-1 rounded-md bg-[#FAFAFA]">
              <div className="flex items-center">
                <div className="h-10 w-10">
                  <img
                    data-index="1"
                    className="w-full h-full rounded-full"
                    src={image.poum}
                  />
                </div>
                <div className="h-10 w-10">
                  <img
                    data-index="2"
                    className="w-full h-full rounded-full"
                    src={image.poum}
                    style={{ transform: "translateX(-50%)" }}
                  />
                </div>
              </div>
              <p className="font-medium text-base text-ellipsis overflow-hidden mt-2">
                2
              </p>
              <p className="font-semibold text-base my-1 text-45-gray">
                Team&apos;s Owner
              </p>
              <Link to="/teams" className="text-base font-medium">
                Mr.Poum,...
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamMembers;
