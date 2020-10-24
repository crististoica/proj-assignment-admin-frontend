import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./styles.css";

const GROUPS = {
  CS: {
    "first year": ["C111", "C112", "C113", "C121", "C122", "C123"],
    "second year": ["C211", "C212", "C213", "C221", "C222", "C223"],
    "third year": ["C311", "C312", "C313", "C321", "C322", "C323"],
    "fourth year": ["C411", "C412", "C413", "C421", "C422", "C423"],
  },
  RST: {
    "first year": ["RST111", "RST112", "RST113", "RST121", "RST122", "RST123"],
    "second year": ["RST211", "RST212", "RST213", "RST221", "RST222", "RST223"],
    "third year": ["RST311", "RST312", "RST313", "RST321", "RST322", "RST323"],
    "fourth year": ["RST411", "RST412", "RST413", "RST421", "RST422", "RST423"],
  },
  EA: {
    "first year": ["EA111", "EA112", "EA113", "EA121", "EA122", "EA123"],
    "second year": ["EA211", "EA212", "EA213", "EA221", "EA222", "EA223"],
    "third year": ["EA311", "EA312", "EA313", "EA321", "EA322", "EA323"],
    "fourth year": ["EA411", "EA412", "EA413", "EA421", "EA422", "EA423"],
  },
};

const AddUser = ({ show, setShow }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialization, setSpecialization] = useState(() => "CS");
  const [year, setYear] = useState(() => "first year");
  const [dropdownGroups, setDropdownGroups] = useState(
    () => GROUPS[specialization][year]
  );
  const [group, setGroup] = useState("C111");
  const [role, setRole] = useState("Student");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [disabled, setDisabled] = useState(false);
  const groupRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  const handleNameChange = (e) => {
    setName(e.target.value);
    setMessage("");
    setError("");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMessage("");
    setError("");
  };

  const handleSpecializationChange = (e) => {
    setSpecialization(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleGroupChange = (e) => {
    setGroup(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    if (e.target.value === "admin") {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        url: `${process.env.REACT_APP_API_URL}/admin/add-user`,
        data: {
          name,
          email,
          specialization: role === "admin" ? "" : specialization,
          year: role === "admin" ? "" : year,
          group: role === "admin" ? "" : group,
          role,
        },
      });
      setError("");
      setMessage(data.message);
      nameRef.current.value = "";
      emailRef.current.value = "";
    } catch (error) {
      setMessage("");
      setError(error.response.data.message);
    }
  };

  const handleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    setDropdownGroups(() => GROUPS[specialization][year]);
  }, [specialization, year]);

  useEffect(() => {
    setGroup(() => groupRef.current.value);
  }, [dropdownGroups]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
      setError("");
    }, 2000);

    return () => clearTimeout(timer);
  }, [error, message]);

  return (
    <div className={show ? "Add-User Add-User-active" : "Add-User"}>
      <div className="close-modal" onClick={handleShow}>
        X
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="title title-flex-end">
          <h3>Add User</h3>
          {/* success message */}
          <div
            className="form-message"
            style={{
              opacity: message ? 1 : 0,
              backgroundColor: "#4EBC5E",
            }}
          >
            {message}
          </div>
          {/* error message */}
          <div
            className="form-message"
            style={{
              opacity: error ? 1 : 0,
              backgroundColor: "#DF2935",
            }}
          >
            {error}
          </div>
        </div>

        {/* NAME */}
        <div className="form-entry">
          <label htmlFor="name">Name:</label>
          <input
            type="name"
            name="name"
            id="name"
            ref={nameRef}
            onChange={handleNameChange}
          />
        </div>
        {/* EMAIL */}
        <div className="form-entry">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            ref={emailRef}
            onChange={handleEmailChange}
          />
        </div>
        {/* ROLE */}
        <div className="form-entry">
          <label htmlFor="role">Role:</label>
          <select name="role" id="role" onChange={handleRoleChange}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {/* 3 COLUMNS DIW */}
        <div
          className="form-entry-columns"
          style={
            disabled
              ? {
                  pointerEvents: "none",
                  opacity: "0.4",
                }
              : {}
          }
        >
          {/* SPECIALIZATION*/}
          <div className="form-entry">
            <label htmlFor="specialization">Specialization:</label>
            <select
              name="specialization"
              id="specialization"
              onChange={handleSpecializationChange}
            >
              {Object.keys(GROUPS).map((entry) => {
                return (
                  <option key={entry} value={entry}>
                    {entry}
                  </option>
                );
              })}
            </select>
          </div>
          {/* YEAR */}
          <div className="form-entry">
            <label htmlFor="year">Year:</label>
            <select name="year" id="year" onChange={handleYearChange}>
              <option value="first year">first year</option>
              <option value="second year">second year</option>
              <option value="third year">third year</option>
              <option value="fourth year">fourth year</option>
            </select>
          </div>
          {/* GROUP */}
          <div className="form-entry">
            <label htmlFor="group">Group:</label>
            <select
              name="group"
              id="group"
              onChange={handleGroupChange}
              ref={groupRef}
            >
              {dropdownGroups &&
                dropdownGroups.map((entry) => {
                  return (
                    <option key={entry} value={entry}>
                      {entry}
                    </option>
                  );
                })}
            </select>
          </div>
        </div>

        <button className="primary-btn" onClick={handleFormSubmit}>
          Add
        </button>
      </form>
    </div>
  );
};

export default AddUser;
