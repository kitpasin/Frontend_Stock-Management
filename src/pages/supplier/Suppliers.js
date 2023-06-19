import React from "react";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    { field: "id", headerName: "#", width: 50 },
    { field: "companyName", headerName: "Company Name", width: 200 },
    { field: "address", headerName: "Address", width: 200 },
    { field: "empName", headerName: "Employee Name", width: 200 },
    {
      field: "tel",
      headerName: "Tel",
      width: 160,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      width: 160,
      // valueGetter: (params) =>
      // `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    { field: "lineId", headerName: "Line ID", width: 140, sortable: false },
    { field: "category", headerName: "Category", width: 140 },
    { field: "ordered", headerName: "Number of Ordered", width: 140 },
    {
      field: "edit",
      headerName: "Edit",
      width: 60,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <button style={buttonStyle} onClick={editHandle(cellValue.row.edit)}>
            {" "}
            <img src="images/icons/supplier-icon.png" alt="" />{" "}
          </button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 60,
      sortable: false,
      renderCell: (cellValue) => {
        return (
          <button
            style={buttonStyle}
            onClick={deleteHandle(cellValue.row.delete)}
          >
            {" "}
            <img src="images/icons/eva_edit-2-fill.png" alt="" />{" "}
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

  return (
    <section id="supplier-page">
      <HeadPageComponent
        h1={"ซัพพลายเออร์ทั้งหมด"}
        icon={ <img src="images/icons/mdi_shipping-pallet.png" alt="" /> }
        // icon={<FontAwesomeIcon icon={faStore} />}
        breadcrums={[{ title: "ซัพพลายเออร์ทั้งหมด", link: false }]}
      />
      <div className="main-content">
        <div className="head"></div>
        <div className="content">
          <div className="content-head">
            <div className="title">
              <img src="images/icons/mdi_shipping-pallet2.png" alt="" />
              <p>ซัพพลายเออร์ทั้งหมด</p>
            </div>
            <div className="action">
              <button onClick={handleLink}>Create Supplier</button>
              <p>List : 2,500</p>
            </div>
          </div>
          <div className="table">
            <DataGrid
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
