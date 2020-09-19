import React, { useContext, useState } from "react";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import WarningIcon from "@material-ui/icons/Warning";

import { AuthContext } from "../../../../store/Auth";
import { NonEditableRow, EditableRow } from "./TableRow";
import Modal from "../../../../components/Modal/Modal";

const TableComponent = (props) => {
  const { data, setData, setError, currentRow, setCurrentRow } = props;

  const { userState } = useContext(AuthContext);
  const [rowActive, setRowActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [rowDetails, setRowDetails] = useState({});

  const handleNameUpdate = (e) => {
    console.log(e.target.value);
  };

  const handleEntryEdit = (key, index) => {
    console.log(key);
    setCurrentRow(index);
    setRowActive(true);
  };

  const cancelEdit = () => {
    setCurrentRow(-1);
  };

  const handleEntryDelete = async (id, index) => {
    try {
      await axios({
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        url: `${process.env.REACT_APP_API_URL}/admin/delete-by-id`,
        data: {
          id,
          userId: userState.id,
        },
      });

      const newData = data.filter((el, i) => index !== i);
      setData(newData);
      setError("");
    } catch (error) {
      console.log(error.response.data.message);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <TableContainer component={Paper} style={{ overflow: "hidden" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="table-head">Name</TableCell>
              <TableCell className="table-head" align="center">
                Email
              </TableCell>
              <TableCell className="table-head" align="center">
                Specialization
              </TableCell>
              <TableCell className="table-head" align="center">
                Year
              </TableCell>
              <TableCell className="table-head" align="center">
                Group
              </TableCell>
              <TableCell className="table-head" align="center">
                Role
              </TableCell>
              <TableCell className="table-head actions" align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              ? data.map((entry, index) => {
                  const row =
                    currentRow !== index ? (
                      <NonEditableRow
                        key={entry._id}
                        entry={entry}
                        setRowDetails={setRowDetails}
                        handleEntryEdit={handleEntryEdit}
                        index={index}
                        setModalActive={setModalActive}
                      />
                    ) : (
                      <EditableRow
                        key={entry._id}
                        data={data}
                        setData={setData}
                        index={index}
                        entry={entry}
                        cancelEdit={cancelEdit}
                      />
                    );
                  return row;
                })
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      {modalActive && (
        <Modal>
          <div className="confirmation-message">
            <p>
              <WarningIcon style={{ marginRight: "1rem" }} />
              Are you sure you want to delete this entry ?
            </p>
            <div className="btn-group">
              <button
                className="btn-primary"
                onClick={() => {
                  setModalActive(false);
                  handleEntryDelete(rowDetails.id, rowDetails.index);
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

export default TableComponent;
