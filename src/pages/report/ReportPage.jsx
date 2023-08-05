/* eslint-disable */

import { Autocomplete, Button, Card, FormControlLabel, Radio, TextField } from "@mui/material";
import HeadPageComponent from "../../components/layout/headpage/headpage"
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import Table from "./components/Table";
import PulseLoader from "react-spinners/PulseLoader";
import ExcelJS from "exceljs";
import saveAs from "file-saver";

function ReportPage() {
  const { t } = useTranslation(["dashboard-page"]);
  const [loading, setLoading] = useState(true)

  const [selectedReport, setSelectedReport] = useState("สินค้าทั้งหมด")
  const [selectedChoices, setSelectedChoices] = useState(null)

  const [selectedDate, setSelectedDate] = useState(null);
  const formattedDate = new Date(selectedDate)
  const year = formattedDate.getFullYear();
  const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
  const day = String(formattedDate.getDate()).padStart(2, '0');
  const selectedFormattedDate = `${year}-${month}-${day}`;

  const [selectedMonth, setSelectedMonth] = useState(null);
  const formattedMonth = new Date(selectedMonth)
  const year2 = formattedMonth.getFullYear();
  const month2 = String(formattedMonth.getMonth() + 1).padStart(2, '0');
  const selectedFormattedMonth = `${year2}-${month2}`;

  const [selectedYear, setSelectedYear] = useState(null);
  const formattedYear = new Date(selectedYear)
  const year3 = formattedYear.getFullYear();
  const selectedFormattedYear = `${year3}`;

  const [selectedStart, setSelectedStart] = useState(null);
  const formattedStart = new Date(selectedStart)
  const year4 = formattedStart.getFullYear();
  const month4 = String(formattedStart.getMonth() + 1).padStart(2, '0');
  const day4 = String(formattedStart.getDate()).padStart(2, '0');
  const selectedFormattedStart = `${year4}-${month4}-${day4}`;

  const [selectedEnd, setSelectedEnd] = useState(null)
  const formattedEnd = new Date(selectedEnd)
  const year5 = formattedEnd.getFullYear();
  const month5 = String(formattedEnd.getMonth() + 1).padStart(2, '0');
  const day5 = String(formattedEnd.getDate()).padStart(2, '0');
  const selectedFormattedEnd = `${year5}-${month5}-${day5}`;

  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState([]);

  const [selectedMainCate, setSelectedMainCate] = useState(null)

  const [selectedSupplier, setSelectedSupplier] = useState(null)

  const [sumProductLeft, setSumProductLeft] = useState(0)
  const [sumProductCost, setSumProductCost] = useState(0)
  const [sumProductProfit, setSumProductProfit] = useState(0)

  const filteredProduct = products.filter((product) => {
    const matchesCate = selectedMainCate ? product.main_cate_name === selectedMainCate : true;
    const matchesSupplier = selectedSupplier ? product.supplier_name === selectedSupplier : true;
    if (selectedDate !== null) {
      const matchesDate = selectedFormattedDate ? product.purchase_date === selectedFormattedDate : true;
      return matchesCate && matchesSupplier && matchesDate;
    }
    if (selectedMonth !== null) {
      const matchedMonth = selectedFormattedMonth ? product.purchase_date.split("-")[0] + product.purchase_date.split("-")[1] === selectedFormattedMonth.split("-")[0] + selectedFormattedMonth.split("-")[1] : true;
      return matchesCate && matchesSupplier && matchedMonth;
    }
    if (selectedYear !== null) {
      const matchedYear = selectedFormattedYear ? product.purchase_date.split("-")[0] === selectedFormattedYear : true;
      return matchesCate && matchesSupplier && matchedYear;
    }
    if (selectedStart !== null && selectedEnd !== null) {
      const matchesBetween = selectedFormattedStart.replace(/-/g, "") <= product.purchase_date.replace(/-/g, "")
        && selectedFormattedEnd.replace(/-/g, "") >= product.purchase_date.replace(/-/g, "")
      return matchesCate && matchesSupplier && matchesBetween
    }
    return matchesCate && matchesSupplier
  });

  // Remove duplicate products based on product_id
  const uniqueProductsMap = new Map();
  filteredProduct.forEach((item) => {
    uniqueProductsMap.set(item.product_id, item);
  });
  const uniqueProductsData = Array.from(uniqueProductsMap.values());

  const reports = [
    {
      label: "สินค้าทั้งหมด"
    },
    {
      label: "สินค้าใกล้หมดอายุ"
    },
    {
      label: "สินค้าใกล้หมดสต็อก"
    },
    {
      label: "สินค้าเบิกออก"
    },
    {
      label: "สินค้าชำรุด"
    },
  ]

  function handleRadioClick(choice) {
    setSelectedChoices(choice)
    if (choice !== "date") setSelectedDate(null);
    if (choice !== "month") setSelectedMonth(null);
    if (choice !== "year") setSelectedYear(null);
    if (choice !== "between") setSelectedStart(null);
  }

  async function getProducts() {
    if (selectedReport === "สินค้าทั้งหมด") {
      const response = await axios.get("productAll");
      const data = response.data.data;
      setProducts(data);
    } else if (selectedReport === "สินค้าใกล้หมดอายุ") {
      const response = await axios.get("product/expiration");
      const data = response.data.data;
      setProducts(data);
    } else if (selectedReport === "สินค้าใกล้หมดสต็อก") {
      const response = await axios.get("product/stock");
      const data = response.data.data;
      setProducts(data);
    } else if (selectedReport === "สินค้าเบิกออก") {
      const response = await axios.get("product/export");
      const data = response.data.data;
      setProducts(data)
    } else if (selectedReport === "สินค้าชำรุด") {
      const response = await axios.get("product/defective");
      const data = response.data.data;
      setProducts(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    getProducts()
  }, [selectedReport])

  useEffect(() => {
    setSumProductLeft(uniqueProductsData.reduce((sum, product) => sum + (product.import_value - product.export_value - product.export_defective_value), 0).toFixed(2))
    setSumProductCost(uniqueProductsData.reduce((sum, product) => sum + (product.unit_price), 0).toFixed(2))
    setSumProductProfit(uniqueProductsData.reduce((sum, product) => sum + (product.selling_price - product.unit_price), 0).toFixed(2))
  }, [filteredProduct])

  const mainCategoryOptions = products
  .map((product) => product.main_cate_name)
  .filter((value, index, self) => self.indexOf(value) === index);

  const supplierOptions = products
    .map((supplier) => supplier.supplier_name)
    .filter((value, index, self) => self.indexOf(value) === index);

  // Export to Excel
  const handleExport = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add headers to the worksheet Summary
    const headerRow2 = worksheet.addRow(["คงเหลือต่อหน่วยทั้งหมด", "ต้นทุนต่อหน่วยทั้งหมด", "กำไรทั้งหมด"]);
    headerRow2.font = { bold: true };

    // Add data to the worksheet Summary
    worksheet.addRow([
      sumProductLeft + " หน่วย",
      sumProductCost + " บาท",
      sumProductProfit + " บาท",
    ]);

    // Add headers to the worksheet
    const headerRow = worksheet.addRow([
      "รหัสสินค้า",
      "ชื่อสินค้า",
      "คงเหลือต่อหน่วย",
      "วันที่ซื้อ",
      "ค่าดำเนินการต่อหน่วย",
      "ต้นทุนต่อหน่วย",
      "กำไร",
      "ราคาขาย",
      "ราคาขายจริง"
    ]);
    headerRow.font = { bold: true };

    // Add data to the worksheet
    uniqueProductsData.forEach((product) => {
      worksheet.addRow([
        "" + product.product_id,
        product.title,
        product.import_value - product.export_value - product.export_defective_value,
        product.purchase_date,
        product.oc_unit,
        product.unit_price,
        product.set_profit,
        product.pp_vat,
        product.selling_price,
      ]);
    })

    // Auto-fit columns
    worksheet.columns.forEach((column) => {
      column.width = Math.max(12, column.width);
    });

    // Generate the Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      const now = new Date();
      const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      const formattedDatetime = now.toLocaleString('en-US', options).replace(/[\/:]/g, '-'); // Format and replace slashes/colons with dashes
      const filename = `Reports_${formattedDatetime}.xlsx`; // Construct the filename
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, filename);
    });
  };

  return (
    <>
      {loading ? (
        <PulseLoader color="#3b326b" />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <figure style={{ width: "30px", marginBottom: "1rem" }}>
              <img src="/images/icons/defectivePage-icon.png" alt="" />
            </figure>
            <div style={{ width: "100%" }}>
              <HeadPageComponent
                h1={t("รายงาน")}
                breadcrums={[{ title: t("รายงาน"), link: false }]}
              />
            </div>
          </div>
          <Card className="flex-container-column" sx={{ borderRadius: "10px" }}>
            <div className="header">
              <div className="wrapper" style={{ flexDirection: "column", width: "100%", alignItems: "flex-start" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: "1rem" }}>
                  <figure className="title" style={{ width: "100px", flex: "none" }}>
                    <img src="/images/icons/defectiveTable-icon.png" alt="" />
                    <p>รายงาน</p>
                  </figure>
                  <Button onClick={handleExport} disabled={selectedReport === null} sx={{ width: 200, height: 40 }} variant="contained" color="success">
                    Export to Excel
                  </Button>
                </div>
                <Autocomplete
                  value={selectedReport}
                  onChange={(e, newValue) => setSelectedReport(newValue)}
                  disablePortal
                  size="small"
                  id="combo-box-demo"
                  options={reports.map((rep) => rep.label)}
                  fullWidth
                  renderInput={(params) => <TextField {...params} label="เลือกประเภทรายงาน" />}
                />
                {selectedReport ? (

                  <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center", gap: "1rem", width: "100%" }}>
                    <div style={{ display: "flex", width: "100%", gap: "1rem" }}>
                      <Autocomplete
                        value={selectedMainCate}
                        onChange={(e, newValue) => setSelectedMainCate(newValue || "")}
                        disablePortal
                        size="small"
                        id="combo-box-demo"
                        options={mainCategoryOptions}
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="เลือกหมวดหมู่" />}
                      />
                      <Autocomplete
                        value={selectedSupplier}
                        onChange={(e, newValue) => setSelectedSupplier(newValue || "")}
                        disablePortal
                        size="small"
                        id="combo-box-demo"
                        options={supplierOptions}
                        fullWidth
                        renderInput={(params) => <TextField {...params} label="เลือกซัพพลายเออร์" />}
                      />
                    </div>
                    <div style={{ display: "flex", width: "100%", gap: "1rem" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div style={{ display: "flex", width: "100%" }}>
                          <FormControlLabel
                            value="date"
                            control={<Radio checked={selectedChoices === "date"} />}
                            label="วัน"
                            onClick={() => handleRadioClick("date")}
                          />
                          <DatePicker
                            label="วัน"
                            inputFormat="YYYY-MM-DD"
                            disabled={selectedChoices !== "date"}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                style={{ width: "100%", marginLeft: "1.3rem" }}
                                inputProps={{
                                  ...params.inputProps,
                                  readOnly: true,
                                }}
                                required
                              />
                            )}
                            value={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                          />
                        </div>

                        <div style={{ display: "flex", width: "100%" }}>
                          <FormControlLabel
                            value="month"
                            control={<Radio checked={selectedChoices === "month"} />}
                            label="เดือน"
                            onClick={() => handleRadioClick("month")}
                          />
                          <DatePicker
                            label="เดือน"
                            views={['month']}
                            inputFormat="YYYY-MM"
                            disabled={selectedChoices !== "month"}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                style={{ width: "100%" }}
                                inputProps={{
                                  ...params.inputProps,
                                  readOnly: true,
                                }}
                                required
                              />
                            )}
                            value={selectedMonth}
                            onChange={(month) => setSelectedMonth(month)}
                          />
                        </div>

                        <div style={{ display: "flex", width: "100%" }}>
                          <FormControlLabel
                            value="year"
                            control={<Radio checked={selectedChoices === "year"} />}
                            label="ปี"
                            onClick={() => handleRadioClick("year")}
                          />
                          <DatePicker
                            label="ปี"
                            views={['year']}
                            inputFormat="YYYY"
                            disabled={selectedChoices !== "year"}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                style={{ width: "100%" }}
                                inputProps={{
                                  ...params.inputProps,
                                  readOnly: true,
                                }}
                                required
                              />
                            )}
                            value={selectedYear}
                            onChange={(year) => setSelectedYear(year)}
                          />
                        </div>
                      </LocalizationProvider>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", width: "100%" }}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <div style={{ display: "flex", width: "100%" }}>
                          <FormControlLabel
                            value="between"
                            control={<Radio checked={selectedChoices === "between"} />}
                            label="ตั้งแต่"
                            onClick={() => handleRadioClick("between")}
                          />
                          <DatePicker
                            label="วัน"
                            inputFormat="YYYY-MM-DD"
                            disabled={selectedChoices !== "between"}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                style={{ width: "100%" }}
                                inputProps={{
                                  ...params.inputProps,
                                  readOnly: true,
                                }}
                                required
                              />
                            )}
                            value={selectedStart}
                            onChange={(start) => setSelectedStart(start)}
                          />
                        </div>
                        <p style={{ fontWeight: 400, fontSize: "1rem" }}>จนถึง</p>
                        <div style={{ display: "flex", width: "100%" }}>
                          <DatePicker
                            label="วัน"
                            inputFormat="YYYY-MM-DD"
                            disabled={selectedChoices !== "between"}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                size="small"
                                style={{ width: "100%" }}
                                inputProps={{
                                  ...params.inputProps,
                                  readOnly: true,
                                }}
                                required
                              />
                            )}
                            value={selectedEnd}
                            onChange={(end) => setSelectedEnd(end)}
                          />
                        </div>
                      </LocalizationProvider>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
              <Card style={{ background: "#3b326b", display: "flex", justifyContent: "space-between", padding: "1rem", borderRadius: "10px", width: "33.33%", fontSize: "1rem", color: "#3b326b" }}>
                <b style={{ color: "#fff" }}>คงเหลือต่อหน่วยทั้งหมด : </b>
                <b style={{ color: "#fff" }}>{sumProductLeft} หน่วย</b>
              </Card>
              <Card style={{ background: "#3b326b", display: "flex", justifyContent: "space-between", padding: "1rem", borderRadius: "10px", width: "33.33%", fontSize: "1rem", color: "#3b326b" }}>
                <b style={{ color: "#fff" }}>ต้นทุนต่อหน่วยทั้งหมด : </b>
                <b style={{ color: "#fff" }}>{sumProductCost} บาท</b>
              </Card>
              <Card style={{ background: "#3b326b", display: "flex", justifyContent: "space-between", padding: "1rem", borderRadius: "10px", width: "33.33%", fontSize: "1rem", color: "#3b326b" }}>
                <b style={{ color: "#fff" }}>กำไรทั้งหมด : </b>
                <b style={{ color: "#fff" }}>{sumProductProfit} บาท</b>
              </Card>
            </div>
            <Table
              filteredProduct={uniqueProductsData}
              selectedReport={selectedReport}
              setSelectedProduct={setSelectedProduct}
            />
          </Card>
        </>
      )}
    </>
  )
}

export default ReportPage