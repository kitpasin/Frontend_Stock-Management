import { Autocomplete, Checkbox, Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";

const modalStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  bgcolor: "#fff",
  boxShadow: 24,
  padding: "1rem",
  borderRadius: "10px",
};
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function EditNet({ mainCatesData, editNetOpen, setEditNetOpen, cellData, getNets }) {
  const handleClose = () => setEditNetOpen(false);  
  const [netName, setNetName] = useState("");
  const [categories, setCategories] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    if (editNetOpen) {
      setNetName(cellData.row.name || "");
      
      const selectedIds = cellData.row.main_cate_id.split(", ");
      const selectedOptions = mainCatesData.filter((option) =>
        selectedIds.includes(option.id.toString())
      );
      setSelectedOptions(selectedOptions || []);
    }
  }, [editNetOpen, cellData, mainCatesData]);

  function handleEditNet() {
    const data = {
        name: netName,
        main_cate_id: categories
    }
    if (Object.values(data).some((value) => value === "" || value.length === 0)) {
      handleClose();
      Swal.fire("Error!", "Please fill in all fields.", "error").then(() => {
        setEditNetOpen(true);
      });
      return;
    }
    axios
      .put(`net/${cellData.row.id}`, data)
      .then(function (response) {
        handleClose();
        Swal.fire("Updated!", "Your category has been updated.", "success").then(() => {
          getNets();
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  return (
    <Modal
      open={editNetOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <CloseIcon
          onClick={handleClose}
          style={{ position: "absolute", top: "1rem", right: "1rem", cursor: "pointer" }}
        />

        <Typography
          id="modal-modal-title"
          style={{ textAlign: "center", fontWeight: "500", fontSize: "1.75rem" }}
        >
          Edit Net
        </Typography>
        <TextField
          size="small"
          id="outlined-basic"
          label="Net Name"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => setNetName(e.target.value)}
          value={netName}
        />
        <Autocomplete
          size="small"
          multiple
          id="checkboxes-tags-demo"
          options={mainCatesData}
          disableCloseOnSelect
          getOptionLabel={(option) => option.name}
          value={selectedOptions}
          onChange={(event, value) => {
            setSelectedOptions(value);
            const selectedValues = value.map((option) => option.id);
            const mainCateIdsString = selectedValues.join(", ");
            setCategories(mainCateIdsString);
          }}
          renderOption={(props, option) => {
            const selected = selectedOptions.some(
              (selectedOption) => selectedOption.id === option.id
            );
            return (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                  value={option.id}
                />
                {option.name}
              </li>
            );
          }}
          style={{ width: "100%", maxWidth: "776px" }}
          renderInput={(params) => (
            <TextField
              size="small"
              {...params}
              label="หมวดหมู่หลัก"
              value={selectedOptions.map((option) => option.name).join(", ")}
            />
          )}
        />
        <button
          onClick={handleEditNet}
          style={{
            background: "#3b326b",
            fontWeight: "400",
            fontSize: "16px",
            padding: ".5rem 1rem",
            color: "#fff",
            borderRadius: "5px",
          }}
        >
          Submit
        </button>
      </Box>
    </Modal>
  );
}

export default EditNet;
