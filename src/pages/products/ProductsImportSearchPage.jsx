/* eslint-disable */
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { Card } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import HeadPageComponent from "../../components/layout/headpage/headpage";
import Search from "./components/Search";
import { rows } from "./data/TableData";
import { Link } from "react-router-dom";

function ProductsImportSearchPage() {
  const { t } = useTranslation(["dashboard-page"]);

  return (
    <section id="products-import-search-page">
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
            <Link to="/products/import" className="export">
              ดึงข้อมูล
            </Link>
          </div>
        </div>
        <div>
          <Search rows={rows} />
        </div>
      </Card>
    </section>
  );
}

export default ProductsImportSearchPage;
