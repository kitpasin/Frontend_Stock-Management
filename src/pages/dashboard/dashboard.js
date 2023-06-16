/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import "./dashboard.scss";
import Summaries from "./components/Summaries";
import Tables from "./components/Tables";

const DashboardPage = () => {
  const { t } = useTranslation(["dashboard-page"]);
  const dispatch = useDispatch();

  useEffect(() => {
    
  }, []);

  return (
    <section id="dashboard-page">
      <Summaries />
      <Tables />
    </section>
  );
};

export default DashboardPage;
