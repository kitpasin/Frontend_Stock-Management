import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport, faStore } from "@fortawesome/free-solid-svg-icons";
import Barcode from "react-barcode";
import { useSelector } from "react-redux";
import {
  Autocomplete,
  Card,
  FormControlLabel,
  Grid,
  Radio,
  TextField,
} from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

import "./SubproductPage.scss";
import DetailDataGrid from "../../components/datagrid/DetailDataGrid";
import SupplierDataGrid from "../../components/datagrid/SupplierDataGrid";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { svCreateProduct, svProductUpdate } from "../../services/product.service";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    width: "100%",
    height: "100%",
    maxWidth: "1700px",
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function SubproductImport({
  isEdit,
  isFetchImport,
  isMultiImport,
  open,
  setOpen,
  productShow,
  refreshData,
  setRefreshData,
  productDatas,
}) {
  console.log(productShow)
  const form = {
    barcode: productShow.barcode_number,
    title: "",
    state1: false,
    state2: false,
    state3: false,
    state4: false,
    reset: false,
    unit: "",
    netweight: "",
    counting_unit: "",
    purchase_date: productShow.purchase_date,
    mfd_date: productShow.mfd_date,
    exp_date: productShow.exp_date,
    alert_date: productShow.alert_date,
    alert_stock: productShow.alert_stock,
    new_barcode: "",
    supplier_barcode: productShow.supplier_barcode,
    p_type: productShow.p_type,
    main_cate_id: "",
    sub_cate_id: "",
    sub_cate: "",
    supplier_id: productShow.supplier_id,
    supplier_cate: productShow.supplier_cate_id,
    import_value: "",
    defective: 0,

    import_fee: "",
    fuel_cost: "",
    other_exp: "",
    total: "",
    op_unit: "",
    total_product: "",
    packaging: "",
    sticker: "",

    oc_unit: "",
    unit_price: productShow.unit_price,
    product_cost: productShow.product_cost,
    units: productShow.units,
    cost_per_unit: "",
    total_cost: "",
    set_profit: "",
    vat_id: "",
    vat: "",
    profit_per_unit: "",
    pp_profit: "",
    pp_vat: "",
    os_price: 0,
    selling_price: "",

    importOne: true,
  };
  const formPreview = {
    src: "",
    file: "",
    remove: false,
    isError: isEdit || isFetchImport ? false : true,
  };

  const formVat = {
    checked:
      (isEdit || isFetchImport) && productShow.vat_id === 0 ? true : false,
    disRadio: false,
    disSelect: false,
  };
  const navigate = useNavigate();
  const modalSwal = withReactContent(Swal);
  const { t } = useTranslation(["dashboard-page"]);
  const webPath = useSelector((state) => state.app.webPath);
  const [preview, setPreview] = useState(formPreview);
  const [productData, setProductData] = useState(isEdit ? productShow : form);
  const [netsData, setNetsData] = useState([]);
  const [amountsData, setAmountsData] = useState([]);
  const [subCatesData, setSubCatesData] = useState([]);
  const [mainCatesData, setMainCatesData] = useState([]);
  const [vat, setVat] = useState(formVat);
  const [vatsData, setVatsData] = useState([]);

  const inputRef = useRef(null);

  const formInputRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function digitBarcode(e) {
    const dataLength = e.target.value.length;
    if (dataLength <= 13) {
      if (e.target.id === "supplier-barcode") {
        setProductData((prev) => {
          return { ...prev, supplier_barcode: e.target.value };
        });
      } else {
        setProductData((prev) => {
          return { ...prev, barcode: e.target.value };
        });
      }
    }
  }

  function generateBarcode() {
    const randomNum = Math.floor(Math.random() * 1000000000);
    const formattedNum = String(randomNum).padStart(9, "0");

    const randomNumber = Math.floor(Math.random() * 1000);
    const barcodeNumber =
      Math.floor(Date.now() / 1000) +
      "" +
      randomNumber.toString().padStart(3, "0");
    setProductData(() => {
      return { ...productData, new_barcode: barcodeNumber };
    });
    inputRef.current.focus();
  }

  const convertImagePreview = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const previewImageHandler = async (e) => {
    const value = e.target.files[0];
    const image = await convertImagePreview(value);
    setPreview({
      src: image,
      file: value,
      remove: true,
      isError: isEdit || isFetchImport ? true : false,
    });
  };

  async function getNets() {
    const netsArr = [];
    const response = await axios.get("nets");
    const data = response.data.nets;
    data?.map((item) => {
      netsArr.push(item.name);
    });
    setNetsData(data);
  }

  async function getAmounts() {
    const amountsArr = [];
    const response = await axios.get("amounts");
    const data = response.data.amounts;
    data?.map((item) => amountsArr.push(item.name));
    setAmountsData(data);
  }

  async function getSubCates(main_cate_id = productData.main_cate_id) {
    setProductData(() => {
      return { ...productData, state1: !productData.state1 };
    });
    const response = await axios.get(`subcate/bymain?mainid=${main_cate_id}`);
    const data = response.data.subCates;
    setSubCatesData(data);
  }

  async function getMainCates() {
    const mainCatesArr = [];
    const response = await axios.get("maincates");
    const data = response.data.mainCates;
    data?.map((item) => mainCatesArr.push(item.name));
    setMainCatesData(data);
  }

  async function getVats() {
    const response = await axios.get("vats");
    const data = response.data.vats;
    setVatsData(data);
  }

  const selectNoVat = () => {
    setVat(() => {
      return { ...vat, checked: true };
    });
    setProductData(() => {
      return { ...productData, vat_id: 0, vat: 0, state3: !productData.state3 };
    });
  };

  const createHandle = (evt) => {
    evt.preventDefault();
    const errorArr = [];

    if (productData.barcode === "" || productData.new_barcode === "") {
      errorArr.push("โปรดสร้างบาร์โค้ด");
    }

    if (productData.vat_id === "" || productData.vat_id === null) {
      errorArr.push("โปรดเลือก Vat");
    }

    if (errorArr.length > 0) {
      modalSwal.fire({
        width: 400,
        text: errorArr[0],
        icon: "info",
      });
      return false;
    } else {
      const formData = new FormData();
      /* product */
      if (isEdit) {
        formData.append("id", productData.id);
        formData.append("product_id", productData.product_id);
      }
      formData.append("is_subproduct", 1);
      formData.append("image", preview.file);
      formData.append("image_path", productData.image_path);
      formData.append("title", productData.title);
      formData.append("main_cate_id", productData.main_cate_id);
      formData.append("sub_cate_id", productData.sub_cate_id);
      formData.append("supplier_id", productData.supplier_id);
      formData.append("supplier_cate_id", productData.supplier_cate);
      formData.append("import_value", productData.import_value);
      formData.append("unit_id", productData.unit);
      formData.append("netweight", productData.netweight);
      formData.append("counting_unit_id", productData.counting_unit);
      formData.append("purchase_date", productData.purchase_date);
      formData.append("mfd_date", productData.mfd_date);
      formData.append("exp_date", productData.exp_date);
      formData.append("alert_date", productData.alert_date);
      formData.append("alert_stock", productData.alert_stock);
      formData.append("product_barcode", productData.barcode || "");
      formData.append("barcode", productData.new_barcode || "");
      formData.append("supplier_barcode", productData.supplier_barcode || "");
      formData.append("defective", productData.defective);
      formData.append("p_type", productData.p_type);
      /* product_expense */
      formData.append("import_fee", 0);
      formData.append("fuel_cost", 0);
      formData.append("packaging", productData.packaging);
      formData.append("sticker", productData.sticker);
      formData.append("other_exp", productData.other_exp);
      formData.append("total", productData.total);
      formData.append("op_unit", productData.op_unit);
      formData.append("total_product", productData.total_product);
      /* product_price_infos */
      formData.append("oc_unit", productData.oc_unit);
      formData.append("unit_price", productData.unit_price);
      formData.append("product_cost", productData.product_cost);
      formData.append("units", productData.units);
      formData.append("cost_per_unit", productData.cost_per_unit);
      formData.append("total_cost", productData.total_cost);
      formData.append("set_profit", productData.set_profit);
      formData.append("vat_id", productData.vat_id);
      formData.append("profit_per_unit", productData.profit_per_unit);
      formData.append("pp_profit", productData.pp_profit);
      formData.append("pp_vat", productData.pp_vat);
      formData.append("os_price", productData.os_price);
      formData.append("selling_price", productData.selling_price);

      onSaveProduct(formData);
    }
  };

  function onSaveProduct(_form) {
    if (isEdit) {
      svProductUpdate(productData.id, _form).then((res) => {
        if (res.status) {
          Swal.fire({
            text: "Product has been updated successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            setRefreshData(refreshData + 1);
            setOpen(false);
          });
        } else {
          Swal.fire({ icon: "error", text: "Something went wrong!" })
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want to save the data?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!",
      }).then((result) => {
        if (result.isConfirmed) {
          svCreateProduct(_form).then((res) => {
            if (res.status) {
              Swal.fire(
                "Created!",
                "Product has been created successfully.",
                "success"
              ).then(() => {
                setRefreshData(refreshData + 1);
                setOpen(false);
                navigate('/products')
              });
            } else {
              console.log(res);
            }
          });
        }
      });
    }
  }

  /* Price details */
  useEffect(() => {
    const packaging = parseFloat(productData.packaging) || 0;
    const sticker = parseFloat(productData.sticker) || 0;
    const other_exp = parseFloat(productData.other_exp) || 0;
    const set_profit = parseFloat(productData.set_profit) || 0;
    const vat = parseFloat(productData.vat) || 0;
    const product_cost = parseFloat(productData.product_cost) || 0;
    const unit_price = parseFloat(productData.unit_price);

    const totalAll = packaging + sticker + other_exp;
    const total_product = parseInt(productData.total_product) || 1;

    const total_cost = parseFloat(product_cost) + parseFloat(totalAll) || 0;
    const cost_per_unit = (total_cost / total_product).toFixed(2);
    const oc_unit = (totalAll / total_product).toFixed(2);
    const profit_per_unit = (parseFloat(cost_per_unit) * set_profit) / 100;
    const pp_profit = parseFloat((profit_per_unit + parseFloat(cost_per_unit)));
    const pp_vat = parseFloat((vat * pp_profit) / 100) + parseFloat(pp_profit);

    setProductData((prev) => {
      return {
        ...prev,
        total: totalAll,
        units: total_product,
        oc_unit: parseFloat(oc_unit),
        op_unit: parseFloat(oc_unit),
        cost_per_unit: parseFloat(cost_per_unit),
        product_cost: parseFloat(product_cost.toFixed(2)),
        unit_price: parseFloat(cost_per_unit),
        total_cost: parseFloat(total_cost.toFixed(2)),
        profit_per_unit: parseFloat(profit_per_unit.toFixed(2)),
        pp_profit: parseFloat(pp_profit.toFixed(2)),
        pp_vat: parseFloat(pp_vat.toFixed(2)),
      };
    });
  }, [
    productData.import_fee,
    productData.sticker,
    productData.packaging,
    productData.other_exp,
    productData.total_product,
    productData.product_cost,
    productData.units,
    productData.set_profit,
    productData.vat,
  ]);
  /* End price details */

  useEffect(() => {
    getNets();
    getAmounts();
    getSubCates();
    getMainCates();
    getVats();
  }, []);

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <FontAwesomeIcon
            icon={faFileImport}
            size="xl"
            style={{ color: "#000000", paddingRight: ".5rem" }}
          />
          {isEdit
            ? `แก้ไขสินค้าย่อย (Product ID : ${productShow.product_id})`
            : "รายละเอียดสินค้าสดที่จะแยกย่อย เข้าสต็อก"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <section id="subproduct-import">
            {!isEdit && 
              <>
                <Card
                  className="flex-container-column"
                  style={{ marginTop: "-1rem", marginBottom: "1rem" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <figure className="product-image">
                      <img src={webPath + productShow.thumbnail_link} alt="" />
                    </figure>
                    <div className="product-name">
                      <p>ชื่อสินค้า</p>
                      <span>{productShow.title}</span>
                    </div>
                    <p style={{ width: "2%", textAlign: "center" }}>|</p>
                    <div className="product-number">
                      <p>รหัสสินค้า</p>
                      <span>{productShow.product_id}</span>
                    </div>
                    <p style={{ width: "2%", textAlign: "center" }}>|</p>
                    <div className="barcode-number">
                      <p>รหัสบาร์โค้ดจากสินค้า</p>
                      <span>{productShow.product_barcode}</span>
                    </div>
                    <p style={{ width: "2%", textAlign: "center" }}>|</p>
                    <div className="barcode-number">
                      <p>รหัสบาร์โค้ดใหม่</p>
                      <span>{productShow.barcode_number}</span>
                    </div>
                    <p style={{ width: "2%", textAlign: "center" }}>|</p>
                    <figure className="barcode-image">
                      <p style={{ color: "#000" }}>บาร์โค้ดจากสินค้า</p>
                      {productShow.product_barcode && (
                        <Barcode value={productShow.product_barcode} />
                      )}
                    </figure>
                    <p style={{ width: "2%", textAlign: "center" }}>|</p>
                    <figure className="barcode-image">
                      <p style={{ color: "#000" }}>บาร์โค้ดใหม่</p>
                      {productShow.barcode_number && (
                        <Barcode value={productShow.barcode_number} />
                      )}
                    </figure>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "2.5rem",
                    }}
                  >
                    <div className="flex-container-center">
                      <FontAwesomeIcon
                        icon={faFileImport}
                        size="xl"
                        style={{ color: "#3b326b" }}
                      />
                      <p
                        style={{
                          color: "#3b326b",
                          fontSize: "18px",
                          fontWeight: 400,
                        }}
                      >
                        ข้อมูลสินค้า
                      </p>
                    </div>
                  </div>
                  <DetailDataGrid productShowArr={[productShow]} />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: "2.5rem",
                    }}
                  >
                    <div className="flex-container-center">
                      <FontAwesomeIcon
                        icon={faStore}
                        size="xl"
                        style={{ color: "#3b326b" }}
                      />
                      <p
                        style={{
                          color: "#3b326b",
                          fontSize: "18px",
                          fontWeight: 400,
                        }}
                      >
                        ซัพพลายเออร์
                      </p>
                    </div>
                  </div>
                  <SupplierDataGrid productShowArr={[productShow]} />
                </Card>
                <BootstrapDialogTitle
                  id="customized-dialog-title"
                  onClose={handleClose}
                >
                  <FontAwesomeIcon
                    icon={faFileImport}
                    size="xl"
                    style={{ color: "#000000", paddingRight: ".5rem" }}
                  />
                  เพิ่มสินค้าสดย่อย เข้าสต็อก
                </BootstrapDialogTitle>
              </>
            }
            <div id="form-import">
              <form onSubmit={createHandle}>
                <Card className="flex-container-column">
                  <div className="header">
                    <figure className="header-title">
                      <img src="/images/icons/import-icon.png" alt="" />
                      <p>ข้อมูลสินค้า</p>
                    </figure>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginRight: "1.1rem",
                      }}
                    >
                      <button
                        className="btn"
                        style={{ display: "flex", justifyContent: "center" }}
                        type="submit"
                      >
                        บันทึกข้อมูล
                      </button>
                    </div>
                  </div>

                  <div className="content">
                    <div
                      className="content-left"
                      style={{ position: "relative" }}
                    >
                      <figure style={{ cursor: "pointer" }}>
                        <div className="input-file">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => previewImageHandler(e)}
                            ref={formInputRef}
                          />
                        </div>
                        {isEdit ? (
                          <img
                            src={
                              !preview.isError
                                ? webPath + productData.image_path
                                : preview.src || "/images/mock/pre-product.png"
                            }
                            alt={""}
                          />
                        ) : (
                          <img
                            src={
                              !preview.isError
                                ? preview.src
                                : "/images/mock/pre-product.png"
                            }
                            alt={""}
                          />
                        )}
                        <p
                          style={{
                            display:
                              preview.isError && !isEdit && !isFetchImport
                                ? "block"
                                : "none",
                          }}
                        >
                          ขนาดไฟล์ภาพไม่เกิน 10 Gb
                        </p>
                      </figure>
                    </div>
                    <div className="content-right">
                      <div className="first-row">
                        <TextField
                          required
                          value={productData.title}
                          onChange={(e) =>
                            setProductData(() => {
                              return {
                                ...productData,
                                title: e.target.value,
                              };
                            })
                          }
                          id="outlined-basic"
                          label="ชื่อสินค้า"
                          variant="outlined"
                          size="small"
                          sx={{ width: "100%" }}
                        />
                      </div>
                      <div className="second-row">
                        <TextField
                          required
                          type="number"
                          value={productData.netweight}
                          onInput={(e) =>
                            setProductData(() => {
                              return {
                                ...productData,
                                netweight: parseFloat(e.target.value),
                              };
                            })
                          }
                          id="outlined-basic"
                          label="ปริมาตรสุทธิ"
                          variant="outlined"
                          size="small"
                          sx={{ width: "25%" }}
                        />
                        <Autocomplete
                          defaultValue={{ name: productData.unit_name || "" }}
                          required
                          onChange={(e, value) =>
                            setProductData(() => {
                              return {
                                ...productData,
                                unit: value ? value.id : 0,
                              };
                            })
                          }
                          id="combo-box-demo"
                          options={netsData}
                          getOptionLabel={(option) => option.name || ""}
                          sx={{ width: "25%" }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="หน่วยปริมาตรสุทธิ"
                              size="small"
                              required
                            />
                          )}
                        />
                        <TextField
                          required
                          value={productData.import_value}
                          onChange={(e) =>
                            setProductData(() => {
                              return {
                                ...productData,
                                import_value: !isNaN(parseInt(e.target.value))
                                  ? parseInt(e.target.value)
                                  : "",
                              };
                            })
                          }
                          id="outlined-basic"
                          label="จำนวน(นำเข้า)"
                          variant="outlined"
                          size="small"
                          sx={{ width: "25%" }}
                        />
                        <Autocomplete
                          // value={productData.counting_unit}
                          defaultValue={{
                            name: productData.counting_unit_name || "",
                          }}
                          onChange={(e, value) =>
                            setProductData(() => {
                              return {
                                ...productData,
                                counting_unit: value ? value.id : 0,
                              };
                            })
                          }
                          disablePortal
                          id="combo-box-demo"
                          options={amountsData}
                          getOptionLabel={(option) => option.name || ""}
                          sx={{ width: "25%" }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="หน่วยนับ"
                              size="small"
                              required
                            />
                          )}
                        />
                      </div>
                      <div className="third-row">
                        <div
                          className="third-row-left"
                          style={{
                            display: "flex",
                            gap: "1rem",
                            width: "50%",
                          }}
                        >
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              disabled={true}
                              label="วันสั่งซื้อ"
                              inputFormat="YYYY-MM-DD"
                              sx={{ width: "33.33%" }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  size="small"
                                  sx={{ width: "33.33%" }}
                                  inputProps={{
                                    ...params.inputProps,
                                    readOnly: true,
                                  }}
                                  required
                                  disabled={true}
                                />
                              )}
                              value={productData.purchase_date || null}
                              onChange={(value) => {
                                setProductData(() => {
                                  return {
                                    ...productData,
                                    purchase_date: dayjs(value)
                                      .add(1, "day")
                                      .toISOString()
                                      .substring(0, 10),
                                  };
                                });
                              }}
                            />
                            <DatePicker
                              disabled={true}
                              label="วันผลิต MFD"
                              inputFormat="YYYY-MM-DD"
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  size="small"
                                  sx={{ width: "33.33%" }}
                                  inputProps={{
                                    ...params.inputProps,
                                    readOnly: true,
                                  }}
                                  required
                                />
                              )}
                              value={productData.mfd_date || null}
                              onChange={(value) => {
                                setProductData(() => {
                                  return {
                                    ...productData,
                                    mfd_date: dayjs(value)
                                      .add(1, "day")
                                      .toISOString()
                                      .substring(0, 10),
                                  };
                                });
                              }}
                            />
                            <DatePicker
                              disabled={true}
                              label="วันหมดอายุ EXP"
                              inputFormat="YYYY-MM-DD"
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  size="small"
                                  sx={{ width: "33.33%" }}
                                  inputProps={{
                                    ...params.inputProps,
                                    readOnly: true,
                                  }}
                                  required
                                  disabled={true}
                                />
                              )}
                              value={productData.exp_date || null}
                              onChange={(value) => {
                                setProductData(() => {
                                  return {
                                    ...productData,
                                    exp_date: dayjs(value)
                                      .add(1, "day")
                                      .toISOString()
                                      .substring(0, 10),
                                  };
                                });
                              }}
                            />
                          </LocalizationProvider>
                        </div>
                        <div
                          className="third-row-right"
                          style={{
                            display: "flex",
                            gap: "1rem",
                            width: "50%",
                          }}
                        >
                          <TextField
                            value={productData.alert_date}
                            required
                            onChange={(e) =>
                              setProductData(() => {
                                return {
                                  ...productData,
                                  alert_date: !isNaN(parseInt(e.target.value))
                                    ? parseInt(e.target.value)
                                    : "",
                                };
                              })
                            }
                            id="outlined-basic"
                            label="จำนวนวันเตือนใกล้หมดอายุ"
                            variant="outlined"
                            size="small"
                            sx={{ width: "33.33%" }}
                          />
                          <TextField
                            value={productData.alert_stock}
                            required
                            onChange={(e) =>
                              setProductData((prev) => {
                                return {
                                  ...productData,
                                  alert_stock: !isNaN(parseInt(e.target.value))
                                    ? parseInt(e.target.value)
                                    : "",
                                };
                              })
                            }
                            id="outlined-basic"
                            label="จำนวนเตือนสินค้าใกล้หมด"
                            variant="outlined"
                            size="small"
                            sx={{ width: "33.33%" }}
                          />
                          <TextField
                            disabled
                            value={productData.defective}
                            onChange={(e) =>
                              setProductData(() => {
                                return {
                                  ...productData,
                                  defective: !isNaN(parseInt(e.target.value))
                                    ? parseInt(e.target.value)
                                    : 0,
                                };
                              })
                            }
                            id="outlined-basic"
                            label="จำนวนสินค้าที่มีปัญหา"
                            variant="outlined"
                            size="small"
                            sx={{ width: "33.33%" }}
                          />
                        </div>
                      </div>
                      <div className="fourth-row">
                        <div
                          className="fourth-row-left"
                          style={{
                            display: "flex",
                            gap: "1rem",
                            width: "50%",
                          }}
                        >
                          <Autocomplete
                            // value={productData.main_cate_id}
                            value={productData.p_type || ""}
                            onChange={(e, value) =>
                              setProductData((prev) => {
                                return { ...prev, p_type: value };
                              })
                            }
                            required
                            id="combo-box-demo"
                            options={["Vending", "Wash&Dry"]}
                            sx={{ width: "33.33%" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="ประเภทสินค้า"
                                size="small"
                                required
                              />
                            )}
                          />
                          <Autocomplete
                            // value={productData.main_cate_id}
                            defaultValue={{
                              name: productData.main_cate_name || "",
                            }}
                            onChange={(e, value) =>
                              setProductData(() => {
                                const cate_id = value ? value.id : 0;
                                getSubCates(cate_id);
                                return {
                                  ...productData,
                                  sub_cate_id: 0,
                                  main_cate_id: cate_id,
                                  sub_cate_name: "",
                                  state1: !productData.state1,
                                };
                              })
                            }
                            disabled={false}
                            id="combo-box-demo"
                            options={mainCatesData}
                            getOptionLabel={(option) => option.name || ""}
                            sx={{ width: "33.33%" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="หมวดหมู่หลัก"
                                size="small"
                                required
                              />
                            )}
                          />
                          <Autocomplete
                            key={productData.state1}
                            defaultValue={{
                              name: productData.sub_cate_name || "",
                            }}
                            onChange={(e, value) =>
                              setProductData(() => {
                                return {
                                  ...productData,
                                  sub_cate_id: value ? value.id : 0,
                                  sub_cate: value ? value.name : "",
                                };
                              })
                            }
                            disabled={false}
                            id="combo-box-subcate"
                            options={subCatesData}
                            getOptionLabel={(option) => option.name || ""}
                            sx={{ width: "33.33%" }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="หมวดหมู่ย่อย"
                                size="small"
                                required={
                                  subCatesData.length > 0 ? true : false
                                }
                              />
                            )}
                          />
                        </div>
                        <div
                          className="fourth-row-right"
                          style={{
                            display: "flex",
                            gap: "1rem",
                            width: "50%",
                          }}
                        >
                          <TextField
                            value={productData.barcode || ""}
                            onChange={(e) => digitBarcode(e)}
                            id="outlined-basic"
                            label="เลขบาร์โค้ดจากสินค้า"
                            variant="outlined"
                            size="small"
                            sx={{ width: "33.33%" }}
                            disabled
                          />
                          <TextField
                            value={productData.new_barcode}
                            required
                            id="outlined-basic"
                            label="สร้างบาร์โค้ดใหม่"
                            variant="outlined"
                            size="small"
                            sx={{ width: "33.33%" }}
                            inputRef={inputRef}
                            InputProps={{
                              readOnly: true,
                              endAdornment: (
                                <IconButton
                                  onClick={generateBarcode}
                                  sx={{ padding: 0 }}
                                >
                                  <CreateNewFolderIcon
                                    sx={{ cursor: "pointer" }}
                                  />
                                </IconButton>
                              ),
                            }}
                          />
                          <TextField
                            required
                            value={productData.supplier_barcode || ""}
                            onChange={(e) => digitBarcode(e)}
                            id="supplier-barcode"
                            label="เลขบาร์โค้ดจากซัพพลายเออร์"
                            variant="outlined"
                            size="small"
                            sx={{ width: "33.33%" }}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Card
                      className="flex-container-column"
                      sx={{ borderRadius: "10px", maxHeight: "250px" }}
                    >
                      <div className="header">
                        <figure className="header-title">
                          <img
                            width={25}
                            src="/images/icons/truck-icon.png"
                            alt=""
                          />
                          <p>ข้อมูลค่าใช้จ่ายและจำนวนสินค้าทั้งหมด</p>
                        </figure>
                      </div>
                      <div
                        className="pricing"
                        style={{
                          display: "flex",
                          gap: "1rem",
                          padding: "1rem",
                          width: "100%",
                        }}
                      >
                        <div
                          className="pricing-left"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            width: "50%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              width: "100%",
                            }}
                          >
                            <TextField
                              required
                              type="number"
                              value={productData.packaging}
                              onChange={(e) =>
                                setProductData(() => {
                                  return {
                                    ...productData,
                                    packaging: !isNaN(
                                      parseFloat(e.target.value)
                                    )
                                      ? parseFloat(e.target.value)
                                      : null,
                                  };
                                })
                              }
                              id="outlined-basic"
                              label="บรรจุภัณฑ์ (฿)"
                              variant="outlined"
                              size="small"
                              sx={{ width: "33.33%" }}
                            />
                            <TextField
                              required
                              type="number"
                              value={productData.sticker}
                              onChange={(e) =>
                                setProductData(() => {
                                  return {
                                    ...productData,
                                    sticker: !isNaN(parseFloat(e.target.value))
                                      ? parseFloat(e.target.value)
                                      : null,
                                  };
                                })
                              }
                              id="outlined-basic"
                              label="สติ๊กเกอร์ (฿)"
                              variant="outlined"
                              size="small"
                              sx={{ width: "33.33%" }}
                            />
                            <TextField
                              required
                              type="number"
                              value={productData.other_exp}
                              onChange={(e) =>
                                setProductData(() => {
                                  return {
                                    ...productData,
                                    other_exp: !isNaN(
                                      parseFloat(e.target.value)
                                    )
                                      ? parseFloat(e.target.value)
                                      : null,
                                  };
                                })
                              }
                              id="outlined-basic"
                              label="ค่าใช้จ่ายอื่นๆ(฿)"
                              variant="outlined"
                              size="small"
                              sx={{ width: "33.33%" }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              width: "100%",
                            }}
                          >
                            <TextField
                              required
                              type="number"
                              value={productData.total_product}
                              onChange={(e) =>
                                setProductData(() => {
                                  return {
                                    ...productData,
                                    total_product: !isNaN(
                                      parseFloat(e.target.value)
                                    )
                                      ? parseFloat(e.target.value)
                                      : null,
                                  };
                                })
                              }
                              label="จำนวนสินค้าทั้งหมด"
                              variant="outlined"
                              size="small"
                              sx={{ width: "50%" }}
                            />
                            <TextField
                              required
                              type="number"
                              value={productData.product_cost}
                              label="ต้นทุนสินค้าราคาดิบ"
                              variant="outlined"
                              size="small"
                              sx={{ width: "50%" }}
                              disabled
                            />
                          </div>
                        </div>
                        <div
                          className="pricing-right"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            width: "50%",
                            height: "40px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              width: "100%",
                            }}
                          >
                            <TextField
                              disabled
                              value={productData.total}
                              id="outlined-basic"
                              label="รวมค่าดำเนินการทั้งหมด"
                              variant="outlined"
                              size="small"
                              sx={{ width: "50%" }}
                            />
                            <TextField
                              disabled
                              value={productData.oc_unit}
                              id="outlined-basic"
                              label="ค่าดำเนินการ/หน่วย"
                              variant="outlined"
                              size="small"
                              sx={{ width: "50%" }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              width: "100%",
                            }}
                          >
                            <TextField
                              disabled
                              value={productData.total_cost}
                              label="Total (รวมต้นทุนสินค้าทั้งหมด)"
                              variant="outlined"
                              size="small"
                              sx={{ width: "50%" }}
                            />
                            <TextField
                              disabled
                              value={productData.cost_per_unit}
                              label="ต้นทุนสินค้า/หน่วย"
                              variant="outlined"
                              size="small"
                              sx={{ width: "50%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                  <Grid item xs={6}>
                    <Card
                      className="flex-container-column"
                      sx={{ borderRadius: "10px" }}
                    >
                      <div className="header">
                        <figure className="header-title">
                          <img
                            width={25}
                            src="/images/icons/currency-icon.png"
                            alt=""
                          />
                          <p>ข้อมูลราคา</p>
                        </figure>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "1rem",
                          padding: "1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            width: "50%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              width: "100%",
                            }}
                          >
                            <TextField
                              required
                              type="number"
                              value={productData.set_profit}
                              onChange={(e) =>
                                setProductData(() => {
                                  return {
                                    ...productData,
                                    set_profit: !isNaN(
                                      parseFloat(e.target.value)
                                    )
                                      ? parseFloat(e.target.value)
                                      : "",
                                  };
                                })
                              }
                              id="outlined-basic"
                              label="กำไรที่ต้องการ %"
                              variant="outlined"
                              size="small"
                              sx={{ width: "100%" }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "1rem",
                            }}
                          >
                            <Autocomplete
                              key={productData.state3}
                              value={{
                                name:
                                  productData.vat_id !== 0
                                    ? productData.vat_name
                                    : "",
                              }}
                              onChange={(e, value) => {
                                setProductData(() => {
                                  return {
                                    ...productData,
                                    vat_id: value ? value.id : "",
                                    vat: value ? value.name : "",
                                  };
                                });
                                setVat(() => {
                                  return { ...vat, checked: false };
                                });
                              }}
                              id="combo-box-demo"
                              options={vatsData}
                              getOptionLabel={(option) => option.name || ""}
                              sx={{ width: "50%" }}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="ตัวเลือกภาษีสินค้า"
                                  size="small"
                                />
                              )}
                            />
                            <FormControlLabel
                              value="female"
                              control={
                                <Radio
                                  checked={vat.checked}
                                  onChange={selectNoVat}
                                />
                              }
                              label="No Vat"
                            />
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            width: "50%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              width: "100%",
                            }}
                          >
                            <TextField
                              disabled
                              type="number"
                              value={productData.profit_per_unit}
                              onChange={(e) =>
                                setProductData(() => {
                                  return {
                                    ...productData,
                                    profit_per_unit: !isNaN(
                                      parseFloat(e.target.value)
                                    )
                                      ? parseFloat(e.target.value)
                                      : null,
                                  };
                                })
                              }
                              id="outlined-basic"
                              label="กำไรต่อหน่วยเป็นบาท"
                              variant="outlined"
                              size="small"
                              sx={{ width: "50%" }}
                            />
                            <TextField
                              disabled
                              type="number"
                              value={productData.pp_profit}
                              id="outlined-basic"
                              label="ราคาสินค้ารวมกำไร"
                              variant="outlined"
                              size="small"
                              sx={{ width: "50%" }}
                            />
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "1rem",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start",
                                gap: "0",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "1rem",
                                }}
                              >
                                <TextField
                                  disabled
                                  type="number"
                                  value={productData.pp_vat}
                                  onChange={(e) =>
                                    setProductData(() => {
                                      return {
                                        ...productData,
                                        pp_vat: !isNaN(
                                          parseFloat(e.target.value)
                                        )
                                          ? parseFloat(e.target.value)
                                          : null,
                                      };
                                    })
                                  }
                                  id="outlined-basic"
                                  label="ราคาสินค้ารวมVat (ราคาขาย)"
                                  variant="outlined"
                                  size="small"
                                  sx={{ width: "50%" }}
                                />
                                <TextField
                                  disabled
                                  type="number"
                                  value={productData.os_price}
                                  onChange={(e) =>
                                    setProductData(() => {
                                      return {
                                        ...productData,
                                        os_price: !isNaN(
                                          parseFloat(e.target.value)
                                        )
                                          ? parseFloat(e.target.value)
                                          : null,
                                      };
                                    })
                                  }
                                  id="outlined-basic"
                                  label="ราคาขายเดิม"
                                  variant="outlined"
                                  size="small"
                                  sx={{ width: "50%" }}
                                />
                              </div>
                              {isFetchImport &&
                                parseFloat(productData.old_pp_vat) >
                                  parseFloat(productData.pp_vat) &&
                                parseFloat(productData.pp_vat) !== 0 && (
                                  <Typography
                                    variant="overline"
                                    sx={{ color: "red" }}
                                  >
                                    ราคารวมกำไรต่อชิ้นลดลง
                                  </Typography>
                                )}
                            </div>
                            <TextField
                              required
                              type="number"
                              value={productData.selling_price}
                              onChange={(e) =>
                                setProductData(() => {
                                  return {
                                    ...productData,
                                    selling_price: !isNaN(
                                      parseFloat(e.target.value)
                                    )
                                      ? parseFloat(e.target.value)
                                      : null,
                                  };
                                })
                              }
                              id="outlined-basic"
                              label="ราคาขายจริง"
                              variant="outlined"
                              size="small"
                              sx={{ width: "100%" }}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Grid>
                </Grid>
              </form>
            </div>
          </section>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
