import React, { useState } from "react";

import "./amount.scss";

/* import Components */
import HeadPageComponent from "../../components/layout/headpage/headpage";
import TableNet from "./tables/TableNet";
import TableAmount from "./tables/TableAmount";
import ModalNet from "./modals/ModalNet";
import ModalAmount from "./modals/ModalAmount";

function Amount() {

  const [openModal, setOpenModal] = useState(false);
  const [openModalAmount, setOpenModalAmount] = useState(false);

  return (
    <section id="amount-page">
      <HeadPageComponent
        h1={"หน่วยปริมาณ/หน่วยจำนวน"}
        icon={<img src="images/icons/majesticons_atom-111.png" alt="" />}
        breadcrums={[{ title: "หน่วยปริมาณ/หน่วยจำนวน", link: false }]}
      />
      <div className="main-content">
        <div className="content-left">
          <div className="head"></div>
          <div className="content">
            <div className="content-head">
              <div className="title">
                <img src="images/icons/majesticons_atom222.png" alt="" />
                <p>หน่วยปริมาณสุทธิ ทั้งหมด</p>
                <p style={{ color: "#ff0000" }}>8 รายการ</p>
              </div>
              <div className="action">
                <button className="create" onClick={() => setOpenModal(true)}>
                  สร้างหน่วยปริมาณใหม่
                </button>
                <button className="delete">
                  <img src="images/icons/tabler_trash-x-filled.png" alt="" />
                </button>
              </div>
            </div>
            <div className="table">
              <TableNet />
            </div>
          </div>
        </div>
        <div className="content-right">
          <div className="head"></div>
          <div className="content">
            <div className="content-head">
              <div className="title">
                <img src="images/icons/fluent_tray-item-add-24-filled.png" alt="" />
                <p>หน่วยจำนวน ทั้งหมด</p>
                <p style={{ color: "#ff0000" }}>8 รายการ</p>
              </div>
              <div className="action">
                <button className="create" onClick={() => setOpenModalAmount(true)}>
                  สร้างหน่วยจำนวนใหม่
                </button>
                <button className="delete">
                  <img src="images/icons/tabler_trash-x-filled.png" alt="" />
                </button>
              </div>
            </div>
            <div className="table">
              <TableAmount />
            </div>
            <ModalNet openModal={openModal} setOpenModal={setOpenModal} />
            <ModalAmount
              openModalAmount={openModalAmount}
              setOpenModalAmount={setOpenModalAmount}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Amount;
