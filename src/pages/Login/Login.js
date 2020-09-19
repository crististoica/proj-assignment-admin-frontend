import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

import { AuthContext } from "../../store/Auth";

import "./Login.css";

const theme = JSON.parse(localStorage.getItem("theme"));

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { userDispatch } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}/admin/login`,
        data: {
          email,
          password,
        },
      });

      localStorage.setItem("token", data.token);
      userDispatch({
        type: "LOGIN",
        data: {
          username: data.username,
          id: data.id,
        },
      });
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (theme) {
      document.documentElement.style.setProperty("--clr-bg", theme.bgColor);
      document.documentElement.style.setProperty("--clr-fg", theme.fgColor);
      document.documentElement.style.setProperty(
        "--clr-primary",
        theme.primaryColor
      );
      document.documentElement.style.setProperty(
        "--clr-hover",
        theme.primaryColor
      );
      document.documentElement.style.setProperty(
        "--clr-txt-primary",
        theme.fontPrimaryColor
      );
      document.documentElement.style.setProperty(
        "--clr-txt-secondary",
        theme.fontSecondaryColor
      );
    }
  }, []);

  return (
    <form className="Login" onSubmit={handleFormSubmit}>
      <div
        className="error"
        style={{
          opacity: error ? 1 : 0,
        }}
      >
        {error}
      </div>
      <div className="form-entry">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          onChange={handleEmailChange}
        />
      </div>
      <div className="form-entry">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={handlePasswordChange}
        />
      </div>
      <button className="login-btn">
        {loading ? <CircularProgress size=".8rem" /> : "Login"}
      </button>
    </form>
  );
};

export default Login;
