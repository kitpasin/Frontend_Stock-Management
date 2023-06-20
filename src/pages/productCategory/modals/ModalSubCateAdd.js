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
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

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

function ModalSubCateAdd({ openModal, setOpenModalSub }) {
  const [cateName, setCateName] = useState("");
  const [mainCate, setMainCate] = useState("");
  const handleClose = () => {
    setOpenModalSub(false);
  };

  const handleChange = (event) => {
    setMainCate(event.target.value);
  };

  useEffect(() => {
    console.log(cateName);
  }, [cateName]);
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
          สร้างชื่อหมวดหมู่ย่อย
        </BootstrapDialogTitle>
        <DialogContent
          dividers
          sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <FormControl
            sx={{ m: 0, minWidth: 120 }}
            size="small"
            className="form-control"
          >
            <InputLabel id="label-add-product-type">
              เลือกหมวดหมู่หลัก
            </InputLabel>
            <Select
              labelId="add-product-type"
              id="add-product-type"
              value={mainCate}
              label="เลือกหมวดหมู่หลัก"
              onChange={handleChange}
            >
              <MenuItem value={""} disabled>
                None
              </MenuItem>
              <MenuItem value={1}>มาม่า</MenuItem>
              <MenuItem value={2}>ขนม</MenuItem>
              <MenuItem value={3}>อาหารกล่อง</MenuItem>
              <MenuItem value={4}>แอลกอฮอล์</MenuItem>
            </Select>
          </FormControl>
          <TextField
            onChange={(e) => setCateName(e.target.value)}
            value={cateName}
            className="text-field-custom"
            fullWidth={true}
            error={false}
            id="cate-name"
            label="ชื่อหมวดหมู่ย่อย"
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

export default ModalSubCateAdd;
