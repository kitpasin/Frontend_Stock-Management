import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";

function Table({ rows }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

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
      width: 150,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div style={{ paddingLeft: "1.2rem" }}>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>น้ำอัดลมกลิ่นเมลอ...</p>
          <p style={{ fontSize: "12px", lineHeight: "12.5px", color: "#9993B4" }}>01234567895846</p>
        </div>
      ),
    },
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
      width: 90,
      headerClassName: "table-columns",
    },
    {
      field: "MEDEXP",
      width: 90,
      headerAlign: "center",
      align: "center",
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
      renderCell: (params) => (
        <div>
          <Typography style={{ fontSize: "12px", lineHeight: "12.5px" }}>28/8/2023</Typography>
          <Typography style={{ fontSize: "12px", lineHeight: "12.5px", color: "#FF0000" }}>
            30/8/2024
          </Typography>
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
      width: 90,
      headerClassName: "table-columns",
    },
    {
      field: "countingUnit",
      headerName: "หน่วยนับ",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
    },
    {
      field: "volumnPerUnit",
      headerAlign: "center",
      align: "center",
      width: 70,
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
    },
    {
      field: "operationFee",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
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
      width: 70,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ดำเนินการ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "rawPrice",
      headerName: "ราคาดิบ (THB)",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
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
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
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
      field: "cost",
      headerName: "ต้นทุน (THB)",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ต้นทุน
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "costPerUnit",
      width: 70,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ต้นทุน
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "profit",
      headerName: "กำไร",
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
    },
    {
      field: "expectedSellingPrice",
      headerAlign: "center",
      align: "center",
      width: 50,
      headerClassName: "table-columns",
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
      width: 70,
      headerAlign: "center",
      align: "center",
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
      field: "action",
      headerName: "จัดการสินค้า",
      headerAlign: "center",
      align: "center",
      width: 90,
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
                style={{ width: "18px", height: "18px" }}
                src="/images/icons/export-icon.png"
                alt=""
              />
              <p style={{ fontSize: "18px", fontWeight: 400, color: "#3B336B" }}>เบิกสินค้า</p>
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
        checkboxSelection
      />
    </div>
  );
}

export default Table;
