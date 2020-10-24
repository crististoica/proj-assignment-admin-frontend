import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import OpenWithIcon from "@material-ui/icons/OpenWith";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import { COLORS } from "../../../store/organisation";
import ProjectsList from "./ProjectsList";
import Modal from "../../../components/Modal/Modal";

const MyProjects = () => {
  const [data, setData] = useState(null);

  const sortDataAsc = (data, paramter) => {
    switch (paramter) {
      case "Specialization":
        return setData(
          [...data].sort((a, b) =>
            a.specialization > b.specialization ? 1 : -1
          )
        );
      case "Year":
        return setData(
          [...data].sort((a, b) => (a.year.numeral > b.year.numeral ? 1 : -1))
        );
      case "Expiration Date":
        return setData(
          [...data].sort((a, b) => (a.expireDate > b.expireDate ? 1 : -1))
        );
      default:
        return "Bad Input";
    }
  };

  const sortDataDesc = (data, parameter) => {
    switch (parameter) {
      case "Specialization":
        return setData(
          [...data].sort((a, b) =>
            a.specialization > b.specialization ? -1 : 1
          )
        );
      case "Year":
        return setData(
          [...data].sort((a, b) => (a.year.numeral > b.year.numeral ? -1 : 1))
        );
      case "Expiration Date":
        return setData(
          [...data].sort((a, b) => (a.expireDate > b.expireDate ? -1 : 1))
        );
      default:
        return "Bad Input";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios({
          method: "get",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          url: `${process.env.REACT_APP_API_URL}/admin/my-projects`,
        });

        setData(data.projects);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="row-cell row-cell-full table-container">
          <MyProjectsTable
            data={data}
            sortDataAsc={sortDataAsc}
            sortDataDesc={sortDataDesc}
          />
        </div>
      </div>
    </div>
  );
};

const MyProjectsTable = (props) => {
  const { data, sortDataAsc, sortDataDesc } = props;
  const [sortBySpecialization, setSortBySpecialization] = useState(true);
  const [sortByYear, setSortByYear] = useState(false);
  const [sortByExpirationDate, setSortByExpirationDate] = useState(false);
  const [sortDirection, setSortDirection] = useState(true);
  const [expandedData, setExpandedData] = useState(null);

  const [expand, setExpand] = useState(false);

  const getSortingParameter = (e) => {
    const parameter = e.target.textContent;
    if (!sortDirection) {
      sortDataDesc(data, parameter);
    } else {
      sortDataAsc(data, parameter);
    }
  };

  const setActiveSort = (e) => {
    setSortDirection(!sortDirection);
    switch (e.target.textContent) {
      case "Specialization":
        setSortBySpecialization(true);
        setSortByYear(false);
        setSortByExpirationDate(false);
        break;
      case "Year":
        setSortBySpecialization(false);
        setSortByYear(true);
        setSortByExpirationDate(false);
        break;
      case "Expiration Date":
        setSortBySpecialization(false);
        setSortByYear(false);
        setSortByExpirationDate(true);
        break;
      default:
        break;
    }
  };

  const deleteProject = async (index) => {
    console.log(data[index]);
    // do usual delete
  };

  const moreInfo = (index) => {
    setExpand(!expand);
    setExpandedData(data[index]);
  };

  return (
    <>
      <TableContainer component={Paper} className="table">
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell size="small" className="table-head">
                Subject
              </TableCell>
              <TableCell
                className="table-head sort-cell"
                onClick={(e) => {
                  getSortingParameter(e);
                  setActiveSort(e);
                }}
              >
                <p className="p-table">
                  {sortBySpecialization ? (
                    <span className="alert">Specialization</span>
                  ) : (
                    "Specialization"
                  )}
                </p>
              </TableCell>
              <TableCell
                className="table-head sort-cell"
                onClick={(e) => {
                  getSortingParameter(e);
                  setActiveSort(e);
                }}
              >
                <p className="p-table">
                  {sortByYear ? <span className="alert">Year</span> : "Year"}
                </p>
              </TableCell>
              <TableCell
                className="table-head sort-cell"
                onClick={(e) => {
                  getSortingParameter(e);
                  setActiveSort(e);
                }}
              >
                <p className="p-table">
                  {sortByExpirationDate ? (
                    <span className="alert">Expiration Date</span>
                  ) : (
                    "Expiration Date"
                  )}
                </p>
              </TableCell>
              <TableCell align="center" className="table-head actions">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((entry, index) => {
                const color = COLORS[entry.specialization];
                const dateNow = new Date();
                const expireDate = new Date(entry.expireDate);
                return (
                  <TableRow key={entry._id}>
                    <TableCell
                      style={{
                        backgroundColor: color,
                      }}
                    >
                      {entry.subject}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        backgroundColor: color,
                      }}
                    >
                      {entry.specialization}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        backgroundColor: color,
                      }}
                    >
                      {entry.year.text}
                    </TableCell>
                    <TableCell
                      align="center"
                      style={{
                        backgroundColor: color,
                      }}
                    >
                      {dateNow > expireDate ? (
                        <span className="alert">Expired</span>
                      ) : (
                        expireDate.toLocaleString("ro-RO")
                      )}
                    </TableCell>
                    <TableCell
                      style={{
                        backgroundColor: color,
                      }}
                    >
                      <div className="edit-icons">
                        <OpenWithIcon onClick={() => moreInfo(index)} />
                        <DeleteForeverIcon
                          onClick={() => deleteProject(index)}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {expand && (
        <Modal>
          <div className="close-modal" onClick={() => setExpand(!expand)}>
            X
          </div>
          <ProjectsList data={expandedData.listOfProjects} />
        </Modal>
      )}
    </>
  );
};

export default MyProjects;
