import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport, faStore } from "@fortawesome/free-solid-svg-icons";
import Barcode from "react-barcode";
import { useSelector } from "react-redux";
import { Card } from "@mui/material";

import "./SupproductPage.scss";
import DetailDataGrid from "../../components/datagrid/DetailDataGrid";
import SupplierDataGrid from "../../components/datagrid/SupplierDataGrid";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import { useTranslation } from "react-i18next";

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

export default function SupproductImport({
  isEdit,
  isFetchImport,
  isMultiImport,
  open,
  setOpen,
  productShow,
  refreshData,
  setRefreshData,
  productDatas,
}) {
  const { t } = useTranslation(["dashboard-page"]);
  const webPath = useSelector((state) => state.app.webPath);
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
          <FontAwesomeIcon
            icon={faFileImport}
            size="xl"
            style={{ color: "#000000", paddingRight: ".5rem" }}
          />
          {isEdit
            ? `แก้ไขสินค้า (Product ID : ${productShow.product_id})`
            : "รายละเอียดสินค้าสดที่จะแยกย่อย เข้าสต็อก"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <section id="supproduct-import">
            <Card
              className="flex-container-column"
              style={{ marginTop: "-1rem" }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <figure className="product-image">
                  <img src={webPath + productShow.thumbnail_link} alt="" />
                </figure>
                <div className="product-name">
                  <p>ชื่อสินค้า</p>
                  <span>{productShow.title}</span>
                </div>
                <p style={{ width: "2%", textAlign: "center" }}>|</p>
                <div className="product-number">
                  <p>รหัสสินค้า</p>
                  <span>{productShow.product_id}</span>
                </div>
                <p style={{ width: "2%", textAlign: "center" }}>|</p>
                <div className="barcode-number">
                  <p>รหัสบาร์โค้ดจากสินค้า</p>
                  <span>{productShow.product_barcode}</span>
                </div>
                <p style={{ width: "2%", textAlign: "center" }}>|</p>
                <div className="barcode-number">
                  <p>รหัสบาร์โค้ดใหม่</p>
                  <span>{productShow.barcode_number}</span>
                </div>
                <p style={{ width: "2%", textAlign: "center" }}>|</p>
                <figure className="barcode-image">
                  <p style={{ color: "#000" }}>บาร์โค้ดจากสินค้า</p>
                  {productShow.product_barcode && (
                    <Barcode value={productShow.product_barcode} />
                  )}
                </figure>
                <p style={{ width: "2%", textAlign: "center" }}>|</p>
                <figure className="barcode-image">
                  <p style={{ color: "#000" }}>บาร์โค้ดใหม่</p>
                  {productShow.barcode_number && (
                    <Barcode value={productShow.barcode_number} />
                  )}
                </figure>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "2.5rem",
                }}
              >
                <div className="flex-container-center">
                  <FontAwesomeIcon
                    icon={faFileImport}
                    size="xl"
                    style={{ color: "#3b326b" }}
                  />
                  <p
                    style={{
                      color: "#3b326b",
                      fontSize: "18px",
                      fontWeight: 400,
                    }}
                  >
                    ข้อมูลสินค้า
                  </p>
                </div>
              </div>
              <DetailDataGrid productShowArr={[productShow]} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "2.5rem",
                }}
              >
                <div className="flex-container-center">
                  <FontAwesomeIcon
                    icon={faStore}
                    size="xl"
                    style={{ color: "#3b326b" }}
                  />
                  <p
                    style={{
                      color: "#3b326b",
                      fontSize: "18px",
                      fontWeight: 400,
                    }}
                  >
                    ซัพพลายเออร์
                  </p>
                </div>
              </div>
              <SupplierDataGrid productShowArr={[productShow]} />
            </Card>
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              <FontAwesomeIcon
                icon={faFileImport}
                size="xl"
                style={{ color: "#000000", paddingRight: ".5rem" }}
              />
              เพิ่มสินค้าสดย่อย เข้าสต็อก
            </BootstrapDialogTitle>
            <div id="form-import">
              <Card className="flex-container-column">
                
              </Card>
            </div>
          </section>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
