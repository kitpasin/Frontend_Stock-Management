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
import CreateMainCategory from "./createCategory/CreateMainCategory";
import CreateSubCategory from "./createCategory/CreateSubCategory";
import PulseLoader from "react-spinners/PulseLoader";
import { useSelector } from "react-redux";

function ProductCategory() {
  const [loading, setLoading] = useState(true);
  const uPermission = useSelector((state) => state.auth.userPermission);
  const [mainCatesData, setMainCatesData] = useState([]);
  const [subCatesData, setSubCatesData] = useState([]);
  const [createMainCateOpen, setCreateMainCateOpen] = useState(false);
  const [createSubCateOpen, setCreateSubCateOpen] = useState(false);

  const handleCreateMainCateOpen = () => setCreateMainCateOpen(true);
  const handleCreateSubCateOpen = () => setCreateSubCateOpen(true);

  async function getMainCates() {
    const response = await axios.get("maincates");
    const data = response.data.mainCates;
    setMainCatesData(data);
    setLoading(false);
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
      {loading ? (
        <PulseLoader color="#3b326b" />
      ) : (
        <>
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
                  <img src="/images/icons/uis_layer-group1.png" alt="" />
                  <p>หมวดหมู่สินค้าทั้งหมด</p>
                  <p style={{ color: "#ff0000" }}>
                    {mainCatesData.length} รายการ
                  </p>
                </div>
                <div className="action">
                  {uPermission.superAdmin ? (
                    <>
                      <button onClick={handleCreateMainCateOpen}>
                        สร้างหมวดหมู่หลัก
                      </button>
                      <button onClick={handleCreateSubCateOpen}>
                        สร้างหมวดหมู่ย่อย
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        disabled
                        style={{ opacity: "50%" }}
                        onClick={handleCreateMainCateOpen}
                      >
                        สร้างหมวดหมู่หลัก
                      </button>
                      <button
                        disabled
                        style={{ opacity: "50%" }}
                        onClick={handleCreateSubCateOpen}
                      >
                        สร้างหมวดหมู่ย่อย
                      </button>
                    </>
                  )}
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
            createMainCateOpen={createMainCateOpen}
            setCreateMainCateOpen={setCreateMainCateOpen}
            getMainCates={getMainCates}
          />
          <CreateSubCategory
            mainCatesData={mainCatesData}
            setMainCatesData={setMainCatesData}
            createSubCateOpen={createSubCateOpen}
            setCreateSubCateOpen={setCreateSubCateOpen}
            getSubCates={getSubCates}
          />
        </>
      )}
    </section>
  );
}

export default ProductCategory;
