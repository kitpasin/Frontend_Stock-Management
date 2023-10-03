import React from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TextField } from "@mui/material";
import { Card } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import PulseLoader from "react-spinners/PulseLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

import HeadPageComponent from "../../components/layout/headpage/headpage";
import Table from "./Table";
import "./SubproductPage.scss";
import { svProductAll } from "../../services/product.service";
import { getCategory } from "../../services/category.service";
import SubproductImport from "./SubproductImport";
import axios from "axios";

export default function SubproductPage() {
  const { t } = useTranslation(["subproduct-page"]);
  const [refreshData, setRefreshData] = useState(0);
  const [productAll, setProductAll] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [cateAll, setCateAll] = useState([]);
  const [productShow, setProductShow] = useState({});
  const [barcodeOptions, setBarcodeOptions] = useState([]);
  const [productOptions, setProductOptions] = useState([]);
  const [exportIdOptions, setExportIdOptions] = useState([]);
  const [exportIdInit, setExportIdInit] = useState([]);
  const [titleInit, setTitleInit] = useState([]);
  const [barcodeInit, setBarcodeInit] = useState([]);
  const [cateOptions, setCateOptions] = useState([]);
  const [formFilter, setFormFilter] = useState({
    barcode_number: "",
    export_id: "",
    cate: "",
    title: "",
  });

  async function initData() {
    const response = await axios.get("get/product/export");
    const data = response.data.data;
    const filter = data.filter((data) => data.is_subproduct !== 1);
    const result = filter.map((d) => {
      return {
        ...d,
        export_id: d.export_id.toString(),
        amount_id: d.counting_unit_id,
        amount_name: d.counting_unit_name,
        cate_id: d.main_cate_id,
        net_id: d.unit_id,
        net_name: d.unit_name,
        volumnPerUnit: d.netweight + " " + d.unit_name,
        export_values: d.export_value + " " + d.counting_unit_name,
      };
    });

    const barcodes = result?.map((item) => {
      if (item.barcode_number) {
        return item.barcode_number;
      } else {
        return item.product_barcode;
      }
    });
    const barcodeOptions = barcodes
      .map((barcode) => barcode)
      .filter((value, index, self) => self.indexOf(value) === index);
    const titleOptions = result
      .map((product) => product.title)
      .filter((value, index, self) => self.indexOf(value) === index);
    const exportOptions = result
      .map((id) => id.export_id)
      .filter((value, index, self) => self.indexOf(value) === index);

    setProductAll(result);
    setFilteredData(result);
    setBarcodeOptions(barcodeOptions);
    setBarcodeInit(barcodeOptions);
    setProductOptions(titleOptions);
    setTitleInit(titleOptions);
    setExportIdOptions(exportOptions);
    setExportIdInit(exportOptions);
    setLoading(false);

    getCategory().then((res) => {
      const result = res.data;
      const cate = result
        .map((cate) => cate.name)
        .filter((value, index, self) => self.indexOf(value) === index);
      setCateOptions(cate);
      setCateAll(cate);
    });
  }

  function filteredProduct() {
    const products = productAll?.filter((product) => {
      const matchesBarcode = formFilter.barcode_number
        ? product.barcode_number === formFilter.barcode_number ||
          product.product_barcode === formFilter.barcode_number
        : true;
      const matchesCate = formFilter.cate
        ? product.main_cate_name === formFilter.cate
        : true;
      const matchesTitle = formFilter.title
        ? product.title === formFilter.title
        : true;

      const matchesExportId = formFilter.export_id
        ? product.export_id === formFilter.export_id
        : true;
      return matchesBarcode && matchesCate && matchesTitle && matchesExportId;
    });
    setFilteredData(products);

    /* Filter Options */
    if (formFilter.barcode_number || formFilter.title || formFilter.export_id) {
      let title = [],
        cate_name = [],
        expId = [],
        barcode = [];

      const options = products?.map((product) => {
        title.push(product.title);
        cate_name.push(product.main_cate_name);
        expId.push(product.export_id);
        barcode.push(product.barcode_number || product.product_barcode);
      });

      const exIdOptions = expId?.map((exp) => exp).filter((value, index, self) => self.indexOf(value) === index);
      const barOptions = barcode?.map(barcode => barcode).filter((value, index, self) => self.indexOf(value) === index);
      const cateOptions = cate_name?.map(cate => cate).filter((value, index, self) => self.indexOf(value) === index);
      const titleOptions = title?.map(title => title).filter((value, index, self) => self.indexOf(value) === index);
      
      setProductOptions(titleOptions);
      setCateOptions(cateOptions);
      setExportIdOptions(exIdOptions);
      setBarcodeOptions(barOptions);

    } else {
      setBarcodeOptions(barcodeInit);
      setCateOptions(cateAll);
      setProductOptions(titleInit);
      setExportIdOptions(exportIdInit);
    }

    if ( formFilter.cate && (!formFilter.barcode_number || !formFilter.title || !formFilter.export_id)) {
      const barcode = products
        ?.map((item) => item.barcode_number || item.product_barcode)
        .filter((value, index, self) => self.indexOf(value) === index);

      const title = products
        ?.map((item) => item.title)
        .filter((value, index, self) => self.indexOf(value) === index);

      const exIdOptions = products?.map((product) => product.export_id);

      setBarcodeOptions(barcode);
      setProductOptions(title);
      setExportIdOptions(exIdOptions);
    }
  }

  useEffect(() => {
    initData();
  }, [refreshData]);

  useEffect(() => {
    filteredProduct();
  }, [refreshData, formFilter]);

  return (
    <section id="subproduct-page">
      {loading ? (
        <PulseLoader color="#3b326b" />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0",
            }}
          >
            <figure style={{ width: "30px", marginBottom: "1rem" }}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </figure>
            <div style={{ width: "100%" }}>
              <HeadPageComponent
                h1={t("ค้นหาสินค้าที่จะเพิ่ม")}
                breadcrums={[{ title: t("Products"), link: false }]}
              />
            </div>
          </div>
          <Card className="flex-container-column" sx={{ borderRadius: "10px" }}>
            <div className="header">
              <div className="wrapper">
                <figure className="title">
                  <img src="/images/icons/productsTable-icon.png" alt="" />
                  <p>สินค้าทั้งหมด</p>
                </figure>
                <div className="description">
                  <p>{filteredData.length} รายการ</p>
                </div>
              </div>
              <div style={{ width: "70%", display: "flex", gap: "1rem" }}>
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-export"
                  options={exportIdOptions}
                  onChange={(event, value) =>
                    setFormFilter((prev) => {
                      return { ...prev, export_id: value ? value : "" };
                    })
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="ค้นหาด้วยรหัสเบิกสินค้า" />
                  )}
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  className="cate-complete"
                  id="combo-box-cate"
                  options={cateOptions}
                  onChange={(event, value) =>
                    setFormFilter((prev) => {
                      return { ...prev, cate: value ? value : "" };
                    })
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="หมวดหมู่หลัก" />
                  )}
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-title"
                  options={productOptions}
                  onChange={(event, value) =>
                    setFormFilter((prev) => {
                      return { ...prev, title: value ? value : "" };
                    })
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="ชื่อสินค้า" />
                  )}
                />
                <Autocomplete
                  size="small"
                  disablePortal
                  id="combo-box-barcode"
                  options={barcodeOptions}
                  onChange={(event, value) =>
                    setFormFilter((prev) => {
                      return { ...prev, barcode_number: value ? value : "" };
                    })
                  }
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="ค้นหาด้วยเลขบาร์โค้ด" />
                  )}
                />
              </div>
            </div>
            <div>
              <Table
                productsData={filteredData}
                refreshData={refreshData}
                setRefreshData={setRefreshData}
                openModal={openModal}
                setOpenModal={setOpenModal}
                setProductShow={setProductShow}
              />
            </div>
          </Card>
          {openModal && (
            <SubproductImport
              setRefreshData={setRefreshData}
              productShow={productShow}
              open={openModal}
              setOpen={setOpenModal}
              isEdit={false}
            />
          )}
        </>
      )}
    </section>
  );
}
