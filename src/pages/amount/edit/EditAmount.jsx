import { Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
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

function EditAmount({ editAmountOpen, setEditAmountOpen, cellData, getAmounts }) {
  const handleClose = () => setEditAmountOpen(false);
  const [amountName, setAmountName] = useState("");

  useEffect(() => {
    if (editAmountOpen) {
      setAmountName(cellData.row.name || "");
    }
  }, [editAmountOpen, cellData]);

  function handleEditAmount() {
    const data = {
      name: amountName,
    };
    if (Object.values(data).some((value) => value === "" || value.length === 0)) {
      handleClose();
      Swal.fire("Error!", "Please fill in all fields.", "error").then(() => {
        setEditAmountOpen(true);
      });
      return;
    }
    axios
      .put(`amount/${cellData.row.id}`, data)
      .then(function (response) {
        handleClose();
        Swal.fire("Updated!", "Your category has been updated.", "success").then(() => {
          getAmounts();
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  return (
    <Modal
      open={editAmountOpen}
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
          Edit Amount
        </Typography>
        <TextField
          size="small"
          id="outlined-basic"
          label="Amount Name"
          variant="outlined"
          style={{ width: "100%" }}
          onChange={(e) => setAmountName(e.target.value)}
          value={amountName}
        />
        <button
          onClick={handleEditAmount}
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

export default EditAmount;
