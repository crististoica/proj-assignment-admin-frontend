import React, { useContext, useEffect } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import axios from "axios";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";
import { ProtectedRoute, RedirectRoute } from "./routes/SpecialRoutes";
import { AuthContext } from "./store/Auth";

function App() {
  const { userState, userDispatch } = useContext(AuthContext);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios(
          `${process.env.REACT_APP_API_URL}/admin/verify-token`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        userDispatch({
          type: "LOGIN",
          data: {
            username: data.username,
            id: data.id,
          },
        });
      } catch (error) {
        userDispatch({ type: "LOGOUT" });
      }
    };

    checkAuth();
  }, [userDispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch className="Switch">
          <ProtectedRoute
            path="/dashboard"
            loggedIn={userState.loggedIn}
            component={Dashboard}
          />
          <ProtectedRoute
            path="/dashboard/settings"
            loggedIn={userState.loggedIn}
            component={Settings}
          />
          <RedirectRoute
            path="/"
            loggedIn={userState.loggedIn}
            component={Login}
          />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
