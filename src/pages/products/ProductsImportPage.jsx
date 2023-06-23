import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Autocomplete, Card, FormControlLabel, Grid, IconButton, Radio, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AddIcon from "@mui/icons-material/Add";

import "./ProductsImportPage.scss";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import { Link } from "react-router-dom";

function ProductsImportPage() {
  const { t } = useTranslation(["dashboard-page"]);
  const [selectedPurchaseTime, setSelectedPurchaseTime] = useState(null);
  const [selectedMFDTime, setSelectedMFDTime] = useState(null);
  const [selectedEXPTime, setSelectedEXPTime] = useState(null);
  const [generatedNumber, setGeneratedNumber] = useState("");

  const inputRef = useRef(null);

  const options = ["l", "ml"];

  function generateBarcode() {
    const randomNum = Math.floor(Math.random() * 1000000000);
    const formattedNum = String(randomNum).padStart(9, "0");
    setGeneratedNumber(formattedNum);
    inputRef.current.focus();
  }

  return (
    <section id="products-import-page">
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
      <div>
        <Card className="flex-container-column" sx={{ borderRadius: "10px", marginTop: "-1rem" }}>
          <div className="header">
            <figure className="header-title">
              <img src="/images/icons/import-icon.png" alt="" />
              <p>ข้อมูลสินค้า</p>
              <Link to="/products/import/search" style={{ marginLeft: "5.25rem" }}>
                <img src="/images/icons/search-icon.png" alt="" />
                ค้นหาสินค้าที่มีอยู่
              </Link>
            </figure>
            <div
              style={{ display: "flex", alignItems: "center", gap: "1rem", marginRight: "1.1rem" }}
            >
              <button style={{ display: "flex", justifyContent: "center" }}>ล้างข้อมูล</button>
              <button style={{ display: "flex", justifyContent: "center" }}>บันทึกข้อมูล</button>
            </div>
          </div>
          <div className="content">
            <div className="content-left">
              <figure style={{ cursor: "pointer" }}>
                <img src="/images/mock/pre-product.png" alt="" />
                <p>ขนาดไฟล์ภาพไม่เกิน 10 Gb</p>
              </figure>
            </div>
            <div className="content-right">
              <div className="first-row">
                <TextField
                  id="outlined-basic"
                  label="ชื่อสินค้า"
                  variant="outlined"
                  size="small"
                  sx={{ width: "51%" }}
                />
                <TextField
                  id="outlined-basic"
                  label="ปริมาตรสุทธิ"
                  variant="outlined"
                  size="small"
                  sx={{ width: "33.75%" }}
                />
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={options}
                  sx={{ width: "16.25%" }}
                  renderInput={(params) => (
                    <TextField {...params} label="หน่วยปริมาตรสุทธิ" size="small" />
                  )}
                />
              </div>
              <div className="second-row">
                <div style={{ display: "flex", gap: "1rem", width: "50%" }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="วันสั่งซื้อ"
                      renderInput={(params) => <TextField {...params} size="small" />}
                      value={selectedPurchaseTime}
                      onChange={(value) => {
                        setSelectedPurchaseTime(value);
                      }}
                    />
                    <DateTimePicker
                      label="วันผลิต MFD"
                      renderInput={(params) => <TextField {...params} size="small" />}
                      value={selectedMFDTime}
                      onChange={(value) => {
                        setSelectedMFDTime(value);
                      }}
                    />
                    <DateTimePicker
                      label="วันหมดอายุ EXP"
                      renderInput={(params) => <TextField {...params} size="small" />}
                      value={selectedEXPTime}
                      onChange={(value) => {
                        setSelectedEXPTime(value);
                      }}
                    />
                  </LocalizationProvider>
                </div>
                <div style={{ display: "flex", gap: "1rem", width: "50%" }}>
                  <TextField
                    id="outlined-basic"
                    label="ปริมาตรสุทธิ"
                    variant="outlined"
                    size="small"
                    sx={{ width: "67.5%" }}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: "32.5%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="หน่วยปริมาตรสุทธิ" size="small" />
                    )}
                  />
                </div>
              </div>
              <div className="third-row">
                <div style={{ display: "flex", gap: "1rem", width: "50%" }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: "50%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="หน่วยปริมาตรสุทธิ" size="small" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: "50%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="หน่วยปริมาตรสุทธิ" size="small" />
                    )}
                  />
                </div>
                <div style={{ display: "flex", gap: "1rem", width: "50%" }}>
                  <TextField
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
                    value={generatedNumber}
                    onChange={(event) => setGeneratedNumber(event.target.value)}
                    size="small"
                    sx={{ width: "33.33%" }}
                    inputRef={inputRef}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={generateBarcode} sx={{ padding: 0 }}>
                          <CreateNewFolderIcon sx={{ cursor: "pointer" }} />
                        </IconButton>
                      ),
                    }}
                  />
                  <TextField
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
              <Card className="flex-container-column" sx={{ borderRadius: "10px" }}>
                <div className="header">
                  <figure className="header-title">
                    <img width={25} src="/images/icons/truck-icon.png" alt="" />
                    <p>ข้อมูลค่าใช้จ่ายและจำนวนสินค้าทั้งหมด</p>
                  </figure>
                </div>
                <div style={{ display: "flex", gap: "2rem", padding: "1rem" }}>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "50%" }}
                  >
                    <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                      <TextField
                        id="outlined-basic"
                        label="ค่านำเข้า"
                        variant="outlined"
                        size="small"
                        sx={{ width: "33.33%" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="ค่าน้ำมัน"
                        variant="outlined"
                        size="small"
                        sx={{ width: "33.33%" }}
                      />
                      <TextField
                        id="outlined-basic"
                        label="ค่าใช้จ่ายอื่น ๆ"
                        variant="outlined"
                        size="small"
                        sx={{ width: "33.33%" }}
                      />
                    </div>
                    <div>
                      <TextField
                        id="outlined-basic"
                        label="จำนวนสินค้าทั่งหมด"
                        variant="outlined"
                        size="small"
                        sx={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", width: "50%" }}>
                    <TextField
                      id="outlined-basic"
                      label="รวมค่าดำเนินการทั้งหมด"
                      variant="outlined"
                      size="small"
                      sx={{ width: "50%" }}
                    />
                    <TextField
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
              <Card className="flex-container-column" sx={{ borderRadius: "10px" }}>
                <div className="header">
                  <figure className="header-title">
                    <img width={25} src="/images/icons/supplierTable-icon.png" alt="" />
                    <p>ข้อมูลค่าใช้จ่ายและจำนวนสินค้าทั้งหมด</p>
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
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: "50%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="เลือกหมวดหมู่สินค้า" size="small" />
                    )}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: "50%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="เลือกซัพพลายเออร์" size="small" />
                    )}
                  />
                </div>
                <button className="add-supplier">
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
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "50%" }}>
                <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                  <TextField
                    id="outlined-basic"
                    label="ค่านำเข้า"
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%" }}
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="ราคาต่อหน่วย"
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%" }}
                  />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "50%" }}>
                <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                  <TextField
                    id="outlined-basic"
                    label="ต้นทุนสินค้า(ราคาดิบ)"
                    variant="outlined"
                    size="small"
                    sx={{ width: "50%" }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="จำนวนหน่วย"
                    variant="outlined"
                    size="small"
                    sx={{ width: "50%" }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="ต้นทุนสินค้า/หน่วย"
                    variant="outlined"
                    size="small"
                    sx={{ width: "50%" }}
                  />
                </div>
                <div>
                  <TextField
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
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "50%" }}>
                <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                  <TextField
                    id="outlined-basic"
                    label="กำไรที่ต้องการ %"
                    variant="outlined"
                    size="small"
                    sx={{ width: "100%" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={options}
                    sx={{ width: "50%" }}
                    renderInput={(params) => (
                      <TextField {...params} label="ตัวเลือกภาษีสินค้า" size="small" />
                    )}
                  />
                  <FormControlLabel value="female" control={<Radio />} label="No Vat" />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "50%" }}>
                <div style={{ display: "flex", gap: "1rem", width: "100%" }}>
                  <TextField
                    id="outlined-basic"
                    label="กำไรต่อหน่วยเป็นบาท"
                    variant="outlined"
                    size="small"
                    sx={{ width: "50%" }}
                  />
                  <TextField
                    id="outlined-basic"
                    label="ราคาสินค้ารวมกำไร"
                    variant="outlined"
                    size="small"
                    sx={{ width: "50%" }}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <TextField
                      id="outlined-basic"
                      label="ราคาสินค้ารวมVat (ราคาขาย)"
                      variant="outlined"
                      size="small"
                      sx={{ width: "50%" }}
                    />
                    <TextField
                      id="outlined-basic"
                      label="ราคาขายเดิม"
                      variant="outlined"
                      size="small"
                      sx={{ width: "50%" }}
                    />
                  </div>
                  <TextField
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
    </section>
  );
}

export default ProductsImportPage;
