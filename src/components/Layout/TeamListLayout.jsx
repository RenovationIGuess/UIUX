import { Outlet } from "react-router-dom";
import DefaultNavbar from "../Navbar/DefaultNavbar";
import Sidebar from "../Sidebar/Sidebar";
import { ToastContainer } from "react-toastify";

const TeamListLayout = () => {
  const handleToggleSidebar = (type) => {
    const sidebar = document.querySelector(".sidebar-container");
    const openSidebarIcon = document.querySelector(".open-sidebar-icon");

    sidebar.classList.toggle("sidebar-container--closed");

    if (type === "open") {
      openSidebarIcon.classList.toggle("hidden");
    } else {
      setTimeout(() => {
        openSidebarIcon.classList.toggle("hidden");
      }, 300);
    }
  };

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-background-gray">
      <Sidebar handleToggleSidebar={handleToggleSidebar} />
      <div className="flex-1 flex flex-col">
        <DefaultNavbar handleToggleSidebar={handleToggleSidebar} />
        <Outlet />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default TeamListLayout;
