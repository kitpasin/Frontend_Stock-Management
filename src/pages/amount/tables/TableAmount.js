import React from "react";
import { DataGrid } from "@mui/x-data-grid";


function TableAmount() {
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
    { field: "amount", headerName: "ชื่อหน่วยปริมาณ", width: 500 },
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
      amount: "กล่อง",
      edit: 0,
    },
    {
      id: 2,
      amount: "ซอง",
     
    },
    {
      id: 3,
      amount: "แพ็ก",
      
    },
    {
      id: 4,
      amount: "ชิ้น",
      
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

export default TableAmount;
