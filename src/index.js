import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import AuthGlobalStateProvider from "./store/Auth";

ReactDOM.render(
  <React.StrictMode>
    <AuthGlobalStateProvider>
      <App />
    </AuthGlobalStateProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
