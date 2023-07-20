/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { Card } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import StockDataGrid from "./StockDataGrid";
import ExpireDataGrid from "./ExpireDataGrid";
import ExportDataGrid from "./ExportDataGrid";
import ImportDataGrid from "./ImportDataGrid";
import { Link } from "react-router-dom";

function Tables({
  productsOutOfStock,
  productsAboutToExpire,
  productsImport,
  productsExport,
}) {
  useEffect(() => {}, []);

  // Remove duplicate products based on product_id
  const uniqueProductsMap = new Map();
  productsOutOfStock.forEach((item) => {
    uniqueProductsMap.set(item.product_id, item);
  });
  const uniqueProductsData = Array.from(uniqueProductsMap.values());

  return (
    <>
      <div className="grid-container-1fr-1fr-table">
        <Card className="item">
          <div className="header">
            <figure className="header-title">
              <img src="/images/icons/product-icon.png" alt="" />
              <p>จำนวนสินค้าใกล้หมด/เดือน</p>
              <p style={{ color: "red" }}>{uniqueProductsData?.length} รายการ</p>
            </figure>
            <div className="header-link">
              <Link to="/stock">ดูรายการเพิ่มเติม</Link>
            </div>
          </div>
          <StockDataGrid uniqueProductsData={uniqueProductsData} />
        </Card>

        <Card className="item">
          <div className="header">
            <figure className="header-title">
              <img src="/images/icons/expirationTable-icon.png" alt="" />
              <p>จำนวนสินค้าใกล้หมดอายุ/เดือน</p>
              <p style={{ color: "red" }}>{productsAboutToExpire?.length} รายการ</p>
            </figure>
            <div className="header-link">
              <button>
                <Link to="/expiration">ดูรายการเพิ่มเติม</Link>
              </button>
            </div>
          </div>
          <ExpireDataGrid productsAboutToExpire={productsAboutToExpire} />
        </Card>
      </div>

      <div className="grid-container-1fr-table">
        <Card className="item">
          <div className="header">
            <figure className="header-title">
              <img src="/images/icons/import-icon.png" alt="" />
              <p>สินค้านำเข้าวันนี้</p>
              <p style={{ color: "red" }}>{productsImport?.length} รายการ</p>
            </figure>
            <div className="header-link">
              <button>
                <Link to="/product">ดูรายการเพิ่มเติม</Link>
              </button>
            </div>
          </div>
          <ImportDataGrid productsImport={productsImport} />
        </Card>
        <Card className="item">
          <div className="header">
            <figure className="header-title">
              <img src="/images/icons/export-icon.png" alt="" />
              <p>สินค้าเบิกออกวันนี้</p>
              <p style={{ color: "red" }}>{productsExport?.length} รายการ</p>
            </figure>
            <div className="header-link">
              <button>
                <Link to="/export">ดูรายการเพิ่มเติม</Link>
              </button>
            </div>
          </div>
          <ExportDataGrid productsExport={productsExport} />
        </Card>
      </div>
    </>
  );
}

export default Tables;
