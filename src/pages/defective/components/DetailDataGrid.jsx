import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";

function DetailDataGrid({ defectiveDetail }) {

  const columns = [
    {
      field: "quantityPerUnit",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            คงเหลือ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย
          </Typography>
        </div>
      ),
    },
    {
      field: "defective",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            สินค้า
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            มีปัญหา
          </Typography>
        </div>
      ),
    },
    {
      field: "purchaseDate",
      headerName: "วันที่ซื้อ",
      headerAlign: "center",
      align: "center",
      width: 95,
      headerClassName: "table-columns",
    },
    {
      field: "MEDEXP",
      headerAlign: "center",
      align: "center",
      width: 95,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            MFD
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            EXP
          </Typography>
        </div>
      ),
      renderCell: () => (
        <div>
          <p>28/8/2023</p>
          <p style={{ color: "#ff0000" }}>28/8/2023</p>
        </div>
      ),
    },
    {
      field: "dateEXP",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            จำนวนวัน
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            EXP
          </Typography>
        </div>
      ),
    },
    {
      field: "vat",
      headerName: "Vat",
      headerAlign: "center",
      align: "center",
      width: 50,
      headerClassName: "table-columns",
    },
    {
      field: "category",
      headerName: "หมวดหมู่",
      headerAlign: "center",
      align: "center",
      width: 95,
      headerClassName: "table-columns",
    },
    {
      field: "countingUnit",
      headerName: "หน่วยนับ",
      headerAlign: "center",
      align: "center",
      width: 95,
      headerClassName: "table-columns",
    },
    {
      field: "volumnPerUnit",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ปริมาตรสุทธิ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย
          </Typography>
        </div>
      ),
    },
    {
      field: "operationFee",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ค่าดำเนินการ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "operationFeePerUnit",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ค่าดำเนินการ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "rawPrice",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ราคาดิบ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "rawPricePerUnit",
      headerName: "ราคาดิบ/หน่วย (THB)",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ราคาดิบ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "costPerUnit",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ต้นทุนต่อหน่วย
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "total",
      headerName: "Total",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "profit",
      headerName: "กำไร",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "expectedSellingPrice",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ราคาขาย
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "actualSellingPrice",
      width: 95,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ราคาขายจริง
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
  ];

  const rowsClassName = "table-rows";
  return (
    <>
      <DataGrid
        getRowClassName={() => rowsClassName}
        sx={{ fontSize: "12px", border: "none" }}
        rows={defectiveDetail}
        columns={columns}
        hideFooterPagination
        className="no-footer"
      />
    </>
  );
}

export default DetailDataGrid;
