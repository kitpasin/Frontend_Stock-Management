/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Card } from "@mui/material";

import "./DefectiveExportPage.scss"
import HeadPageComponent from "../../components/layout/headpage/headpage";
import DetailDataGrid from "./components/DetailDataGrid";
import { defectiveDetail, defectiveSupplier } from "./data/TableData";
import SupplierDataGrid from "./components/SupplierDataGrid";

function DefectiveExportPage() {
  const { t } = useTranslation(["dashboard-page"]);

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
            h1={t("เบิกสินค้าชำรุด")}
            breadcrums={[{ title: t("เบิกสินค้าชำรุด"), link: false }]}
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
        <DetailDataGrid defectiveDetail={defectiveDetail} />
      </Card>
      <Card className="flex-container-column">
        <figure className="supplier-title">
          <img src="/images/icons/supplierTable-icon.png" alt="" />
          <p>ซัพพลายเออร์</p>
        </figure>
        <SupplierDataGrid defectiveSupplier={defectiveSupplier} />
      </Card>
      <div className="flex-container-center">
        <Card className="quantity-left">
          <p>จำนวนคงเหลือ/หน่วย</p>
          <span>800 กระป๋อง</span>
        </Card>
        <Card className="quantity-export">
          <p>กรอกจำนวนสินค้าชำรุด</p>
          <input placeholder="กรอกจำนวนสินค้า" />
        </Card>
        <button className="submit">
          <img src="/images/icons/defectiveBig-icon.png" alt="" />
          <p>ตัดสินค้าชำรุด</p>
        </button>
      </div>
    </section>
  );
}

export default DefectiveExportPage;
