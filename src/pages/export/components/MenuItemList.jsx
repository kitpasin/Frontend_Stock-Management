import React from "react";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import Swal from "sweetalert2";

import ProductEditModal from "../../../components/product/modal/ProductEditModal";
import { svProductAll } from "../../../services/product.service";
import { svProductOne } from "../../../services/product.service";
import { svDeleteProduct } from "../../../services/product.service";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

import ExportModal from "../../../components/product/modal/ExportModal";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarcode } from "@fortawesome/free-solid-svg-icons";
import BarcodeModal from "../../products/components/BarcodeModal";
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
  const [openBarcodeModal, setOpenBarcodeModal] = useState(false);
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

  const fetchImportHandle = (_params) => {
    const data = productData.filter((item) => item.id === _params.id);
    if (data) {
      const dd = data[0];
      const result = {
        id: dd.id,
        product_id: dd.product_id,
        title: dd.title,
        state1: false,
        state2: false,
        state3: false,
        reset: 0,
        unit: dd.unit_id,
        unit_name: dd.net_name,
        netweight: dd.netweight,
        counting_unit: dd.counting_unit_id,
        counting_unit_name: dd.amount_name,
        purchase_date: "",
        mfd_date: "",
        exp_date: "",
        barcode: "",
        new_barcode: "",
        main_cate_id: dd.main_cate_id,
        main_cate_name: dd.main_cate_name,
        sub_cate_id: dd.sub_cate_id,
        sub_cate: dd.sub_cate_name,
        supplier_id: dd.supplier_id,
        supplier_cate: dd.supplier_cate_id,
        supplier_name: dd.supplier_name,
        supplier_cate_name: dd.supplier_cate_name,
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

  const deleteHandle = (product_id, export_quantity) => {
    const data = {
      quantity: export_quantity,
    };
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
        axios.delete(`product/export/${product_id}`, { data: data }).then((res) => {
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
      <BarcodeModal
        open={openBarcodeModal}
        setOpen={setOpenBarcodeModal}
        productShow={productShow}
      />
    </div>
  );
}

export default MenuItemList;
