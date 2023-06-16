import React from "react";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    </section>
  );
}

export default Suppliers;
