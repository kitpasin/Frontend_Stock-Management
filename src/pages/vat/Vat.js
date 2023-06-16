import React from "react";
import { faChartPie } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./vat.scss";

/* import Components */
import HeadPageComponent from "../../components/layout/headpage/headpage";

function Vat() {
  return (
    <section id="vat-page">
      <HeadPageComponent
        h1={"Vat"}
        icon={<FontAwesomeIcon icon={faChartPie} />}
        breadcrums={[{ title: "Vat", link: false }]}
      />
    </section>
  );
}

export default Vat;
