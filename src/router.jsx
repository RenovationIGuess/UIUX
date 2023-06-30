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
import TeamTaskDetail from "./views/TeamTaskDetail";
import TeamMeetings from "./views/TeamMeetings";
import TeamProjects from "./views/TeamProjects";
import TeamYourStats from "./views/TeamYourStats";
import TeamProjectDetail from "./views/TeamProjectDetail";
import UserProfile from "./views/UserProfile";
import UserProfileLayout from "./components/Layout/UserProfileLayout";
import CalendarList from "./views/CalendarList";
import CalendarDetailLayout from "./components/Layout/CalendarDetailLayout"
import CalendarDetail from "./views/CalendarDetail";
import NotFound from "./views/NotFound";

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
      },
      {
        path: ":teamId/tasks/:taskId",
        element: <TeamTaskDetail />,
      },
      {
        path: ":teamId/meetings",
        element: <TeamMeetings />,
      },
      {
        path: ":teamId/projects",
        element: <TeamProjects />,
      },
      {
        path: ":teamId/projects/:projectId",
        element: <TeamProjectDetail />,
      },
      {
        path: ":teamId/your-stats",
        element: <TeamYourStats />,
      }
    ]
  },
  {
    path: 'workspace/:workspaceId',
    element: <CalendarDetailLayout />,
    children: [
      {
        path: '',
        element: <CalendarDetail />
      }
    ]
  },
  {
    path: "profile",
    element: <UserProfileLayout />,
    children: [
      {
        path: "",
        element: <UserProfile />
      }
    ]
  },
  {
    path: "workspace",
    element: <TeamListLayout />,
    children: [
      {
        path: "",
        element: <CalendarList />,
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
  },
  {
    path: "*",
    element: <TeamListLayout />,
    children: [
      {
        path: "*",
        element: <NotFound />,
      }
    ],
  }
]);

export default router;