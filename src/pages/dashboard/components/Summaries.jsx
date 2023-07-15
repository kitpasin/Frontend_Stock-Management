import React from "react";
import { Card } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import BarChart from "./BarChart"
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function Summaries({
  mostExportedProduct,
  mostProductInStock,
  mostProductExpire,
  mostProductOutOfStock,
}) {
  const [open, setOpen] = React.useState(false);
  const webPath = useSelector((state) => state.app.webPath);

  const startDate = new Date(mostProductExpire.mfd_date);
  const endDate = new Date(mostProductExpire.exp_date);
  const diffDateInMs = endDate - startDate;
  const diffDateInDays = diffDateInMs / (1000 * 60 * 60 * 24);

  function toggleGraph() {
    setOpen(!open);
  }

  console.log(mostProductExpire);

  return (
    <>
      <Modal
        open={open}
        onClose={toggleGraph}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <BarChart />
        </Box>
      </Modal>
      <div className="grid-container-1fr-1fr-white">
        {/* summaries 1 */}
        <Card className="item">
          <div className="content">
            <figure className="image">
              <img src="/images/icons/product-icon.png" alt="Product-icon" />
            </figure>
            <div className="text">
              <div className="text-title">
                <p>รวมรายการ สินค้าไกล้หมด</p>
              </div>
              <div className="text-description">
                <p>90,000 รายการ / 85,324 หน่วย</p>
              </div>
            </div>
          </div>
          <p>|</p>
          <div className="content">
            <div className="text">
              <div className="text-title">
                <p>น้อยสุดคือ : อาหาร</p>
              </div>
              <div className="text-description">
                <p>15 หน่วย</p>
              </div>
            </div>
            <button onClick={toggleGraph} className="graph">
              แสดงกราฟ
            </button>
          </div>
        </Card>

        {/* summaries 2 */}
        <Card className="item">
          <div className="content">
            <figure className="image">
              <img src="/images/icons/expirationTable-icon.png" alt="Expiration-icon" />
            </figure>
            <div className="text">
              <div className="text-title">
                <p>รวมรายการ สินค้าใกล้หมดอายุ</p>
              </div>
              <div className="text-description">
                <p>90,000 รายการ / 85,324 หน่วย</p>
              </div>
            </div>
          </div>
          <p>|</p>
          <div className="content">
            <div className="text">
              <div className="text-title">
                <p>มากสุดคือ : เครื่องดื่ม</p>
              </div>
              <div className="text-description">
                <p>240 หน่วย</p>
              </div>
            </div>
            <button onClick={toggleGraph} className="graph">
              แสดงกราฟ
            </button>
          </div>
        </Card>

        {/* summaries 3 */}
        <Card className="item">
          <div className="content">
            <figure className="image">
              <img src="/images/icons/export-icon.png" alt="Product-icon" />
            </figure>
            <div className="text">
              <div className="text-title">
                <p>รวมรายการ เบิกออกล่าสุด</p>
              </div>
              <div className="text-description">
                <p>25,000 รายการ / 10,542 หน่วย</p>
              </div>
            </div>
          </div>
          <p>|</p>
          <div className="content">
            <div className="text">
              <div className="text-title">
                <p>มากสุดคือ : มาม่า</p>
              </div>
              <div className="text-description">
                <p>550 หน่วย</p>
              </div>
            </div>
            <button onClick={toggleGraph} className="graph">
              แสดงกราฟ
            </button>
          </div>
        </Card>

        {/* summaries 4 */}
        <Card className="item">
          <div className="content">
            <figure className="image">
              <img src="/images/icons/import-icon.png" alt="Expire-icon" />
            </figure>
            <div className="text">
              <div className="text-title">
                <p>รวมรายการ นำเข้าล่าสุด</p>
              </div>
              <div className="text-description">
                <p>25,000 รายการ / 10,542 หน่วย</p>
              </div>
            </div>
          </div>
          <p>|</p>
          <div className="content">
            <div className="text">
              <div className="text-title">
                <p>มากสุดคือ : ขนม</p>
              </div>
              <div className="text-description">
                <p>550 หน่วย</p>
              </div>
            </div>
            <button onClick={toggleGraph} className="graph">
              แสดงกราฟ
            </button>
          </div>
        </Card>
      </div>

      <div className="flex-container-between">
        <div className="grid-container-1fr-1fr-purple">
          {/* summaries 5 */}
          <Card className="item">
            <p className="header">สินค้า เบิกออกมากสุด/เดือน</p>
            <div className="content">
              <figure className="image">
                <img src={`${webPath}${mostExportedProduct.thumbnail_link}`} alt="" />
              </figure>
              <div className="wrapper">
                <p className="title">{mostExportedProduct.title}</p>
                <div>
                  <div className="description">
                    <p>ปริมาตรสุทธิ</p>
                    <p>
                      {mostExportedProduct.netweight} {mostExportedProduct.unit_name}
                    </p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>{mostExportedProduct.selling_price} THB</p>
                  </div>
                  <div className="description">
                    <p>วันเบิก</p>
                    <p>28 sep 2023</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary">
              <p>จำนวนเบิกออก</p>
              <p>{mostExportedProduct.export_value} หน่วย</p>
            </div>
          </Card>

          {/* summaries 6 */}
          <Card className="item">
            <p className="header">สินค้า คงเหลือในสต็อกมากสุด/เดือน</p>
            <div className="content">
              <figure className="image">
                <img src={`${webPath}${mostProductInStock.thumbnail_link}`} alt="" />
              </figure>
              <div className="wrapper">
                <p className="title">{mostProductInStock.title}</p>
                <div>
                  <div className="description">
                    <p>ปริมาณสุทธิ</p>
                    <p>
                      {mostProductInStock.netweight} {mostProductInStock.unit_name}
                    </p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>{mostProductInStock.selling_price} THB</p>
                  </div>
                  <div className="description">
                    <p>วันเบิก</p>
                    <p>28 sep 2023</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary">
              <p>คงเหลือ</p>
              <p>
                {mostProductInStock.import_value -
                  mostProductInStock.export_value -
                  mostProductInStock.export_defective_value}{" "}
                หน่วย
              </p>
            </div>
          </Card>
        </div>

        <div className="grid-container-1fr-1fr-orange">
          {/* summaries 7 */}
          <Card className="item">
            <p className="header">สินค้าไกลหมดอายุมากสุด</p>
            <div className="content">
              <figure className="image">
                <img src={`${webPath}${mostProductExpire.thumbnail_link}`} alt="" />
              </figure>
              <div className="wrapper">
                <p className="title">{mostProductExpire.title}</p>
                <div>
                  <div className="description">
                    <p>ปริมาณสุทธิ</p>
                    <p>
                      {mostProductExpire.netweight} {mostProductExpire.unit_name}
                    </p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>{mostProductExpire.selling_price} THB</p>
                  </div>
                  <div className="description">
                    <p>วันเบิก</p>
                    <p>28 sep 2023</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary">
              <p>วันที่เหลือ</p>
              <p>{diffDateInDays} วัน</p>
            </div>
          </Card>

          {/* Summaries 8 */}
          <Card className="item">
            <p className="header">สินค้าใกล้หมด สต็อก</p>
            <div className="content">
              <figure className="image">
                <img src={`${webPath}${mostProductOutOfStock.thumbnail_link}`} alt="" />
              </figure>
              <div className="wrapper">
                <p className="title">{mostProductOutOfStock.title}</p>
                <div>
                  <div className="description">
                    <p>ปริมาณสุทธิ</p>
                    <p>
                      {mostProductOutOfStock.netweight} {mostProductOutOfStock.unit_name}
                    </p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>{mostProductOutOfStock.selling_price} THB</p>
                  </div>
                  <div className="description">
                    <p>วันเบิก</p>
                    <p>28 sep 2023</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary">
              <p>คงเหลือ</p>
              <p>
                {mostProductOutOfStock.import_value -
                  mostProductOutOfStock.export_value -
                  mostProductOutOfStock.export_defective_value}{" "}
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
