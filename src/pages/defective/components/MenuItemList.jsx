import React from "react";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

import { svProductAll } from "../../../services/product.service";
import { svProductOne } from "../../../services/product.service";
import { svDeleteProduct } from "../../../services/product.service";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

import ExportModal from "../../../components/product/modal/ExportModal";
import { useEffect, useState } from "react";
import axios from "axios";

function MenuItemList({
  params,
  refreshData,
  setRefreshData,
  setProductSelected,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [btnId, setbtnId] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openExportModal, setOpenExportModal] = useState(false);
  const [openFetchImportModal, setOpenFetchImportModal] = useState(false);
  const [productShow, setProductShow] = useState([]);
  const [productData, setProductData] = useState([]);
  const [modal, setModal] = useState({
    isEdit: false,
    isFetchImport: false,
  });
  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchProductdata();
  }, [refreshData]);

  function fetchProductdata() {
    svProductAll().then((res) => {
      const result = res.data;
      setProductData(result);
    });
  }

  const deleteHandle = (product_id, export_quantity) => {
    const data = {
      quantity: export_quantity
    }
    handleClose();
     Swal.fire({
       title: "Are you sure?",
       text: "Do you want to return the product?",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes, return it!",
     }).then((result) => {
       if (result.isConfirmed) {
         axios.delete(`product/defective/${product_id}`, { data: data }).then((res) => {
           if (res.status) {
             Swal.fire("Returned!", "Product has been returned successfully.", "success").then(
               () => {
                 setRefreshData(refreshData + 1);
               }
             );
           } else {
             alert("error");
           }
         });
       }
     });
  };

  function handleClick(event) {
    setbtnId(event.currentTarget.getAttribute("id"));
    setAnchorEl(event.currentTarget);
    setOpenMenu(true);
  }
  function handleClose() {
    setAnchorEl(null);
    setOpenMenu(false);
  }

  return (
    <div>
      <Button
        id={`basic-button${params.row.id}`}
        aria-controls={openMenu ? `basic-menu${params.row.id}` : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
        onClick={handleClick}
      >
        <img
          style={{
            background: "#3B336B",
            width: "40px",
            height: "40px",
            padding: ".65rem",
            borderRadius: "5px",
          }}
          src="/images/icons/management-icon.png"
          alt=""
        />
      </Button>
      <Menu
        id={`basic-menu${params.row.id}`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `${btnId}`,
        }}
      >
        <MenuItem
          sx={{ display: "flex", gap: "1rem" }}
          onClick={() => deleteHandle(params.row.product_id, params.row.export_quantity)}
        >
          <img
            style={{
              width: "18px",
              height: "18px",
              filter:
                "invert(85%) sepia(25%) saturate(2350%) hue-rotate(217deg) brightness(95%) contrast(88%)",
            }}
            src="/images/icons/trash-icon.png"
            alt=""
          />
          <p style={{ fontSize: "18px", fontWeight: 400, color: "#3B336B" }}>
           คืนสินค้า
          </p>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default MenuItemList;
