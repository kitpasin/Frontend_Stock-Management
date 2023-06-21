/* eslint-disable */
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { Card } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

import "./DefectivePage.scss";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import Table from "./components/Table";
import { rows } from "./data/TableData";
import { Link } from "react-router-dom";

function DefectiveSearchPage() {
  const { t } = useTranslation(["dashboard-page"]);

  return (
    <section id="defective-search-page">
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
            h1={t("เบิกสินค้าชำรุด")}
            breadcrums={[{ title: t("เบิกสินค้าชำรุด"), link: false }]}
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
            <Link to="/defective/export" className="export">
              เบิกสินค้าชำรุด
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

export default DefectiveSearchPage;
