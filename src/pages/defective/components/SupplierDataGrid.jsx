import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function SupplierDataGrid({ defectiveSupplier }) {
  const columns = [
    {
      field: "name",
      headerName: "ชื่อบริษัท",
      width: 450,
      headerClassName: "table-columns",
    },
    {
      field: "address",
      headerName: "ที่อยู่",
      width: 450,
      headerClassName: "table-columns",
    },
    {
      field: "contact",
      headerName: "ชื่อผู้ติดต่อ",
      width: 175,
      headerClassName: "table-columns",
    },
    {
      field: "tel",
      headerName: "เบอร์โทร",
      width: 175,
      headerClassName: "table-columns",
    },
    {
      field: "email",
      headerName: "อีเมล",
      width: 175,
      headerClassName: "table-columns",
    },
    {
      field: "lineId",
      headerName: "ไลน์ ไอดี",
      width: 175,
      headerClassName: "table-columns",
    }
  ];

  const rowsClassName = "table-rows";
  return (
    <>
      <DataGrid
        getRowClassName={() => rowsClassName}
        sx={{ fontSize: "12px", border: "none" }}
        rows={defectiveSupplier}
        columns={columns}
        hideFooterPagination
        className="no-footer"
      />
    </>
  );
}

export default SupplierDataGrid;
