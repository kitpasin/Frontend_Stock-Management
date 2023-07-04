import { Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useEffect } from "react";

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

function EditMainCategory({ editMainCateOpen, setEditMainCateOpen, mainCateData, setMainCateData, getMainCates }) {
  const handleClose = () => setEditMainCateOpen(false);
  const [mainCateName, setMainCateName] = useState("")

  function handleEditMainCate() {
    const data = {
        name: mainCateName
    }
    if (Object.values(data).some((value) => value === "" || value.length === 0)) {
      handleClose();
      Swal.fire("Error!", "Please fill in all fields.", "error").then(() => {
        setEditMainCateOpen(true);
      });
      return;
    }
    axios
      .put(`maincate/${mainCateData.id}`, data)
      .then(function (response) {
        handleClose();
        Swal.fire("Updated!", "Your category has been updated.", "success").then(() => {
          getMainCates();
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  useEffect(() => {
    if (editMainCateOpen) {
      setMainCateName(mainCateData.name || "");
    }
  }, [editMainCateOpen, mainCateData]);

  return (
    <Modal
      open={editMainCateOpen}
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
          Edit Main Category
        </Typography>
        <TextField
          size="small"
          id="outlined-basic"
          label="Main Category Name"
          variant="outlined"
          style={{ width: "100%" }}
          value={mainCateName}
          onChange={(e) => setMainCateName(e.target.value)}
        />
        <button
          onClick={handleEditMainCate}
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

export default EditMainCategory;
