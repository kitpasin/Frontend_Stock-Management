import React from "react";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@mui/material/Button";

import "./suppliers.scss";

/* import Components */
import HeadPageComponent from "../../components/layout/headpage/headpage";

function Suppliers() {
  return (
    <section id="supplier-page">
      <HeadPageComponent
        h1={"Suppliers"}
        icon={<FontAwesomeIcon icon={faStore} />}
        breadcrums={[{ title: "Suppliers", link: false }]}
      />
      <div className="main-content">
        <div className="head"></div>
        <div className="content">
          <div className="content-head">
            <p>Suppliers</p>
            <div className="action">
              <button>Create Supplier</button>
              <p>List : 2,500</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Suppliers;
