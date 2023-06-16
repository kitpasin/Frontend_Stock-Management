import React from 'react'
import { faLayerGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./productCategory.scss"

/* import Components */
import HeadPageComponent from '../../components/layout/headpage/headpage';

function ProductCategory() {
  return (
    <section id="productcate-page">
      <HeadPageComponent
        h1={"Product Category"}
        icon={<FontAwesomeIcon icon={faLayerGroup} />}
        breadcrums={[{ title: "Product Category", link: false }]}
      />
    </section>
  )
}

export default ProductCategory