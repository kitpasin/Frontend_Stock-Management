/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { Card } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import PulseLoader from "react-spinners/PulseLoader";

import "./ExportPage.scss";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import Table from "./components/Table";
import axios from "axios";

function ExportPage() {
  const { t } = useTranslation(["dashboard-page"]);
  const [loading, setLoading] = useState(true);
  const [exportedProducts, setExportedProducts] = useState(null);
  const [exportID, setExportID] = useState(null);
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
  const [filteredProduct, setFilteredProduct] = useState([]);

  const [options, setOptions] = useState({
    productTypeOptions: [],
    productNameOption: [],
    productIDOption: [],
    subCategoryOptions: [],
    mainCategoryOptions: [],
    supplierOption: [],
    prevBarcodeOption: [],
    barcodeOption: [],
    exportIds: [],
  });

  useEffect(() => {
    setExportedProducts([]);
    setFilteredProduct([]);

    getExportedProduct();
  }, [refreshData]);

  useEffect(() => {
    if (exportedProducts) {
      setFilteredProduct([]);
      const filtered = exportedProducts?.filter((product) => {
        const matchesExportID = exportID
          ? product.export_id.toString() === exportID
          : true;
        const matchesTitle = title ? product.title === title : true;
        const matchProductId = productId
          ? product.product_id === productId
          : true;
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
          matchesExportID &&
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
      setFilteredProduct(filtered);
    }
  }, [
    exportedProducts,
    supplier,
    productType,
    curBarcode,
    prevBarcode,
    subCategory,
    mainCategory,
    productId,
    title,
    exportID,
    vat,
  ]);

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
      const mainCategoryOptions = await data
        .map((product) => product.main_cate_name)
        .filter(
          (value, index, self) =>
            self.indexOf(value) === index && value !== null
        );
      const subCategoryOptions = await data
        .map((product) => product.sub_cate_name)
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
        supplierOption,
        prevBarcodeOption,
        barcodeOption,
        exportIds,
        mainCategoryOptions,
        subCategoryOptions,
      });
    }
  }

  async function getExportedProduct() {
    const response = await axios.get("get/product/export");
    const data = response.data.data;

    setExportedProducts(data);
    setOptionAll(data);
    setLoading(false);
  }

  return (
    <section id="export-page">
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
                id="combo-box-title"
                options={options.productNameOption}
                onChange={(event, value) => setTitle(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="ชื่อสินค้า" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-product-id"
                options={options.productIDOption}
                onChange={(event, value) => setProductId(parseInt(value) || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField type="number" {...params} label="รหัสสินค้า" />
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
                id="combo-box-supplier"
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
                id="combo-box-supplier"
                options={options.prevBarcodeOption}
                // options={prevBarcodeOptions?.filter(
                //   (option) => option !== null && option !== undefined
                // )}
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
                options={options.barcodeOption}
                onChange={(event, value) => setCurBarcode(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="บาร์โค้ดใหม่" />
                )}
              />
              <Autocomplete
                size="small"
                disablePortal
                id="combo-box-main-category"
                options={options.mainCategoryOptions}
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
                options={options.subCategoryOptions}
                onChange={(event, value) => setSubCategory(value || "")}
                fullWidth
                renderInput={(params) => (
                  <TextField {...params} label="หมวดหมู่ย่อย" />
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
        </>
      )}
    </section>
  );
}

export default ExportPage;
