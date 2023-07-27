/* eslint-disable */
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, TextField } from "@mui/material";
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
import { svProductAll } from "../../services/product.service";
import dayjs from "dayjs";
import MultiExportModal from "../../components/product/modal/MultiExportModal";
import Swal from "sweetalert2";

function ProductsPage() {
  // Get individual query parameters
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const slug = searchParams.get("slug");
  const hasSlug = slug === "fromimport" ? true : false;

  const { t } = useTranslation(["dashboard-page"]);
  const [loading, setLoading] = useState(true);
  const [productsAll, setProductsAll] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [productId, setProductId] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [vat, setVat] = useState("");

  const [refreshData, setRefreshData] = useState(0);
  const [productSelected, setProductSelected] = useState([]);
  const [openMultiExportModal, setOpenMultiexportModal] = useState(false);
  const [openMultiImportModal, setOpenMultiImportModal] = useState(false);

  const filteredProduct = productsAll.filter((product) => {
    const matchesTitle = title ? product.title === title : true;
    const matchProductId = productId ? product.product_id === productId : true;
    const matchesMainCategory = mainCategory
      ? product.main_cate_name === mainCategory
      : true;
    let matchesVat = true;

    if (vat === "1") {
      matchesVat = product.vat_id !== 0;
    } else if (vat === "0") {
      matchesVat = product.vat_id == 0;
    }

    return matchesTitle && matchProductId && matchesMainCategory && matchesVat;
  });

  const current_date = dayjs().toISOString().substring(0, 10);

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

  const multiImportHandle = () => {
    if (productSelected.length === 0) {
      Swal.fire({
        text: "เลือกสินค้าที่ต้องการเพิ่ม",
        icon: "info",
      }).then(() => {
        return false;
      });
    } else {
      setOpenMultiImportModal(true);
    }
  };

  async function getProducts() {
    const response = await axios.get("productAll");
    const data = response.data.data;
    setProductsAll(data);
    setLoading(false);
  }

  async function getMainCategories() {
    const response = await axios.get("maincates");
    const data = response.data.mainCates;
    setMainCategories(data);
  }

  useEffect(() => {
    getProducts();
    getMainCategories();
  }, [refreshData]);

  const titleOptions = productsAll
    .map((product) => product.title)
    .filter((value, index, self) => self.indexOf(value) === index);

  const productIdOptions = productsAll
    .map((product) => product.product_id)
    .filter((value, index, self) => self.indexOf(value) === index);

  const mainCategoryOptions = mainCategories
    .map((category) => category.name)
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
              <div className="filter">
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-title"
                  options={titleOptions}
                  onChange={(event, value) => setTitle(value || "")}
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} label="ชื่อ" />
                  )}
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-product-id"
                  options={productIdOptions}
                  onChange={(event, value) => setProductId(value || "")}
                  sx={{ width: 200 }}
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
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField {...params} label="หมวดหมู่หลัก" />
                  )}
                />
                <FormControl>
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
          />
        </>
      )}
    </section>
  );
}

export default ProductsPage;
