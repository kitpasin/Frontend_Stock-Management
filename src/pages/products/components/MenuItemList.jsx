import React from "react";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

import ProductEditModal from "../../../components/product/modal/ProductEditModal";
import BarcodeModal from "./BarcodeModal";
import { svProductAll } from "../../../services/product.service";
import { svProductOne } from "../../../services/product.service";
import { svDeleteProduct } from "../../../services/product.service";
import { ConnectingAirportsOutlined } from "@mui/icons-material";
import { v4 as uuidv4 } from 'uuid';

import ExportModal from "../../../components/product/modal/ExportModal";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";

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
  const [openBarcodeModal, setOpenBarcodeModal] = useState(false);
  const [openBarcode, setBarcode] = useState(false);
  const [productShow, setProductShow] = useState([]);
  const [productData, setProductData] = useState([]);
  const [modal, setModal] = useState({
    isEdit: false,
    isFetchImport: false,
    isMultiImport: false,
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

  const fetchImportHandle = (_params) => {
    const data = productData.filter((item) => item.id === _params.id);
    if (data.length > 0) {
      const dd = data[0];
      const result = {
        id: dd.id,
        product_id: dd.product_id,
        title: dd.title,
        state1: false,
        state2: false,
        state3: false,
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
    }
  };

  const editHandle = (_params) => {
    const data = productData.filter((item) => item.id === _params.id);
    if (data.length > 0) {
      const dd = data[0];
      const result = {
        id: dd.id,
        product_id: dd.product_id,
        title: dd.title,
        state1: false,
        state2: false,
        state3: false,
        reset: 0,
        key: [uuidv4(), uuidv4(), uuidv4(), uuidv4()],
        unit: dd.unit_id,
        unit_name: dd.net_name,
        netweight: dd.netweight,
        counting_unit: dd.counting_unit_id,
        counting_unit_name: dd.amount_name,
        purchase_date: dd.purchase_date,
        mfd_date: dd.mfd_date,
        exp_date: dd.exp_date,
        alert_date: dd.alert_date,
        alert_stock: dd.alert_stock,
        barcode: dd.product_barcode,
        new_barcode: dd.barcode_number,
        main_cate_id: dd.main_cate_id,
        main_cate_name: dd.main_cate_name,
        sub_cate_id: dd.sub_cate_id,
        sub_cate: dd.sub_cate_name,
        supplier_id: dd.supplier_id,
        supplier_cate: dd.supplier_cate_id,
        supplier_name: dd.supplier_name,
        supplier_cate_name: dd.supplier_cate_name,
        supplier_barcode: dd.supplier_barcode,
        import_value: dd.import_value,
        defective: dd.defective_product,
        image_path: dd.thumbnail_link,

        import_fee: dd.import_fee,
        fuel_cost: dd.fuel_cost,
        other_exp: dd.other_exp,
        total: dd.px_total,
        op_unit: dd.op_unit,
        total_product: dd.total_product,

        oc_unit: dd.op_unit,
        unit_price: dd.unit_price,
        product_cost: dd.product_cost,
        units: dd.units,
        cost_per_unit: dd.cost_per_unit,
        total_cost: dd.total_cost,
        set_profit: dd.set_profit,
        vat_id: dd.vat_id,
        vat: dd.vat_name,
        profit_per_unit: dd.profit_per_unit,
        pp_profit: dd.pp_profit,
        pp_vat: dd.pp_vat,
        os_price: dd.os_price,
        selling_price: dd.selling_price,
      };
      setModal((prev) => {
        return { ...prev, isEdit: true, isFetchImport: false };
      });
      setProductShow(result);
      setOpenModal(true);
      handleClose();
    }
  };

  const deleteHandle = (product_id) => {
    handleClose();
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        svDeleteProduct(product_id)
          .then((res) => {
            Swal.fire({
              text: "Delete product success.",
              icon: "success",
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              setRefreshData(refreshData + 1);
            });
          })
          .catch((err) => console.log(err));
      }
    });
  };

  const exportProductOne = (_id) => {
    const data = productData.filter((item) => item.id === _id);
    if (data) {
      const result = data[0];
      setProductShow(result);
      setOpenExportModal(true);
      handleClose();
    }

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

  function barcodeHandle(product_id) {
    const data = productData.filter(
      (item) => item.product_id === product_id
    );
    setProductShow(data[0]);
    setOpenBarcodeModal(true);
    handleClose()
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
          onClick={() => barcodeHandle(params.row.product_id)}
        >
          <figure
            style={{
              width: "18px",
              height: "18px",
            }}
          >
            <FontAwesomeIcon icon={faBarcode} style={{ color: "#3b326b" }} />
          </figure>
          <p style={{ fontSize: "18px", fontWeight: 400, color: "#3B336B" }}>
            ปริ้นบาร์โค้ด
          </p>
        </MenuItem>
        { false &&
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
        }
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
        <MenuItem
          sx={{ display: "flex", gap: "1rem" }}
          onClick={() => deleteHandle(params.row.product_id)}
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
            ลบสินค้า
          </p>
        </MenuItem>
      </Menu>
      <ProductEditModal
        isMultiImport={false}
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
      <BarcodeModal
        open={openBarcodeModal}
        setOpen={setOpenBarcodeModal}
        productShow={productShow}
      />
    </div>
  );
}

export default MenuItemList;
