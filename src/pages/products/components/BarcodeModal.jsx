import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";
import TextField from "@mui/material/TextField";
import Barcode from "react-barcode";
import { Input } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "100%",
    height: "500px",
    maxWidth: "500px",
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

const barcodeStyle = {
  border: "dotted 2px #969a99",
  color: "#969a99",
  borderRadius: "10px",
  width: "100%",
  height: "100px",
  maxWidth: "245px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
  marginInline: "2.5rem",
};

const inputStyle = {
  width: "200px",
  height: "40px",
  border: "2px solid gray",
  borderRadius: "5px",
  fontSize: "18px",
  fontWeight: "500",
  textAlign: "center",
};

const buttonStyle = {
  marginTop: "2rem",
  width: "100%",
  height: "50px",
  maxWidth: "200px",
  background: "#3b326b",
  color: "#fff",
  borderRadius: "5px",
  fontSize: "18px",
};

function BarcodeModal({
  open,
  setOpen,
  productShow,
  refreshData,
  setRefreshData,
  setProductSelected,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <figure style={{ width: "30px" }}>
              <FontAwesomeIcon icon={faBarcode} style={{ width: "100%" }} />
            </figure>
            <Typography>
              <span
                style={{ color: "#000", fontSize: "1.5rem", fontWeight: "400" }}
              >
                ปริ้นบาร์โค้ด
              </span>{" "}
              (Product ID : {productShow.product_id})
            </Typography>
          </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div
            className="barcode"
            style={{
              width: "100%",
              height: "40%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <figure style={barcodeStyle}>
              <Barcode value={productShow.barcode_number} />
            </figure>
          </div>
          <div
            className="barcode-action"
            style={{
              width: "100%",
              height: "60%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" gutterBottom>
              กรอกจำนวน
            </Typography>
            <input style={inputStyle} />
            <button style={buttonStyle}>Print</button>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default BarcodeModal;
