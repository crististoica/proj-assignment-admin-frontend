import React from "react";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

const ProjectsList = (props) => {
  const { data } = props;

  return (
    <div className="row-cell row-cell-full table-container">
      <TableContainer component={Paper} className="table">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell className="table-head">Title</TableCell>
              <TableCell className="table-head">Description</TableCell>
              <TableCell className="table-head">Taken By</TableCell>
              <TableCell align="center" className="table-head actions">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((entry) => {
                return (
                  <TableRow key={entry._id}>
                    <TableCell>{entry.title}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell>
                      {entry.takenBy[0] || (
                        <span className="alert">Not taken yet</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="edit-icons">
                        <EditIcon />
                        <DeleteForeverIcon />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProjectsList;
