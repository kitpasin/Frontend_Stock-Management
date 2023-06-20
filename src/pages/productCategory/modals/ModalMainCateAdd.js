import React, { useEffect, useState } from "react";
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    width: "500px",
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

function ModalMainCateAdd({ openModalAdd, setOpenModal }) {
  const [cateName, setCateName] = useState("");
  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    console.log(cateName)
  }, [cateName])

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
        open={openModalAdd}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          สร้างชื่อหมวดหมู่หลัก
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextField
            onChange={(e) => setCateName(e.target.value)}
            value={cateName}
            className="text-field-custom"
            fullWidth={true}
            error={false}
            id="cate-name"
            label="ชื่อหมวดหมู่"
            size="small"
          />
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

export default ModalMainCateAdd;
