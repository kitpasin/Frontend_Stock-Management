import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";

function Table({ rows }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const columns = [
    {
      field: "image",
      headerName: "ภาพ",
      width: 65,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div style={{ background: "#D0D0E2", borderRadius: "5px" }}>
          <Avatar src={`images/mock/product1.png`} alt={`Image ${params.value}`} />
        </div>
      ),
    },
    { field: "name", headerName: "ชื่อรายการ", width: 100, headerClassName: "table-columns" },
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
    { field: "MEDEXP", headerName: "MED EXP", width: 100, headerClassName: "table-columns" },
    {
      field: "dateEXP",
      headerName: "จำนวนวัน EXP",
      width: 100,
      headerClassName: "table-columns",
    },
    { field: "vat", headerName: "Vat", width: 100, headerClassName: "table-columns" },
    { field: "category", headerName: "หมวดหมู่", width: 100, headerClassName: "table-columns" },
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
    { field: "cost", headerName: "ต้นทุน (THB)", width: 100, headerClassName: "table-columns" },
    {
      field: "costPerUnit",
      headerName: "ต้นทุนต่อหน่วย (THB)",
      width: 100,
      headerClassName: "table-columns",
    },
    { field: "profit", headerName: "กำไร", width: 100, headerClassName: "table-columns" },
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
    {
      field: "action",
      headerName: "จัดการสินค้า",
      width: 100,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <img
              style={{
                background: "#3B336B",
                width: "40px",
                height: "40px",
                padding: ".65rem",
                borderRadius: "5px",
              }}
              src="/images/icons/management-icon.png"
              alt=""
            />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem sx={{ display: "flex", gap: "1rem" }} onClick={handleClose}>
              <img
                style={{ width: "18px", height: "18px" }}
                src="/images/icons/export-icon.png"
                alt=""
              />
              <p style={{ fontSize: "18px", fontWeight: 400, color: "#3B336B" }}>เบิกสินค้า</p>
            </MenuItem>
            <MenuItem
              sx={{
                display: "flex",
                gap: "1rem",
              }}
              onClick={handleClose}
            >
              <img
                style={{
                  width: "18px",
                  height: "18px",
                  filter:
                    "invert(85%) sepia(25%) saturate(2350%) hue-rotate(217deg) brightness(95%) contrast(88%)",
                }}
                src="/images/icons/supplier-icon.png"
                alt=""
              />
              <p style={{ fontSize: "18px", fontWeight: 400, color: "#3B336B" }}>ซัพพลาย</p>
            </MenuItem>
            <MenuItem sx={{ display: "flex", gap: "1rem" }} onClick={handleClose}>
              <img
                style={{
                  width: "18px",
                  height: "18px",
                  filter:
                    "invert(85%) sepia(25%) saturate(2350%) hue-rotate(217deg) brightness(95%) contrast(88%)",
                }}
                src="/images/icons/edit-icon.png"
                alt=""
              />
              <p style={{ fontSize: "18px", fontWeight: 400, color: "#3B336B" }}>แก้ไขสินค้า</p>
            </MenuItem>
            <MenuItem sx={{ display: "flex", gap: "1rem" }} onClick={handleClose}>
              <img
                style={{
                  width: "18px",
                  height: "18px",
                  filter:
                    "invert(85%) sepia(25%) saturate(2350%) hue-rotate(217deg) brightness(95%) contrast(88%)",
                }}
                src="/images/icons/trash-icon.png"
                alt=""
              />
              <p style={{ fontSize: "18px", fontWeight: 400, color: "#3B336B" }}>ลบสินค้า</p>
            </MenuItem>
          </Menu>
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
      />
    </div>
  );
}

export default Table;
