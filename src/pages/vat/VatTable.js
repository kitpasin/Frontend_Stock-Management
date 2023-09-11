import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import axios from "axios";
import EditVat from "./edit/EditVat";

function VatTable({ vatsData, getVats, uPermission }) {
  const [cellData, setCellData] = useState([]);
  const [editVatOpen, setEditVatOpen] = useState(false);

  function handleEditVatOpen(cellValue) {
    setEditVatOpen(true);
    setCellData(cellValue);
  }

  function handleEditVat(cellValue) {
    Swal.fire({
      title: "Update Vat",
      html: `
        <input type="text" id="name" class="swal2-input" placeholder="Name" value=${cellValue.row.name}>
        <input type="text" id="percent" class="swal2-input" placeholder="Percent" value=${cellValue.row.percent}>
      `,
      confirmButtonText: "Submit",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;
        const percent = Swal.getPopup().querySelector("#percent").value;

        if (!name || !percent) {
          Swal.showValidationMessage(`Please enter your data.`);
        }

        return { name, percent };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          name: result.value.name,
          percent: result.value.percent,
        };

        axios
          .put(`vat/${cellValue.row.id}`, data)
          .then(function (response) {
            Swal.fire("Updated!", "Your vat has been updated.", "success").then(
              () => {
                getVats();
              }
            );
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });
  }

  function handleDeleteVat(cellValue) {
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
        axios.delete(`vat/${cellValue.row.id}`).then(() => {
          Swal.fire("Deleted!", "Your Data has been deleted.", "success").then(
            () => {
              getVats();
            }
          );
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
      headerName: "ชื่อหมวดหมู่ Vat",
      width: 200,
      headerClassName: "table-columns",
    },
    {
      field: "product_count",
      headerName: "รายการสินค้าที่มี vat",
      width: 200,
      headerClassName: "table-columns",
      renderCell: (params) => (
        <div>
          <p>{params.row.product_count} รายการ</p>
        </div>
      ),
    },
    {
      field: "percent",
      headerName: "% Vat",
      width: 1070,
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
        return uPermission.superAdmin ? (
          <button
            style={buttonStyle}
            onClick={() => handleEditVatOpen(cellValue)}
          >
            {" "}
            <img src="images/icons/eva_edit-2-fill.png" alt="" />{" "}
          </button>
        ) : (
          <button
            disabled
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "35px",
              height: "35px",
              borderRadius: "5px",
              background: "#3B336B",
              opacity: "50%",
            }}
            onClick={() => handleEditVatOpen(cellValue)}
          >
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
        return uPermission.superAdmin ? (
          <button
            style={buttonStyle}
            onClick={() => handleDeleteVat(cellValue)}
          >
            {" "}
            <img src="images/icons/trash-icon.png" alt="" />{" "}
          </button>
        ) : (
          <button
            disabled
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "35px",
              height: "35px",
              borderRadius: "5px",
              background: "#3B336B",
              opacity: "50%",
            }}
            onClick={() => handleDeleteVat(cellValue)}
          >
            {" "}
            <img src="images/icons/trash-icon.png" alt="" />{" "}
          </button>
        );
      },
    },
  ];

  return (
    <>
      <DataGrid
        sx={{ border: "none" }}
        checkboxSelection={false}
        rows={vatsData}
        columns={columns}
        disableRowSelectionOnClick
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 50, 100]}
      />
      <EditVat
        editVatOpen={editVatOpen}
        setEditVatOpen={setEditVatOpen}
        cellData={cellData}
        getVats={getVats}
      />
    </>
  );
}

export default VatTable;
