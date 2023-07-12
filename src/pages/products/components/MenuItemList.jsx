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
    svProductOne(_params.id)
      .then((res) => {
        const result = {
          title: res.data.title,
          state1: false,
          state2: false,
          state3: false,
          reset: 0,
          unit: res.data.unit_id,
          unit_name: res.data.net_name,
          netweight: res.data.netweight,
          counting_unit: res.data.counting_unit_id,
          counting_unit_name: res.data.amount_name,
          purchase_date: res.data.purchase_date,
          mfd_date: res.data.mfd_date,
          exp_date: res.data.exp_date,
          barcode: res.data.barcode_number,
          new_barcode: "",
          main_cate_id: res.data.main_cate_id,
          main_cate_name: res.data.main_cate_name,
          sub_cate_id: res.data.sub_cate_id,
          sub_cate: res.data.sub_cate_name,
          supplier_id: res.data.supplier_id,
          supplier_cate: res.data.supplier_cate_id,
          supplier_name: res.data.supplier_name,
          supplier_cate_name: res.data.supplier_cate_name,
          import_value: res.data.import_value,
          defective: res.data.defective_product,
          image_path: res.data.thumbnail_link,

          import_fee: res.data.import_fee,
          fuel_cost: res.data.fuel_cost,
          other_exp: res.data.other_exp,
          total: res.data.total,
          op_unit: res.data.op_unit,
          total_product: res.data.total_product,

          oc_unit: res.data.op_unit,
          unit_price: res.data.unit_price,
          product_cost: res.data.product_cost,
          units: res.data.units,
          cost_per_unit: res.data.cost_per_unit,
          total_cost: res.data.total_cost,
          set_profit: res.data.set_profit,
          vat_id: res.data.vat_id,
          vat: res.data.vat_name,
          profit_per_unit: res.data.profit_per_unit,
          pp_profit: res.data.pp_profit,
          pp_vat: res.data.pp_vat,
          os_price:res.data.os_price,
          selling_price: res.data.selling_price,
        };
        setProductShow(result);
      })
      .then(() => {
        setAnchorEl(null);
        setOpenMenu(false);
        setOpenModal(true);
      })
      .catch((err) => {
        console.log(err);
        return false;
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
      <ProductEditModal
        open={openModal}
        setOpen={setOpenModal}
        productShow={productShow}
      />
    </div>
  );
}

export default MenuItemList;
