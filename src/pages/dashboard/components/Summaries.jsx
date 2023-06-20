import React from "react";
import { Card } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import BarChart from "./BarChart"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

function Summaries() {
  const [open, setOpen] = React.useState(false);

  function toggleGraph() {
    setOpen(!open)
  }

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
            <p className="header">สินค้า เบิกออกมากที่สุด/เดือน</p>
            <div className="content">
              <figure className="image">
                <img src="/images/mock/product1.png" alt="" />
              </figure>
              <div className="wrapper">
                <p className="title">เลย์ล็อคแผ่นหยักรส ออริจิ นอล บิก แพ็ค...</p>
                <div>
                  <div className="description">
                    <p>ปริมาณสุทธิ</p>
                    <p>150 gm</p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>100 THB</p>
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
              <p>150 หน่วย</p>
            </div>
          </Card>

          {/* summaries 6 */}
          <Card className="item">
            <p className="header">สินค้า คงเหลือในสต็อกมากสุด</p>
            <div className="content">
              <figure className="image">
                <img src="/images/mock/product1.png" alt="" />
              </figure>
              <div className="wrapper">
                <p className="title">มาม่าแกงเขียวหวานไก่</p>
                <div>
                  <div className="description">
                    <p>ปริมาณสุทธิ</p>
                    <p>150 gm</p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>100 THB</p>
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
              <p>4500 หน่วย</p>
            </div>
          </Card>
        </div>

        <div className="grid-container-1fr-1fr-orange">
          {/* summaries 7 */}
          <Card className="item">
            <p className="header">สินค้าไกลหมดอายุ</p>
            <div className="content">
              <figure className="image">
                <img src="/images/mock/product1.png" alt="" />
              </figure>
              <div className="wrapper">
                <p className="title">กูลิโกะ ป๊อกกี้ บิสกิตแท่ง เคลือบช็อกโกแ...</p>
                <div>
                  <div className="description">
                    <p>ปริมาณสุทธิ</p>
                    <p>150 gm</p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>100 THB</p>
                  </div>
                  <div className="description">
                    <p>วันเบิก</p>
                    <p>28 sep 2023</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary">
              <p>จำนวน</p>
              <p>150 หน่วย</p>
            </div>
          </Card>

          {/* Summaries 8 */}
          <Card className="item">
            <p className="header">สินค้าไกล้หมด สต็อก</p>
            <div className="content">
              <figure className="image">
                <img src="/images/mock/product1.png" alt="" />
              </figure>
              <div className="wrapper">
                <p className="title">มาม่าคัฟรสต้มยำกุ้ง</p>
                <div>
                  <div className="description">
                    <p>ปริมาณสุทธิ</p>
                    <p>150 gm</p>
                  </div>
                  <div className="description">
                    <p>ราคาขาย</p>
                    <p>100 THB</p>
                  </div>
                  <div className="description">
                    <p>วันเบิก</p>
                    <p>28 sep 2023</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary">
              <p>จำนวน</p>
              <p>10 หน่วย</p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

export default Summaries;
