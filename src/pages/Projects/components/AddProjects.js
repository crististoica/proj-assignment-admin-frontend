import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import NoteAddIcon from "@material-ui/icons/NoteAdd";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import HelpIcon from "@material-ui/icons/Help";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import WarningIcon from "@material-ui/icons/Warning";
import Tooltip from "@material-ui/core/Tooltip";

import Modal from "../../../components/Modal/Modal";
import { GROUPS } from "../../../store/organisation";

const AddProjects = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const [projectTitles, setProjectTitles] = useState([]);
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const textareaEl = useRef(null);

  const handleProjects = () => {
    const addedProjects = textareaEl.current.value.split(/[\r\n]+/);
    if (addedProjects.length > 100) {
      setMessage("You can add at most 100 projects");
      setError(true);
      return;
    }
    setProjectTitles(addedProjects.filter((title) => title !== ""));
  };

  useEffect(() => {
    const temp = [];
    projectTitles.forEach((title) => {
      const splittedString = title.split("/desc");
      temp.push({
        title: splittedString[0].trim(),
        description: splittedString[1] ? splittedString[1].trim() : null,
        limit: 1,
      });
    });

    setProjects(temp);
  }, [projectTitles]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
      setError(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [error, message]);

  return (
    <div className="row">
      <div className="row-cell row-cell-large">
        <div className="subtitle">
          <p className="p-center">
            Use the textarea or <NoteAddIcon className="logo" /> to add a list
            of projects.
          </p>
          <p>Each project title must be on its own row.</p>
          <Tooltip
            className="help"
            title={
              <div
                style={{
                  fontSize: ".8rem",
                }}
              >
                Use "/desc" to add description <br /> EX: Project title /desc
                Project description will result in: <br /> Title = "Project
                title" and Description = "Project description"
              </div>
            }
          >
            <HelpIcon className="logo" />
          </Tooltip>
        </div>
        <div className="container">
          <textarea
            ref={textareaEl}
            onFocus={() => setShowOverlay(false)}
            onBlur={() =>
              projectTitles.length === 0 ? setShowOverlay(true) : null
            }
          ></textarea>
          {showOverlay && (
            <div className="overlay">
              <p>Add Your Projects</p>
            </div>
          )}
        </div>
        <div className="controls">
          <button className="btn-primary btn-with-icon ">
            <label htmlFor="add-file" className="btn-pseudo">
              <NoteAddIcon className="logo-primary" />{" "}
            </label>
          </button>
          <input type="file" id="add-file" />
          <button
            className="btn-primary btn-with-icon"
            onClick={handleProjects}
          >
            Add Projects <ArrowForwardIcon />
          </button>
        </div>
      </div>
      <div className="row-cell row-cell-large">
        <div className="subtitle">
          <p className="p-center">
            After pressing <span className="highlight-span">Add Projects</span>,
            your projects will appear bellow.
          </p>
          <div
            className="form-message"
            style={{
              backgroundColor: error ? "#DF2935" : "#4EBC5E",
              opacity: message ? 1 : 0,
            }}
          >
            {message}
          </div>
        </div>

        <ProjectsTable
          projects={projects}
          setMessage={setMessage}
          setError={setError}
        />
      </div>
    </div>
  );
};

const ProjectsTable = (props) => {
  const { projects, setMessage, setError } = props;
  const [modalActive, setModalActive] = useState(false);
  const [specialization, setSpecialization] = useState("CS");
  const [year, setYear] = useState("first year");
  const [subject, setSubject] = useState("");
  const [expireDate, setExpireDate] = useState("");

  const submitData = async () => {
    try {
      const dataBody = {
        subject,
        year,
        specialization,
        expireDate,
        listOfProjects: projects,
      };

      const { data } = await axios({
        method: "post",
        headers: {
          Authorization: "Bearer+ " + localStorage.getItem("token"),
        },
        url: `${process.env.REACT_APP_API_URL}/admin/add-projects`,
        data: dataBody,
      });
      setMessage(data.message);
      setError(false);
    } catch (error) {
      console.log(error.message);
      setMessage(error.message);
      setError(true);
    }
  };

  return (
    <>
      <div className="container">
        <div className="controls controls-fixed">
          {/* SPECIALIZATION */}
          <div>
            <div className="label">Spec</div>
            <div className="control-inputs">
              <select onChange={(e) => setSpecialization(e.target.value)}>
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
              <select onChange={(e) => setYear(e.target.value)}>
                <option value="first year">first year</option>
                <option value="second year">second year</option>
                <option value="third year">third year</option>
                <option value="fourth year">fourth year</option>
              </select>
            </div>
          </div>
          {/* SUBJECT*/}
          <div>
            <div className="label">
              <p className="p-center">Subject</p>
            </div>
            <div className="control-inputs">
              <input type="text" onChange={(e) => setSubject(e.target.value)} />
            </div>
          </div>
          {/* EXPIRE DATE */}
          <div>
            <div className="label">
              <p className="p-center">Deadline</p>
            </div>
            <div className="control-inputs">
              <input
                type="datetime-local"
                onChange={(e) => setExpireDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <TableContainer component={Paper} className="table">
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell className="table-head">Title</TableCell>
                <TableCell className="table-head">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.length > 0 &&
                projects.map((project, index) => {
                  return (
                    <TableRow key={project.title + index + ""}>
                      <TableCell>{project.title}</TableCell>
                      <TableCell>{project.description || "/"}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div className="controls">
        <button
          className="btn-primary"
          onClick={() => (projects.length > 0 ? setModalActive(true) : null)}
        >
          Save
        </button>
      </div>
      {modalActive && (
        <Modal>
          <div className="confirmation-message">
            <p>
              <WarningIcon style={{ marginRight: "1rem" }} />
              Are you sure you want to save ?
            </p>
            <div className="btn-group">
              <button
                className="btn-primary"
                onClick={() => {
                  setModalActive(false);
                  submitData();
                }}
              >
                Yes
              </button>
              <button
                className="btn-primary"
                onClick={() => setModalActive(false)}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddProjects;
