/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { Autocomplete, Card, TextField } from "@mui/material";
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

  const [stockSupplier, setStockSupplier] = useState("")
  const [expireSupplier, setExpireSupplier] = useState("")
  const [importSupplier, setImportSupplier] = useState("")
  const [exportSupplier, setExportSupplier] = useState("")

  const filteredStockProduct = productsOutOfStock.filter((product) => {
    const matchesStockSupplier = stockSupplier ? product.supplier_name === stockSupplier : true;
    return matchesStockSupplier;
  });

  const filteredExpireProduct = productsAboutToExpire.filter((product) => {
    const matchesExpireSupplier = expireSupplier ? product.supplier_name === expireSupplier : true;
    return matchesExpireSupplier;
  });

  const filteredImportProduct = productsImport.filter((product) => {
    const matchesImportSupplier = importSupplier ? product.supplier_name === importSupplier : true;
    return matchesImportSupplier;
  });

  const filteredExportProduct = productsExport.filter((product) => {
    const matchesExportSupplier = exportSupplier ? product.supplier_name === exportSupplier : true;
    return matchesExportSupplier;
  });

  // Remove duplicate products based on product_id
  const uniqueProductsMap = new Map();
  filteredStockProduct.forEach((item) => {
    uniqueProductsMap.set(item.product_id, item);
  });
  const uniqueProductsData = Array.from(uniqueProductsMap.values());

  const supplierStockOptions = productsOutOfStock
    .map((supplier) => supplier.supplier_name)
    .filter((value, index, self) => self.indexOf(value) === index && value !== null);

  const supplierExpireOptions = productsAboutToExpire
    .map((supplier) => supplier.supplier_name)
    .filter((value, index, self) => self.indexOf(value) === index && value !== null);
  
  const supplierImportOptions = productsImport
    .map((supplier) => supplier.supplier_name)
    .filter((value, index, self) => self.indexOf(value) === index && value !== null);

  const supplierExportOptions = productsExport
    .map((supplier) => supplier.supplier_name)
    .filter((value, index, self) => self.indexOf(value) === index && value !== null);

  return (
    <>
      <div className="grid-container-1fr-1fr-table">
        <Card className="item">
          <div className="header">
            <figure className="header-title">
              <img src="/images/icons/product-icon.png" alt="" />
              <p>จำนวนสินค้าใกล้หมดสต๊อก/เดือน</p>
              <p style={{ color: "red" }}>{uniqueProductsData?.length} รายการ</p>
            </figure>
            <div className="header-link">
              <Link to="/stock">ดูรายการเพิ่มเติม</Link>
            </div>
          </div>
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-title"
            options={supplierStockOptions}
            onChange={(event, value) => setStockSupplier(value || "")}
            fullWidth
            renderInput={(params) => <TextField {...params} label="ซัพพลายเออร์" />}
          />
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
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-title"
            options={supplierExpireOptions}
            onChange={(event, value) => setExpireSupplier(value || "")}
            fullWidth
            renderInput={(params) => <TextField {...params} label="ซัพพลายเออร์" />}
          />
          <ExpireDataGrid productsAboutToExpire={filteredExpireProduct} />
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
                <Link to="/products">ดูรายการเพิ่มเติม</Link>
              </button>
            </div>
          </div>
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-title"
            options={supplierImportOptions}
            onChange={(event, value) => setImportSupplier(value || "")}
            fullWidth
            renderInput={(params) => <TextField {...params} label="ซัพพลายเออร์" />}
          />
          <ImportDataGrid productsImport={filteredImportProduct} />
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
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-title"
            options={supplierExportOptions}
            onChange={(event, value) => setExportSupplier(value || "")}
            fullWidth
            renderInput={(params) => <TextField {...params} label="ซัพพลายเออร์" />}
          />
          <ExportDataGrid productsExport={filteredExportProduct} />
        </Card>
      </div>
    </>
  );
}

export default Tables;
