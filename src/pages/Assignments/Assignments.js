import React, { useState } from "react";

import "./Assignments.css";

const Assignments = () => {
  const [projects, setProjects] = useState([]);

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
        <h3>Set Assignments</h3>
      </div>

      <input type="file" onChange={readFile} />
    </div>
  );
};

export default Assignments;
