/* eslint-disable react/prop-types */
import image from "../../constant/image";
import "./Sidebar.scss";
import { FiChevronsLeft } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { AiFillCalendar, AiFillProfile, AiOutlineTeam } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TiArrowSortedDown } from "react-icons/ti";
import { Tooltip } from "antd";

const parentVariants = {
  open: {
    height: "auto",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    height: 0,
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

const Sidebar = ({ handleToggleSidebar }) => {
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [current, setCurrent] = useState("");
  const [currentTeamType, setCurrentTeamType] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // console.log(typeof location);
    // console.log(location)
    if (location.pathname.includes("profile")) {
      setCurrent("profile");
    } else if (location.pathname.includes("workspace")) {
      setCurrent("workspace");
    } else if (location.pathname.includes("team")) {
      setCurrent("team");
      if (location.pathname.includes("joined")) {
        setCurrentTeamType("joined");
      } else setCurrentTeamType("created");
    } else setCurrent("noting");
  }, [location]);

  return (
    <div className="sidebar-container">
      <div className="flex items-center justify-end pt-2">
        <FiChevronsLeft
          onClick={() => handleToggleSidebar("closed")}
          className="text-2xl hover:text-bright-green hover:cursor-pointer"
        />
      </div>
      <Tooltip placement="top" title="To Profile Page">
        <div
          className="flex flex-col items-center justify-center mb-4 cursor-pointer"
          style={{ marginTop: "-4px" }}
          onClick={() => navigate("/profile")}
        >
          <div className="sidebar-logo-wrp">
            <img className="sidebar-logo-gif" src={image.kuru} alt="kururin" />
          </div>
          <h1 className="sidebar-logo-title">Kurenda~</h1>
        </div>
      </Tooltip>

      <div className="flex flex-col w-full whitespace-nowrap">
        <Link
          to="/profile"
          className={`sidebar-item`}
          style={{ color: current === "profile" && "#22C55E" }}
        >
          <AiFillProfile className="text-2xl mr-3" />
          <span
            className={`flex-1 text-base overflow-hidden text-ellipsis font-medium`}
          >
            Profile
          </span>
        </Link>
        <Link
          style={{ color: current === "workspace" && "#22C55E" }}
          to="/workspace"
          className="sidebar-item"
        >
          <AiFillCalendar className="text-2xl mr-3" />
          <span
            className={`flex-1 text-base overflow-hidden text-ellipsis font-medium`}
          >
            Workspace
          </span>
        </Link>
        <motion.div
          initial={false}
          animate={isTeamOpen ? "open" : "closed"}
          className="flex flex-col"
        >
          <motion.div
            onClick={() => setIsTeamOpen((prev) => !prev)}
            className="sidebar-item"
          >
            <div
              className={`flex items-center${
                current === "team" ? " text-bright-green" : ""
              }`}
            >
              <FaUsers className="text-2xl mr-3" />
              <p
                className={`flex-1 text-base overflow-hidden text-ellipsis font-medium`}
              >
                Teams
              </p>
            </div>
            <motion.div
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.2 }}
              className={`flex items-center justify-center${
                current === "team" ? " text-bright-green" : ""
              }`}
            >
              <TiArrowSortedDown className="text-xl" />
            </motion.div>
          </motion.div>
          <motion.div
            variants={parentVariants}
            className="flex flex-col pl-8 w-full"
          >
            <motion.div
              onClick={() => navigate("/teams/joined")}
              variants={itemVariants}
              className="flex flex-col"
            >
              <div
                className="sidebar-item"
                style={{ color: currentTeamType === "joined" && "#22C55E" }}
              >
                <AiOutlineTeam className="text-2xl mr-3" />
                <span className="flex-1 text-base overflow-hidden text-ellipsis font-medium">
                  Joined Teams
                </span>
              </div>
              {/* <div className="flex flex-col pl-8">
                <div className="sidebar-item">
                  <div className="w-6 h-6 mr-3">
                    <img
                      src={image.poum}
                      alt="teams-logo"
                      className="w-full h-full rounded-full "
                    />
                  </div>
                  <p className="flex-1 text-base overflow-hidden text-ellipsis font-medium">
                    Astral Express
                  </p>
                </div>
              </div> */}
            </motion.div>
            <motion.div
              onClick={() => navigate("/teams/created")}
              variants={itemVariants}
              className="flex flex-col"
            >
              <div
                className="sidebar-item"
                style={{ color: currentTeamType === "created" && "#22C55E" }}
              >
                <IoIosCreate className="text-2xl mr-3" />
                <span className="flex-1 text-base overflow-hidden text-ellipsis font-medium">
                  Created Teams
                </span>
              </div>
              {/* <div className="flex flex-col pl-8">
                <div className="sidebar-item">
                  <div className="w-6 h-6 mr-3">
                    <img
                      src={image.poum}
                      alt="teams-logo"
                      className="w-full h-full rounded-full "
                    />
                  </div>
                  <p className="flex-1 text-base overflow-hidden text-ellipsis font-medium">
                    Astral Express
                  </p>
                </div>
              </div> */}
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="sidebar-item">
          <GiNotebook className="text-2xl mr-3" />
          <p className="flex-1 text-base overflow-hidden text-ellipsis font-medium">
            Noting
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
