import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Avatar, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

function Table({ filteredProduct, getDefectiveProducts }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { displayName } = useSelector((state) => state.auth.profile);
  const webPath = useSelector((state) => state.app.webPath);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }
  function handleClose() {
    setAnchorEl(null);
  }

  async function handleDeleteDefectiveProduct(params) {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete the data?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`product/defective/${params.row.product_id}`).then((res) => {
          if (res.status) {
            Swal.fire("Deleted!", "Product has been deleted successfully.", "success").then(() => {
              getDefectiveProducts();
            });
          } else {
            alert("error");
          }
        });
      }
    });
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
      align: "left",
      width: 140,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div style={{ paddingLeft: "1.5rem" }}>
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>{params.row.title}</p>
          <p style={{ fontSize: "12px", lineHeight: "12.5px", color: "#9993B4" }}>
            {params.row.product_id}
          </p>
        </div>
      ),
    },
    {
      field: "user",
      headerName: "ผู้ใช้งาน",
      headerAlign: "center",
      align: "center",
      width: 120,
      headerClassName: "table-columns",
      renderCell: () => (
        <div>
          <p>{displayName}</p>
        </div>
      ),
    },
    {
      field: "defective_product",
      headerAlign: "center",
      align: "center",
      width: 50,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", lineHeight: "12.5px" }}>ชำรุด</Typography>
          <Typography style={{ fontSize: "12px", lineHeight: "12.5px" }}>/หน่วย</Typography>
        </div>
      ),
    },
    {
      field: "purchase_date",
      headerName: "วันที่ซื้อ",
      headerAlign: "center",
      align: "center",
      width: 90,
      headerClassName: "table-columns",
    },
    {
      field: "defectiveDate",
      width: 90,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            วันเวลา
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            เบิกชำรุด
          </Typography>
        </div>
      ),
      renderCell: (params) => (
        <div>
          <Typography style={{ fontSize: "12px", lineHeight: "12.5px" }}></Typography>
          <Typography
            style={{ fontSize: "12px", lineHeight: "12.5px", color: "#9993B4" }}
          ></Typography>
        </div>
      ),
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
          <p style={{ fontSize: "12px", lineHeight: "12.5px" }}>
            {params.row.mfd_date}
          </p>
          <p style={{ fontSize: "12px", lineHeight: "12.5px", color: "#FF0000" }}>
            {params.row.exp_date}
          </p>
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
      renderCell: (params) => {
        const startDate = new Date(params.row.mfd_date);
        const endDate = new Date(params.row.exp_date);
        const diffDateInMs = endDate - startDate;
        const diffDateInDays = diffDateInMs / (1000 * 60 * 60 * 24);
        return (
          <div>
            <p>{diffDateInDays} วัน</p>
          </div>
        );
      },
    },
    {
      field: "vat_name",
      headerName: "Vat",
      headerAlign: "center",
      align: "center",
      width: 50,
      headerClassName: "table-columns",
    },
    {
      field: "main_cate_name",
      headerName: "หมวดหมู่",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
    },
    {
      field: "counting_unit_name",
      headerName: "หน่วยนับ",
      headerAlign: "center",
      align: "center",
      width: 70,
      headerClassName: "table-columns",
    },
    {
      field: "netweight",
      headerAlign: "center",
      align: "center",
      width: 90,
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
      field: "total",
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
      field: "oc_unit",
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ดำเนินการ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "product_cost",
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
      field: "cost_per_unit",
      headerAlign: "center",
      align: "center",
      width: 50,
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ราคาดิบ
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "unit_price",
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            ต้นทุน
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            /หน่วย
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "total_cost",
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            Total
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (THB)
          </Typography>
        </div>
      ),
    },
    {
      field: "set_profit",
      width: 50,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
      renderHeader: () => (
        <div>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            กำไร
          </Typography>
          <Typography style={{ fontSize: "12px", fontWeight: 500, lineHeight: "12.5px" }}>
            (%)
          </Typography>
        </div>
      ),
    },
    {
      field: "pp_vat",
      headerAlign: "center",
      align: "center",
      width: 70,
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
      field: "selling_price",
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
            <MenuItem>
              <Link
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
                onClick={handleClose}
                to="/suppliers"
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
              </Link>
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
            <MenuItem
              sx={{ display: "flex", gap: "1rem" }}
              onClick={() => handleDeleteDefectiveProduct(params)}
            >
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
        rows={filteredProduct}
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
