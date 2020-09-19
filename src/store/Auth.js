import React, { createContext, useReducer } from "react";

export const AuthContext = createContext({});

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        loggedIn: true,
        username: action.data.username,
        id: action.data.id,
      };
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        loggedIn: false,
        username: null,
        id: null,
      };
    default:
      return state;
  }
};

const useGlobalState = () => {
  const [userState, userDispatch] = useReducer(reducer, {
    loggedIn: false,
    username: null,
    id: null,
  });

  return { userState, userDispatch };
};

const AuthGlobalStateProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={useGlobalState()}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthGlobalStateProvider;
