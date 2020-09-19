import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../store/Auth";

import NavBar from "../../components/NavBar/NavBar";

const Dashboard = () => {
  const { userState, userDispatch } = useContext(AuthContext);
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(userState.username);
  }, [userState]);

  return (
    <div>
      <NavBar username={username} userDispatch={userDispatch} />
    </div>
  );
};

export default Dashboard;
