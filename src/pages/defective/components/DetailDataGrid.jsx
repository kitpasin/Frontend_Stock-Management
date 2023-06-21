import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function DetailDataGrid({ defectiveDetail }) {

  const columns = [
    {
      field: "quantityPerUnit",
      headerName: "คงเหลือ/หน่วย",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "defective",
      headerName: "สินค้ามีปัญหา",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "purchaseDate",
      headerName: "วันที่ซื้อ",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "MEDEXP",
      headerName: "MEDEXP",
      width: 150,
      headerClassName: "table-columns",
    },
    {
      field: "dateEXP",
      headerName: "MEDEXP",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "vat",
      headerName: "Vat",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "category",
      headerName: "หมวดหมู่",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "countingUnit",
      headerName: "หน่วยนับ",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "volumnPerUnit",
      headerName: "ปริมาตรสุทธิ/หน่วย",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "operationFee",
      headerName: "ค่าดำเนินการ (THB)",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "operationFeePerUnit",
      headerName: "ดำเนินการ/หน่วย (THB)",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "rawPrice",
      headerName: "ราคาดิบ (THB)",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "rawPricePerUnit",
      headerName: "ราคาดิบ/หน่วย (THB)",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "costPerUnit",
      headerName: "ต้นทุนต่อหน่วย (THB)",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "total",
      headerName: "รวมเป็น (THB)",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "profit",
      headerName: "กำไร",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "expectedSellingPrice",
      headerName: "ราคาขาย (THB)",
      width: 100,
      headerClassName: "table-columns",
    },
    {
      field: "actualSellingPrice",
      headerName: "ราคาขายจริง (THB)",
      width: 100,
      headerClassName: "table-columns",
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
