/* eslint-disable */
import React, { useEffect, useRef, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Autocomplete, Card, TextField } from "@mui/material";
import { ProductContext } from "../../App";
import Barcode from "react-barcode";

import "./DefectiveExportPage.scss"
import HeadPageComponent from "../../components/layout/headpage/headpage";
import DetailDataGrid from "./components/DetailDataGrid";
import SupplierDataGrid from "./components/SupplierDataGrid";
import axios from "axios";
import Swal from "sweetalert2";

function DefectiveExportPage() {
  const { t } = useTranslation(["dashboard-page"]);
  const webPath = useSelector((state) => state.app.webPath);
  const { productIds, setProductIds } = useContext(ProductContext);
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [exportQuantity, setExportQuantity] = useState(0)
  
  async function getProducts() {
    const response = await axios.get('productAll');
    const data = response.data.data
    const filteredProducts = data.filter((product) => productIds.includes(product.product_id));
    setProducts(filteredProducts);
  }

  function ExportDefectiveProduct(product) {
    console.log(typeof(exportQuantity))
    const data = {
      product_id: product.product_id,
      title: product.title,
      agent: product.supplier_agent,
      export_quantity: exportQuantity
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to export the product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, export it!",
    }).then((result) => {
     if (result.isConfirmed) {
      axios
        .post("product/defective/create", data)
        .then(function (response) {
          Swal.fire("Exported!", "Your product has been exported.", "success").then(()=> {
            getProducts();
          })
        })
        .catch(function (error) {
          console.error(error);
        });
     }
    });
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
            options={products || []}
            getOptionLabel={(product) => product.title || ""}
            sx={{ width: "200px" }}
            renderInput={(params) => <TextField {...params} label="เลือกสินค้า" />}
            value={
              selectedProduct || (products.length > 0 ? setSelectedProduct(products[0]) : null)
            }
            onChange={(event, newValue) => setSelectedProduct(newValue)}
          />
        </div>
        {/* /images/mock/pre-product.png */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <figure className="product-image">
            <img
              src={
                selectedProduct === null
                  ? "/images/mock/pre-product.png"
                  : webPath + selectedProduct?.thumbnail_link
              }
              alt=""
            />
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
            {selectedProduct ? (
              <Barcode value={selectedProduct?.barcode_number} />
            ) : (
              <img src="/images/barcode/barcode.png" alt="" />
            )}
          </figure>
        </div>
      </Card>
      <Card className="flex-container-column">
        <DetailDataGrid selectedProduct={selectedProduct} />
      </Card>
      <Card className="flex-container-column">
        <figure className="supplier-title">
          <img src="/images/icons/supplierTable-icon.png" alt="" />
          <p>ซัพพลายเออร์</p>
        </figure>
        <SupplierDataGrid selectedProduct={selectedProduct} />
      </Card>
      <div className="flex-container-center">
        <Card className="quantity-left">
          <p>จำนวนคงเหลือ/หน่วย</p>
          <span>
            {selectedProduct?.total_product} {selectedProduct?.amount_name}
          </span>
        </Card>
        <Card className="quantity-export">
          <p>กรอกจำนวนสินค้าชำรุด</p>
          <input type="number" placeholder="กรอกจำนวนสินค้า" value={exportQuantity} onChange={(e) => setExportQuantity(e.target.value)} />
        </Card>
        <button className="submit" onClick={()=>ExportDefectiveProduct(selectedProduct)}>
          <img src="/images/icons/defectiveBig-icon.png" alt="" />
          <p>ตัดสินค้าชำรุด</p>
        </button>
      </div>
    </section>
  );
}

export default DefectiveExportPage;
