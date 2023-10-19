import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import OutOfStock from "./graphs/OutOfStock";
import AboutToExpire from "./graphs/AboutToExpire";
import { useSelector } from "react-redux";
import LatestImport from "./graphs/LatestImport";
import LatestExport from "./graphs/LatestExport";
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

const showImgstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 480,
  bgcolor: "#fff",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
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
  const [sum5Open, setSum5Open] = React.useState(false);
  const [sum6Open, setSum6Open] = React.useState(false);
  const [sum7Open, setSum7Open] = React.useState(false);
  const [sum8Open, setSum8Open] = React.useState(false);
  const handleSum5Open = () => setSum5Open(true);
  const handleSum5Close = () => setSum5Open(false);
  const handleSum6Open = () => setSum6Open(true);
  const handleSum6Close = () => setSum6Open(false);
  const handleSum7Open = () => setSum7Open(true);
  const handleSum7Close = () => setSum7Open(false);
  const handleSum8Open = () => setSum8Open(true);
  const handleSum8Close = () => setSum8Open(false);

  const [outOfStockValue, setOutOfStockValue] = useState(
    productsOutOfStock?.map(
      (item) =>
        item.import_value - item.export_value - item.export_defective_value
    )
  );
  const [aboutToExpireValue, setAboutToExpireValue] = useState(
    productsAboutToExpire?.map(
      (item) =>
        item.import_value - item.export_value - item.export_defective_value
    )
  );
  const [importValue, setImportValue] = useState(
    productsImport?.map((item) => item.import_value)
  );
  const [exportValue, setExportValue] = useState(
    productsExport?.map((item) => item.export_quantity)
  );
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
      <Modal
        open={sum5Open}
        onClose={handleSum5Close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={showImgstyle}>
          <figure>
            <img src={`${webPath}${mostExportedProduct?.thumbnail_link}`} alt="" />
          </figure>
        </Box>
      </Modal>
      <Modal
        open={sum6Open}
        onClose={handleSum6Close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={showImgstyle}>
          <figure>
            <img src={`${webPath}${mostProductInStock?.thumbnail_link}`} alt="" />
          </figure>
        </Box>
      </Modal>
      <Modal
        open={sum7Open}
        onClose={handleSum7Close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={showImgstyle}>
          <figure>
            <img src={`${webPath}${mostProductExpire?.thumbnail_link}`} alt="" />
          </figure>
        </Box>
      </Modal>
      <Modal
        open={sum8Open}
        onClose={handleSum8Close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={showImgstyle}>
          <figure>
            <img src={`${webPath}${mostProductOutOfStock?.thumbnail_link}`} alt="" />
          </figure>
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
                <p>รายการสินค้าใกล้หมดสต๊อก/เดือน</p>
              </div>
              <div className="text-description">
                <p>
                  {uniqueProductsData?.length} รายการ / {sumOutOfStockValue}{" "}
                  หน่วย
                </p>
              </div>
            </div>
          </div>
          <p>|</p>
          <div className="content">
            <div className="text">
              <div className="text-title">
                <p>ใกล้สุด : {mostProductOutOfStock?.title}</p>
              </div>
              <div className="text-description">
                <p>
                  {mostProductOutOfStock?.import_value -
                    mostProductOutOfStock?.export_value -
                    mostProductOutOfStock?.export_defective_value > 0
                    ? mostProductOutOfStock?.import_value -
                    mostProductOutOfStock?.export_value -
                    mostProductOutOfStock?.export_defective_value
                    : 0 + " "}
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
              <img
                src="/images/icons/expirationTable-icon.png"
                alt="Expiration-icon"
              />
            </figure>
            <div className="text">
              <div className="text-title">
                <p>รายการสินค้าใกล้หมดอายุ/เดือน</p>
              </div>
              <div className="text-description">
                <p>
                  {productsAboutToExpire?.length} รายการ /{" "}
                  {sumAboutToExpireValue} หน่วย
                </p>
              </div>
            </div>
          </div>
          <p>|</p>
          <div className="content">
            <div className="text">
              <div className="text-title">
                <p>ใกล้สุด : {mostProductExpire?.title}</p>
              </div>
              <div className="text-description">
                <p>
                  {mostProductExpire?.exp_date !== undefined ?
                    remainingDays + 1 <= 0
                      ? "หมดอายุ"
                      : remainingDays + 1 + " วัน"
                    : 0 + " วัน"}
                </p>
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
                <p>รายการนำเข้าล่าสุด/วัน</p>
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
                <p>ล่าสุด : {mostProductImport?.title}</p>
              </div>
              <div className="text-description">
                <p>{mostProductImport?.import_value || 0} หน่วย</p>
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
                <p>รายการเบิกออกล่าสุด/วัน</p>
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
                <p>
                  ล่าสุด :{" "}
                  {productsExport.length !== 0 ? latestExport?.title : ""}
                </p>
              </div>
              <div className="text-description">
                <p>
                  {productsExport.length !== 0
                    ? latestExport?.export_quantity
                    : 0}{" "}
                  หน่วย
                </p>
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
              <figure className="image" style={{ cursor: "pointer" }} onClick={handleSum5Open}>
                {mostExportedProduct?.export_value +
                  mostExportedProduct?.export_defective_value !==
                  0 && mostExportedProduct !== null ? (
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      paddingBlock: ".5rem",
                    }}
                    src={mostExportedProduct.thumbnail_link ? `${webPath}${mostExportedProduct?.thumbnail_link}` : '/images/mock/pre-product.png'}
                    alt=""
                  />
                ) : (
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      paddingBlock: ".5rem",
                    }}
                    src="/images/mock/pre-product.png"
                  />
                )}
              </figure>
              <div className="wrapper">
                <p className="title">
                  {mostExportedProduct?.export_value +
                    mostExportedProduct?.export_defective_value !==
                    0 && mostExportedProduct !== null
                    ? mostExportedProduct?.title
                    : ""}
                </p>
                <div>
                  <div className="description">
                    <p>ปริมาตรสุทธิ</p>
                    <p>
                      {mostExportedProduct?.export_value +
                        mostExportedProduct?.export_defective_value !==
                        0 && mostExportedProduct !== null
                        ? `${mostExportedProduct?.netweight} ${mostExportedProduct?.unit_name}`
                        : 0}
                    </p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>
                      {mostExportedProduct?.export_value +
                        mostExportedProduct?.export_defective_value !==
                        0 && mostExportedProduct !== null
                        ? `${mostExportedProduct?.selling_price} THB`
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary">
              <p>จำนวนเบิกออก</p>
              <p>
                {mostExportedProduct?.export_value +
                  mostExportedProduct?.export_defective_value !==
                  0 && mostExportedProduct !== null
                  ? `${mostExportedProduct?.export_value +
                  mostExportedProduct?.export_defective_value
                  } หน่วย`
                  : 0}
              </p>
            </div>
          </Card>

          {/* summaries 6 */}
          <Card className="item">
            <p className="header">สินค้าคงเหลือในสต็อกมากสุด/เดือน</p>
            <div className="content">
              <figure className="image" style={{ cursor: "pointer" }} onClick={handleSum6Open}>
                {mostProductInStock?.import_value -
                  mostProductInStock?.export_value -
                  mostProductInStock?.export_defective_value !==
                  0 && mostProductInStock !== null ? (
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      paddingBlock: ".5rem",
                    }}
                    src={mostProductInStock.thumbnail_link ? `${webPath}${mostProductInStock?.thumbnail_link}` : '/images/mock/pre-product.png'}
                    alt=""
                  />
                ) : (
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      paddingBlock: ".5rem",
                    }}
                    src="/images/mock/pre-product.png"
                  />
                )}
              </figure>
              <div className="wrapper">
                <p className="title">
                  {mostProductInStock?.import_value -
                    mostProductInStock?.export_value -
                    mostProductInStock?.export_defective_value !==
                    0 && mostProductInStock !== null
                    ? mostProductInStock?.title
                    : ""}
                </p>
                <div>
                  <div className="description">
                    <p>ปริมาตรสุทธิ</p>
                    <p>
                      {mostProductInStock?.import_value -
                        mostProductInStock?.export_value -
                        mostProductInStock?.export_defective_value !==
                        0 && mostProductInStock !== null
                        ? `${mostProductInStock?.netweight} ${mostProductInStock?.unit_name}`
                        : 0}
                    </p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>
                      {mostProductInStock?.import_value -
                        mostProductInStock?.export_value -
                        mostProductInStock?.export_defective_value !==
                        0 && mostProductInStock !== null
                        ? `${mostProductInStock?.selling_price} THB`
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary">
              <p>คงเหลือ</p>
              <p>
                {mostProductInStock?.import_value -
                  mostProductInStock?.export_value -
                  mostProductInStock?.export_defective_value !==
                  0 && mostProductInStock !== null
                  ? mostProductInStock?.import_value -
                  (mostProductInStock?.export_value +
                    mostProductInStock?.export_defective_value) +
                  " "
                  : 0 + " "}
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
              <figure className="image" style={{ cursor: "pointer" }} onClick={handleSum7Open}>
                {mostProductExpire?.import_value -
                  mostProductExpire?.export_value -
                  mostProductExpire?.export_defective_value !==
                  0 &&
                  mostProductExpire?.import_value -
                  mostProductExpire?.export_value -
                  mostProductExpire?.export_defective_value >
                  0 ? (
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      paddingBlock: ".5rem",
                    }}
                    src={`${webPath}${mostProductExpire?.thumbnail_link}`}
                    alt=""
                  />
                ) : (
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      paddingBlock: ".5rem",
                    }}
                    src="/images/mock/pre-product.png"
                  />
                )}
              </figure>
              <div className="wrapper">
                <p className="title">
                  {mostProductExpire?.import_value -
                    mostProductExpire?.export_value -
                    mostProductExpire?.export_defective_value !==
                    0
                    ? mostProductExpire?.title
                    : ""}
                </p>
                <div>
                  <div className="description">
                    <p>ปริมาตรสุทธิ</p>
                    <p>
                      {mostProductExpire?.import_value -
                        mostProductExpire?.export_value -
                        mostProductExpire?.export_defective_value !==
                        0 &&
                        mostProductExpire?.import_value -
                        mostProductExpire?.export_value -
                        mostProductExpire?.export_defective_value >
                        0
                        ? `${mostProductExpire?.netweight} ${mostProductExpire?.unit_name}`
                        : 0}
                    </p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>
                      {mostProductExpire?.import_value -
                        mostProductExpire?.export_value -
                        mostProductExpire?.export_defective_value !==
                        0 &&
                        mostProductExpire?.import_value -
                        mostProductExpire?.export_value -
                        mostProductExpire?.export_defective_value >
                        0
                        ? `${mostProductExpire?.selling_price} THB`
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary">
              <p>วันที่เหลือ</p>
              <p>
                {mostProductExpire?.import_value -
                  mostProductExpire?.export_value -
                  mostProductExpire?.export_defective_value !==
                  0 &&
                  mostProductExpire?.import_value -
                  mostProductExpire?.export_value -
                  mostProductExpire?.export_defective_value >
                  0
                  ? `${remainingDays + 1 <= 0
                    ? "หมดอายุ"
                    : remainingDays + 1 + " วัน"
                  }`
                  : 0 + " วัน"}
              </p>
            </div>
          </Card>

          {/* Summaries 8 */}
          <Card className="item">
            <p className="header">สินค้าใกล้หมดสต็อกมากสุด</p>
            <div className="content">
              <figure className="image" style={{ cursor: "pointer" }} onClick={handleSum8Open}>
                {mostProductOutOfStock?.import_value -
                  mostProductOutOfStock?.export_value -
                  mostProductOutOfStock?.export_defective_value !==
                  0 &&
                  mostProductOutOfStock?.import_value -
                  mostProductOutOfStock?.export_value -
                  mostProductOutOfStock?.export_defective_value >
                  0 && mostProductOutOfStock?.thumbnail_link ? (
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      paddingBlock: ".5rem",
                    }}
                    src={`${webPath}${mostProductOutOfStock?.thumbnail_link}`}
                    alt=""
                  />

                ) : (
                  <img
                    style={{
                      width: "100px",
                      height: "100px",
                      paddingBlock: ".5rem",
                    }}
                    src="/images/mock/pre-product.png"
                  />
                )}
              </figure>
              <div className="wrapper">
                <p className="title">
                  {mostProductOutOfStock?.import_value -
                    mostProductOutOfStock?.export_value -
                    mostProductOutOfStock?.export_defective_value !==
                    0
                    ? mostProductOutOfStock?.title
                    : ""}
                </p>
                <div>
                  <div className="description">
                    <p>ปริมาตรสุทธิ</p>
                    <p>
                      {mostProductOutOfStock?.import_value -
                        mostProductOutOfStock?.export_value -
                        mostProductOutOfStock?.export_defective_value !==
                        0 &&
                        mostProductOutOfStock?.import_value -
                        mostProductOutOfStock?.export_value -
                        mostProductOutOfStock?.export_defective_value >
                        0
                        ? `${mostProductOutOfStock?.netweight} ${mostProductOutOfStock?.unit_name}`
                        : 0}
                    </p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>
                      {mostProductOutOfStock?.import_value -
                        mostProductOutOfStock?.export_value -
                        mostProductOutOfStock?.export_defective_value !==
                        0 &&
                        mostProductOutOfStock?.import_value -
                        mostProductOutOfStock?.export_value -
                        mostProductOutOfStock?.export_defective_value >
                        0
                        ? `${mostProductOutOfStock?.selling_price} THB`
                        : 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary">
              <p>คงเหลือ</p>
              <p>
                {mostProductOutOfStock?.import_value -
                  mostProductOutOfStock?.export_value -
                  mostProductOutOfStock?.export_defective_value !==
                  0 &&
                  mostProductOutOfStock?.import_value -
                  mostProductOutOfStock?.export_value -
                  mostProductOutOfStock?.export_defective_value >
                  0
                  ? `${mostProductOutOfStock?.import_value -
                  (mostProductOutOfStock?.export_value +
                    mostProductOutOfStock?.export_defective_value) +
                  " "
                  }`
                  : 0 + " "}
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
