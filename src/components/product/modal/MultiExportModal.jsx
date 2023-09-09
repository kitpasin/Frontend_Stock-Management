import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ProductsExportPage from "../export/ProductsExportPage";
import Typography from "@mui/material/Typography";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "100%",
    height: "100%",
    maxWidth: "1700px",
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

function MultiExportModal({
  open,
  setOpen,
  productShow,
  refreshData,
  setRefreshData,
  productSelected,
  setProductSelected,
  setOpenExportedTempModal
}) {
  const handleClickOpen = () => {
    setOpen(true);
  };
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
              gap: "1rem",
            }}
          >
            <figure style={{ width: "30px" }}>
              <img src="/images/icons/importPage-icon.png" alt="" />
            </figure>
            <Typography>
              <span
                style={{ color: "#000", fontSize: "1.5rem", fontWeight: "400" }}
              >
                เบิกสินค้า
              </span>{" "}
            </Typography>
            <Typography></Typography>
          </div>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <ProductsExportPage
            open={open}
            setOpen={setOpen}
            exportOne={false}
            multiExprot={true}
            productDatas={productShow}
            refreshData={refreshData}
            setRefreshData={setRefreshData}
            setProductSelected={setProductSelected}
            setOpenExportedTempModal={setOpenExportedTempModal}
          />
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}

export default MultiExportModal;
