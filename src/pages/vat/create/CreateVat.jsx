import { Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
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

function CreateVat({ createVatOpen, setCreateVatOpen, getVats }) {
  const [vatName, setVatName] = useState("");
  const [percent, setPercent] = useState("");
  const handleClose = () => setCreateVatOpen(false);
  async function handleCreateVat() {
    const data = {
      name: vatName,
      percent: percent,
    };
    if (Object.values(data).some((value) => value === "" || value.length === 0)) {
      handleClose();
      Swal.fire("Error!", "Please fill in all fields.", "error").then(() => {
        setCreateVatOpen(true);
      });
      return;
    }
    if (isNaN(percent) || percent === "") {
      handleClose();
      Swal.fire("Error!", "Please enter a valid percentage.", "error").then(() => {
        setCreateVatOpen(true);
      });
      return;
    }
    await axios
      .post(`vat`, data)
      .then(function (response) {
        handleClose();
        Swal.fire("Created!", "Your vat has been created.", "success").then(() => {
          getVats();
          setVatName("");
          setPercent("");
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  return (
    <Modal
      open={createVatOpen}
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
          Create Vat
        </Typography>
        <TextField
          size="small"
          id="outlined-basic"
          label="Vat Name"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => setVatName(e.target.value)}
          value={vatName}
        />
        <TextField
          size="small"
          id="outlined-basic"
          label="Vat Percent"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => setPercent(e.target.value)}
          value={percent}
        />
        <button
          onClick={handleCreateVat}
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

export default CreateVat;
