/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Card, TextField } from "@mui/material";
import Barcode from "react-barcode";

import "./ProductsExportPage.scss";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import DetailDataGrid from "../defective/components/DetailDataGrid";
import {
  defectiveDetail,
  defectiveSupplier,
} from "../defective/data/TableData";
import SupplierDataGrid from "../defective/components/SupplierDataGrid";
import { rows } from "./data/TableData";

function ProductsExportPage({ exportOne, productShow }) {
  const stock = productShow.import_value - productShow.export_value;
  const webPath = useSelector((state) => state.app.webPath);
  const [productShowArr, setProductShowArr] = useState([]);
  const [exportValue, setExportValue] = useState(0);
  const { t } = useTranslation(["dashboard-page"]);

  const onExportProduct = (_id) => {
    if (exportValue <= 0) {
      console.log("errorerereoreroereor");
    } else {
      console.log("okokoko");
    }
  };

  useEffect(() => {
    setProductShowArr((prev) => {
      return [...prev, productShow];
    });
  }, []);
  return (
    <section id="products-export-page">
      {!exportOne && (
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
            <HeadPageComponent
              h1={t("เบิกสินค้า")}
              breadcrums={[{ title: t("เบิกสินค้า"), link: false }]}
            />
          </div>
        </div>
      )}
      <Card className="flex-container-column" style={{ marginTop: "-1rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "2.5rem",
          }}
        >
          <div className="flex-container-center">
            <img src="/images/icons/export-icon.png" alt="" />
            <p style={{ color: "#3b326b", fontSize: "18px", fontWeight: 400 }}>
              เบิกออกสินค้า
            </p>
          </div>
          {!exportOne && (
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={rows}
              getOptionLabel={(rows) => rows.name || ""}
              sx={{ width: "200px" }}
              renderInput={(params) => (
                <TextField {...params} label="เลือกสินค้า" />
              )}
            />
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <figure className="product-image">
            <img src={webPath + productShow.thumbnail_link} alt="" />
          </figure>
          <div className="product-name">
            <p>ชื่อสินค้า</p>
            <span>{productShow.title}</span>
          </div>
          <p style={{ width: "3.33%", textAlign: "center" }}>|</p>
          <div className="product-number">
            <p>รหัสสินค้า</p>
            <span>{productShow.product_id}</span>
          </div>
          <p style={{ width: "3.33%", textAlign: "center" }}>|</p>
          <div className="barcode-number">
            <p>รหัสบาร์โค้ด</p>
            <span>{productShow.barcode_number}</span>
          </div>
          <p style={{ width: "3.33%", textAlign: "center" }}>|</p>
          <figure className="barcode-image">
            <Barcode value={productShow.barcode_number} />
          </figure>
        </div>
      </Card>
      <Card className="flex-container-column">
        <DetailDataGrid
          defectiveDetail={defectiveDetail}
          productShowArr={productShowArr}
        />
      </Card>
      <Card className="flex-container-column">
        <figure className="supplier-title">
          <img src="/images/icons/supplierTable-icon.png" alt="" />
          <p>ซัพพลายเออร์</p>
        </figure>
        <SupplierDataGrid
          defectiveSupplier={defectiveSupplier}
          productShowArr={productShowArr}
        />
      </Card>
      <div className="flex-container-center">
        <Card className="quantity-left">
          <p>จำนวนคงเหลือ/หน่วย</p>
          <span>
            {stock} {productShow.amount_name}
          </span>
        </Card>
        <Card className="quantity-export">
          <p>กรอกจำนวนสินค้าที่ต้องการเบิก</p>
          <input
            placeholder="กรอกจำนวนสินค้า"
            value={exportValue}
            onChange={(e) =>
              setExportValue(
                !isNaN(parseInt(e.target.value)) &&
                  parseInt(e.target.value) <= stock
                  ? parseInt(e.target.value)
                  : 0
              )
            }
          />
        </Card>
        <button className="submit" onClick={() => onExportProduct(productShow.id)}>
          <img src="/images/icons/importBig-icon.png" alt="" />
          <p>ยืนยันจำนวน</p>
        </button>
      </div>
    </section>
  );
}

export default ProductsExportPage;
