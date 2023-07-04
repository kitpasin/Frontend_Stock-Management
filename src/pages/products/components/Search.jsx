import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

function Search({ rows }) {

  const columns = [
    {
      field: "image",
      headerName: "ภาพ",
      width: 50,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div style={{ background: "#D0D0E2", borderRadius: "5px" }}>
          <Avatar src={`images/mock/product1.png`} alt={`Image ${params.value}`} />
        </div>
      ),
    },
    {
      field: "name",
      headerName: "ชื่อรายการ",
      headerAlign: "center",
      align: "center",
      width: 238,
      headerClassName: "table-columns",
    },
    {
      field: "purchaseDate",
      headerName: "วันที่ซื้อ",
      headerAlign: "center",
      align: "center",
      width: 238,
      headerClassName: "table-columns",
    },
    {
      field: "MEDEXP",
      headerName: "MFDEXP",
      width: 238,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderCell: () => (
        <div>
          <p>28/8/2023</p>
          <p style={{ color: "#ff0000" }}>28/8/2023</p>
        </div>
      ),
    },
    {
      field: "category",
      headerName: "หมวดหมู่",
      headerAlign: "center",
      align: "center",
      width: 238,
      headerClassName: "table-columns",
    },
    {
      field: "countingUnit",
      headerAlign: "center",
      align: "center",
      headerName: "หน่วยนับ",
      width: 238,
      headerClassName: "table-columns",
    },
    {
      field: "volumnPerUnit",
      headerName: "ปริมาตรสุทธิ/หน่วย",
      headerAlign: "center",
      align: "center",
      width: 238,
      headerClassName: "table-columns",
    },
    {
      field: "action",
      headerName: "ดึงข้อมูล",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div>
          <Link to="/products/import">
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

export default Search;
