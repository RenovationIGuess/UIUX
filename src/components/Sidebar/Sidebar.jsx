/* eslint-disable react/prop-types */
import image from "../../constant/image";
import "./Sidebar.scss";
import { FiChevronsLeft } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";
import { AiFillCalendar, AiFillProfile, AiOutlineTeam } from "react-icons/ai";
import { IoIosCreate } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { TiArrowSortedDown } from "react-icons/ti";

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

  return (
    <div className="sidebar-container">
      <div className="flex items-center justify-end pt-2">
        <FiChevronsLeft
          onClick={() => handleToggleSidebar("closed")}
          className="text-2xl hover:text-bright-green hover:cursor-pointer"
        />
      </div>
      <div
        className="flex flex-col items-center justify-center mb-4"
        style={{ marginTop: "-4px" }}
      >
        <div className="sidebar-logo-wrp">
          <img className="sidebar-logo-gif" src={image.kuru} alt="kururin" />
        </div>
        <h1 className="sidebar-logo-title">Kurenda~</h1>
      </div>

      <div className="flex flex-col w-full whitespace-nowrap">
        <div className="sidebar-item">
          <AiFillProfile className="text-2xl mr-3" />
          <p className="flex-1 text-base overflow-hidden text-ellipsis font-medium">
            Profile
          </p>
        </div>
        <div className="sidebar-item">
          <AiFillCalendar className="text-2xl mr-3" />
          <p className="flex-1 text-base overflow-hidden text-ellipsis font-medium">
            Calendar
          </p>
        </div>
        <motion.div
          initial={false}
          animate={isTeamOpen ? "open" : "closed"}
          className="flex flex-col"
        >
          <motion.div
            onClick={() => setIsTeamOpen((prev) => !prev)}
            className="sidebar-item"
          >
            <div className="flex items-center">
              <FaUsers className="text-2xl mr-3" />
              <p className="flex-1 text-base overflow-hidden text-ellipsis font-medium">
                Teams
              </p>
            </div>
            <motion.div
              variants={{
                open: { rotate: 180 },
                closed: { rotate: 0 },
              }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <TiArrowSortedDown className="text-xl" />
            </motion.div>
          </motion.div>
          <motion.div
            variants={parentVariants}
            className="flex flex-col pl-8 w-full"
          >
            <motion.div variants={itemVariants} className="flex flex-col">
              <div className="sidebar-item">
                <AiOutlineTeam className="text-2xl mr-3" />
                <Link
                  to="/teams/joined"
                  className="flex-1 text-base overflow-hidden text-ellipsis font-medium"
                >
                  Joined Teams
                </Link>
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
            <motion.div variants={itemVariants} className="flex flex-col">
              <div className="sidebar-item">
                <IoIosCreate className="text-2xl mr-3" />
                <Link
                  to="/teams/created"
                  className="flex-1 text-base overflow-hidden text-ellipsis font-medium"
                >
                  Created Teams
                </Link>
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
