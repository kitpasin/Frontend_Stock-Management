import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import axios from "axios";

function TableAmount({ amountsData, getAmounts }) {

  function handleEditAmount(cellValue) {
    Swal.fire({
      title: "Update Amount",
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
          .put(`amount/${cellValue.row.id}`, data)
          .then(function (response) {
            Swal.fire("Updated!", "Your amount has been updated.", "success").then(() => {
              getAmounts();
            });
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });
  }

  function handleDeleteAmount(cellValue) {
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
        axios.delete(`amount/${cellValue.row.id}`).then(() => {
          Swal.fire("Deleted!", "Your Data has been deleted.", "success").then(() => {
            getAmounts();
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
      headerName: "ชื่อหน่วยปริมาณ",
      width: 640,
      headerClassName: "table-columns",
    },
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
          <button style={buttonStyle} onClick={() => handleEditAmount(cellValue)}>
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
          <button style={buttonStyle} onClick={() => handleDeleteAmount(cellValue)}>
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
        rows={amountsData}
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
