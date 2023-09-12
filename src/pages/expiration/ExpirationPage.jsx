/* eslint-disable */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, TextField } from "@mui/material";
import { Card } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Link } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";

import "./ExpirationPage.scss";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import Table from "./components/Table";
import axios from "axios";
import MultiExportModal from "../../components/product/modal/MultiExportModal";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { Box } from "@mui/system";
import ExportDetail from "../products/components/ExportDetail";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "1700px",
  height: "100%",
  maxHeight: "768px",
  bgcolor: "#fff",
  borderTop: "#3B326B 20px solid",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
function ExpirationPage() {
  const { t } = useTranslation(["dashboard-page"]);

  const [loading, setLoading] = useState(true);

  const [productsExpiration, setProductsExpiration] = useState([]);
  const [title, setTitle] = useState("");
  const [productId, setProductId] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [prevBarcode, setPrevBarcode] = useState("");
  const [curBarcode, setCurBarcode] = useState("");
  const [productType, setProductType] = useState("");
  const [supplier, setSupplier] = useState("");

  const [vat, setVat] = useState("");

  const [refreshData, setRefreshData] = useState(0);
  const [productSelected, setProductSelected] = useState([]);
  const [productData, setProductData] = useState([]);
  const [openMultiExportModal, setOpenMultiexportModal] = useState(false);
  const [openExportedTempModal, setOpenExportedTempModal] = useState(false);
  const handleOpen = () => setOpenExportedTempModal(true);
  const handleClose = () => setOpenExportedTempModal(false);
  const current_date = dayjs().toISOString().substring(0, 10);

  const [exportedProductTemp, setExportedProductTemp] = useState([]);
  const { displayName } = useSelector((state) => state.auth.profile);
  const today = dayjs();
  const formattedDate = today.format("YYYY/MM/DD HH:mm");

  const exportOption = [
    {
      id: 1,
      option: "หน้าร้าน",
    },
    {
      id: 2,
      option: "ตู้ขาย",
    },
  ];
  const [randomNum, setRandomNum] = useState(0);
  const [selectedExportType, setSelectedExportType] = useState("");
  const [picker, setPicker] = useState("");
  const [approver, setApprover] = useState("");

  const filteredProduct = productsExpiration.filter((product) => {
    const matchesTitle = title ? product.title === title : true;
    const matchProductId = productId ? product.product_id === productId : true;
    const matchesMainCategory = mainCategory
      ? product.main_cate_name === mainCategory
      : true;
    const matchesSupplier = supplier
      ? product.supplier_name === supplier
      : true;
    const matchesSubCategory = subCategory
      ? product.sub_cate_name === subCategory
      : true;
    const matchesPrevBarcode = prevBarcode
      ? product.product_barcode === prevBarcode
      : true;
    const matchesCurBarcode = curBarcode
      ? product.barcode_number === curBarcode
      : true;
    const matchesProductType = productType
      ? product.p_type === productType
      : true;
    let matchesVat = true;

    if (vat === "1") {
      matchesVat = product.vat_id !== 0;
    } else if (vat === "0") {
      matchesVat = product.vat_id == 0;
    }

    return (
      matchesTitle &&
      matchProductId &&
      matchesMainCategory &&
      matchesSubCategory &&
      matchesSupplier &&
      matchesProductType &&
      matchesPrevBarcode &&
      matchesCurBarcode &&
      matchesVat
    );
  });

  function generateRandomNumber() {
    const now = new Date();
    const formattedDate = now.toISOString().replace(/[-T:.Z]/g, ""); // Format the current date and time
    setRandomNum(formattedDate);
  }

  const multiExportHandle = () => {
    if (productSelected.length === 0) {
      Swal.fire({
        text: "เลือกสินค้าที่ต้องการเบิก",
        icon: "info",
      }).then(() => {
        return false;
      });
    } else {
      setOpenMultiexportModal(true);
    }
  };


  async function getProductsExpiration() {
    const response = await axios.get("product/expiration");
    const data = response.data.data;
    setProductsExpiration(data);
    setLoading(false);
  }

  async function getExportedProductTemp() {
    const response = await axios.get("get/product/export/temp");
    const data = response.data.exportedProductTemp;
    setExportedProductTemp(data);
  }

  async function submitExportForm() {
    const formData = uniqueExportData.map((item) => ({
      ...item,
      export_id: parseInt(randomNum),
      export_date: formattedDate,
      picker_name: picker,
      approver_name: approver,
      export_type: selectedExportType,
    }));
    console.log(formData);
    if (
      picker === "" ||
      (null && approver === "") ||
      (null && export_type === "") ||
      null
    ) {
      Swal.fire("Error", "Please enter all fields", "error");
    } else {
      try {
        const response = await axios.post("product/export/detail", formData);
        console.log(response);
        if (response.status) {
          Swal.fire(
            "Success!",
            "Product has been exported successfully",
            "success"
          )
            .then(() => {
              axios.post("product/export", formData);
            })
            .then(() => {
              setOpenExportedTempModal(false);
              setRefreshData(refreshData + 1);
            });
        } else {
          Swal.fire("Error", "Failed to export the product", "error");
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire(
          "Error",
          "An error occurred while exporting the product",
          "error"
        );
      }
    }
  }

  useEffect(() => {
    getProductsExpiration();
    getExportedProductTemp();
  }, [refreshData]);

  useEffect(() => {
    generateRandomNumber();
  }, []);

  const uniqueProductsMap = new Map();
  exportedProductTemp.forEach((item) => {
    uniqueProductsMap.set(item.product_id, item);
  });
  const uniqueProductsData = Array.from(uniqueProductsMap.values());

  const uniqueExportMap = new Map();
  exportedProductTemp.forEach((item) => {
    uniqueExportMap.set(item.product_id, item);
  });
  const uniqueExportData = Array.from(uniqueProductsMap.values());

  const titleOptions = productsExpiration
    .map((product) => product.title)
    .filter((value, index, self) => self.indexOf(value) === index);

  const productIdOptions = productsExpiration
    .map((product) => product.product_id)
    .filter((value, index, self) => self.indexOf(value) === index);

  const mainCategoryOptions = productsExpiration
    .map((product) => product.main_cate_name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const subCategoryOptions = productsExpiration
    .map((product) => product.sub_cate_name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const supplierOptions = productsExpiration
    .map((supplier) => supplier.supplier_name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const prevBarcodeOptions = productsExpiration
    .map((product) => product.product_barcode)
    .filter((value, index, self) => self.indexOf(value) === index);

  const curBarcodeOptions = productsExpiration
    .map((product) => product.barcode_number)
    .filter((value, index, self) => self.indexOf(value) === index);

  const productTypeOptions = productsExpiration
    .map((type) => type.p_type)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <section id="expiration-page">
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
              <img src="/images/icons/expirationPage-icon.png" alt="" />
            </figure>
            <div style={{ width: "100%" }}>
              <HeadPageComponent
                h1={t("Expiration")}
                breadcrums={[{ title: t("Expiration"), link: false }]}
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
                  <p>{productsExpiration.length} รายการ</p>
                </div>
              </div>
              <Link
                style={{ fontSize: "16px" }}
                onClick={() => multiExportHandle()}
                className="export"
              >
                เบิกสินค้า
              </Link>
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
                id="combo-box-id"
                options={productTypeOptions}
                onChange={(event, value) => setProductType(value || "")}
                fullWidth
                renderInput={(params) => <TextField {...params} label="ประเภทสินค้า" />}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-title"
                options={titleOptions}
                onChange={(event, value) => setTitle(value || "")}
                fullWidth
                renderInput={(params) => <TextField {...params} label="ชื่อ" />}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-product-id"
                options={productIdOptions}
                onChange={(event, value) => setProductId(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField type="number" {...params} label="รหัสสินค้า" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-main-category"
                options={mainCategoryOptions}
                onChange={(event, value) => setMainCategory(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="หมวดหมู่หลัก" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-main-category"
                options={subCategoryOptions}
                onChange={(event, value) => setSubCategory(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="หมวดหมู่ย่อย" />
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
                id="combo-box-supplier"
                options={supplierOptions}
                onChange={(event, value) => setSupplier(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="ซัพพลายเออร์" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-supplier"
                options={prevBarcodeOptions.filter((option) => option !== null && option !== undefined)}
                onChange={(event, value) => setPrevBarcode(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="บาร์โค้ดเดิม" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-supplier"
                options={curBarcodeOptions.filter((option) => option !== null && option !== undefined)}
                onChange={(event, value) => setCurBarcode(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="บาร์โค้ดใหม่" />
                )}
              />
            </div>
            <div>
              <FormControl fullWidth>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={vat}
                >
                  <FormControlLabel
                    value=""
                    control={<Radio />}
                    label="All"
                    onChange={(e) => setVat(e.target.value)}
                  />
                  <FormControlLabel
                    value="1"
                    control={<Radio />}
                    label="Vat"
                    onChange={(e) => setVat(e.target.value)}
                  />
                  <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label="No Vat"
                    onChange={(e) => setVat(e.target.value)}
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div>
              <Table
                productsData={filteredProduct}
                refreshData={refreshData}
                setRefreshData={setRefreshData}
                setProductSelected={setProductSelected}
                productSelected={productSelected}
              />
            </div>
          </Card>
          <MultiExportModal
            open={openMultiExportModal}
            setOpen={setOpenMultiexportModal}
            productShow={productSelected}
            refreshData={refreshData}
            setRefreshData={setRefreshData}
            setProductSelected={setProductSelected}
            productSelected={productSelected}
            setOpenExportedTempModal={setOpenExportedTempModal}
          />
          <Modal
            open={openExportedTempModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    fontSize: "20px",
                  }}
                >
                  <figure
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      color: "#3B336B",
                    }}
                  >
                    <img src="/images/icons/product-icon.png" alt="" />
                    <p style={{ fontWeight: 400 }}>
                      รายการสินค้าทั้งหมดที่จะเบิกออก
                    </p>
                  </figure>
                  <p style={{ fontWeight: 400, color: "#3B336B" }}>
                    {uniqueProductsData?.length} รายการ
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                      width: "100%",
                    }}
                  >
                    <TextField
                      label="เลขที่เบิก"
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{ backgroundColor: "#E6E6E6", width: "33%" }}
                      value={today}
                    />
                    <TextField
                      label="วันที่เวลา"
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{ backgroundColor: "#E6E6E6", width: "33%" }}
                      value={formattedDate}
                    />
                    <TextField
                      label="ID ผู้ใช้งาน"
                      variant="outlined"
                      size="small"
                      disabled
                      sx={{ backgroundColor: "#E6E6E6", width: "33%" }}
                      value={displayName}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: "1rem",
                      width: "100%",
                    }}
                  >
                    <Autocomplete
                      options={exportOption?.map((option) => option.option)}
                      value={selectedExportType}
                      onChange={(event, newValue) =>
                        setSelectedExportType(newValue)
                      }
                      sx={{ width: "33%" }}
                      size="small"
                      renderInput={(params) => (
                        <TextField {...params} label="เบิกไปที่" />
                      )}
                    />
                    <TextField
                      label="ผู้เบิก"
                      variant="outlined"
                      size="small"
                      sx={{ width: "33%" }}
                      value={picker}
                      onChange={(e) => setPicker(e.target.value)}
                    />
                    <TextField
                      label="ผู้อนุมัติ"
                      variant="outlined"
                      size="small"
                      sx={{ width: "33%" }}
                      value={approver}
                      onChange={(e) => setApprover(e.target.value)}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <ExportDetail
                    uniqueProductsData={uniqueProductsData}
                    refreshData={refreshData}
                    setRefreshData={setRefreshData}
                    setOpenExportedTempModal={setOpenExportedTempModal}
                  />
                  <Button
                    onClick={submitExportForm}
                    variant="contained"
                    sx={{ background: "#3b326b" }}
                  >
                    ยืนยันเบิก
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
        </>
      )}
    </section>
  );
}

export default ExpirationPage;
