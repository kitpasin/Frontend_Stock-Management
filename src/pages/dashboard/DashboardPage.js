/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

import "./DashboardPage.scss";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import Summaries from "./components/Summaries";
import Tables from "./components/Tables";
import { rows } from "./data/TableData";
import axios from "axios";

const DashboardPage = () => {
  const { t } = useTranslation(["dashboard-page"]);
  const [mostExportedProduct, setMostExportedProduct] = useState([])
  const [mostProductInStock, setMostProductInStock] = useState([])
  const [mostProductExpire, setMostProductExpire] = useState([])
  const [mostProductOutOfStock, setMostProductOutOfStock] = useState([])
  const [productsOutOfStock, setProductsOutOfStock] = useState([])
  const [productsAboutToExpire, setProductsAboutToExpire] = useState([])
  const [productsImport, setProductsImport] = useState([])

  async function getProducts() {
    const response = await axios.get("product/dashboard");

    // สินค้าเบิกออกมากที่สุด/เดือน
    const mostExport = response.data.mostExportedProduct;
    setMostExportedProduct(mostExport);

    // สินค้าคงเหลือในสต็อกมากสุด/เดือน
    const mostInStock = response.data.mostInStockProduct;
    setMostProductInStock(mostInStock);

    // สินค้าใกล้หมดอายุมากสุด
    const mostExpire = response.data.mostProductExpire;
    setMostProductExpire(mostExpire);

    // สินค้าใกล้หมดสต๊อกมากสุด
    const mostOutOfStock = response.data.mostProductOutOfStock;
    setMostProductOutOfStock(mostOutOfStock);

    // สินค้าใกล้หมดสต๊อกที่มีการอัพเดทในเดือนปัจจุบัน
    const pStock = response.data.pStock;
    const filtered_pStock = pStock.filter(
      (product) =>
        product.import_value - product.export_value - product.export_defective_value <= 50
    );
    setProductsOutOfStock(filtered_pStock);

    // สินค้าใกล้หมดอายุที่มีการอัพเดทในเดือนปัจุบัน
    const pExpire = response.data.pExpire;
    const filtered_pExpire = pExpire.filter((product) => {
      const expDate = new Date(product.exp_date);
      const mfdDate = new Date(product.mfd_date);
      const timeDiff = expDate.getTime() - mfdDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff <= 30;
    });
    setProductsAboutToExpire(filtered_pExpire);

    // สินค้าที่นำเข้าในวันนี้
    const pImport = response.data.pImport;
    setProductsImport(pImport);
  }

  useEffect(() => {
    getProducts()
  }, []);

  return (
    <section id="dashboard-page">
      <HeadPageComponent
        h1={t("dashboardPage")}
        icon={<FontAwesomeIcon icon={faGamepad} />}
        breadcrums={[{ title: t("dashboardPage"), link: false }]}
      />
      <Summaries
        mostExportedProduct={mostExportedProduct}
        mostProductInStock={mostProductInStock}
        mostProductExpire={mostProductExpire}
        mostProductOutOfStock={mostProductOutOfStock}
      />
      <Tables
        rows={rows}
        productsOutOfStock={productsOutOfStock}
        productsAboutToExpire={productsAboutToExpire}
        productsImport={productsImport}
      />
    </section>
  );
};

export default DashboardPage;
