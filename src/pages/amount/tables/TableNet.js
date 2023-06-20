import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function TableNet() {
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
    { field: "id", headerName: "#", width: 50 },
    { field: "netName", headerName: "ชื่อหน่วยปริมาณสุทธิ", width: 200 },
    { field: "category", headerName: "หมวดหมู่หลัก", width: 300 },
   
    {
      field: "edit",
      headerName: "Edit",
      width: 60,
      sortable: false,
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
            <img src="images/icons/trash-icon.png" alt="" />{" "}
          </button>
        );
      },
    },
  ];

  const rows = [
    {
      id: 1,
      netName: "กรัม",
      category: "เครื่องดื่ม, อาหารแช่แข็ง,มาม่า",
      edit: 0,
    },
    {
      id: 2,
      netName: "กิโลกรัม",
      category: "เครื่องดื่ม, อาหารแช่แข็ง,มาม่า",
    },
    {
      id: 3,
      netName: "ลิตร",
      category: "เครื่องดื่ม",
    },
    
  ];
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <DataGrid
        checkboxSelection={true}
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

export default TableNet;
