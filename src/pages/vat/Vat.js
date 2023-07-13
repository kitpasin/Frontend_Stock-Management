import React, { useState } from "react";

import "./vat.scss";

/* import Components */
import HeadPageComponent from "../../components/layout/headpage/headpage";
import VatTable from "./VatTable";
import axios from "axios";
import { useEffect } from "react";
import CreateVat from "./create/CreateVat";
import PulseLoader from "react-spinners/PulseLoader";

function Vat() {
  const [loading, setLoading] = useState(true);

  const [createVatOpen, setCreateVatOpen] = useState(false)
  const [vatsData, setVatsData] = useState([])

  async function getVats() {
    const response = await axios.get("vats")
    const data = response.data.vats
    setVatsData(data)
    setLoading(false)
  }

  useEffect(() => {
    getVats();
  }, [])

  return (
    <section id="vat-page">
       {loading ? (
        <PulseLoader color="#3b326b" />
      ) : (
        <>
      <HeadPageComponent
        h1={"Vat"}
        icon={<img src="/images/icons/foundation_graph-pie(1).png" alt="" />}
        breadcrums={[{ title: "Vat", link: false }]}
      />
      <div className="main-content">
        <div className="head"></div>
        <div className="content">
          <div className="content-head">
            <div className="title">
              <img src="images/icons/foundation_graph-pie (2).png" alt="" />
              <p>Vat ทั้งหมด</p>
              <p style={{ color: "#ff0000" }}>{vatsData.length} รายการ</p>
            </div>
            <div className="action">
              <button onClick={() => setCreateVatOpen(true)}>สร้าง Vat ใหม่</button>
            </div>
          </div>
          <div className="table">
            <VatTable vatsData={vatsData} getVats={getVats} />
          </div>
        </div>
      </div>
      <CreateVat createVatOpen={createVatOpen} setCreateVatOpen={setCreateVatOpen} getVats={getVats} />
      </>
      )}
    </section>
  );
}

export default Vat;
