import React from "react";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";

import ProductEditModal from "../ProductEditModal";
import { svProductOne } from "../../../services/product.service";

function MenuItemList({ params }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [btnId, setbtnId] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [productShow, setProductShow] = React.useState([]);
  const open = Boolean(anchorEl);

  const editHandle = (_params) => {
    svProductOne(_params.id).then((res) => {
      const result = res.data
      setProductShow(result)
    }).then(() => {
      setOpenModal(true)
    }).catch((err) => {
      console.log(err)
      return false;
    })    
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
          sx={{
            display: "flex",
            gap: "1rem",
          }}
          onClick={handleClose}
        >
          <img
            style={{
              width: "18px",
              height: "18px",
              filter:
                "invert(85%) sepia(25%) saturate(2350%) hue-rotate(217deg) brightness(95%) contrast(88%)",
            }}
            src="/images/icons/supplier-icon.png"
            alt=""
          />
          <p style={{ fontSize: "18px", fontWeight: 400, color: "#3B336B" }}>
            ซัพพลาย
          </p>
        </MenuItem>
        <MenuItem sx={{ display: "flex", gap: "1rem" }} onClick={handleClose}>
          <img
            style={{ width: "18px", height: "18px" }}
            src="/images/icons/export-icon.png"
            alt=""
          />
          <p style={{ fontSize: "18px", fontWeight: 400, color: "#3B336B" }}>
            เบิกสินค้า
          </p>
        </MenuItem>
        <MenuItem
          sx={{ display: "flex", gap: "1rem" }}
          onClick={() => editHandle(params.row)}
        >
          <img
            style={{
              width: "18px",
              height: "18px",
              filter:
                "invert(85%) sepia(25%) saturate(2350%) hue-rotate(217deg) brightness(95%) contrast(88%)",
            }}
            src="/images/icons/edit-icon.png"
            alt=""
          />
          <p style={{ fontSize: "18px", fontWeight: 400, color: "#3B336B" }}>
            แก้ไขสินค้า
          </p>
        </MenuItem>
        <MenuItem sx={{ display: "flex", gap: "1rem" }} onClick={handleClose}>
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
            ลบสินค้า
          </p>
        </MenuItem>
      </Menu>
      <ProductEditModal open={openModal} setOpen={setOpenModal} productShow={productShow} />
    </div>
  );
}

export default MenuItemList;
