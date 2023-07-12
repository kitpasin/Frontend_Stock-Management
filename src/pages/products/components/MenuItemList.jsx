import React from "react";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";

function MenuItemList({ params, anchorEl, open, handleClose, buttonId }) {
  const editHandle = (product_id) => {
    console.log(buttonId);
  };

  return (
    <Menu
      id={`basic-menu${params.row.id}`}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": `${buttonId}`,
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
  );
}

export default MenuItemList;
