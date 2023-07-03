import React, { useState } from "react";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./vat.scss";

/* import Components */
import HeadPageComponent from "../../components/layout/headpage/headpage";
import VatTable from "./VatTable";
import axios from "axios";
import { useEffect } from "react";
import Swal from "sweetalert2";

function Vat() {
  const [vatsData, setVatsData] = useState([])

  async function getVats() {
    const response = await axios.get("vats")
    const data = response.data.vats
    setVatsData(data)
  }

  function handleCreateVat() {
    Swal.fire({
      title: "Create Vat",
      html: `
      <input type="text" id="name" class="swal2-input" placeholder="Name">
      <input type="text" id="percent" class="swal2-input" placeholder="Percent">
    `,
      confirmButtonText: "Submit",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;
        const percent = Swal.getPopup().querySelector("#percent").value;

        if (!name || !percent) {
          Swal.showValidationMessage(`Please enter all required data.`);
        }

        return { name, percent };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          name: result.value.name,
          percent: result.value.percent,
        }

        axios
          .post("vat", data)
          .then(function (response) {
            Swal.fire("Created!", "Your vat has been created.", "success").then(() => {
              getVats();
            });
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });
  }

  useEffect(() => {
    getVats();
  }, [])

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
              <p style={{ color: "#ff0000" }}>{vatsData.length} รายการ</p>
            </div>
            <div className="action">
              <button onClick={handleCreateVat}>สร้าง Vat ใหม่</button>
            </div>
          </div>
          <div className="table">
            <VatTable vatsData={vatsData} getVats={getVats} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vat;
