import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport, faStore } from "@fortawesome/free-solid-svg-icons";
import Barcode from "react-barcode";
import { useSelector } from "react-redux";
import { Autocomplete, Card, FormControlLabel, Grid, Radio, TextField } from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

import "./SupproductPage.scss";
import DetailDataGrid from "../../components/datagrid/DetailDataGrid";
import SupplierDataGrid from "../../components/datagrid/SupplierDataGrid";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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

export default function SupproductImport({
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
  const { t } = useTranslation(["dashboard-page"]);
  const webPath = useSelector((state) => state.app.webPath);
  const [preview, setPreview] = useState(formPreview);
  const [productData, setProductData] = useState(productShow);
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
    console.log("ok");
  };

  useEffect(() => {
    getNets();
    getAmounts();
    getSubCates();
    getMainCates();
    getVats();
  }, []);

  console.log(productData);
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
            ? `แก้ไขสินค้า (Product ID : ${productShow.product_id})`
            : "รายละเอียดสินค้าสดที่จะแยกย่อย เข้าสต็อก"}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <section id="supproduct-import">
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
                        {isEdit || isFetchImport ? (
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
                          key={productData.key[0]}
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
                          getOptionSelected={(option, value) => option.name === value.name}
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
                          key={productData.key[1]}
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
                          getOptionSelected={(option, value) => option.name === value.name}
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
                            required
                            value={productData.alert_date}
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
                            required
                            value={productData.alert_stock}
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
                            value={productData.defective_product}
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
                            // key={productData.key[2]}
                            // value={productData.p_type || ""}
                            onChange={(e, value) => console.log("ok")}
                            disabled={false}
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
                            key={productData.key[2]}
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
                            getOptionSelected={(option, value) => option.name === value.name}
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
                            id="combo-box-demo"
                            options={subCatesData}
                            getOptionLabel={(option) => option.name || ""}
                            getOptionSelected={(option, value) => option.name === value.name}
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
                            id="outlined-basic"
                            label="สร้างบาร์โค้ดใหม่"
                            variant="outlined"
                            value={productData.new_barcode}
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
                              value={productData.import_fee}
                              onChange={(e) =>
                                setProductData(() => {
                                  return {
                                    ...productData,
                                    import_fee: !isNaN(
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
                              value={productData.fuel_cost}
                              onChange={(e) =>
                                setProductData(() => {
                                  return {
                                    ...productData,
                                    fuel_cost: !isNaN(
                                      parseFloat(e.target.value)
                                    )
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
                          <div style={{
                              display: "flex",
                              gap: "1rem",
                              width: "100%",
                            }}>
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
                              value={productData.total_product}
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
                          <div style={{
                              display: "flex",
                              gap: "1rem",
                              width: "100%",
                            }}>
                          <TextField
                            disabled
                            value={productData.total}
                            onChange={(e) =>
                              setProductData(() => {
                                return {
                                  ...productData,
                                  total: !isNaN(parseFloat(e.target.value))
                                    ? parseFloat(e.target.value)
                                    : null,
                                };
                              })
                            }
                            id="outlined-basic"
                            label="รวมค่าดำเนินการทั้งหมด"
                            variant="outlined"
                            size="small"
                            sx={{ width: "50%" }}
                          />
                          <TextField
                            disabled
                            value={productData.op_unit}
                            onChange={(e) =>
                              setProductData(() => {
                                return {
                                  ...productData,
                                  op_unit: !isNaN(parseFloat(e.target.value))
                                    ? parseFloat(e.target.value)
                                    : null,
                                };
                              })
                            }
                            id="outlined-basic"
                            label="ค่าดำเนินการ/หน่วย"
                            variant="outlined"
                            size="small"
                            sx={{ width: "50%" }}
                          />
                          </div>
                          <div style={{
                              display: "flex",
                              gap: "1rem",
                              width: "100%",
                            }}>
                            <TextField
                              disabled
                              value={productData.total}
                              label="Total (รวมต้นทุนสินค้าทั้งหมด)"
                              variant="outlined"
                              size="small"
                              sx={{ width: "50%" }}
                            />
                            <TextField
                              disabled
                              value={productData.op_unit}
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
                                    ? productData.vat
                                    : "",
                              }}
                              onChange={(e, value) => {
                                setProductData(() => {
                                  return {
                                    ...productData,
                                    vat_id: value ? value.id : 0,
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
                              getOptionSelected={(option, value) => option.name === value.name}
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
                              // onChange={(e) =>
                              //   setProductData(() => {
                              //     return {
                              //       ...productData,
                              //       pp_profit: !isNaN(parseFloat(e.target.value))
                              //         ? parseFloat(e.target.value)
                              //         : null,
                              //     };
                              //   })
                              // }
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
