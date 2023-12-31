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
import { Link } from "react-router-dom";

import "./ImportPage.scss";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import Table from "./components/Table";
import { rows } from "./data/TableData";

function ImportPage() {
  const { t } = useTranslation(["dashboard-page"]);
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {}, []);

  return (
    <section id="import-page">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <figure style={{ width: "30px", marginBottom: "1rem" }}>
          <img src="/images/icons/importPage-icon.png" alt="" />
        </figure>
        <div style={{ width: "100%" }}>
          <HeadPageComponent h1={t("Import")} breadcrums={[{ title: t("Import"), link: false }]} />
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
              <p>20,500 รายการ</p>
            </div>
          </div>
          <div className="filter">
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={rows}
              getOptionLabel={(rows) => rows.name || ""}
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="ชื่อ" />}
            />
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={rows.map((e) => e.category)}
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="หมวดหมู่หลัก" />}
            />
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={rows.map((e) => e.category)}
              sx={{ width: 150 }}
              renderInput={(params) => <TextField {...params} label="หมวดหมู่ย่อย" />}
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
            <Link style={{ fontSize: "16px" }} to="/products/import" className="create">
              เพิ่มสินค้า
            </Link>
            <Link style={{ fontSize: "16px" }} to="/products/export" className="export">
              เบิกสินค้า
            </Link>
          </div>
        </div>
        <div>
          <Table rows={rows} />
        </div>
      </Card>
    </section>
  );
}

export default ImportPage;
