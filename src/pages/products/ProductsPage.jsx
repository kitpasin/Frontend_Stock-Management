/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
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
import { rows } from "./data/TableData";
import { Link } from "react-router-dom";
import { svProductAll } from "../../services/product.service";
import dayjs from "dayjs";
import MultiExportModal from "../export/MultiExportModal";
import { RestoreFromTrashRounded } from "@mui/icons-material";
import Swal from "sweetalert2";

function ProductsPage() {
  const [mainCatesData, setMainCatesData] = useState([]);
  const [productSelected, setProductSelected] = useState([]);
  const [openMultiExportModal, setOpenMultiexportModal] = useState(false);
  const { t } = useTranslation(["dashboard-page"]);

  const [loading, setLoading] = useState(true);

  const [productsAll, setProductsAll] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [mainCateId, setMainCateId] = useState(0);
  const [productTitle, setProductTitle] = useState("");
  const [vat, setVat] = useState("all");
  const [refreshData, setRefreshData] = useState(0);
  const dispatch = useDispatch();
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
      console.log(productSelected);
      setOpenMultiexportModal(true);
    }
  };

  async function getMainCates() {
    const response = await axios.get("maincates");
    const data = response.data.mainCates;
    setMainCatesData(data);
  }

  async function filterData(cate_id = 0, _title = "") {
    setProductTitle(_title);
    setMainCateId(cate_id);
    const hasVat = vat === "vat" ? true : false;
    if (cate_id === 0 && _title === "" && vat === "all") {
      setProductsAll(productsData);
    } else if (cate_id === 0 && _title === "" && vat !== "all") {
      const result = productsData;
      const dd = result?.filter((item) =>
        hasVat ? item.vat_id !== 0 : item.vat_id === 0
      );
      setProductsAll(dd);
    } else if (
      (cate_id === 0 && _title !== "") ||
      (cate_id !== 0 && _title === "")
    ) {
      const result = productsData;
      const data = result?.filter(
        (item) => item.main_cate_id === cate_id || item.title === _title
      );
      if (vat === "all") {
        setProductsAll(data);
      } else {
        const dd = data?.filter((item) =>
          hasVat ? item.vat_id !== 0 : item.vat_id === 0
        );
        setProductsAll(dd);
      }
    } else {
      const result = productsData;
      const data = result?.filter(
        (item) => item.main_cate_id === cate_id && item.title === _title
      );
      if (vat === "all") {
        setProductsAll(data);
      } else {
        const dd = data?.filter((item) =>
          hasVat ? item.vat_id !== 0 : item.vat_id === 0
        );
        setProductsAll(dd);
      }
    }
  }

  async function fetchService() {
    const data = await svProductAll().then((res) => res.data);
    const result = await data.map((item) => {
      const duration = dayjs(item.exp_date).diff(current_date, "day");
      return { ...item, diff_date: duration };
    });
    return result;
  }

  async function fetchProduct() {
    const result = await fetchService();
    setProductsData(result);
    setProductsAll(result);
    setLoading(false);
  }

  useEffect(() => {
    getMainCates();
    fetchProduct();
  }, [refreshData]);

  useEffect(() => {
    filterData(mainCateId, productTitle);
  }, [vat]);

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
                  id="combo-box-demo"
                  options={productsAll}
                  getOptionLabel={(option) => option.title || ""}
                  sx={{ width: 150 }}
                  renderInput={(params) => (
                    <TextField {...params} label="ชื่อ" />
                  )}
                  onChange={(e, value) =>
                    filterData(mainCateId, value ? value.title : "")
                  }
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-demo"
                  options={mainCatesData}
                  getOptionLabel={(option) => option.name || ""}
                  sx={{ width: 150 }}
                  renderInput={(params) => (
                    <TextField {...params} label="หมวดหมู่" />
                  )}
                  onChange={(e, value) =>
                    filterData(value ? value.id : 0, productTitle)
                  }
                />
                {/* <Autocomplete
              disabled
              size="small"
              disablePortal
              id="combo-box-demo"
              options={rows.map((e) => e.category)}
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="หมวดหมู่ย่อย" />}
            /> */}
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    value={vat}
                  >
                    <FormControlLabel
                      value="all"
                      control={<Radio />}
                      label="All"
                      onChange={() => setVat("all")}
                    />
                    <FormControlLabel
                      value="vat"
                      control={<Radio />}
                      label="Vat"
                      onChange={() => setVat("vat")}
                    />
                    <FormControlLabel
                      value="noVat"
                      control={<Radio />}
                      label="No Vat"
                      onChange={() => setVat("noVat")}
                    />
                  </RadioGroup>
                </FormControl>
                <Link
                  style={{ fontSize: "16px" }}
                  to="/products/import"
                  className="create"
                >
                  เพิ่มสินค้า
                </Link>
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
                rows={rows}
                productsAll={productsAll}
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
