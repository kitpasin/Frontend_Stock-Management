/* eslint-disable */
import { useSSR, useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { Card } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import PulseLoader from "react-spinners/PulseLoader";

import "../../../pages/defective/DefectivePage.scss";
import HeadPageComponent from "../../layout/headpage/headpage";
import Search from "../../../pages/defective/components/Search";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import MultiExportModal from "../modal/MultiExportModal";
import Swal from "sweetalert2";

function DefectiveSearchPage() {
  const { t } = useTranslation(["dashboard-page"]);

  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
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
  const [openMultiExportModal, setOpenMultiexportModal] = useState(false);

  const filteredProduct = products.filter((product) => {
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
      matchesSupplier &&
      matchesVat &&
      matchesSubCategory &&
      matchesPrevBarcode &&
      matchesCurBarcode &&
      matchesProductType
    );
  });

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

  async function getProducts() {
    const response = await axios.get("productAll");
    const data = response.data.data;
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, [refreshData]);

  const titleOptions = products
    .map((product) => product.title)
    .filter((value, index, self) => self.indexOf(value) === index && value !== null);

  const productIdOptions = products
    .map((product) => product.product_id)
    .filter((value, index, self) => self.indexOf(value) === index && value !== null);

  const mainCategoryOptions = products
    .map((product) => product.main_cate_name)
    .filter((value, index, self) => self.indexOf(value) === index && value !== null);

  const subCategoryOptions = products
    .map((product) => product.sub_cate_name)
    .filter((value, index, self) => self.indexOf(value) === index && value !== null);

  const prevBarcodeOptions = products
    .map((product) => product.product_barcode)
    .filter((value, index, self) => self.indexOf(value) === index && value !== null);

  const curBarcodeOptions = products
    .map((product) => product.barcode_number)
    .filter((value, index, self) => self.indexOf(value) === index && value !== null);

  const productTypeOptions = products
    .map((product) => product.p_type)
    .filter((value, index, self) => self.indexOf(value) === index && value !== null);

  const supplierOptions = products
    .map((supplier) => supplier.supplier_name)
    .filter((value, index, self) => self.indexOf(value) === index && value !== null);

  return (
    <section id="defective-search-page">
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
              <img src="/images/icons/defectivePage-icon.png" alt="" />
            </figure>
            <div style={{ width: "100%" }}>
              <HeadPageComponent
                h1={t("ค้นหาสินค้า")}
                breadcrums={[{ title: t("ค้นหาสินค้า"), link: false }]}
              />
            </div>
          </div>
          <Card className="flex-container-column" sx={{ borderRadius: "10px" }}>
            <div className="header">
              <div className="wrapper">
                <figure className="title">
                  <img src="/images/icons/defectiveTable-icon.png" alt="" />
                  <p>สินค้าทั้งหมด</p>
                </figure>
                <div className="description">
                  <p>{products.length} รายการ</p>
                </div>
              </div>
              <Link onClick={() => multiExportHandle()} className="export">
                เบิกออกสินค้าชำรุด
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
                renderInput={(params) => (
                  <TextField {...params} label="ประเภทสินค้า" />
                )}
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
                options={prevBarcodeOptions.filter(
                  (option) => option !== null && option !== undefined
                )}
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
                options={curBarcodeOptions.filter(
                  (option) => option !== null && option !== undefined
                )}
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
              <Search
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
          />
        </>
      )}
    </section>
  );
}

export default DefectiveSearchPage;
