import React, { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import { useTranslation } from "react-i18next";
import { Autocomplete, Button, Card, TextField } from "@mui/material";
import axios from "axios";
import Table from "./components/Table";
import { useRef } from "react";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  pdf,
} from "@react-pdf/renderer";
import ReactToPdf from "react-to-pdf";
import PDFFile from "./components/PDFFile";

function ExportDetailsPage() {
  const { t } = useTranslation(["dashboard-page"]);
  const [loading, setLoading] = useState(true);
  const [exportedProductDetails, setExportedProductDetails] = useState([]);
  const [refreshData, setRefreshData] = useState(0);
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [productID, setProductID] = useState("");
  const [exportID, setExportID] = useState("");
  const [picker, setPicker] = useState("");
  const [approver, setApprover] = useState("");
  const [supplier, setSupplier] = useState("");
  const [prevBarcode, setPrevBarcode] = useState("");
  const [barcode, setBarcode] = useState("");

  const filterdProduct = exportedProductDetails.filter((product) => {
    const matchesProductType = productType
      ? product.p_type === productType
      : true;
    const matchesProductName = productName
      ? product.title === productName
      : true;
    const matchesProductID = productID
      ? product.product_id === productID
      : true;
    const matchesExportID = exportID ? product.export_id === exportID : true;
    const matchesPicker = picker ? product.picker_name === picker : true;
    const matchesApprover = approver
      ? product.approver_name === approver
      : true;
    const matchesSupplier = supplier
      ? product.supplier_name === supplier
      : true;
    const matchesPrevBarcode = prevBarcode
      ? product.product_barcode === prevBarcode
      : true;
    const matchesBarcode = barcode ? product.barcode_number === barcode : true;
    return (
      matchesProductType &&
      matchesProductName &&
      matchesProductID &&
      matchesExportID &&
      matchesPicker &&
      matchesApprover &&
      matchesSupplier &&
      matchesPrevBarcode &&
      matchesBarcode
    );
  });

  const productTypeOptions = exportedProductDetails
    .map((product) => product.p_type)
    .filter((value, index, self) => self.indexOf(value) === index);
  const productNameOption = exportedProductDetails
    .map((product) => product.title)
    .filter((value, index, self) => self.indexOf(value) === index);
  const productIDOption = exportedProductDetails
    .map((product) => product.product_id)
    .filter((value, index, self) => self.indexOf(value) === index);
  const pickerOption = exportedProductDetails
    .map((product) => product.picker_name)
    .filter((value, index, self) => self.indexOf(value) === index);
  const approverOption = exportedProductDetails
    .map((product) => product.approver_name)
    .filter((value, index, self) => self.indexOf(value) === index);
  const supplierOption = exportedProductDetails
    .map((product) => product.supplier_name)
    .filter((value, index, self) => self.indexOf(value) === index);
  const prevBarcodeOption = exportedProductDetails
    .map((product) => product.product_barcode)
    .filter((value, index, self) => self.indexOf(value) === index);
  const barcodeOption = exportedProductDetails
    .map((product) => product.barcode_number)
    .filter((value, index, self) => self.indexOf(value) === index);
  const exportIds = exportedProductDetails
    .map((product) => product.export_id)
    .filter((value, index, self) => self.indexOf(value) === index);

  async function getExportedProductDetails() {
    const response = await axios.get("get/product/export/detail");
    const data = response.data.data;
    setExportedProductDetails(data);
  }

  useEffect(() => {
    getExportedProductDetails().then(() => setLoading(false));
  }, []);

  async function openPDF() {
    const blob = await pdf(
      <PDFFile
        data={exportedProductDetails}
      />
    ).toBlob();
    const pdfURL = URL.createObjectURL(blob);
    window.open(pdfURL, "_blank");
  };

  console.log(exportedProductDetails);

  return (
    <section id="export-details-page">
      {loading ? (
        <PulseLoader color="#3b326b" />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <figure style={{ width: "30px", marginBottom: "1rem" }}>
              <img src="/images/icons/exportPage-icon.png" alt="" />
            </figure>
            <div style={{ width: "100%" }}>
              <HeadPageComponent
                h1={t("Export")}
                breadcrums={[{ title: t("Export"), link: false }]}
              />
            </div>
          </div>
          <Card className="flex-container-column" sx={{ borderRadius: "10px" }}>
            <div className="header">
              <div className="wrapper">
                <figure className="title">
                  <img src="/images/icons/productsTable-icon.png" alt="" />
                  <p>สินค้าทั้งหมด</p>
                </figure>
                <div className="description">
                  <p>{filterdProduct?.length} รายการ</p>
                </div>
              </div>
              <Button
                onClick={openPDF}
                variant="contained"
                sx={{
                  background: "#3b326b",
                  marginRight: "1rem",
                  width: "150px",
                  textTransform: "capitalize"
                }}
              >
                Print
              </Button>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-product-name"
                options={productTypeOptions}
                onChange={(event, value) => setProductType(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="ประเภทสินค้า" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-product-name"
                options={productNameOption}
                onChange={(event, value) => setProductName(value || "")}
                fullWidth
                renderInput={(params) => <TextField {...params} label="ชื่อ" />}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-product-name"
                options={productIDOption}
                onChange={(event, value) => setProductID(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="รหัสสินค้า" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-export-id"
                options={exportIds}
                onChange={(event, value) => setExportID(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="รหัสเบิก" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-supplier-name"
                options={supplierOption}
                onChange={(event, value) => setSupplier(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="ซัพพลายเออร์" />
                )}
              />
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-prev-barcode"
                options={prevBarcodeOption}
                onChange={(event, value) => setPrevBarcode(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="บาร์โค้ดเดิม" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-cur-barcode"
                options={barcodeOption}
                onChange={(event, value) => setBarcode(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="บาร์โค้ดใหม่" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-picker"
                options={pickerOption}
                onChange={(event, value) => setPicker(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="ผู้เบิก" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-approver"
                options={approverOption}
                onChange={(event, value) => setApprover(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="ผู้อนุมัติ" />
                )}
              />
            </div>
            <div>
              <Table
                refreshData={refreshData}
                setRefreshData={refreshData}
                exportedProductDetails={filterdProduct}
              />
            </div>
          </Card>
        </>
      )}
    </section>
  );
}

export default ExportDetailsPage;
