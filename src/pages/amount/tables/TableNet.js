import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import EditNet from "../edit/EditNet";

function TableNet({ netsData, getNets, mainCatesData }) {
  const [editNetOpen, setEditNetOpen] = useState(false);
  const [cellData, setCellData] = useState([]);

  function handleEditNetOpen(cellValue) {
    setEditNetOpen(true);
    setCellData(cellValue);
  }

  function handleDeleteNet(cellValue) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`net/${cellValue.row.id}`).then(() => {
          Swal.fire("Deleted!", "Your Data has been deleted.", "success").then(() => {
            getNets();
          });
        });
      }
    });
  }

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
      field: "name",
      headerName: "ชื่อหน่วยปริมาณสุทธิ",
      width: 200,
      headerClassName: "table-columns",
    },
    {
      field: "main_cate_id",
      headerName: "หมวดหมู่หลัก",
      width: 445,
      headerClassName: "table-columns",
    },

    {
      field: "edit",
      headerName: "แก้ไข",
      width: 60,
      sortable: false,
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderCell: (cellValue) => {
        return (
          <button style={buttonStyle} onClick={() => handleEditNetOpen(cellValue)}>
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
      headerClassName: "table-columns",
      headerAlign: "center",
      align: "center",
      renderCell: (cellValue) => {
        return (
          <button style={buttonStyle} onClick={() => handleDeleteNet(cellValue)}>
            {" "}
            <img src="images/icons/trash-icon.png" alt="" />{" "}
          </button>
        );
      },
    },
  ];
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <DataGrid
        sx={{ border: "none" }}
        checkboxSelection={false}
        rows={netsData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
      />
      <EditNet
        editNetOpen={editNetOpen}
        setEditNetOpen={setEditNetOpen}
        mainCatesData={mainCatesData}
        cellData={cellData}
        getNets={getNets}
      />
    </div>
  );
}

export default TableNet;
