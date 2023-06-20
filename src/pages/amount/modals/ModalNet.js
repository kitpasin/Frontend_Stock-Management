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

import SelectCate from "../SelectCate";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "700px",
  },
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
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
            top: 8,
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

function ModalNet({ openModal, setOpenModal }) {
  const [netName, setNetName] = useState("");
  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    console.log(netName);
  }, [netName]);

  const btnSX = {
    width: "141px",
    height: "35px",
    background: "#3B336B",
    borderRadius: "5px",
    color: "#ffff",
    "&:hover": {
      background: "#201a42",
    },
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          สร้างหน่วยปริมาณ
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <SelectCate />
          <div className="form-input">
            <TextField
              onChange={(e) => setNetName(e.target.value)}
              value={netName}
              className="text-field-custom"
              fullWidth={true}
              error={false}
              id="net"
              label="หน่วยปริมาณสุทธิ"
              size="small"
            />
            <p style={{ color: "#C4C4C4" }}>ตัวอย่างเช่น ml,gm,kg,L</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} sx={btnSX}>
            บันทึกข้อมูล
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default ModalNet;
