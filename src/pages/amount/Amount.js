import React, { useState } from "react";

import "./amount.scss";

/* import Components */
import HeadPageComponent from "../../components/layout/headpage/headpage";
import TableNet from "./tables/TableNet";
import TableAmount from "./tables/TableAmount";
import axios from "axios";
import { useEffect } from "react";
import CreateNet from "./create/CreateNet";
import CreateAmount from "./create/CreateAmount";

function Amount() {
  const [netsData, setNetsData] = useState([])
  const [createNetOpen, setCreateNetOpen] = useState(false)
  const [amountsData, setAmountsData] = useState([]);
  const [createAmountOpen, setCreateAmountOpen] = useState(false)
  const [mainCatesData, setMainCatesData] = useState([]);

  async function getNets() {
    const response = await axios.get("nets");
    const data = response.data.nets;
    setNetsData(data);
  }
  async function getAmounts() {
    const response = await axios.get("amounts");
    const data = response.data.amounts;
    setAmountsData(data);
  }
  async function getMainCates() {
    const response = await axios.get("maincates");
    const data = response.data.mainCates;
    setMainCatesData(data);
  }

  useEffect(() => {
    getAmounts();
    getNets();
    getMainCates();
  }, []);

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
                <img src="/images/icons/majesticons_atom222.png" alt="" />
                <p>หน่วยปริมาณสุทธิ ทั้งหมด</p>
                <p style={{ color: "#ff0000" }}>{netsData.length} รายการ</p>
              </div>
              <div className="action">
                <button className="create" onClick={() => setCreateNetOpen(true)}>
                  สร้างหน่วยปริมาณใหม่
                </button>
                {/* <button className="delete">
                  <img src="images/icons/tabler_trash-x-filled.png" alt="" />
                </button> */}
              </div>
            </div>
            <div className="table">
              <TableNet netsData={netsData} getNets={getNets} mainCatesData={mainCatesData} />
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
                <p style={{ color: "#ff0000" }}>{amountsData.length} รายการ</p>
              </div>
              <div className="action">
                <button className="create" onClick={() => setCreateAmountOpen(true)}>
                  สร้างหน่วยจำนวนใหม่
                </button>
                {/* <button className="delete">
                  <img src="images/icons/tabler_trash-x-filled.png" alt="" />
                </button> */}
              </div>
            </div>
            <div className="table">
              <TableAmount amountsData={amountsData} getAmounts={getAmounts} />
            </div>
          </div>
        </div>
      </div>
      <CreateNet
        createNetOpen={createNetOpen}
        setCreateNetOpen={setCreateNetOpen}
        mainCatesData={mainCatesData}
        getNets={getNets}
      />
      <CreateAmount
        createAmountOpen={createAmountOpen}
        setCreateAmountOpen={setCreateAmountOpen}
        getAmounts={getAmounts}
      />
    </section>
  );
}

export default Amount;
