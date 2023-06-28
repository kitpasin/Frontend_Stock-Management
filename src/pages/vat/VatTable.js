import React from "react";
import { DataGrid } from "@mui/x-data-grid";

function VatTable() {
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
    {
      field: "vatName",
      headerName: "ชื่อหมวดหมู่ Vat",
      width: 200,
      headerClassName: "table-columns",
    },
    {
      field: "vatList",
      headerName: "รายการสินค้าที่มี vat",
      width: 200,
      headerClassName: "table-columns",
    },
    { field: "vat", headerName: "% Vat", width: 1020, headerClassName: "table-columns" },
    {
      field: "edit",
      headerName: "แก้ไข",
      width: 60,
      sortable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
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
      width: 60,
      sortable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "table-columns",
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
      vatName: "Vat แอลกอฮอล์",
      vatList: "25 รายการ",
      vat: "25 %",
      edit: 0,
    },
    {
      id: 2,
      vatName: "Vat 2",
      vatList: "125 รายการ",
      vat: "25 %",
    },
    {
      id: 3,
      vatName: "Vat 3",
      vatList: "125 รายการ",
      vat: "5 %",
    },
    {
      id: 4,
      vatName: "Vat 4",
      vatList: "25 รายการ",
      vat: "7 %",
    },
  ];

  return (
    <DataGrid
      sx={{ border: "none" }}
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
  );
}

export default VatTable;
