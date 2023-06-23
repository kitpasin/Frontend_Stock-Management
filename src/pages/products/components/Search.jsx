import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

function Table({ rows }) {

  const columns = [
    {
      field: "image",
      headerName: "ภาพ",
      width: 100,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ background: "#D0D0E2", borderRadius: "5px" }}>
          <Avatar src={`images/mock/product1.png`} alt={`Image ${params.value}`} />
        </div>
      ),
    },
    { field: "name", headerName: "ชื่อรายการ", width: 300, headerClassName: "table-columns" },
    {
      field: "purchaseDate",
      headerName: "วันที่ซื้อ",
      width: 210,
      headerClassName: "table-columns",
    },
    {
      field: "MEDEXP",
      headerName: "MFDEXP",
      width: 210,
      headerClassName: "table-columns",
    },
    {
      field: "category",
      headerName: "หมวดหมู่",
      width: 210,
      headerClassName: "table-columns",
    },
    { field: "countingUnit", headerName: "หน่วยนับ", width: 210, headerClassName: "table-columns" },
    {
      field: "volumnPerUnit",
      headerName: "ปริมาตรสุทธิ/หน่วย",
      width: 210,
      headerClassName: "table-columns",
    },
    {
      field: "action",
      headerName: "ดึงข้อมูล",
      headerAlign: "center",
      align: "center",
      width: 100,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div>
          <Link
          to="/products/import"
          >
            <img
              style={{
                background: "#3B336B",
                width: "40px",
                height: "40px",
                padding: ".65rem",
                borderRadius: "5px",
              }}
              src="/images/icons/imports-icon.png"
              alt=""
            />
          </Link>
        </div>
      ),
    },
  ];

  const rowsClassName = "table-rows";

  return (
    <div>
      <DataGrid
        getRowClassName={() => rowsClassName}
        sx={{ fontSize: "12px", border: "none" }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
        checkboxSelection
      />
    </div>
  );
}

export default Table;
