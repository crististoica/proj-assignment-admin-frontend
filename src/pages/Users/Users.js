import React from "react";

import EditUser from "./components/ModifyUsers/EditUser";

import "./Users.css";

const Users = () => {
  return (
    <div className="Users">
      <div className="users-top">
        <EditUser />
      </div>
    </div>
  );
};

export default Users;
