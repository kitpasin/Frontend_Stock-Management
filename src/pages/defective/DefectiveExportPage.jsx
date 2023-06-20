/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Card } from "@mui/material";

import "./DefectiveExportPage.scss"
import HeadPageComponent from "../../components/layout/headpage/headpage";
import DetailDataGrid from "./components/DetailDataGrid";
import { defective } from "./data/TableData";

function DefectiveExportPage() {
  const { t } = useTranslation(["dashboard-page"]);
  const dispatch = useDispatch();
  const [rowsData, setRowsData] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  useEffect(() => {}, []);
  return (
    <section id="defective-export-page">
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
      <Card className="flex-container-between">
        <figure className="product-image">
          <img src="/images/mock/product1.png" alt="" />
        </figure>
        <div className="product-name">
          <p>ชื่อสินค้า</p>
          <span>บะหมี่กึ่งสำเร็จรูป มาม่า รสแกงเขียวหวานไก่แบบแห้ง</span>
        </div>
        <p style={{ width: "3.33%", textAlign: "center" }}>|</p>
        <div className="product-number">
          <p>รหัสสินค้า</p>
          <span>01234567895846</span>
        </div>
        <p style={{ width: "3.33%", textAlign: "center" }}>|</p>
        <div className="barcode-number">
          <p>รหัสบาร์โค้ด</p>
          <span>01234567895846</span>
        </div>
        <p style={{ width: "3.33%", textAlign: "center" }}>|</p>
        <figure className="barcode-image">
          <img src="/images/barcode/barcode.png" alt="" />
          <span>ภาพบาร์โคด</span>
        </figure>
      </Card>
      <Card className="flex-container-column">
        <DetailDataGrid defective={defective} />
      </Card>
      <Card className="flex-container-column"></Card>
    </section>
  );
}

export default DefectiveExportPage;
