import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import LinearProgress from "@material-ui/core/LinearProgress";

import TableComponent from "./Table";
import AddUser from "./AddUser";

import { GROUPS } from "../../../../store/organisation";

const EditUser = () => {
  const [specialization, setSpecialization] = useState(() => "CS");
  const [year, setYear] = useState(() => "first year");
  const [dropdownGroups, setDropdownGroups] = useState(
    () => GROUPS[specialization][year]
  );
  const [group, setGroup] = useState("C111");
  const [addUser, setAddUser] = useState(false);
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [currentRow, setCurrentRow] = useState(-1);

  const groupRef = useRef();

  const handleSpecializationChange = (e) => {
    setSpecialization(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleGroupChange = (e) => {
    setGroup(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setError("");
  };

  const handleInputsSearch = async () => {
    setData("");
    try {
      setLoading(true);
      const { data } = await axios({
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        url: `${process.env.REACT_APP_API_URL}/admin/get-student-by-group`,
        data: {
          group,
        },
      });

      setError("");
      setData(data);
      setLoading(false);
      setCurrentRow(-1);
    } catch (error) {
      console.log(error.response.data.message);
      setData("");
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const handleSearchByName = async () => {
    // MAKE FETCH LOGIC
    setData("");
    try {
      setLoading(true);
      const { data } = await axios({
        method: "post",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        url: `${process.env.REACT_APP_API_URL}/admin/get-student-by-name`,
        data: {
          name,
        },
      });
      setError("");
      setData(data);
      setLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setAddUser(!addUser);
  };

  useEffect(() => {
    setDropdownGroups(() => GROUPS[specialization][year]);
  }, [specialization, year]);

  useEffect(() => {
    setGroup(() => groupRef.current.value);
  }, [dropdownGroups]);

  return (
    <div className="Edit-User">
      <div className="title">
        <h3>Add & Manage Users</h3>
      </div>
      {/* CONTROLS */}
      <div className="controls">
        {/* SEARCH BY NAME */}
        <div>
          <div className="label">Search by name</div>
          <div className="control-inputs">
            <input type="text" onChange={handleNameChange} />
            <button type="submit" onClick={handleSearchByName}>
              Search
            </button>
          </div>
        </div>
        {/* SEARCH BASED ON THESE INPUTS */}
        <div className="control-container">
          {/* SPECIALIZATION */}
          <div>
            <div className="label">Spec</div>
            <div className="control-inputs">
              <select onChange={handleSpecializationChange}>
                {Object.keys(GROUPS).map((entry) => {
                  return (
                    <option key={entry} value={entry}>
                      {entry}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          {/* YEAR */}
          <div>
            <div className="label">Year</div>
            <div className="control-inputs">
              <select onChange={handleYearChange}>
                <option value="first year">first year</option>
                <option value="second year">second year</option>
                <option value="third year">third year</option>
                <option value="fourth year">fourth year</option>
              </select>
            </div>
          </div>
          {/* GROUP */}
          <div>
            <div className="label">Group</div>
            <div className="control-inputs">
              <select onChange={handleGroupChange} ref={groupRef}>
                {dropdownGroups &&
                  dropdownGroups.map((entry) => {
                    return (
                      <option key={entry} value={entry}>
                        {entry}
                      </option>
                    );
                  })}
              </select>
              <button onClick={handleInputsSearch}>Search</button>
            </div>
          </div>
        </div>
        {/* ADD NEW USER */}
        <div className="add-user-container">
          <button onClick={handleAddUser}>+</button>
          <AddUser show={addUser} setShow={setAddUser} />
        </div>
      </div>
      <div className="body">
        <TableComponent
          data={data}
          setData={setData}
          setError={setError}
          currentRow={currentRow}
          setCurrentRow={setCurrentRow}
        />
        {loading && (
          <div className="progress">
            <LinearProgress />
          </div>
        )}
        {!data && !error && !loading && (
          <h3>Use the controls above to query</h3>
        )}
        {error && (
          <h3 className="error" style={{ color: "white" }}>
            {error}
          </h3>
        )}
      </div>
    </div>
  );
};

export default EditUser;
