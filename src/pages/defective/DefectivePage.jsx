/* eslint-disable */
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { Card } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import PulseLoader from "react-spinners/PulseLoader";

import "./DefectivePage.scss";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import Table from "./components/Table";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function DefectivePage() {
  const { t } = useTranslation(["dashboard-page"]);

  const [loading, setLoading] = useState(true);

  const [defectiveProducts, setDefectiveProducts] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [productId, setProductId] = useState("")
  const [mainCategory, setMainCategory] = useState("");
  const [vat, setVat] = useState("");

  const [refreshData, setRefreshData] = useState(0);
  const [productSelected, setProductSelected] = useState([]);
  const [openMultiExportModal, setOpenMultiexportModal] = useState(false);

  const filteredProduct = defectiveProducts.filter((product) => {
    const matchesTitle = title ? product.title === title : true;
    const matchProductId = productId ? product.product_id === productId : true;
    const matchesMainCategory = mainCategory ? product.main_cate_name === mainCategory : true;
    let matchesVat = true;

    if (vat === "1") {
      matchesVat = product.vat_id !== 0;
    } else if (vat === "0") {
      matchesVat = product.vat_id == 0;
    }

    return matchesTitle && matchProductId && matchesMainCategory && matchesVat;
  });

  async function getDefectiveProducts() {
    const response = await axios.get("product/defective");
    const data = response.data.data;
    setDefectiveProducts(data);
    setLoading(false);
  }

  async function getMainCategories() {
    const response = await axios.get("maincates");
    const data = response.data.mainCates;
    setMainCategories(data);
  }

  useEffect(() => {
    getDefectiveProducts();
    getMainCategories();
    console.log(defectiveProducts)
  }, [refreshData]);

  const titleOptions = defectiveProducts
    .map((product) => product.title)
    .filter((value, index, self) => self.indexOf(value) === index);

  const productIdOptions = defectiveProducts
    .map((product) => product.product_id)
    .filter((value, index, self) => self.indexOf(value) === index);

  const mainCategoryOptions = mainCategories
    .map((category) => category.name)
    .filter((value, index, self) => self.indexOf(value) === index);

  return (
    <section id="defective-page">
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
                h1={t("Defective")}
                breadcrums={[{ title: t("Defective"), link: false }]}
              />
            </div>
          </div>
          <Card className="flex-container-column" sx={{ borderRadius: "10px" }}>
            <div className="header">
              <div className="wrapper">
                <figure className="title">
                  <img src="/images/icons/defectiveTable-icon.png" alt="" />
                  <p>สินค้าชำรุด</p>
                </figure>
                <div className="description">
                  <p>{defectiveProducts.length} รายการ</p>
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
                  renderInput={(params) => <TextField {...params} label="ชื่อ" />}
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
                  renderInput={(params) => <TextField {...params} label="หมวดหมู่หลัก" />}
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
                <Link to="/defective/search" className="export">
                  เลือกเบิกออกสินค้าชำรุด
                </Link>
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
        </>
      )}
    </section>
  );
}

export default DefectivePage;
