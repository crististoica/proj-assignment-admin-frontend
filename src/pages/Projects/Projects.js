import React, { useState, useEffect } from "react";
import { Switch, NavLink, Route, useHistory } from "react-router-dom";

import InnerNavBar from "./components/InnerNavBar";
import AddProjects from "./components/AddProjects";
import MyProjects from "./components/MyProjects";

import "./Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const history = useHistory();

  useEffect(() => {
    history.push("/dashboard/projects/add-projects");
  }, [history]);

  const readFile = (e) => {
    e.preventDefault();

    //get file extension and check if it is .txt
    const name = e.target.files[0].name;
    const lastDot = name.lastIndexOf(".");

    const ext = name.substring(lastDot + 1);
    console.log(ext);

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const arr = text.split(/[\r\n]+/);

      arr.pop();
      setProjects(arr);
    };
    reader.readAsText(file);
  };

  return (
    <div className="Assignments">
      <div className="title">
        <h3>Add & Manage Projects</h3>
      </div>
      {/* NAVBAR */}
      <InnerNavBar>
        <NavLink to="/dashboard/projects/add-projects" className="inner-link">
          Add Projects
        </NavLink>
        <NavLink to="/dashboard/projects/my-projects" className="inner-link">
          My Projects
        </NavLink>
      </InnerNavBar>
      <Switch>
        <Route
          path="/dashboard/projects/add-projects"
          component={AddProjects}
        />
        <Route path="/dashboard/projects/my-projects" component={MyProjects} />
      </Switch>
    </div>
  );
};

export default Projects;
