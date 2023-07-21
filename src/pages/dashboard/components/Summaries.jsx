import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import OutOfStock from "./graphs/OutOfStock";
import AboutToExpire from "./graphs/AboutToExpire";
import { useSelector } from "react-redux";
import LatestImport from "./graphs/LatestImport";
import LatestExport from "./graphs/LatestExport";
import { formatDistanceToNow } from "date-fns";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1024,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function Summaries({
  mostExportedProduct,
  productsExport,
  mostProductInStock,
  mostProductImport,
  productsImport,
  mostProductExpire,
  productsAboutToExpire,
  mostProductOutOfStock,
  productsOutOfStock,
  latestExport,
}) {
  const [outOfStockOpen, setOutOfStockOpen] = React.useState(false);
  const [aboutToExpireOpen, setAboutToExpireOpen] = React.useState(false);
  const [latestImportOpen, setLatestImportOpen] = React.useState(false);
  const [latestExportOpen, setLatestExportOpen] = React.useState(false);

  const [outOfStockValue, setOutOfStockValue] = useState(
    productsOutOfStock?.map(
      (item) => item.import_value - item.export_value - item.export_defective_value
    )
  );
  const [aboutToExpireValue, setAboutToExpireValue] = useState(
    productsAboutToExpire?.map(
      (item) => item.import_value - item.export_value - item.export_defective_value
    )
  );
  const [importValue, setImportValue] = useState(productsImport?.map((item) => item.import_value));
  const [exportValue, setExportValue] = useState(productsExport?.map((item) => item.export_value));
  const webPath = useSelector((state) => state.app.webPath);

  const endDate = dayjs(mostProductExpire?.exp_date);
  const today = dayjs();
  const remainingDays = endDate.diff(today, "day");

  function toggleOutOfStockGraph() {
    setOutOfStockOpen(!outOfStockOpen);
  }
  function toggleAboutToExpireGraph() {
    setAboutToExpireOpen(!aboutToExpireOpen);
  }
  function toggleLatestImportGraph() {
    setLatestImportOpen(!latestImportOpen);
  }
  function toggleLatestExportGraph() {
    setLatestExportOpen(!latestExportOpen);
  }

  const calculateStockSum = () => {
    const sumOutOfStockValue = outOfStockValue?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return sumOutOfStockValue;
  };
  const calculateExpireSum = () => {
    const sumAboutToExpireValue = aboutToExpireValue?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return sumAboutToExpireValue;
  };
  const calculateImportSum = () => {
    const sumImportValue = importValue?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return sumImportValue;
  };
  const calculateExportSum = () => {
    const sumExportValue = exportValue?.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    return sumExportValue;
  };
  const sumOutOfStockValue = calculateStockSum();
  const sumAboutToExpireValue = calculateExpireSum();
  const sumImportValue = calculateImportSum();
  const sumExportValue = calculateExportSum();

  // Remove duplicate products based on product_id
  const uniqueProductsMap = new Map();
  productsOutOfStock.forEach((item) => {
    uniqueProductsMap.set(item.product_id, item);
  });
  const uniqueProductsData = Array.from(uniqueProductsMap.values());

  console.log(mostProductOutOfStock);

  return (
    <>
      <Modal
        open={outOfStockOpen}
        onClose={toggleOutOfStockGraph}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <OutOfStock uniqueProductsData={uniqueProductsData} />
        </Box>
      </Modal>
      <Modal
        open={aboutToExpireOpen}
        onClose={toggleAboutToExpireGraph}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AboutToExpire productsAboutToExpire={productsAboutToExpire} />
        </Box>
      </Modal>
      <Modal
        open={latestImportOpen}
        onClose={toggleLatestImportGraph}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LatestImport productsImport={productsImport} />
        </Box>
      </Modal>
      <Modal
        open={latestExportOpen}
        onClose={toggleLatestExportGraph}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <LatestExport productsExport={productsExport} />
        </Box>
      </Modal>
      <div className="grid-container-1fr-1fr-white">
        {/* summaries 1 */}
        <Card className="item">
          <div className="content" style={{ justifyContent: "flex-start" }}>
            <figure className="image">
              <img src="/images/icons/product-icon.png" alt="Product-icon" />
            </figure>
            <div className="text">
              <div className="text-title">
                <p>รวมรายการสินค้าใกล้หมด/เดือน</p>
              </div>
              <div className="text-description">
                <p>
                  {uniqueProductsData?.length} รายการ / {sumOutOfStockValue} หน่วย
                </p>
              </div>
            </div>
          </div>
          <p>|</p>
          <div className="content">
            <div className="text">
              <div className="text-title">
                <p>น้อยสุดคือ : {mostProductOutOfStock?.title}</p>
              </div>
              <div className="text-description">
                <p>
                  {mostProductOutOfStock?.import_value -
                    mostProductOutOfStock?.export_value -
                    mostProductOutOfStock?.export_defective_value}{" "}
                  หน่วย
                </p>
              </div>
            </div>
            <button onClick={toggleOutOfStockGraph} className="graph">
              แสดงกราฟ
            </button>
          </div>
        </Card>

        {/* summaries 2 */}
        <Card className="item">
          <div className="content" style={{ justifyContent: "flex-start" }}>
            <figure className="image">
              <img src="/images/icons/expirationTable-icon.png" alt="Expiration-icon" />
            </figure>
            <div className="text">
              <div className="text-title">
                <p>รวมรายการสินค้าใกล้หมดอายุ/เดือน</p>
              </div>
              <div className="text-description">
                <p>
                  {productsAboutToExpire?.length} รายการ / {sumAboutToExpireValue} หน่วย
                </p>
              </div>
            </div>
          </div>
          <p>|</p>
          <div className="content">
            <div className="text">
              <div className="text-title">
                <p>มากสุดคือ : {mostProductExpire?.title}</p>
              </div>
              <div className="text-description">
                <p>{remainingDays} วัน</p>
              </div>
            </div>
            <button onClick={toggleAboutToExpireGraph} className="graph">
              แสดงกราฟ
            </button>
          </div>
        </Card>

        {/* summaries 3 */}
        <Card className="item">
          <div className="content" style={{ justifyContent: "flex-start" }}>
            <figure className="image">
              <img src="/images/icons/import-icon.png" alt="Expire-icon" />
            </figure>
            <div className="text">
              <div className="text-title">
                <p>รวมรายการนำเข้าล่าสุด/วัน</p>
              </div>
              <div className="text-description">
                <p>
                  {productsImport?.length} รายการ / {sumImportValue} หน่วย
                </p>
              </div>
            </div>
          </div>
          <p>|</p>
          <div className="content">
            <div className="text">
              <div className="text-title">
                <p>มากสุดคือ : {mostProductImport?.title}</p>
              </div>
              <div className="text-description">
                <p>{sumImportValue} หน่วย</p>
              </div>
            </div>
            <button onClick={toggleLatestImportGraph} className="graph">
              แสดงกราฟ
            </button>
          </div>
        </Card>

        {/* summaries 4 */}
        <Card className="item">
          <div className="content" style={{ justifyContent: "flex-start" }}>
            <figure className="image">
              <img src="/images/icons/export-icon.png" alt="Product-icon" />
            </figure>
            <div className="text">
              <div className="text-title">
                <p>รวมรายการเบิกออกล่าสุด/วัน</p>
              </div>
              <div className="text-description">
                <p>
                  {productsExport?.length} รายการ / {sumExportValue} หน่วย
                </p>
              </div>
            </div>
          </div>
          <p>|</p>
          <div className="content">
            <div className="text">
              <div className="text-title">
                <p>มากสุดคือ : {latestExport?.title}</p>
              </div>
              <div className="text-description">
                <p>{latestExport?.export_value} หน่วย</p>
              </div>
            </div>
            <button onClick={toggleLatestExportGraph} className="graph">
              แสดงกราฟ
            </button>
          </div>
        </Card>
      </div>

      <div className="flex-container-between">
        <div className="grid-container-1fr-1fr-purple">
          {/* summaries 5 */}
          <Card className="item">
            <p className="header">สินค้าเบิกออกมากสุด/เดือน</p>
            <div className="content">
              <figure className="image">
                <img src={`${webPath}${mostExportedProduct?.thumbnail_link}`} alt="" />
              </figure>
              <div className="wrapper">
                <p className="title">{mostExportedProduct?.title}</p>
                <div>
                  <div className="description">
                    <p>ปริมาตรสุทธิ</p>
                    <p>
                      {mostExportedProduct?.netweight} {mostExportedProduct?.unit_name}
                    </p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>{mostExportedProduct?.selling_price} THB</p>
                  </div>
                  <div className="description">
                    <p>วันเบิก</p>
                    <p>{mostExportedProduct?.formatted_created_at}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary">
              <p>จำนวนเบิกออก</p>
              <p>{mostExportedProduct?.export_value} หน่วย</p>
            </div>
          </Card>

          {/* summaries 6 */}
          <Card className="item">
            <p className="header">สินค้าคงเหลือในสต็อกมากสุด/เดือน</p>
            <div className="content">
              <figure className="image">
                <img src={`${webPath}${mostProductInStock?.thumbnail_link}`} alt="" />
              </figure>
              <div className="wrapper">
                <p className="title">{mostProductInStock?.title}</p>
                <div>
                  <div className="description">
                    <p>ปริมาณสุทธิ</p>
                    <p>
                      {mostProductInStock?.netweight} {mostProductInStock?.unit_name}
                    </p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>{mostProductInStock?.selling_price} THB</p>
                  </div>
                  <div className="description">
                    <p>วันเบิก</p>
                    <p>{mostProductInStock?.formatted_created_at}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary">
              <p>คงเหลือ</p>
              <p>
                {mostProductInStock?.import_value -
                  mostProductInStock?.export_value -
                  mostProductInStock?.export_defective_value}{" "}
                หน่วย
              </p>
            </div>
          </Card>
        </div>

        <div className="grid-container-1fr-1fr-orange">
          {/* summaries 7 */}
          <Card className="item">
            <p className="header">สินค้าใกล้หมดอายุมากสุด</p>
            <div className="content">
              <figure className="image">
                <img src={`${webPath}${mostProductExpire?.thumbnail_link}`} alt="" />
              </figure>
              <div className="wrapper">
                <p className="title">{mostProductExpire?.title}</p>
                <div>
                  <div className="description">
                    <p>ปริมาณสุทธิ</p>
                    <p>
                      {mostProductExpire?.netweight} {mostProductExpire?.unit_name}
                    </p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>{mostProductExpire?.selling_price} THB</p>
                  </div>
                  <div className="description">
                    <p>วันเบิก</p>
                    <p>{mostProductExpire?.formatted_created_at}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary">
              <p>วันที่เหลือ</p>
              <p>{remainingDays} วัน</p>
            </div>
          </Card>

          {/* Summaries 8 */}
          <Card className="item">
            <p className="header">สินค้าใกล้หมดสต็อกมากสุด</p>
            <div className="content">
              <figure className="image">
                <img src={`${webPath}${mostProductOutOfStock?.thumbnail_link}`} alt="" />
              </figure>
              <div className="wrapper">
                <p className="title">{mostProductOutOfStock?.title}</p>
                <div>
                  <div className="description">
                    <p>ปริมาณสุทธิ</p>
                    <p>
                      {mostProductOutOfStock?.netweight} {mostProductOutOfStock?.unit_name}
                    </p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>{mostProductOutOfStock?.selling_price} THB</p>
                  </div>
                  <div className="description">
                    <p>วันเบิก</p>
                    <p>{mostProductOutOfStock?.formatted_created_at}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary">
              <p>คงเหลือ</p>
              <p>
                {mostProductOutOfStock?.import_value -
                  mostProductOutOfStock?.export_value -
                  mostProductOutOfStock?.export_defective_value}{" "}
                หน่วย
              </p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Summaries;
