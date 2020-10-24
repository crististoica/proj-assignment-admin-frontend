import React from "react";
import { NavLink } from "react-router-dom";

import PeopleIcon from "@material-ui/icons/People";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import AssignmentIcon from "@material-ui/icons/Assignment";

import "./SideBar.css";

const SideBar = (props) => {
  const { active } = props;

  return (
    <div className={active ? "SideBar active" : "SideBar"}>
      <NavLink to="/dashboard/home" className="sidebar-container">
        <HomeIcon />
        <p>Home</p>
      </NavLink>
      <NavLink to="/dashboard/users" className="sidebar-container">
        <PeopleIcon />
        <p>Users</p>
      </NavLink>
      <NavLink to="/dashboard/projects" className="sidebar-container">
        <AssignmentIcon />
        <p>Projects</p>
      </NavLink>
      <NavLink to="/dashboard/settings" className="sidebar-container">
        <SettingsIcon />
        <p>Settings</p>
      </NavLink>
    </div>
  );
};

export default SideBar;
