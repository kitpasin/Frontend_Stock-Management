import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Autocomplete,
  Card,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  TextField,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AddIcon from "@mui/icons-material/Add";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import "./ProductsImportPage.scss";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import { Link, useNavigate } from "react-router-dom";
import { batch } from "react-redux";
import axios from "axios";
import { PersonOffRounded } from "@mui/icons-material";
import { svCreateProduct } from "../../services/product.service";

const modalSwal = withReactContent(Swal);
const form = {
  title: "", state1: false, state2: false,
  state3: false, reset: 0, unit: "", netweight: "",
  counting_unit: "", purchase_date: "", mfd_date: "",
  exp_date: "", barcode: "", new_barcode: "",
  main_cate_id: "", sub_cate_id: "", sub_cate: "",
  supplier_id: "", supplier_cate: "", import_value: "",
  defective: 0,

  import_fee: "", fuel_cost: "", other_exp: "",
  total: 0, op_unit: "", total_product: "",

  oc_unit: "", unit_price: "", product_cost: "",
  units: "", cost_per_unit: "", total_cost: "",
  set_profit: "", vat_id: 0, vat: 0,
  profit_per_unit: "", pp_profit: "", pp_vat: "",
  os_price: 0, selling_price: "",
};

const formPreview = {
  src: "",
  file: "",
  remove: false,
  isError: true,
};

const formVat = {
  checked: false,
  disRadio: false,
  disSelect: false,

}

function ProductsImportPage({ isEdit }) {
  const navigate = useNavigate();
  const { t } = useTranslation(["dashboard-page"]);
  const [selectedPurchaseTime, setSelectedPurchaseTime] = useState(null);
  const [selectedMFDTime, setSelectedMFDTime] = useState(null);
  const [selectedEXPTime, setSelectedEXPTime] = useState(null);
  const [generatedNumber, setGeneratedNumber] = useState("");
  const [productData, setProductData] = useState(form);
  const [preview, setPreview] = useState(formPreview);
  const [vat, setVat] = useState(formVat);
  const [netsData, setNetsData] = useState([])
  const [amountsData, setAmountsData] = useState([])
  const [mainCatesData, setMainCatesData] = useState([]);
  const [subCatesData, setSubCatesData] = useState([]);
  const [vatsData, setVatsData] = useState([]);
  const [suppliersData, setSuppliersData] = useState([]);
  const [supplierCates, setSupplierCates] = useState([]);


  const inputRef = useRef(null);
  const formInputRef = useRef(null);
  const imgError = "/images/mock/pre-product.png";

  async function getNets() {
    const netsArr = [];
    const response = await axios.get("nets");
    const data = response.data.nets;
    data?.map(item => {
      netsArr.push(item.name)
    })
    setNetsData(data);
  }

  async function getAmounts() {
    const amountsArr = [];
    const response = await axios.get("amounts");
    const data = response.data.amounts;
    data?.map(item => amountsArr.push(item.name))
    setAmountsData(data);
  }

  async function getMainCates() {
    const mainCatesArr = []
    const response = await axios.get("maincates");
    const data = response.data.mainCates;
    data?.map(item => mainCatesArr.push(item.name))
    setMainCatesData(data);
  }

  async function getMainCatesBySupplier(_supid) {
    const response = await axios.get(`maincates?supid=${_supid}`);
    const data = response.data.supplier_cate;
    setSupplierCates(data)
  }



  async function getSubCates(main_cate_id) {
    const response = await axios.get(`subcate/bymain?mainid=${main_cate_id}`);
    const data = response.data.subCates;
    // console.log(data)
    setSubCatesData(data)
    setProductData(() => { return { ...productData, sub_cate_id: 0, main_cate_id: main_cate_id, sub_cate: "", state1: !productData.state1 } })

  }

  async function getVats() {
    const response = await axios.get("vats")
    const data = response.data.vats
    setVatsData(data)
  }

  async function getSuppliers() {
    const response = await axios.get("suppliers");
    const data = response.data;
    setSuppliersData(data.suppliers);
  }

  useEffect(() => {
    getNets();
    getAmounts();
    getMainCates();
    getVats();
    getSuppliers()
  }, [])

  /* Price details */
  useEffect(() => {
    const import_fee = parseFloat(productData.import_fee) || 0
    const fuel_cost = parseFloat(productData.fuel_cost) || 0
    const other_exp = parseFloat(productData.other_exp) || 0
    const product_cost = parseFloat(productData.product_cost) || 0
    const units = parseFloat(productData.units) || 1
    const set_profit = parseFloat(productData.set_profit) || 0
    const vat = parseFloat(productData.vat) || 0
    
    const totalAll = import_fee + fuel_cost + other_exp;
    const total_product = parseInt(productData.total_product) || 1
    
    const op_unit = (totalAll / total_product).toFixed(2)
    const cost_per_unit = (product_cost / units).toFixed(2)
    const unit_price = parseFloat(cost_per_unit) + parseFloat(op_unit)
    const total_cost = (parseFloat(cost_per_unit) + parseFloat(op_unit)) * units
    const profit_per_unit = (parseFloat(cost_per_unit) + parseFloat(op_unit)) * set_profit / 100
    const pp_profit = parseFloat((profit_per_unit + unit_price).toFixed(2))
    const pp_vat = parseFloat(vat * (pp_profit) / 100) + parseFloat(pp_profit)

    setProductData(() => { return { ...productData, 
                                    total: totalAll, 
                                    op_unit: parseFloat(op_unit), 
                                    cost_per_unit: parseFloat(cost_per_unit),
                                    unit_price: unit_price,
                                    total_cost: total_cost,
                                    profit_per_unit: parseFloat(profit_per_unit.toFixed(2)),
                                    pp_profit: pp_profit,
                                    pp_vat: parseFloat(pp_vat.toFixed(2)),
                                  }
                         })
  }, [productData.import_fee, productData.fuel_cost, productData.other_exp, productData.total_product, productData.product_cost, productData.units, productData.set_profit, productData.vat])
  /* Price details */

  const imageError = (e) => {
    if (preview.file !== "" || preview.src !== "") {
      setPreview({
        ...preview,
        remove: false,
      });
    }

    return e.target.setAttribute("src", imgError);
  };

  const selectNoVat = () => {
    setVat(() => { return { ...vat, checked:true } })
    setProductData(() => { return { ...productData, vat_id: 0, vat: 0, state3: !productData.state3 } })
  }

  function generateBarcode() {
    const randomNum = Math.floor(Math.random() * 1000000000);
    const formattedNum = String(randomNum).padStart(9, "0");

    const randomNumber = Math.floor(Math.random() * 1000);
    const barcodeNumber = Math.floor(Date.now() / 1000) + "" + randomNumber.toString().padStart(3, '0');
    setGeneratedNumber(barcodeNumber);
    setProductData(() => { return { ...productData, new_barcode: barcodeNumber, barcode: "" } })
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
      isError: false,
    });
  };

  const resetDataHandle = () => {
    setProductData(form)
    setProductData((prev) => {
      return { ...prev, reset: productData.reset + 1 }
    })
    formInputRef.current.value = ""
    setPreview({
      src: undefined,
      file: undefined,
      remove: false,
      isError: true,
    });
    setGeneratedNumber("")
  }

  const saveProducthandle = (event) => {
    event.preventDefault();
    const barcode = productData.barcode || productData.new_barcode;

    const errorArr = []
    if (productData.purchase_date === "" ||  productData.mfd_date === "" || productData.exp_date === "") {
      errorArr.push("โปรดเลือกวันสั่งซื้อ วันผลิต และ วันหมดอายุ")
      
    }

    if (productData.barcode === "" && productData.new_barcode === "") {
      errorArr.push("โปรดสร้างบาร์โค้ด")
    }
    
    if (productData.vat_id === "" || productData.vat_id === null) {
      errorArr.push("โปรดเลือก Vat")
      
    }

    if (errorArr.length > 0) {
      modalSwal.fire({
        width: 400,
        text: errorArr[0],
        icon: 'info'
      })
      return false;
    } else {
      const formData = new FormData();
      /* product */
      formData.append('image', preview.file)
      formData.append('title', productData.title)
      formData.append('main_cate_id', productData.main_cate_id)
      formData.append('sub_cate_id', productData.sub_cate_id)
      formData.append('supplier_id', productData.supplier_id)
      formData.append('supplier_cate_id', productData.supplier_cate)
      formData.append('import_value', productData.import_value)
      formData.append('unit_id', productData.unit)
      formData.append('netweight', productData.netweight)
      formData.append('counting_unit_id', productData.counting_unit)
      formData.append('purchase_date', productData.purchase_date)
      formData.append('mfd_date', productData.mfd_date)
      formData.append('exp_date', productData.exp_date)
      formData.append('barcode', barcode)
      formData.append('defective', productData.defective)
      /* product_expense */
      formData.append('import_fee', productData.import_fee)
      formData.append('fuel_cost', productData.fuel_cost)
      formData.append('other_exp', productData.other_exp)
      formData.append('total', productData.total)
      formData.append('op_unit', productData.op_unit)
      formData.append('total_product', productData.total_product)
      /* product_price_infos */
      formData.append('oc_unit', productData.op_unit)
      formData.append('unit_price', productData.unit_price)
      formData.append('product_cost', productData.product_cost)
      formData.append('units', productData.units)
      formData.append('cost_per_unit', productData.cost_per_unit)
      formData.append('total_cost', productData.total_cost)
      formData.append('set_profit', productData.set_profit)
      formData.append('vat_id', productData.vat_id)
      formData.append('profit_per_unit', productData.profit_per_unit)
      formData.append('pp_profit', productData.pp_profit)
      formData.append('pp_vat', productData.pp_vat)
      formData.append('os_price', productData.os_price)
      formData.append('selling_price', productData.selling_price)

      onSaveProduct(formData)
    }
    
  }

  function onSaveProduct(_form) {
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
            Swal.fire("Created!", "Product has been created successfully.", "success").then(() => {
              resetDataHandle()
            })
          } else {
            alert('error')
          }
        })
      }
    });
  }

  return (
    <section id="products-import-page">
      { !isEdit && 
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <figure style={{ width: "30px", marginBottom: "1rem" }}>
            <img src="/images/icons/productsPage-icon.png" alt="" />
          </figure>
          <div style={{ width: "100%" }}>
            <HeadPageComponent
              h1={t("เพิ่มสินค้า")}
              breadcrums={[{ title: t("เพิ่มสินค้า"), link: false }]}
            />
          </div>
        </div>
      }
      <form onSubmit={saveProducthandle}>
        <div>
          <Card
            className="flex-container-column"
            sx={{ borderRadius: "10px", marginTop: "-1rem", marginBottom: "1rem" }}
          >
            <div className="header">
              <figure className="header-title">
                <img src="/images/icons/import-icon.png" alt="" />
                <p>ข้อมูลสินค้า</p>
                { !isEdit &&
                  <Link
                    to="/products/import/search"
                    style={{ marginLeft: "5.7rem" }}
                  >
                    <img src="/images/icons/search-icon.png" alt="" />
                    ค้นหาสินค้าที่มีอยู่
                  </Link>
                }
              </figure>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginRight: "1.1rem",
                }}
              >
                <button style={{ display: "flex", justifyContent: "center" }} onClick={resetDataHandle}>
                  ล้างข้อมูล
                </button>
                <button style={{ display: "flex", justifyContent: "center" }} type="submit">
                  บันทึกข้อมูล
                </button>
              </div>
            </div>
            <div className="content">
              <div className="content-left" style={{ position: "relative" }}>
                <figure style={{ cursor: "pointer" }}>
                  <div className="input-file" >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => previewImageHandler(e)}
                      ref={formInputRef}
                    />
                  </div>
                  <img
                    src={
                      !preview.isError
                        ? preview.src
                        : "/images/mock/pre-product.png"
                    }
                    alt={""}
                  />
                  <p style={{ display: preview.isError ? "block" : "none" }}>
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
                        return { ...productData, title: e.target.value };
                      })
                    }
                    id="outlined-basic"
                    label="ชื่อสินค้า"
                    variant="outlined"
                    size="small"
                    sx={{ width: "51%" }}
                  />
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
                    sx={{ width: "33.75%" }}
                  />
                  <Autocomplete
                    key={productData.reset}
                    required
                    // value={productData.unit}
                    onChange={(e, value) =>
                      setProductData(() => {
                        return { ...productData, unit: value ? value.id : 0 };
                      })
                    }
                    id="combo-box-demo"
                    options={netsData}
                    getOptionLabel={(option) => option.name || ""}
                    sx={{ width: "16.25%" }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="หน่วยปริมาตรสุทธิ"
                        size="small"
                        required
                      />
                    )}
                  />
                </div>
                <div className="second-row">
                  <div style={{ display: "flex", gap: "1rem", width: "50%" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="วันสั่งซื้อ"
                        inputFormat="YYYY-MM-DD"
                        renderInput={(params) => (
                          <TextField {...params} size="small" inputProps={{...params.inputProps, readOnly: true}} required />
                        )}
                        value={productData.purchase_date || null}
                        onChange={(value) => {
                          setSelectedPurchaseTime(value);
                          setProductData(() => {
                            return { ...productData, purchase_date: dayjs(value).add(1, "day").toISOString().substring(0, 10) }
                          })
                        }}
                      />
                      <DatePicker
                        label="วันผลิต MFD"
                        inputFormat="YYYY-MM-DD"
                        renderInput={(params) => (
                          <TextField {...params} size="small" inputProps={{...params.inputProps, readOnly: true}} required />
                        )}
                        value={productData.mfd_date || null}
                        onChange={(value) => {
                          setSelectedMFDTime(value);
                          setProductData(() => {
                            return { ...productData, mfd_date: dayjs(value).add(1, "day").toISOString().substring(0, 10) }
                          })
                        }}
                      />
                      <DatePicker
                        label="วันหมดอายุ EXP"
                        inputFormat="YYYY-MM-DD"
                        renderInput={(params) => (
                          <TextField {...params} size="small" inputProps={{...params.inputProps, readOnly: true}} required />
                        )}
                        value={productData.exp_date || null}
                        onChange={(value) => {
                          setSelectedEXPTime(value);
                          setProductData(() => {
                            return { ...productData, exp_date: dayjs(value).add(1, "day").toISOString().substring(0, 10) }
                          })
                        }}
                      />
                    </LocalizationProvider>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", width: "50%" }}>
                    <TextField
                      required
                      value={productData.import_value}
                      onChange={(e) => setProductData(() => {
                        return { ...productData, import_value: !isNaN(parseInt(e.target.value))? parseInt(e.target.value):"" }
                      })}
                      id="outlined-basic"
                      label="จำนวน (นำเข้า)"
                      variant="outlined"
                      size="small"
                      sx={{ width: "67.5%" }}
                    />
                    <Autocomplete
                      // value={productData.counting_unit}
                      key={productData.reset}
                      onChange={(e, value) => setProductData(() => {
                        return { ...productData, counting_unit: value ? value.id : 0 }
                      })}
                      disablePortal
                      id="combo-box-demo"
                      options={amountsData}
                      getOptionLabel={(option) => option.name || ""}
                      sx={{ width: "32.5%" }}
                      renderInput={(params) => (
                        <TextField {...params} label="หน่วยนับ" size="small" required />
                      )}
                    />
                  </div>
                </div>
                <div className="third-row">
                  <div style={{ display: "flex", gap: "1rem", width: "50%" }}>
                    <Autocomplete
                      // value={productData.main_cate_id}
                      key={productData.reset}
                      onChange={(e, value) => getSubCates(value? value.id : 0)}
                      disabled={false}
                      id="combo-box-demo"
                      options={mainCatesData}
                      getOptionLabel={(option) => option.name || ""}
                      sx={{ width: "50%" }}
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
                      // label={productData.sub_cate}
                      // value={productData.sub_cate}
                      key={productData.state1}
                      onChange={(e, value) => setProductData(() => {
                        return { ...productData, sub_cate_id: value? value.id : 0, sub_cate: value ? value.name : "" }
                      })}
                      disabled={false}
                      id="combo-box-demo"
                      options={subCatesData}
                      getOptionLabel={(option) => option.name || ""}
                      sx={{ width: "50%" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="หมวดหมู่ย่อย"
                          size="small"
                          required={subCatesData.length > 0 ? true : false}
                        
                        />
                      )}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "1rem", width: "50%" }}>
                    <TextField
                      value={productData.barcode}
                      onChange={(e) => setProductData(() => {
                        return { ...productData, barcode: e.target.value, new_barcode: "" }
                      })}
                      id="outlined-basic"
                      label="เลขบาร์โค้ดเดิม"
                      variant="outlined"
                      size="small"
                      sx={{ width: "33.33%" }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="สร้างบาร์โค้ดใหม่"
                      variant="outlined"
                      value={productData.new_barcode}
                      onChange={(event) => setGeneratedNumber(event.target.value)}
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
                            <CreateNewFolderIcon sx={{ cursor: "pointer" }} />
                          </IconButton>
                        ),
                      }}
                    />
                    <TextField
                      value={productData.defective}
                      onChange={(e) => setProductData(() => {
                        return { ...productData, defective: !isNaN(parseInt(e.target.value))?parseInt(e.target.value):0 }
                      })}
                      id="outlined-basic"
                      label="จำนวนสินค้าที่มีปัญหา"
                      variant="outlined"
                      size="small"
                      sx={{ width: "33.33%" }}
                    />
                  </div>
                </div>
              </div>
            </div>


          </Card>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Card
                  className="flex-container-column"
                  sx={{ borderRadius: "10px" }}
                >
                  <div className="header">
                    <figure className="header-title">
                      <img width={25} src="/images/icons/truck-icon.png" alt="" />
                      <p>ข้อมูลค่าใช้จ่ายและจำนวนสินค้าทั้งหมด</p>
                    </figure>
                  </div>
                  <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        width: "50%",
                      }}
                    >
                      <div
                        style={{ display: "flex", gap: "1rem", width: "100%" }}
                      >
                        <TextField
                          required
                          type="number"
                          value={productData.import_fee}
                          onChange={(e) => setProductData(() => {
                            return { ...productData, import_fee: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                          })}
                          id="outlined-basic"
                          label="ค่านำเข้า"
                          variant="outlined"
                          size="small"
                          sx={{ width: "33.33%" }}
                        />
                        <TextField
                          required
                          type="number"
                          value={productData.fuel_cost}
                          onChange={(e) => setProductData(() => {
                            return { ...productData, fuel_cost: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                          })}
                          id="outlined-basic"
                          label="ค่าน้ำมัน"
                          variant="outlined"
                          size="small"
                          sx={{ width: "33.33%" }}
                        />
                        <TextField
                          required
                          type="number"
                          value={productData.other_exp}
                          onChange={(e) => setProductData(() => {
                            return { ...productData, other_exp: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                          })}
                          id="outlined-basic"
                          label="ค่าใช้จ่ายอื่น ๆ"
                          variant="outlined"
                          size="small"
                          sx={{ width: "33.33%" }}
                        />
                      </div>
                      <div>
                        <TextField
                          required
                          type="number"
                          value={productData.total_product}
                          onChange={(e) => setProductData(() => {
                            return { ...productData, total_product: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                          })}
                          id="outlined-basic"
                          label="จำนวนสินค้าทั่งหมด"
                          variant="outlined"
                          size="small"
                          sx={{ width: "100%" }}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "1rem",
                        width: "50%",
                        height: "40px",
                      }}
                    >
                      <TextField
                        disabled
                        value={productData.total}
                        onChange={(e) => setProductData(() => {
                            return { ...productData, total: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                          })}
                        id="outlined-basic"
                        label="รวมค่าดำเนินการทั้งหมด"
                        variant="outlined"
                        size="small"
                        sx={{ width: "50%" }}
                      />
                      <TextField
                        disabled
                        value={productData.op_unit}
                        onChange={(e) => setProductData(() => {
                            return { ...productData, op_unit: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                          })}
                        id="outlined-basic"
                        label="ค่าดำเนินการ/หน่วย"
                        variant="outlined"
                        size="small"
                        sx={{ width: "50%" }}
                      />
                    </div>
                  </div>
                </Card>
              </Grid>
              <Grid item>
                <Card
                  className="flex-container-column"
                  sx={{ borderRadius: "10px" }}
                >
                  <div className="header">
                    <figure className="header-title">
                      <img
                        width={25}
                        src="/images/icons/supplierTable-icon.png"
                        alt=""
                      />
                      <p>ข้อมูลซัพพลายเออร์</p>
                    </figure>
                  </div>
                  <div
                    style={{
                      padding: "1rem",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "2rem",
                    }}
                  >
                    <Autocomplete
                      // value={productData.supplier_id}
                      key={productData.reset}
                      onChange={(e, value) => setProductData(() => {
                        const sup_id = value?value.id: 0;
                        getMainCatesBySupplier(sup_id)
                        return { ...productData, supplier_id: value ? value.id : 0, supplier_cate: 0, state2: !productData.state2 }
                      })}
                      id="combo-box-demo"
                      options={suppliersData}
                      getOptionLabel={(option) => option.name || ""}
                      sx={{ width: "50%" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="เลือกซัพพลายเออร์"
                          size="small"
                          required
                        />
                      )}
                    />
                    <Autocomplete
                      key={productData.state2}
                      onChange={(e, value) => setProductData(() => {
                        return { ...productData, supplier_cate: value ? value.id : 0 }
                      })}
                      id="combo-box-demo"
                      options={supplierCates}
                      getOptionLabel={(option) => option.name || ""}
                      sx={{ width: "50%" }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="เลือกหมวดหมู่สินค้า"
                          size="small"
                          required
                        />
                      )}
                    />
                  </div>
                  <button className="add-supplier" style={{ fontSize: "16px" }} onClick={() => navigate("/createsupplier")}>
                    <AddIcon />
                    สร้างข้อมูลซัพพลายเออร์ใหม่
                  </button>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Card className="flex-container-column" sx={{ borderRadius: "10px" }}>
              <div className="header">
                <figure className="header-title">
                  <img width={25} src="/images/icons/currency-icon.png" alt="" />
                  <p>ข้อมูลราคา</p>
                </figure>
              </div>
              <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    width: "50%",
                  }}
                >
                  <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                    <TextField
                      disabled
                      type="number"
                      value={productData.op_unit}
                      onChange={(e) => setProductData(() => {
                        return { ...productData, oc_unit: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                      })}
                      id="outlined-basic"
                      label="ค่าดำเนินการ/หน่วย"
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div>
                    <TextField
                      disabled
                      type="number"
                      value={productData.unit_price}
                      onChange={(e) => setProductData(() => {
                        return { ...productData, unit_price: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                      })}
                      id="outlined-basic"
                      label="ราคา/หน่วย (บาท)"
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%" }}
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
                  <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                    <TextField
                      required
                      type="number"
                      value={productData.product_cost}
                      onChange={(e) => setProductData(() => {
                        return { ...productData, product_cost: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                      })}
                      id="outlined-basic"
                      label="ต้นทุนสินค้า(ราคาดิบ)"
                      variant="outlined"
                      size="small"
                      sx={{ width: "50%" }}
                    />
                    <TextField
                      required
                      type="number"
                      value={productData.units}
                      onChange={(e) => setProductData(() => {
                        return { ...productData, units: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                      })}
                      id="outlined-basic"
                      label="จำนวนหน่วย"
                      variant="outlined"
                      size="small"
                      sx={{ width: "50%" }}
                    />
                    <TextField
                      disabled
                      type="number"
                      value={productData.cost_per_unit}
                      onChange={(e) => setProductData(() => {
                        return { ...productData, cost_per_unit: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                      })}
                      id="outlined-basic"
                      label="ต้นทุนสินค้า/หน่วย"
                      variant="outlined"
                      size="small"
                      sx={{ width: "50%" }}
                    />
                  </div>
                  <div>
                    <TextField
                      disabled
                      type="number"
                      value={productData.total_cost}
                      onChange={(e) => setProductData(() => {
                        return { ...productData, total_cost: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                      })}
                      id="outlined-basic"
                      label="Total (รวมต้นทุนสินค้าทั้งหมด)"
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%" }}
                    />
                  </div>
                </div>
              </div>
              <hr />
              <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    width: "50%",
                  }}
                >
                  <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                    <TextField
                      required
                      type="number"
                      value={productData.set_profit}
                      onChange={(e) => setProductData(() => {
                        return { ...productData, set_profit: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):""}
                      })}
                      id="outlined-basic"
                      label="กำไรที่ต้องการ %"
                      variant="outlined"
                      size="small"
                      sx={{ width: "100%" }}
                    />
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                  >
                    <Autocomplete
                      key={productData.state3}
                      onChange={(e, value) => setProductData(() => {
                        setVat(() => { return { ...vat, checked:false } })
                        return { ...productData, vat_id: value ? value.id : 0, vat: value ? value.percent : 0 }
                      })}
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
                      control={<Radio checked={vat.checked} onChange={selectNoVat} />}
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
                  <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                    <TextField
                      disabled
                      type="number"
                      value={productData.profit_per_unit}
                      onChange={(e) => setProductData(() => {
                        return { ...productData, profit_per_unit: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                      })}
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
                      onChange={(e) => setProductData(() => {
                        return { ...productData, pp_profit: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                      })}
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
                        alignItems: "center",
                        gap: "1rem",
                      }}
                    >
                      <TextField
                        disabled
                        type="number"
                        value={productData.pp_vat}
                        onChange={(e) => setProductData(() => {
                          return { ...productData, pp_vat: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                        })}
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
                        onChange={(e) => setProductData(() => {
                          return { ...productData, os_price: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                        })}
                        id="outlined-basic"
                        label="ราคาขายเดิม"
                        variant="outlined"
                        size="small"
                        sx={{ width: "50%" }}
                      />
                    </div>
                    <TextField
                      required
                      type="number"
                      value={productData.selling_price}
                      onChange={(e) => setProductData(() => {
                        return { ...productData, selling_price: !isNaN(parseFloat(e.target.value))?parseFloat(e.target.value):null}
                      })}
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
    </section>
  );
}

export default ProductsImportPage;
