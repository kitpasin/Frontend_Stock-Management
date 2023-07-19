import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useSelector } from "react-redux";

function StockDataGrid({ productsOutOfStock }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const webPath = useSelector((state) => state.app.webPath);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  const columns = [
    {
      field: "thumbnail_link",
      headerName: "ภาพ",
      width: 50,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <figure style={{ background: "#D0D0E2", borderRadius: "5px", padding: ".1rem" }}>
          <Avatar alt="Thumbnail" src={`${webPath}${params.row.thumbnail_link}`} />
        </figure>
      ),
    },
    {
      field: "name",
      headerName: "ชื่อรายการ",
      headerAlign: "center",
      align: "center",
      width: 150,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div style={{ paddingLeft: "1rem" }}>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>{params.row.title}</p>
          <p style={{ fontSize: "12px", lineHeight: "12.5px", color: "#9993B4" }}>
            {params.row.product_id}
          </p>
        </div>
      ),
    },
    {
      field: "quantityPerUnit",
      headerAlign: "center",
      align: "center",
      width: 140,
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
      renderCell: (params) => (
        <div>
          <p
            style={{
              fontSize: "12px",
              lineHeight: "12.5px",
              color:
                params.row.import_value -
                  params.row.export_value -
                  params.row.export_defective_value <=
                50
                  ? "#ff0000"
                  : "#000",
            }}
          >
            {params.row.import_value - params.row.export_value - params.row.export_defective_value}
          </p>
        </div>
      ),
    },
    {
      field: "netweight",
      headerAlign: "center",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
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
      renderCell: (params) => (
        <div>
          <p>
            {params.row.netweight} {params.row.unit_name}
          </p>
        </div>
      ),
    },
    {
      field: "selling_price",
      headerAlign: "center",
      align: "center",
      width: 140,
      headerClassName: "table-columns",
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
    {
      field: "exportDate",
      headerName: "วันเบิกสินค้า",
      headerAlign: "center",
      align: "center",
      width: 150,
      headerClassName: "table-columns",
      renderCell: (params) => {
        const date = params.row.formatted_created_at.split(" ")[0];
        const time = params.row.formatted_created_at.split(" ")[1];
        return (
          <div style={{ paddingLeft: ".5rem" }}>
            <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>{date}</p>
            <p style={{ fontSize: "12px", lineHeight: "12.5px", color: "#9993B4" }}>{time}</p>
          </div>
        );
      },
    },
  ];

  const rowsClassName = "table-rows";

  // Remove duplicate products based on product_id
  const uniqueProductsMap = new Map();
  productsOutOfStock.forEach((item) => {
    uniqueProductsMap.set(item.product_id, item);
  });
  const uniqueProductsData = Array.from(uniqueProductsMap.values());

  return (
    <>
      <DataGrid
        getRowClassName={() => rowsClassName}
        sx={{ fontSize: "12px", border: "none" }}
        rows={uniqueProductsData}
        disableRowSelectionOnClick
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 140]}
      />
    </>
  );
}

export default StockDataGrid;
