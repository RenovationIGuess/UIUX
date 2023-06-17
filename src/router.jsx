import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./components/Layout/GuestLayout";
import Login from "./views/Login";
import Signup from "./views/Signup";
import TeamDetailLayout from "./components/Layout/TeamDetailLayout";
import TeamListLayout from "./components/Layout/TeamListLayout";
import JoinedTeam from "./views/JoinedTeam";
import CreatedTeam from "./views/CreatedTeam";
import TeamDashboard from "./views/TeamDashboard";
import TeamMembers from "./views/TeamMembers";
import TeamMemberDetail from "./views/TeamMemberDetail";
import TeamTasks from "./views/TeamTasks";

const router = createBrowserRouter([
  {
    path: "/team",
    element: <TeamDetailLayout />,
    children: [
      {
        path: ":teamId/dashboard",
        element: <TeamDashboard />,
      },
      {
        path: ":teamId/members",
        element: <TeamMembers />,
      },
      {
        path: ":teamId/members/:memberId",
        element: <TeamMemberDetail />,
      },
      {
        path: ":teamId/tasks",
        element: <TeamTasks />,
      }
    ]
  },
  {
    path: "/teams",
    element: <TeamListLayout />,
    children: [
      {
        path: "created",
        element: <CreatedTeam />,
      },
      {
        path: "joined",
        element: <JoinedTeam />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      }
    ]
  }
]);

export default router;