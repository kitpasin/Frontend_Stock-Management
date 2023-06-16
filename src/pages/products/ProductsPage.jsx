/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";


import HeadPageComponent from "../../components/layout/headpage/headpage";

function ProductsPage() {
  const { t } = useTranslation(["dashboard-page"]);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <section id="products-page">
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
            h1={t("Products")}
            breadcrums={[{ title: t("Products"), link: false }]}
          />
        </div>
      </div>
    </section>
  );
}

export default ProductsPage;
