import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function SupplierDataGrid({ selectedProduct }) {
  const columns = [
    {
      field: "supplier_name",
      headerName: "ชื่อบริษัท",
      width: 450,
      headerClassName: "table-columns",
    },
    {
      field: "supplier_address",
      headerName: "ที่อยู่",
      width: 450,
      headerClassName: "table-columns",
    },
    {
      field: "supplier_agent",
      headerName: "ชื่อผู้ติดต่อ",
      width: 175,
      headerClassName: "table-columns",
    },
    {
      field: "supplier_tel",
      headerName: "เบอร์โทร",
      width: 175,
      headerClassName: "table-columns",
    },
    {
      field: "supplier_email",
      headerName: "อีเมล",
      width: 175,
      headerClassName: "table-columns",
    },
    {
      field: "supplier_line_id",
      headerName: "ไลน์ ไอดี",
      width: 175,
      headerClassName: "table-columns",
    },
  ];

  const rowData = selectedProduct ? [selectedProduct] : [];

  const rowsClassName = "table-rows";
  return (
    <>
      <DataGrid
        getRowClassName={() => rowsClassName}
        sx={{ fontSize: "12px", border: "none" }}
        rows={rowData}
        columns={columns}
        hideFooterPagination
        className="no-footer"
      />
    </>
  );
}

export default SupplierDataGrid;
