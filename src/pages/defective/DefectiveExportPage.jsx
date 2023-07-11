/* eslint-disable */
import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Card, TextField } from "@mui/material";
import { ProductContext } from "../../App";

import "./DefectiveExportPage.scss"
import { rows } from "./data/TableData";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import DetailDataGrid from "./components/DetailDataGrid";
import { defectiveDetail, defectiveSupplier } from "./data/TableData";
import SupplierDataGrid from "./components/SupplierDataGrid";
import axios from "axios";

function DefectiveExportPage() {
  const { t } = useTranslation(["dashboard-page"]);
  const webPath = useSelector((state) => state.app.webPath);
  const { productIds, setProductIds } = useContext(ProductContext);
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  console.log(selectedProduct);

  async function getProducts() {
    const response = await axios.get('productAll');
    const data = response.data.data
    const filteredProducts = data.filter((product) => productIds.includes(product.product_id));
    setProducts(filteredProducts);
  }

  useEffect(() => {
    getProducts()
  }, []);
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
            h1={t("เบิกออกสินค้าชำรุด")}
            breadcrums={[{ title: t("เบิกออกสินค้าชำรุด"), link: false }]}
          />
        </div>
      </div>
      <Card className="flex-container-column">
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
              เบิกออกสินค้าชำรุด
            </p>
          </div>
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={products}
            getOptionLabel={(product) => product.title || ""}
            sx={{ width: "200px" }}
            renderInput={(params) => <TextField {...params} label="เลือกสินค้า" />}
            value={
              selectedProduct || (products.length > 0 ? setSelectedProduct(products[0]) : null)
            }
            onChange={(event, newValue) => setSelectedProduct(newValue)}
          />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <figure className="product-image">
            <img src={webPath + selectedProduct?.thumbnail_link} alt="" />
          </figure>
          <div className="product-name">
            <p>ชื่อสินค้า</p>
            <span>{selectedProduct?.title}</span>
          </div>
          <p style={{ width: "3.33%", textAlign: "center" }}>|</p>
          <div className="product-number">
            <p>รหัสสินค้า</p>
            <span>{selectedProduct?.product_id}</span>
          </div>
          <p style={{ width: "3.33%", textAlign: "center" }}>|</p>
          <div className="barcode-number">
            <p>รหัสบาร์โค้ด</p>
            <span>{selectedProduct?.barcode_number}</span>
          </div>
          <p style={{ width: "3.33%", textAlign: "center" }}>|</p>
          <figure className="barcode-image">
            <img src="/images/barcode/barcode.png" alt="" />
            <span>ภาพบาร์โคด</span>
          </figure>
        </div>
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
