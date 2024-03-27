import React, { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import { useTranslation } from "react-i18next";
import { Autocomplete, Button, Card, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import Table from "./components/Table";
import { useRef } from "react";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import ReactToPdf, { usePDF } from "react-to-pdf";
import PDFFile from "./components/PDFFile";
// import PDFFile2 from "./components/PDFFile2";

function ExportDetailsPage() {
  const { t } = useTranslation(["dashboard-page"]);
  const [loading, setLoading] = useState(true);
  const [exportedProductDetails, setExportedProductDetails] = useState(null);
  const [productType, setProductType] = useState("");
  const [productName, setProductName] = useState("");
  const [productID, setProductID] = useState("");
  const [exportID, setExportID] = useState("");
  const [picker, setPicker] = useState("");
  const [approver, setApprover] = useState("");
  const [supplier, setSupplier] = useState("");
  const [prevBarcode, setPrevBarcode] = useState("");
  const [barcode, setBarcode] = useState("");
  const [loadingButton, setLoadingButton] = useState(false);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [options, setOptions] = useState({
    productTypeOptions: [],
    productNameOption: [],
    productIDOption: [],
    pickerOption: [],
    approverOption: [],
    supplierOption: [],
    prevBarcodeOption: [],
    barcodeOption: [],
    exportIds: [],
  });
  async function setOptionAll(data) {
    if (data && data.length > 0) {
      const productTypeOptions = await data
        .map((product) => product.p_type)
        .filter(
          (value, index, self) =>
            self.indexOf(value) === index && value !== null
        );
      const productNameOption = await data
        .map((product) => product.title)
        .filter(
          (value, index, self) =>
            self.indexOf(value) === index && value !== null
        );
      const productIDOption = await data
        .map((product) => product.product_id.toString())
        .filter(
          (value, index, self) =>
            self.indexOf(value) === index && value !== null
        );
      const pickerOption = await data
        .map((product) => product.picker_name)
        .filter(
          (value, index, self) =>
            self.indexOf(value) === index && value !== null
        );
      const approverOption = await data
        .map((product) => product.approver_name)
        .filter(
          (value, index, self) =>
            self.indexOf(value) === index && value !== null
        );
      const supplierOption = await data
        .map((product) => product.supplier_name)
        .filter(
          (value, index, self) =>
            self.indexOf(value) === index && value !== null
        );
      const prevBarcodeOption = await data
        .map((product) => product.product_barcode)
        .filter(
          (value, index, self) =>
            self.indexOf(value) === index && value !== null
        );
      const barcodeOption = await data
        .map((product) => product.barcode_number)
        .filter(
          (value, index, self) =>
            self.indexOf(value) === index && value !== null
        );
      const exportIds = await data
        .map((product) => product.export_id.toString())
        .filter(
          (value, index, self) =>
            self.indexOf(value) === index && value !== null
        );

      setOptions({
        productTypeOptions,
        productNameOption,
        productIDOption,
        pickerOption,
        approverOption,
        supplierOption,
        prevBarcodeOption,
        barcodeOption,
        exportIds,
      });
    }
  }

  useEffect(() => {
    if (exportedProductDetails) {
      setFilteredProduct([]);
      const filtered = exportedProductDetails?.filter((product, index) => {
        const matchesProductType = productType
          ? product.p_type === productType
          : true;
        const matchesProductName = productName
          ? product.title === productName
          : true;
        const matchesProductID = productID
          ? product.product_id === productID
          : true;
        const matchesExportID = exportID
          ? product.export_id.toString() === exportID
          : true;
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
        const matchesBarcode = barcode
          ? product.barcode_number === barcode
          : true;
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
      setFilteredProduct(filtered);
    }
  }, [
    productType,
    productName,
    productID,
    exportID,
    picker,
    approver,
    supplier,
    prevBarcode,
    barcode,
  ]);

  async function getExportedProductDetails() {
    const response = await axios.get("get/product/export/detail");
    const data = response.data.data;
    setFilteredProduct(data);
    setExportedProductDetails(data);
    setOptionAll(data);
  }

  useEffect(() => {
    getExportedProductDetails().then(() => setLoading(false));
  }, []);

  async function openPDF() {
    setLoadingButton(true);
    const blob = await pdf(
      <PDFFile data={filteredProduct.slice(0, 500)} />
    ).toBlob();
    const pdfURL = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = pdfURL;
    a.download = "export-list.pdf";
    a.addEventListener("click", () => {
      setLoadingButton(false);
    });
    a.click();

    URL.revokeObjectURL(pdfURL);
    if (loadingButton) {
      // .then((blob) => {
      //   setLoadingButton(false);
      //   const pdfURL = URL.createObjectURL(blob);
      //   // window.open(pdfURL, "_blank");
      //   const a = document.createElement("a");
      //   a.href = pdfURL;
      //   a.download = "filename.pdf"; // กำหนดชื่อไฟล์ที่จะถูกดาวน์โหลด
      //   a.click();
      //   URL.revokeObjectURL(pdfURL);
      // });
    }
    // const pdfURL = URL.createObjectURL(blob);
    // window.open(pdfURL, "_blank");
  }

  async function generatePDF() {
    setLoadingButton(true);
    const totalPages = Math.ceil(filteredProduct.length / 200);
    const pdfUrls = [];

    for (let i = 0; i < totalPages; i++) {
      const start = i * 200;
      const end = Math.min((i + 1) * 200, filteredProduct.length);
      const chunk = filteredProduct.slice(start, end);

      pdf(<PDFFile data={chunk} />)
        .toBlob()
        .then((blob) => {
          setLoadingButton(false);
          const pdfURL = URL.createObjectURL(blob);
          pdfUrls.push(pdfURL);
          // window.open(pdfURL, "_blank");
        });
    }

    // const pdfBlobs = await Promise.all(pdfPromises);
    // if (pdfBlobs.length > 0) {
    //   console.log(pdfBlobs);
    //   setLoadingButton(false);
    // }

    // const mergedPdfBlob = await mergePdfs(pdfBlobs);
    // const pdfURL = URL.createObjectURL(mergedPdfBlob);

    // setLoadingButton(false);
    // window.open(pdfURL, "_blank");
  }

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
                  <p>{filteredProduct?.length} รายการ</p>
                </div>
              </div>
              {true && (
                <LoadingButton
                  loading={loadingButton}
                  onClick={() => {
                    setLoadingButton(true);
                    openPDF();
                  }}
                  // onClick={generatePDF}
                  // onClick={() => toPDF()}
                  variant="contained"
                  sx={{
                    background: "#3b326b",
                    marginRight: "1rem",
                    width: "150px",
                    textTransform: "capitalize",
                  }}
                >
                  <span>Print</span>
                </LoadingButton>
              )}
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
                options={options.productTypeOptions}
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
                options={options.productNameOption}
                onChange={(event, value) => setProductName(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="ชื่อสินค้า" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-product-name"
                options={options.productIDOption}
                onChange={(event, value) => setProductID(parseInt(value) || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="รหัสสินค้า" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-export-id"
                options={options.exportIds}
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
                options={options.supplierOption}
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
                options={options.prevBarcodeOption}
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
                options={options.barcodeOption}
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
                options={options.pickerOption}
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
                options={options.approverOption}
                onChange={(event, value) => setApprover(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="ผู้อนุมัติ" />
                )}
              />
            </div>
            <div>
              <Table exportedProductDetails={filteredProduct} />
            </div>
          </Card>
        </>
      )}
    </section>
  );
}

export default ExportDetailsPage;
