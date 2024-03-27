import React from "react";
import { useEffect, useState } from "react";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

import ProductEditModal from "../../../components/product/modal/ProductEditModal";
import ExportModal from "../../../components/product/modal/ExportModal";

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
  const [productShow, setProductShow] = useState([]);
  const [modal, setModal] = useState({
    isEdit: false,
    isFetchImport: false,
  });
  const open = Boolean(anchorEl);

  const fetchImportHandle = (_params) => {
    const dd = _params;
    const result = {
      id: dd.id,
      product_id: dd.product_id,
      title: dd.title,
      state1: false,
      state2: false,
      state3: false,
      state4: false,
      reset: 0,
      key: [uuidv4(), uuidv4(), uuidv4(), uuidv4()],
      unit: dd.unit_id,
      unit_name: dd.net_name,
      netweight: dd.netweight,
      counting_unit: dd.counting_unit_id,
      counting_unit_name: dd.amount_name,
      purchase_date: "",
      mfd_date: "",
      exp_date: "",
      alert_date: dd.alert_date,
      alert_stock: dd.alert_stock,
      barcode: dd.product_barcode,
      new_barcode: dd.barcode_number,
      p_type: dd.p_type ? dd.p_type : "",
      main_cate_id: dd.main_cate_id,
      main_cate_name: dd.main_cate_name,
      sub_cate_id: dd.sub_cate_id,
      sub_cate: dd.sub_cate_name,
      supplier_id: dd.supplier_id,
      supplier_cate: dd.supplier_cate_id,
      supplier_name: dd.supplier_name,
      supplier_cate_name: dd.supplier_cate_name,
      supplier_barcode: dd.supplier_barcode,
      import_value: "",
      defective: dd.defective_product,
      image_path: dd.thumbnail_link,

      import_fee: "",
      fuel_cost: "",
      other_exp: "",
      total: "",
      op_unit: "",
      total_product: "",

      oc_unit: dd.op_unit,
      unit_price: dd.unit_price,
      product_cost: "",
      units: "",
      cost_per_unit: dd.cost_per_unit,
      total_cost: "",
      set_profit: dd.set_profit,
      vat_id: dd.vat_id,
      vat: dd.vat_name,
      profit_per_unit: dd.profit_per_unit,
      pp_profit: dd.pp_profit,
      pp_vat: dd.pp_vat,
      os_price: dd.selling_price,
      selling_price: "",
    };
    setModal((prev) => {
      return { ...prev, isEdit: false, isFetchImport: true };
    });
    setProductShow(result);
    setOpenModal(true);
    handleClose();
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
          onClick={() => fetchImportHandle(params.row)}
        >
          <img
            style={{
              width: "18px",
              height: "18px",
              filter:
                "invert(85%) sepia(25%) saturate(2350%) hue-rotate(217deg) brightness(95%) contrast(88%)",
            }}
            src="/images/icons/imports-icon.png"
            alt=""
          />
          <p style={{ fontSize: "18px", fontWeight: 400, color: "#3B336B" }}>
            เพิ่มสินค้า
          </p>
        </MenuItem>
      </Menu>
      <ProductEditModal
        isFetchImport={modal.isFetchImport}
        isEdit={modal.isEdit}
        open={openModal}
        setOpen={setOpenModal}
        productShow={productShow}
        refreshData={refreshData}
        setRefreshData={setRefreshData}
      />
      <ExportModal
        setProductSelecte={setProductSelected}
        open={openExportModal}
        setOpen={setOpenExportModal}
        productShow={productShow}
        refreshData={refreshData}
        setRefreshData={setRefreshData}
      />
    </div>
  );
}

export default MenuItemList;
