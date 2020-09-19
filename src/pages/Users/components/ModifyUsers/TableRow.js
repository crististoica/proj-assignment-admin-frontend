import React, { useState, useEffect } from "react";
import axios from "axios";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import DoneIcon from "@material-ui/icons/Done";
import CloseIcon from "@material-ui/icons/Close";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

export const NonEditableRow = (props) => {
  const {
    entry,
    handleEntryEdit,
    index,
    setRowDetails,
    setModalActive,
  } = props;

  return (
    <>
      <TableRow>
        <TableCell>{entry.name}</TableCell>
        <TableCell align="center">{entry.email}</TableCell>
        <TableCell align="center">{entry.specialization}</TableCell>
        <TableCell align="center">{entry.year}</TableCell>
        <TableCell align="center">{entry.group}</TableCell>
        <TableCell align="center">{entry.role}</TableCell>
        <TableCell align="center">
          <div className="edit-icons">
            <EditIcon onClick={() => handleEntryEdit(entry._id, index)} />
            <DeleteForeverIcon
              // onClick={() => handleEntryDelete(entry._id, index)}
              onClick={() => {
                setRowDetails({ id: entry._id, index });
                setModalActive(true);
              }}
            />
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export const EditableRow = (props) => {
  const { entry, cancelEdit, data, setData, index } = props;

  const [editedKey, setEditedKey] = useState("");
  const [editedValue, setEditedValue] = useState("");
  const [editedData, setEditedData] = useState(entry);

  const handleNameEdit = (e) => {
    setEditedKey("name");
    setEditedValue(e.target.value);
  };

  const handleEmailEdit = (e) => {
    setEditedKey("email");
    setEditedValue(e.target.value);
  };

  const handleSpecializationEdit = (e) => {
    setEditedKey("specialization");
    setEditedValue(e.target.value);
  };

  const handleYearEdit = (e) => {
    setEditedKey("year");
    setEditedValue(e.target.value);
  };

  const handleGroupEdit = (e) => {
    setEditedKey("group");
    setEditedValue(e.target.value);
  };

  const handleRoleEdit = (e) => {
    setEditedKey("role");
    setEditedValue(e.target.value);
  };

  const confirmEdit = async () => {
    try {
      await axios({
        method: "put",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        url: `${process.env.REACT_APP_API_URL}/admin/update-entry`,
        data: {
          editedData,
        },
      });
      // check if group has changed
      // if has changed remove the entry from the data array
      if (editedData.group !== data[index].group) {
        const newData = data.filter((el, i) => index !== i);
        setData(newData);
      } else {
        data[index] = editedData;
      }
      cancelEdit();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  /** 
  dynamically update edited data with the modified values
  @return {Object} editedData Modifed values that needs to be send to the server
  # [*] handle all data: specialization, group, role...
  **/
  useEffect(() => {
    setEditedData((editedData) => {
      return { ...editedData, [editedKey]: editedValue };
    });
  }, [editedKey, editedValue]);

  return (
    <TableRow className="active-editable-row">
      <TableCell size="small">
        <input
          className="editable-row-input"
          type="text"
          defaultValue={entry.name}
          onChange={handleNameEdit}
        />
      </TableCell>
      <TableCell align="center" size="small">
        <input
          className="editable-row-input"
          type="email"
          defaultValue={entry.email}
          onChange={handleEmailEdit}
        />
      </TableCell>
      <TableCell align="center">
        <input
          className="editable-row-input"
          type="text"
          defaultValue={entry.specialization}
          onChange={handleSpecializationEdit}
        />
      </TableCell>
      <TableCell align="center">
        <input
          className="editable-row-input"
          type="text"
          defaultValue={entry.year}
          onChange={handleYearEdit}
        />
      </TableCell>
      <TableCell align="center">
        <input
          className="editable-row-input"
          type="text"
          defaultValue={entry.group}
          onChange={handleGroupEdit}
        />
      </TableCell>
      <TableCell align="center">
        <input
          className="editable-row-input"
          type="text"
          defaultValue={entry.role}
          onChange={handleRoleEdit}
        />
      </TableCell>
      <TableCell align="center">
        <div className="edit-icons">
          <DoneIcon onClick={confirmEdit} />
          <CloseIcon onClick={cancelEdit} />
        </div>
      </TableCell>
    </TableRow>
  );
};
