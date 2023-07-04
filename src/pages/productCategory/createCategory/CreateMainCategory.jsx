import { Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Swal from "sweetalert2";

function CreateMainCategory({ mainCateOpen, setMainCateOpen, getMainCates }) {
  const [mainCateName, setMainCateName] = useState([]);

  const handleClose = () => setMainCateOpen(false);

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

  function handleCreateMainCate() {
    const data = {
      name: mainCateName,
    };
    if (data.name === "" || data.name.length === 0) {
      handleClose();
      Swal.fire("Error!", "Please fill in all fields.", "error").then(() => {
        setMainCateOpen(true);
      });
    } else {
      axios
        .post("maincate", data)
        .then(function (response) {
          handleClose();
          Swal.fire("Created!", "Your category has been created.", "success").then(() => {
            getMainCates();
            setMainCateName("");
          });
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  }
  return (
    <Modal
      open={mainCateOpen}
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
          Create Main Category
        </Typography>
        <TextField
          size="small"
          id="outlined-basic"
          label="Main Category Name"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => setMainCateName(e.target.value)}
        />
        <button
          onClick={handleCreateMainCate}
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

export default CreateMainCategory;
