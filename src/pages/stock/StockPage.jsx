/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { TextField } from "@mui/material";
import { Card } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import "./StockPage.scss";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import Table from "./components/Table";
import { rows } from "./data/TableData";

function StockPage() {
  const { t } = useTranslation(["dashboard-page"]);
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {}, []);

  return (
    <section id="stock-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <figure style={{ width: "30px", marginBottom: "1rem" }}>
          <img src="/images/icons/stockPage-icon.png" alt="" />
        </figure>
        <div style={{ width: "100%" }}>
          <HeadPageComponent h1={t("Stock")} breadcrums={[{ title: t("Stock"), link: false }]} />
        </div>
      </div>
      <Card className="flex-container-column" sx={{ borderRadius: "10px" }}>
        <div className="header">
          <div className="wrapper">
            <figure className="title">
              <img src="/images/icons/stockTable-icon.png" alt="" />
              <p>สินค้าใกล้หมดสต็อก</p>
            </figure>
            <div className="description">
              <p>2,500 รายการ</p>
            </div>
          </div>
          <div className="filter">
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={rows}
              getOptionLabel={(rows) => rows.name || ""}
              onChange={(event, value) => setRowsData(value)}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="ชื่อ" />}
            />
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={rows.map((e) => e.category)}
              sx={{ width: 200 }}
              renderInput={(params) => <TextField {...params} label="หมวดหมู่หลัก" />}
            />
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="all" control={<Radio />} label="All" />
                <FormControlLabel value="vat" control={<Radio />} label="Vat" />
                <FormControlLabel value="noVat" control={<Radio />} label="No Vat" />
              </RadioGroup>
            </FormControl>
            <button className="create">เพิ่มสินค้าเข้า</button>
          </div>
        </div>
        <div>
          <Table rows={rows} />
        </div>
      </Card>
    </section>
  );
}

export default StockPage;
