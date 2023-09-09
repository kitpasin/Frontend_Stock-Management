/* eslint-disable */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { Card } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

import "./ProductsPage.scss";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import Table from "./components/Table";
import { Link, useLocation } from "react-router-dom";
import { svExportProduct, svProductAll } from "../../services/product.service";
import dayjs from "dayjs";
import MultiExportModal from "../../components/product/modal/MultiExportModal";
import ProductEditModal from "../../components/product/modal/ProductEditModal";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { Box } from "@mui/system";
import ExportDetail from "./components/ExportDetail";
import { backgroundColor } from "@mui/system/palette";
import { useSelector } from "react-redux";
import { parse } from "@fortawesome/fontawesome-svg-core";

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

function ProductsPage() {
  // Get individual query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const slug = searchParams.get("slug");
  const hasSlug = slug === "fromimport" ? true : false;

  const { t } = useTranslation(["dashboard-page"]);
  const [loading, setLoading] = useState(true);
  const [productsAll, setProductsAll] = useState([]);
  const [title, setTitle] = useState("");
  const [productId, setProductId] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [vat, setVat] = useState("");

  const [productShow, setProductShow] = useState([]);
  const [refreshData, setRefreshData] = useState(0);
  const [productSelected, setProductSelected] = useState([]);
  const [selectFrom, setSelectFrom] = useState([]);
  const [openMultiExportModal, setOpenMultiexportModal] = useState(false);
  const [openMultiImportModal, setOpenMultiImportModal] = useState(false);
  const [openExportedTempModal, setOpenExportedTempModal] = useState(false);
  const handleOpen = () => setOpenExportedTempModal(true);
  const handleClose = () => setOpenExportedTempModal(false);

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

  const filteredProduct = productsAll.filter((product) => {
    const matchesTitle = title ? product.title === title : true;
    const matchProductId = productId ? product.product_id === productId : true;
    const matchesMainCategory = mainCategory
      ? product.main_cate_name === mainCategory
      : true;
    const matchesSupplier = supplier
      ? product.supplier_name === supplier
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
      matchesSupplier &&
      matchesVat
    );
  });

  const current_date = dayjs().toISOString().substring(0, 10);

  const multiExportHandle = () => {
    console.log(productSelected);
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

  function generateRandomNumber() {
    const now = new Date();
    const formattedDate = now.toISOString().replace(/[-T:.Z]/g, ""); // Format the current date and time
    setRandomNum(formattedDate);
  }
  
  const multiImportHandle = () => {
    if (productSelected.length === 0) {
      Swal.fire({
        text: "เลือกสินค้าที่ต้องการเพิ่ม",
        icon: "info",
      }).then(() => {
        return false;
      });
    } else {
      const result = productSelected.map((dd) => {
        return {
          id: dd.id,
          product_id: dd.product_id,
          title: dd.title,
          state1: false,
          state2: false,
          state3: false,
          reset: false,
          key: [uuidv4(), uuidv4(), uuidv4(), uuidv4()],
          unit: dd.unit_id,
          unit_name: dd.net_name,
          netweight: dd.netweight,
          counting_unit: dd.counting_unit_id,
          counting_unit_name: dd.amount_name,
          purchase_date: "",
          mfd_date: "",
          exp_date: "",
          alert_date: dd.alert_date,
          alert_stock: dd.alert_stock,
          barcode: dd.product_barcode,
          new_barcode: dd.barcode_number,
          main_cate_id: dd.main_cate_id,
          main_cate_name: dd.main_cate_name,
          sub_cate_id: dd.sub_cate_id,
          sub_cate: dd.sub_cate_name,
          supplier_id: dd.supplier_id,
          supplier_cate: dd.supplier_cate_id,
          supplier_name: dd.supplier_name,
          supplier_cate_name: dd.supplier_cate_name,
          supplier_barcode: dd.supplier_barcode,
          import_value: "",
          defective: dd.defective_product,
          image_path: dd.thumbnail_link,

          import_fee: "",
          fuel_cost: "",
          other_exp: "",
          total: "",
          op_unit: "",
          total_product: "",

          oc_unit: dd.op_unit,
          unit_price: dd.unit_price,
          product_cost: "",
          units: "",
          cost_per_unit: dd.cost_per_unit,
          total_cost: "",
          set_profit: dd.set_profit,
          vat_id: dd.vat_id,
          vat: dd.vat_name,
          profit_per_unit: dd.profit_per_unit,
          pp_profit: dd.pp_profit,
          pp_vat: dd.pp_vat,
          old_pp_vat: dd.pp_vat,
          os_price: dd.selling_price,
          selling_price: "",
        };
      });
      setProductShow(result[0]);
      setSelectFrom(result);
      setOpenMultiImportModal(true);
    }
  };

  async function getProducts() {
    const response = await axios.get("productAll");
    const data = response.data.data;
    setProductsAll(data);
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
    }))
    console.log(formData)
    if (picker === "" || null && approver === "" || null && export_type === "" || null) {
      Swal.fire("Error", "Please enter all fields", "error")
    } else {
      try {
        const response = await axios.post("product/export/detail", formData);
        console.log(response)
        if (response.status) {
          Swal.fire(
            "Success!",
            "Product has been exported successfully",
            "success"
          ).then(() => {
            axios.post("product/export", formData);
          }).then(() => {
            setOpenExportedTempModal(false)
            setRefreshData(refreshData + 1)
          })
        } else {
          Swal.fire("Error", "Failed to export the product", "error");
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error", "An error occurred while exporting the product", "error");
      }
    }
  }

  useEffect(() => {
    getProducts();
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

  const titleOptions = productsAll
    .map((product) => product.title)
    .filter((value, index, self) => self.indexOf(value) === index);

  const productIdOptions = productsAll
    .map((product) => product.product_id)
    .filter((value, index, self) => self.indexOf(value) === index);

  const mainCategoryOptions = productsAll
    .map((product) => product.main_cate_name)
    .filter((value, index, self) => self.indexOf(value) === index);

  const supplierOptions = productsAll
    .map((supplier) => supplier.supplier_name)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <section id="products-page">
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
              <img src="/images/icons/productsPage-icon.png" alt="" />
            </figure>
            <div style={{ width: "100%" }}>
              <HeadPageComponent
                h1={t("Products")}
                breadcrums={[{ title: t("Products"), link: false }]}
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
                  <p>{productsAll.length} รายการ</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                {hasSlug && (
                  <Button
                    style={{ fontSize: "16px" }}
                    className="export"
                    onClick={() => multiImportHandle()}
                  >
                    เพิ่มสินค้า
                  </Button>
                )}
                <Button
                  style={{ fontSize: "16px" }}
                  className="export"
                  onClick={() => multiExportHandle()}
                >
                  เบิกสินค้า
                </Button>
              </div>
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
                id="combo-box-supplier"
                options={supplierOptions}
                onChange={(event, value) => setSupplier(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="ซัพพลายเออร์" />
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
                    gap: "1rem"
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
          <ProductEditModal
            isMultiImport={true}
            isFetchImport={true}
            isEdit={false}
            open={openMultiImportModal}
            setOpen={setOpenMultiImportModal}
            productShow={productShow}
            productDatas={selectFrom}
            refreshData={refreshData}
            setRefreshData={setRefreshData}
          />
        </>
      )}
    </section>
  );
}

export default ProductsPage;
