import { FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Swal from "sweetalert2";

function CreateSubCategory({ mainCatesData, createSubCateOpen, setCreateSubCateOpen, getSubCates }) {
  const [subCateName, setSubCateName] = useState([]);
  const [selectedMainCategory, setSelectMainCategory] = useState("")

  const handleClose = () => setCreateSubCateOpen(false);

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

  function handleCreateSubCate() {
    const data = {
      name: subCateName,
      main_cate_id: selectedMainCategory,
    };
    if (data.name === "" || data.name.length === 0 || data.main_cate_id === "" || data.main_cate_id.length === 0) {
      handleClose();
      Swal.fire("Error!", "Please fill in all fields.", "error").then(() => {
        createSubCateOpen(true);
      });
    } else {
      axios
        .post("subcate", data)
        .then(function (response) {
          handleClose();
          Swal.fire("Created!", "Your category has been created.", "success").then(() => {
            getSubCates();
            setSubCateName("");
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }
  return (
    <Modal
      open={createSubCateOpen}
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
          Create Sub Category
        </Typography>
        <TextField
          size="small"
          id="outlined-basic"
          label="Main Category Name"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => setSubCateName(e.target.value)}
        />
        <Box>
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel style={{ height: "100%" }} id="demo-simple-small-label">
              Main Category
            </InputLabel>
            <Select
              size="small"
              labelId="demo-simple-select-label"
              id="demo-select-small"
              label="Main Category"
              onChange={(e) => setSelectMainCategory(e.target.value)}
            >
              {mainCatesData.map((mainCate, index) => (
                <MenuItem key={index} value={mainCate.id}>{mainCate.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <button
          onClick={handleCreateSubCate}
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

export default CreateSubCategory;
