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

function Tables({ rows }) {
  useEffect(() => {}, []);
  return (
    <>
      <div className="grid-container-1fr-1fr-table">
        <Card className="item">
          <div className="header">
            <figure className="header-title">
              <img src="/images/icons/product-icon.png" alt="" />
              <p>จำนวนสินค้าใกล้หมด</p>
              <p style={{ color: "red" }}>8,540 รายการ</p>
            </figure>
            <div className="header-link">
              <button>ดูรายการเพิ่มเติม</button>
            </div>
          </div>
          <StockDataGrid rows={rows} />
        </Card>

        <Card className="item">
          <div className="header">
            <figure className="header-title">
              <img src="/images/icons/expire-icon.png" alt="" />
              <p>จำนวนสินค้าใกล้หมดอายุ</p>
              <p style={{ color: "red" }}>14 รายการ</p>
            </figure>
            <div className="header-link">
              <button>ดูรายการเพิ่มเติม</button>
            </div>
          </div>
          <ExpireDataGrid rows={rows} />
        </Card>
      </div>

      <div className="grid-container-1fr-table">
        <Card className="item">
          <div className="header">
            <figure className="header-title">
              <img src="/images/icons/import-icon.png" alt="" />
              <p>นำเข้าสินค้า</p>
              <p style={{ color: "red" }}>25 รายการ</p>
            </figure>
            <div className="header-link">
              <button>ดูรายการเพิ่มเติม</button>
            </div>
          </div>
          <ImportDataGrid rows={rows} />
        </Card>
        <Card className="item">
          <div className="header">
            <figure className="header-title">
              <img src="/images/icons/export-icon.png" alt="" />
              <p>เบิกออกสินค้า</p>
              <p style={{ color: "red" }}>5 รายการ</p>
            </figure>
            <div className="header-link">
              <button>ดูรายการเพิ่มเติม</button>
            </div>
          </div>
          <ExportDataGrid rows={rows} />
        </Card>
      </div>
    </>
  );
}

export default Tables;
