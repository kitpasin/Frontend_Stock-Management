import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import Swal from "sweetalert2";

function TableNet({netsData, getNets}) {
  function handleEditNet(cellValue) {
    Swal.fire({
      title: "Update Net",
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="Name" value=${cellValue.row.name}>
      `,
      confirmButtonText: "Submit",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;

        if (!name) {
          Swal.showValidationMessage(`Please enter your data.`);
        }

        return { name };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          name: result.value.name,
        };

        axios
          .put(`net/${cellValue.row.id}`, data)
          .then(function (response) {
            Swal.fire("Updated!", "Your net has been updated.", "success").then(() => {
              getNets();
            });
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });
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
      width: 345,
      headerClassName: "table-columns",
    },
    { field: "category", headerName: "หมวดหมู่หลัก", width: 300, headerClassName: "table-columns" },

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
          <button style={buttonStyle} onClick={() => handleEditNet(cellValue)}>
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
    </div>
  );
}

export default TableNet;
