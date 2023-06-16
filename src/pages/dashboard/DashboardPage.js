/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

import "./DashboardPage.scss";
import HeadPageComponent from "../../components/layout/headpage/headpage";
import Summaries from "./components/Summaries";
import Tables from "./components/Tables";

const DashboardPage = () => {
  const { t } = useTranslation(["dashboard-page"]);
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <section id="dashboard-page">
      <HeadPageComponent
        h1={t("dashboardPage")}
        icon={<FontAwesomeIcon icon={faGamepad} />}
        breadcrums={[{ title: t("dashboardPage"), link: false }]}
      />
      <Summaries />
      <Tables />
    </section>
  );
};

export default DashboardPage;
