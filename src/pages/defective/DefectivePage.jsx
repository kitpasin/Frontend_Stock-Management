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
  const [subCategories, setSubCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [vat, setVat] = useState("");

  const filteredProduct = defectiveProducts.filter((product) => {
    const matchesTitle = title ? product.title === title : true;
    const matchesMainCategory = mainCategory ? product.main_cate_name === mainCategory : true;
    const matchesVat = vat ? product.vat_id == vat : true;

    return matchesTitle && matchesMainCategory && matchesVat;
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

  async function getSubCategories() {
    const response = await axios.get("subcates");
    const data = response.data.subCates;
    setSubCategories(data);
  }

  useEffect(() => {
    getDefectiveProducts();
    getMainCategories();
    getSubCategories();
  }, []);

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
                  id="combo-box-demo"
                  options={defectiveProducts}
                  getOptionLabel={(defectiveProducts) => defectiveProducts.title || ""}
                  onChange={(event, value) => setTitle(value?.title || null)}
                  sx={{ width: 150 }}
                  renderInput={(params) => <TextField {...params} label="ชื่อ" />}
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={mainCategories}
                  getOptionLabel={(mainCategories) => mainCategories.name || ""}
                  onChange={(event, value) => setMainCategory(value?.name || null)}
                  sx={{ width: 150 }}
                  renderInput={(params) => <TextField {...params} label="หมวดหมู่หลัก" />}
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={subCategories}
                  getOptionLabel={(subCategories) => subCategories.name}
                  onChange={(event, value) => setSubCategory(value?.name || null)}
                  sx={{ width: 150 }}
                  renderInput={(params) => <TextField {...params} label="หมวดหมู่ย่อย" />}
                />
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value=""
                      control={<Radio />}
                      label="All"
                      onChange={(e) => setVat("")}
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
                filteredProduct={filteredProduct}
                getDefectiveProducts={getDefectiveProducts}
              />
            </div>
          </Card>
        </>
      )}
    </section>
  );
}

export default DefectivePage;
