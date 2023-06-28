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

function VatModal({ openModal, setOpenModal }) {
  const [vatName, setVatName] = useState("");
  const [vat, setVat] = useState("");
  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    console.log(vatName);
    console.log(vat);
  }, [vatName, vat]);

  const btnSX = {
    width: "150px",
    padding: ".5rem",
    fontWeight: 400,
    fontSize: "16px",
    background: "#3B336B",
    borderRadius: "5px",
    color: "#ffff",
    "&:hover": {
      background: "#201a42",
    },
  };

  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          สร้าง Vat ใหม่
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextField
            onChange={(e) => setVatName(e.target.value)}
            value={vatName}
            className="text-field-custom"
            fullWidth={true}
            error={false}
            id="vat-name"
            label="ชื่อหมวดหมู่ Vat"
            size="small"
          />
          <TextField
            onChange={(e) => setVat(e.target.value)}
            value={vat}
            className="text-field-custom"
            fullWidth={true}
            error={false}
            id="vat"
            label="%Vat"
            size="small"
          />
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

export default VatModal;
