import { createBrowserRouter } from "react-router-dom";
import GuestLayout from "./components/Layout/GuestLayout";
import Login from "./views/Login";
import Signup from "./views/Signup";
import TeamLayout from "./components/Layout/TeamLayout";
import JoinedTeam from "./views/JoinedTeam";
import CreatedTeam from "./views/CreatedTeam";
import TeamDetail from "./views/TeamDetail";

const router = createBrowserRouter([
  {
    path: "/teams",
    element: <TeamLayout />,
    children: [
      {
        path: "joined-teams",
        element: <JoinedTeam />,
      },
      {
        path: "created-teams",
        element: <CreatedTeam />,
      },
      {
        path: ":teamId",
        element: <TeamDetail />,
      }
    ]
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