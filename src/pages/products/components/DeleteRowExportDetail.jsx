import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function DeleteRowExportDetail({ params, uniqueProductsData, setOpenExportedTempModal, refreshData, setRefreshData }) {
  const row = uniqueProductsData.length
  const [countRow, setCountRow] = useState(0)
  
  useEffect(() => {
    setCountRow(row)
  }, [deleteRow])

  console.log(countRow)

  function deleteRow(product_id, quantity, created_at) {
    setCountRow(row)
    const formData = {
      quantity: quantity,
      created_at: created_at,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this row?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`product/export/temp/${product_id}`, { data: formData })
          .then((res) => {
            if (res.data.status) {
              Swal.fire(
                "Deleted!",
                "Row has been deleted successfully.",
                "success"
              )
              .then(() => {
                if (countRow == 1) {
                  setOpenExportedTempModal(false)
                } 
              }).then(() => {
                setRefreshData(refreshData + 1)
              })
            } else {
              alert("Error");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("An error occurred while deleting the row.");
          });
      }
    });
  }

  return (
    <figure
      onClick={() =>
        deleteRow(
          params.row.product_id,
          params.row.quantity,
          params.row.created_at
        )
      }
      style={{
        background: "#3B326B",
        width: "35px",
        height: "35px",
        borderRadius: "5px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      <img
        style={{ margin: "auto" }}
        src="/images/icons/trash-icon.png"
        alt=""
      />
    </figure>
  );
}

export default DeleteRowExportDetail;
