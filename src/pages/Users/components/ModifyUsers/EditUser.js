import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import LinearProgress from "@material-ui/core/LinearProgress";

import TableComponent from "./Table";
import AddUser from "./AddUser";

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
        <h3>View & Edit</h3>
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
