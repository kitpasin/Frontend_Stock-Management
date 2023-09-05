import React from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import HeadPageComponent from "../../components/layout/headpage/headpage";
import Table from "./Table";
import "./SupproductPage.scss";
import { svProductAll } from "../../services/product.service";
import { getCategory } from "../../services/category.service";
import SupproductImport from "./SupproductImport";

export default function SupproductPage() {
  const { t } = useTranslation(["supproduct-page"]);
  const [refreshData, setRefreshData] = useState(0);
  const [productsAll, setProductAll] = useState([]);
  const [filterId, setFilterId] = useState({ p_id: "", cate_id: "" });
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [productCate, setProductCate] = useState([]);
  const [productShow, setProductShow] = useState({});

  function initData() {
    svProductAll().then((res) => {
      const result = res.data;
      setProductAll(result);
      setFilteredData(result);
      setLoading(false);
    });

    getCategory().then((res) => {
      const result = res.data;
      setProductCate(result);
    });
  }

  function filteredId() {
    if (!filterId.cate_id && !filterId.p_id) {
      setFilteredData(productsAll);
    } else {
      let data = [];
      if (!filterId.cate_id && filterId.p_id) {
        data = productsAll?.filter((item) => item.id == filterId.p_id);
      } else if (filterId.cate_id && !filterId.p_id) {
        data = productsAll?.filter(
          (item) => item.main_cate_id == filterId.cate_id
        );
      } else {
        data = productsAll?.filter(
          (item) =>
            item.main_cate_id == filterId.cate_id && item.id == filterId.p_id
        );
      }
      setFilteredData(data);
    }
  }

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    filteredId();
  }, [refreshData, filterId]);

  return (
    <section id="supproduct-page">
      {loading ? (
        <PulseLoader color="#3b326b" />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0",
            }}
          >
            <figure style={{ width: "30px", marginBottom: "1rem" }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </figure>
            <div style={{ width: "100%" }}>
              <HeadPageComponent
                h1={t("ค้นหาสินค้าที่จะเพิ่ม")}
                breadcrums={[{ title: t("Products"), link: false }]}
              />
            </div>
          </div>
          <Card className="flex-container-column" sx={{ borderRadius: "10px", }}>
            <div className="header">
              <div className="wrapper">
                <figure className="title">
                  <img src="/images/icons/productsTable-icon.png" alt="" />
                  <p>สินค้าทั้งหมด</p>
                </figure>
                <div className="description">
                  <p>{filteredData.length} รายการ</p>
                </div>
              </div>
              <div style={{ width: "40%", display: "flex", gap: "1rem" }}>
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-title"
                  options={productCate}
                  getOptionLabel={(option) => option.name || ""}
                  onChange={(event, value) =>
                    setFilterId((prev) => {
                      return { ...prev, cate_id: value ? value.id : "" };
                    })
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="หมวดหมู่หลัก" />
                  )}
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-title"
                  options={productsAll}
                  getOptionLabel={(option) => option.title || ""}
                  onChange={(event, value) =>
                    setFilterId((prev) => {
                      return { ...prev, p_id: value ? value.id : "" };
                    })
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="ชื่อสินค้า" />
                  )}
                />
              </div>
            </div>
            <div>
              <Table
                productsData={filteredData}
                refreshData={refreshData}
                setRefreshData={setRefreshData}
                openModal={openModal}
                setOpenModal={setOpenModal}
                setProductShow={setProductShow}
              />
            </div>
          </Card>
          <SupproductImport
            productShow={productShow}
            open={openModal}
            setOpen={setOpenModal}
            isEdit={false}
          />
        </>
      )}
    </section>
  );
}
