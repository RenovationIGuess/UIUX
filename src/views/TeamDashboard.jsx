/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./styles/TeamDetail.scss";
import { HiUserGroup } from "react-icons/hi";
import image from "../constant/image";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import faker from "faker";
import TaskStatistic from "../components/TaskStatistic/TaskStatistic";
import { BiChevronsDown } from "react-icons/bi";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: false,
      text: "Team's Members Status",
      font: {
        size: "16px",
      },
    },
  },
};

const meetOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 14,
        },
      },
    },
    title: {
      display: false,
      text: "Meetings Statistic",
      font: {
        size: "16px",
      },
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
];

const data = {
  labels,
  datasets: [
    {
      label: "Joined",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "#22C55E",
      backgroundColor: "#22C55E",
    },
    {
      label: "Leaved",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "#D91212",
      backgroundColor: "#D91212",
    },
  ],
};

const meetData = {
  labels,
  datasets: [
    {
      label: "Created",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "#3F82EC",
      backgroundColor: "#3F82EC",
    },
    {
      label: "Done",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "#22C55E",
      backgroundColor: "#22C55E",
    },
    {
      label: "Canceled",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      borderColor: "#D91212",
      backgroundColor: "#D91212",
    },
  ],
};

const TeamDetail = () => {
  // const [state, setState] = useState({
  //   tasks: true,
  //   projects: true,
  //   members: true,
  //   meetings: true,
  // });

  return (
    <>
      <div className="flex-1 flex flex-col">
        <TaskStatistic type="task" />
        <TaskStatistic type="project" />
        <div className="w-full flex flex-col bg-white p-4 mb-4 rounded-xl transition">
          <div className="flex items-center justify-between pb-4 border-b border-solid border-[#f5f6fb] mb-4">
            <p className="uppercase font-semibold text-base">members</p>
            <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
          </div>
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-4 mb-4">
              <p className="font-medium">From</p>
              <DatePicker
                cellRender={(current) => {
                  const style = {};
                  if (current.date() === 1) {
                    style.border = "1px solid #1677ff";
                    style.borderRadius = "50%";
                  }
                  return (
                    <div className="ant-picker-cell-inner" style={style}>
                      {current.date()}
                    </div>
                  );
                }}
                defaultValue={dayjs()}
              />
              <p className="font-medium">To</p>
              <DatePicker
                cellRender={(current) => {
                  const style = {};
                  if (current.date() === 1) {
                    style.border = "1px solid #1677ff";
                    style.borderRadius = "50%";
                  }
                  return (
                    <div className="ant-picker-cell-inner" style={style}>
                      {current.date()}
                    </div>
                  );
                }}
                defaultValue={dayjs()}
              />
            </div>
          </div>
          <Line options={options} data={data} />
        </div>
        <div className="w-full flex flex-col bg-white p-4 rounded-xl transition">
          <div className="flex items-center justify-between pb-4 border-b border-solid border-[#f5f6fb] mb-4">
            <p className="uppercase font-semibold text-base">meetings</p>
            <BiChevronsDown className="text-2xl hover:cursor-pointer hover:text-bright-green" />
          </div>
          <div className="flex items-center justify-end">
            <div className="flex items-center gap-4 mb-4">
              <p className="font-medium">From</p>
              <DatePicker
                cellRender={(current) => {
                  const style = {};
                  if (current.date() === 1) {
                    style.border = "1px solid #1677ff";
                    style.borderRadius = "50%";
                  }
                  return (
                    <div className="ant-picker-cell-inner" style={style}>
                      {current.date()}
                    </div>
                  );
                }}
                defaultValue={dayjs()}
              />
              <p className="font-medium">To</p>
              <DatePicker
                cellRender={(current) => {
                  const style = {};
                  if (current.date() === 1) {
                    style.border = "1px solid #1677ff";
                    style.borderRadius = "50%";
                  }
                  return (
                    <div className="ant-picker-cell-inner" style={style}>
                      {current.date()}
                    </div>
                  );
                }}
                defaultValue={dayjs()}
              />
            </div>
          </div>
          <Bar options={meetOptions} data={meetData} />
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
                to="/team/1/members"
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

export default TeamDetail;
