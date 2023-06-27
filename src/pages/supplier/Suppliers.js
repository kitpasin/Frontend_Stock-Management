import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Outlet, useNavigate } from "react-router-dom";

import "./suppliers.scss";

/* import Components */
import HeadPageComponent from "../../components/layout/headpage/headpage";

function Suppliers() {
  const editHandle = (_id) => {
    console.log(_id);
  };

  const deleteHandle = (_id) => {
    console.log(_id);
  };

  const navigate = useNavigate();
  const handleLink = () => {
    navigate("/createsupplier");
  };

  const buttonStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "35px",
    height: "35px",
    borderRadius: "5px",
    backgroundColor: "#3B336B",
  };

  const columns = [
    {
      field: "companyName",
      headerName: "ชื่อบริษัท",
      width: 240,
      headerClassName: "table-columns",
    },
    { field: "address", headerName: "ที่อยู่", width: 240, headerClassName: "table-columns" },
    { field: "empName", headerName: "ชื่อผู้ติดต่อ", width: 240, headerClassName: "table-columns" },
    {
      field: "tel",
      headerName: "เบอร์โทร",
      width: 150,
      headerClassName: "table-columns",
    },
    {
      field: "email",
      headerName: "อีเมล",
      sortable: false,
      width: 150,
      headerClassName: "table-columns",
      // valueGetter: (params) =>
      // `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "lineId",
      headerName: "ไลน์ ไอดี",
      width: 150,
      sortable: false,
      headerClassName: "table-columns",
    },
    { field: "category", headerName: "หมวดหมู่สินค้า", width: 150, headerClassName: "table-columns" },
    {
      field: "ordered",
      headerName: "จำนวนสินค้าที่เคยสั่งซื้อ",
      width: 150,
      headerClassName: "table-columns",
    },
    {
      field: "edit",
      headerName: "แก้ไข",
      width: 65,
      sortable: false,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderCell: (cellValue) => {
        return (
          <button style={buttonStyle} onClick={editHandle(cellValue.row.edit)}>
            {" "}
            <img src="images/icons/eva_edit-2-fill.png" alt="" />{" "}
          </button>
        );
      },
    },
    {
      field: "delete",
      headerName: "ลบ",
      width: 65,
      sortable: false,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderCell: (cellValue) => {
        return (
          <button style={buttonStyle} onClick={deleteHandle(cellValue.row.delete)}>
            {" "}
            <img src="images/icons/trash-icon.png" alt="" />{" "}
          </button>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      companyName: "สยามแวร์เฮ้าส์เจริญการค้า...",
      address: "120/34-35 Moo 24 Mueang...",
      empName: "สมเกียติ ดีงานพระรามแปด",
      tel: "089-536-8542",
      email: "somsag@gmail.com",
      lineId: "089-536-8542",
      category: "เครื่องดื่ม",
      ordered: "1250",
      edit: 0,
    },
    {
      id: 2,
      companyName: "สยามแวร์เฮ้าส์เจริญการค้า...",
      address: "120/34-35 Moo 24 Mueang...",
      empName: "สมเกียติ ดีงานพระรามแปด",
      tel: "089-536-8542",
      email: "somsag@gmail.com",
      lineId: "089-536-8542",
      category: "เครื่องดื่ม",
      ordered: "1250",
    },
    {
      id: 3,
      companyName: "สยามแวร์เฮ้าส์เจริญการค้า...",
      address: "120/34-35 Moo 24 Mueang...",
      empName: "สมเกียติ ดีงานพระรามแปด",
      tel: "089-536-8542",
      email: "somsag@gmail.com",
      lineId: "089-536-8542",
      category: "เครื่องดื่ม",
      ordered: "1250",
    },
    {
      id: 4,
      companyName: "สยามแวร์เฮ้าส์เจริญการค้า...",
      address: "120/34-35 Moo 24 Mueang...",
      empName: "สมเกียติ ดีงานพระรามแปด",
      tel: "089-536-8542",
      email: "somsag@gmail.com",
      lineId: "089-536-8542",
      category: "เครื่องดื่ม",
      ordered: "1250",
    },
    {
      id: 5,
      companyName: "สยามแวร์เฮ้าส์เจริญการค้า...",
      address: "120/34-35 Moo 24 Mueang...",
      empName: "สมเกียติ ดีงานพระรามแปด",
      tel: "089-536-8542",
      email: "somsag@gmail.com",
      lineId: "089-536-8542",
      category: "เครื่องดื่ม",
      ordered: "1250",
    },
    {
      id: 6,
      companyName: "สยามแวร์เฮ้าส์เจริญการค้า...",
      address: "120/34-35 Moo 24 Mueang...",
      empName: "สมเกียติ ดีงานพระรามแปด",
      tel: "089-536-8542",
      email: "somsag@gmail.com",
      lineId: "089-536-8542",
      category: "เครื่องดื่ม",
      ordered: "1250",
    },
    {
      id: 7,
      companyName: "สยามแวร์เฮ้าส์เจริญการค้า...",
      address: "120/34-35 Moo 24 Mueang...",
      empName: "สมเกียติ ดีงานพระรามแปด",
      tel: "089-536-8542",
      email: "somsag@gmail.com",
      lineId: "089-536-8542",
      category: "เครื่องดื่ม",
      ordered: "1250",
    },
    {
      id: 8,
      companyName: "สยามแวร์เฮ้าส์เจริญการค้า...",
      address: "120/34-35 Moo 24 Mueang...",
      empName: "สมเกียติ ดีงานพระรามแปด",
      tel: "089-536-8542",
      email: "somsag@gmail.com",
      lineId: "089-536-8542",
      category: "เครื่องดื่ม",
      ordered: "1250",
    },
    {
      id: 9,
      companyName: "สยามแวร์เฮ้าส์เจริญการค้า...",
      address: "120/34-35 Moo 24 Mueang...",
      empName: "สมเกียติ ดีงานพระรามแปด",
      tel: "089-536-8542",
      email: "somsag@gmail.com",
      lineId: "089-536-8542",
      category: "เครื่องดื่ม",
      ordered: "1250",
    },
  ];

  const rowsClassName = "table-rows";

  return (
    <section id="supplier-page">
      <HeadPageComponent
        h1={"ซัพพลายเออร์"}
        icon={<img src="images/icons/mdi_shipping-pallet.png" alt="" />}
        // icon={<FontAwesomeIcon icon={faStore} />}
        breadcrums={[{ title: "ซัพพลายเออร์", link: false }]}
      />
      <div className="main-content">
        <div className="head"></div>
        <div className="content">
          <div className="content-head">
            <div className="title">
              <img src="images/icons/mdi_shipping-pallet2.png" alt="" />
              <p>ซัพพลายเออร์</p>
              <span>2,500 รายการ</span>
            </div>
            <div className="action">
              <button onClick={handleLink}>เพิ่มซัพพลายเออร์</button>
            </div>
          </div>
          <div className="table">
            <DataGrid
              getRowClassName={() => rowsClassName}
              sx={{ fontSize: "12px", border: "none" }}
              checkboxSelection={false}
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
        </div>
      </div>
    </section>
  );
}

export default Suppliers;
