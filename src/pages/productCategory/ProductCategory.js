import React from "react";
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./productCategory.scss";

/* import Components */
import HeadPageComponent from "../../components/layout/headpage/headpage";
import ProductCateTable from "./ProductCateTable";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";
import CreateMainCategory from "./createCategory/CreateMainCategory";
import CreateSubCategory from "./createCategory/CreateSubCategory";

function ProductCategory() {
  const [mainCatesData, setMainCatesData] = useState([]);
  const [subCatesData, setSubCatesData] = useState([]);
  const [mainCateOpen, setMainCateOpen] = useState(false);
  const [subCateOpen, setSubCateOpen] = useState(false);
  const handleMainCateOpen = () => setMainCateOpen(true);
  const handleSubCateOpen = () => setSubCateOpen(true);

  async function getMainCates() {
    const response = await axios.get("maincates");
    const data = response.data.mainCates;
    setMainCatesData(data);
  }

  async function getSubCates() {
    const response = await axios.get("subcates");
    const data = response.data.subCates;
    setSubCatesData(data);
  }

  useEffect(() => {
    getMainCates();
    getSubCates();
  }, []);

  return (
    <section id="productcate-page">
      <HeadPageComponent
        h1={"หมวดหมู่สินค้าหลัก/ย่อย"}
        icon={<FontAwesomeIcon icon={faLayerGroup} />}
        breadcrums={[{ title: "หมวดหมู่สินค้าหลัก/ย่อย", link: false }]}
      />
      <div className="main-content">
        <div className="head"></div>
        <div className="content">
          <div className="content-head">
            <div className="title">
              <img src="images/icons/uis_layer-group1.png" alt="" />
              <p>หมวดหมู่สินค้าทั้งหมด</p>
              <p style={{ color: "#ff0000" }}>{mainCatesData.length} รายการ</p>
            </div>
            <div className="action">
              <button onClick={handleMainCateOpen}>สร้างหมวดหมู่หลัก</button>
              <button onClick={handleSubCateOpen}>สร้างหมวดหมู่ย่อย</button>
            </div>
          </div>
          <div className="table">
            <ProductCateTable
              mainCatesData={mainCatesData}
              subCatesData={subCatesData}
              getMainCates={getMainCates}
              getSubCates={getSubCates}
            />
          </div>
        </div>
      </div>
      <CreateMainCategory
        mainCateOpen={mainCateOpen}
        setMainCateOpen={setMainCateOpen}
        getMainCates={getMainCates}
      />
      <CreateSubCategory
        mainCatesData={mainCatesData}
        setMainCatesData={setMainCatesData}
        subCateOpen={subCateOpen}
        setSubCateOpen={setSubCateOpen}
        getSubCates={getSubCates}
      />
    </section>
  );
}

export default ProductCategory;
