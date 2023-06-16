import React from "react";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./amount.scss";

/* import Components */
import HeadPageComponent from "../../components/layout/headpage/headpage";

function Amount() {
  return (
    <section id="amount-page">
      <HeadPageComponent
        h1={"Net Weight/Amount"}
        icon={<FontAwesomeIcon icon={faRotate} />}
        breadcrums={[{ title: "Net Weight/Amount", link: false }]}
      />
    </section>
  );
}

export default Amount;
