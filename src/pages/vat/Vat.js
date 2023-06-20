import React, { useState } from "react";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./vat.scss";

/* import Components */
import HeadPageComponent from "../../components/layout/headpage/headpage";
import VatTable from "./VatTable";
import VatModal from "./VatModal";

function Vat() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <section id="vat-page">
      <HeadPageComponent
        h1={"Vat"}
        icon={<img src="images/icons/foundation_graph-pie (1).png" alt="" />}
        breadcrums={[{ title: "Vat", link: false }]}
      />
      <div className="main-content">
        <div className="head"></div>
        <div className="content">
          <div className="content-head">
            <div className="title">
              <img src="images/icons/foundation_graph-pie (2).png" alt="" />
              <p>Vat ทั้งหมด</p>
            </div>
            <div className="action">
              <button onClick={() => setOpenModal(true)}>สร้าง Vat ใหม่</button>
              <p>8 รายการ</p>
            </div>
          </div>
          <div className="table">
            <VatTable />
          </div>
          <VatModal openModal={openModal} setOpenModal={setOpenModal} />
        </div>
      </div>
    </section>
  );
}

export default Vat;
