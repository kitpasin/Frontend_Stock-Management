/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Card, TextField } from "@mui/material";
import Barcode from "react-barcode";
import Swal from "sweetalert2";

import "./DefectiveExportPage.scss";
import HeadPageComponent from "../../layout/headpage/headpage";
import DetailDataGrid from "../../datagrid/DetailDataGrid";
import { defectiveDetail, defectiveSupplier } from "../../../pages/defective/data/TableData";
import SupplierDataGrid from "../../datagrid/SupplierDataGrid";
import { rows } from "../../../pages/products/data/TableData";
import { svExportProduct } from "../../../services/product.service";
import dayjs from "dayjs";
import axios from "axios";

function DefectiveExportPage({
  exportOne,
  multiExprot,
  productDatas,
  refreshData,
  setRefreshData,
  open,
  setOpen,
  setProductSelected,
}) {
  const [stock, setStock] = useState(0);
  const webPath = useSelector((state) => state.app.webPath);
  const [productShowArr, setProductShowArr] = useState([]);
  const [productData, setProductData] = useState(productDatas);
  const [productShow, setProductShow] = useState([]);
  const [exportValue, setExportValue] = useState(0);
  const [id, setId] = useState(0);
  const inputRef = useRef();
  const { t } = useTranslation(["dashboard-page"]);

  useEffect(() => {
    if (multiExprot && !exportOne) {
      setProductShowArr((prev) => {
        return [...prev, productData[0]];
      });
      setProductShow(productData[0]);
      setStock(
        productData[0].import_value -
          (productData[0].export_value + productData[0].export_defective_value)
      );
      setId(productDatas[0].id);
    } else {
      setProductShow(productData);
      setProductShowArr((prev) => {
        return [productData];
      });
      setStock(
        productData.import_value - (productData.export_value + productData.export_defective_value)
      );
    }
  }, []);

  function onSelectProductHandle(_id) {
    setId(_id);
    if (_id === 0) {
      setProductShow(productData[0]);
      setStock(
        productData[0].import_value -
          (productData[0].export_value + productData[0].export_defective_value)
      );
      setProductShowArr((prev) => {
        return [productData[0]];
      });
      return;
    }
    const result = productData.filter((item) => item.id === _id);
    setProductShow(result[0]);
    setProductShowArr((prev) => {
      return [result[0]];
    });
    setStock(result[0].import_value - (result[0].export_value + result[0].export_defective_value));
    setExportValue(0);
  }

  const onExportProduct = (_id) => {
    const formExport = {
      product_id: productShow.product_id,
      quantity: exportValue,
    };
    if (exportValue <= 0) {
      inputRef.current.focus();
    } else {
      Swal.fire({
        title: "ยืนยันการเบิกสินค้า",
        html:
          `<p>รหัสสินค้า : ${productShow.product_id}</p>` +
          `<p>ชื่อสินค้า : ${productShow.title}</p>` +
          `<p>จำนวนที่ต้องการเบิก : ${exportValue}</p>`,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ยืนยัน",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("product/defective/create", formExport)
            .then((res) => {
              Swal.fire({
                title: "เบิกสินค้าสำเร็จ",
                icon: "success",
                showConfirmButton: false,
                timer: 1500,
              }).then(() => {
                setRefreshData(refreshData + 1);
                if (multiExprot && !exportOne && productData.length > 1) {
                  const newProductData = productData.filter((item) => item.id !== id);
                  setProductData(newProductData);
                  setProductShow(newProductData[0]);
                  setId(newProductData[0].id);
                  setStock(
                    newProductData[0].import_value -
                      (newProductData[0].export_value + newProductData[0].export_defective_value)
                  );
                  setExportValue(0);
                  setProductShowArr((prev) => {
                    return [newProductData[0]];
                  });
                } else {
                  setOpen(false)
                  window.location.href = "/defective"
                }
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    }
  };

  return (
    <section id="products-export-page">
      {!exportOne && false && (
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
              h1={t("เบิกตัดสินค้าชำรุด")}
              breadcrums={[{ title: t("เบิกตัดสินค้าชำรุด"), link: false }]}
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
              เบิกตัดสินค้าชำรุด
            </p>
          </div>
          {!exportOne && (
            <Autocomplete
              defaultValue={{ title: productData[0].title }}
              size="small"
              disablePortal
              id="combo-box-demo"
              options={productData}
              getOptionLabel={(rows) => rows.title || ""}
              sx={{ width: "200px" }}
              renderInput={(params) => <TextField {...params} label="เลือกสินค้า" />}
              onChange={(e, value) => onSelectProductHandle(value ? value.id : 0)}
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
          stock={stock}
        />
      </Card>
      <Card className="flex-container-column">
        <figure className="supplier-title">
          <img src="/images/icons/supplierTable-icon.png" alt="" />
          <p>ซัพพลายเออร์</p>
        </figure>
        <SupplierDataGrid defectiveSupplier={defectiveSupplier} productShowArr={productShowArr} />
      </Card>
      <div className="flex-container-center">
        <Card className="quantity-left">
          <p>จำนวนคงเหลือ/หน่วย</p>
          <span>
            {stock} {productShow.amount_name}
          </span>
        </Card>
        <Card className="quantity-export">
          <p>กรอกจำนวนสินค้าชำรุด</p>
          <input
            ref={inputRef}
            placeholder="กรอกจำนวนสินค้า"
            value={exportValue}
            onChange={(e) =>
              setExportValue(
                !isNaN(parseInt(e.target.value)) && parseInt(e.target.value) <= stock
                  ? parseInt(e.target.value)
                  : 0
              )
            }
          />
        </Card>
        <button className="submit" onClick={() => onExportProduct(productShow.id)}>
          <img src="/images/icons/importBig-icon.png" alt="" />
          <p>ตัดสินค้าชำรุด</p>
        </button>
      </div>
    </section>
  );
}

export default DefectiveExportPage;
