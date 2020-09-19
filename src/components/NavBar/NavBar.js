import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";

import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import MenuIcon from "@material-ui/icons/Menu";

import SideBar from "../SideBar/SideBar";
import Users from "../../pages/Users/Users";
import Home from "../../pages/Home/Home";
import Settings from "../../pages/Settings/Settings";
import Assignments from "../../pages/Assignments/Assignments";

import "./NavBar.css";

const NavBar = (props) => {
  const { username, userDispatch } = props;
  const [active, setActive] = useState(false);
  const [submenuToggle, setSubmenuToggle] = useState(false);

  const handleSideBarToggle = () => {
    setActive(!active);
  };

  const handleSubmenuToggle = () => {
    setSubmenuToggle(!submenuToggle);
  };

  const handleLogout = () => {
    userDispatch({ type: "LOGOUT" });
  };

  return (
    <div className="NavBar">
      <div className="navbar-container">
        <MenuIcon
          onClick={handleSideBarToggle}
          className="sidebar-toggle"
          style={{
            cursor: "pointer",
            color: active ? "gray" : "inherit",
          }}
        />
      </div>
      <div
        className="navbar-container username-container"
        onClick={handleSubmenuToggle}
      >
        <p>{username}</p>
        <AccountCircleIcon />
        <div
          className="submenu"
          style={{
            opacity: submenuToggle ? 1 : 0,
          }}
        >
          <div className="submenu-btn" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
      <div className="content-body">
        <SideBar active={active} />
        <Switch>
          <Route path="/dashboard/home" component={Home} />
          <Route path="/dashboard/users" component={Users} />
          <Route path="/dashboard/assignments" component={Assignments} />
          <Route path="/dashboard/settings" component={Settings} />
        </Switch>
      </div>
    </div>
  );
};

export default NavBar;
