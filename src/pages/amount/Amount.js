import React, { useState } from "react";

import "./amount.scss";

/* import Components */
import HeadPageComponent from "../../components/layout/headpage/headpage";
import TableNet from "./tables/TableNet";
import TableAmount from "./tables/TableAmount";
import Swal from "sweetalert2";
import axios from "axios";
import { useEffect } from "react";

function Amount() {
  const [netsData, setNetsData] = useState([])
  const [amountsData, setAmountsData] = useState([]);

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

  function handleCreateNet() {
    Swal.fire({
      title: "Create Net",
      html: `
      <input type="text" id="name" class="swal2-input" placeholder="Name">
    `,
      confirmButtonText: "Submit",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;

        if (!name) {
          Swal.showValidationMessage(`Please enter all required data.`);
        }

        return { name };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          name: result.value.name,
        };

        axios
          .post("net", data)
          .then(function (response) {
            Swal.fire("Created!", "Your amount has been created.", "success").then(() => {
              getNets();
            });
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });
  }

  function handleCreateAmount() {
    Swal.fire({
      title: "Create Amount",
      html: `
      <input type="text" id="name" class="swal2-input" placeholder="Name">
    `,
      confirmButtonText: "Submit",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector("#name").value;

        if (!name) {
          Swal.showValidationMessage(`Please enter all required data.`);
        }

        return { name };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          name: result.value.name,
        };

        axios
          .post("amount", data)
          .then(function (response) {
            Swal.fire("Created!", "Your amount has been created.", "success").then(() => {
              getAmounts();
            });
          })
          .catch(function (error) {
            console.error(error);
          });
      }
    });
  }

  useEffect(() => {
    getAmounts();
    getNets();
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
                <img src="images/icons/majesticons_atom222.png" alt="" />
                <p>หน่วยปริมาณสุทธิ ทั้งหมด</p>
                <p style={{ color: "#ff0000" }}>{netsData.length} รายการ</p>
              </div>
              <div className="action">
                <button className="create" onClick={handleCreateNet}>
                  สร้างหน่วยปริมาณใหม่
                </button>
                {/* <button className="delete">
                  <img src="images/icons/tabler_trash-x-filled.png" alt="" />
                </button> */}
              </div>
            </div>
            <div className="table">
              <TableNet netsData={netsData} getNets={getNets} />
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
                <button className="create" onClick={handleCreateAmount}>
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
    </section>
  );
}

export default Amount;
