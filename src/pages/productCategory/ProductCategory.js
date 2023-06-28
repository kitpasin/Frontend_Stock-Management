import React from "react";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DataGrid } from "@mui/x-data-grid";

import "./productCategory.scss";

/* import Components */
import HeadPageComponent from "../../components/layout/headpage/headpage";
import ProductCateTable from "./ProductCateTable";
import ModalMainCateAdd from "./modals/ModalMainCateAdd";
import ModalSubCateAdd from "./modals/ModalSubCateAdd";

function ProductCategory() {

  const [openModal, setOpenModal] = React.useState(false);
  const [openModalSub, setOpenModalSub] = React.useState(false);
  const editHandle = (_id) => {
    console.log(_id);
  };

  const deleteHandle = (_id) => {
    console.log(_id);
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
    { field: "id", headerName: "#", width: 30 },
    { field: "mainCate", headerName: "หมวดหมู่หลัก", width: 300 },
    { field: "itemsInCate", headerName: "จำนวนรายการสินค้าในหมวดหมู่", width: 1000 },
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

  return (
    <section id="productcate-page">
      <HeadPageComponent
        h1={"หมวดหมู่สินค้าหลัก/ย่อย"}
        icon={<FontAwesomeIcon icon={faLayerGroup} />}
        breadcrums={[{ title: "หมวดหมู่สินค้าหลัก/ย่อย", link: false }]}
      />
      <div className="main-content">
        <div className="head"></div>
        <div className="content">
          <div className="content-head">
            <div className="title">
              <img src="images/icons/uis_layer-group1.png" alt="" />
              <p>หมวดหมู่สินค้าทั้งหมด</p>
              <p style={{color: "#ff0000"}}>2,500 รายการ</p>
            </div>
            <div className="action">
              <button onClick={() => setOpenModal(true)}>สร้างหมวดหมู่หลัก</button>
              <button onClick={() => setOpenModalSub(true)}>สร้างหมวดหมู่ย่อย</button>
              {/* <button className="btn-delete" style={{ width: "35px" }}>
                {" "}
                <img src="images/icons/tabler_trash-x-filled.png" alt="" />{" "}
              </button> */}
            </div>
          </div>
          <div className="table">
            <ProductCateTable />
          </div>
          <ModalMainCateAdd openModalAdd={openModal} setOpenModal={setOpenModal} />
          <ModalSubCateAdd openModal={openModalSub} setOpenModalSub={setOpenModalSub} />
        </div>
      </div>
    </section>
  );
}

export default ProductCategory;
