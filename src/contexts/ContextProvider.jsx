/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import dummyData from "../constant/dummyData";

const StateContext = createContext({
  currentUser: {},
  setCurrentUser: () => {},
  users: [],
  setUsers: () => {},
  tasks: [],
  setTasks: () => {},
  projects: [],
  setProjects: () => {},
  teams: [],
  setTeams: () => {},
});

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState(dummyData.dummyUsersData);
  const [tasks, setTasks] = useState(dummyData.dummyTasksData);
  const [projects, setProjects] = useState(dummyData.dummyProjectsData);
  const [teams, setTeams] = useState(dummyData.dummyTeamsData);

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        tasks,
        setTasks,
        projects,
        setProjects,
        teams,
        setTeams,
        users,
        setUsers,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const KrdStateContext = () => useContext(StateContext);
