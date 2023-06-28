import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useEffect } from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "700px",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 12,
            color: (theme) => theme.palette.grey[500],
            "&:hover": {
              color: "#3B336B",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function ModalAmount({ openModalAmount, setOpenModalAmount }) {
  const [amountName, setAmountName] = useState("");
  const handleClose = () => {
    setOpenModalAmount(false);
  };

  useEffect(() => {
    console.log(amountName);
  }, [amountName]);

  const btnSX = {
    width: "150px",
    background: "#3B336B",
    borderRadius: "5px",
    color: "#ffff",
    padding: ".5rem",
    fontSize: "16px",
    fontWeight: 400,
    "&:hover": {
      background: "#201a42",
    },
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModalAmount}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          ชื่อหน่วยจำนวน
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div className="form-input">
            <TextField
              onChange={(e) => setAmountName(e.target.value)}
              value={amountName}
              className="text-field-custom"
              fullWidth={true}
              error={false}
              id="net"
              label="กรอกชื่อหน่วยนับ"
              size="small"
            />
            <p style={{ color: "#C4C4C4" }}>ตัวอย่างเช่น ขวด,กระป๋อง,ซอง,ถุง,กล่อง</p>
          </div>
        </DialogContent>
        <DialogActions style={{padding: "1rem"}}>
          <Button autoFocus onClick={handleClose} sx={btnSX}>
            บันทึกข้อมูล
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}

export default ModalAmount;
