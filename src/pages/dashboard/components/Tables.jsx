import { Card } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

function Tables() {
  return (
    <>
      <div className="grid-container-1fr-1fr-table">
        <Card className="item">
          <div className="header">
            <figure className="header-title">
              <img src="/images/icons/product-icon.png" alt="" />
              <p>จำนวนสินค้าใกล้หมด</p>
            </figure>
            <div className="header-link">
              <p>8,540 รายการ</p>
              <button>ดูรายการเพิ่มเติม</button>
            </div>
          </div>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B", paddingLeft: ".5rem" }}>
                    ภาพ
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B", width: "130px" }}>
                    ชื่อรายการ
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    จำนวนคงเหลือ/หน่วย
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    ปริมาณสุทธิต่อหน่วย
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>ราคาขายจริง</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    วันเบิกสินค้าล่าสุด
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "12px", color: "#3B336B" }}>
                    Supplier
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover role="checkbox">
                  <TableCell sx={{ fontSize: "12px", paddingLeft: ".5rem" }}>
                    <figure
                      style={{
                        background: "#D0D0E2",
                        borderRadius: "5px",
                        width: "40px",
                        height: "40px",
                        margin: "auto",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src="/images/mock/product1.png"
                        alt=""
                      />
                    </figure>
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>
                    น้ำอัดลมกลิ่นเมลอ... 01234567895846
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>80 กระป๋อง</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>250 ml</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>20 THB</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>28 sep 2023</TableCell>
                  <TableCell align="center" sx={{ fontSize: "12px" }}>
                    <figure
                      style={{
                        background: "#3B326B",
                        borderRadius: "5px",
                        padding: ".65rem",
                        width: "40px",
                        height: "40px",
                        margin: "auto",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src="/images/icons/supplier-icon.png"
                        alt=""
                      />
                    </figure>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Card className="item">
          <div className="header">
            <figure className="header-title">
              <img src="/images/icons/expire-icon.png" alt="" />
              <p>จำนวนสินค้าใกล้หมดอายุ</p>
            </figure>
            <div className="header-link">
              <p>14 รายการ</p>
              <button>ดูรายการเพิ่มเติม</button>
            </div>
          </div>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontSize: "12px", color: "#3B336B" }}>
                    ภาพ
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>ชื่อรายการ</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    จำนวนคงเหลือ/หน่วย
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    ปริมาณสุทธิต่อหน่วย
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>ราคาขายจริง</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    วันเบิกสินค้าล่าสุด
                  </TableCell>
                  <TableCell align="center" sx={{ fontSize: "12px", color: "#3B336B" }}>
                    Supplier
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover role="checkbox">
                  <TableCell align="center" sx={{ fontSize: "12px" }}>
                    <figure
                      style={{
                        background: "#D0D0E2",
                        borderRadius: "5px",
                        width: "40px",
                        height: "40px",
                        margin: "auto",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src="/images/mock/product1.png"
                        alt=""
                      />
                    </figure>
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>
                    น้ำอัดลมกลิ่นเมลอ... 01234567895846
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>80 กระป๋อง</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>250 ml</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>20 THB</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>28 sep 2023</TableCell>
                  <TableCell align="center" sx={{ fontSize: "12px" }}>
                    <figure
                      style={{
                        background: "#3B326B",
                        borderRadius: "5px",
                        padding: ".65rem",
                        width: "40px",
                        height: "40px",
                        margin: "auto",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src="/images/icons/supplier-icon.png"
                        alt=""
                      />
                    </figure>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>

      <div className="grid-container-1fr-table">
        <Card className="item">
          <div className="header">
            <figure className="header-title">
              <img src="/images/icons/export-icon.png" alt="" />
              <p>จำนวนสินค้าใกล้หมด</p>
            </figure>
            <div className="header-link">
              <p>5 รายการ</p>
              <button>ดูรายการเพิ่มเติม</button>
            </div>
          </div>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontSize: "12px", color: "#3B336B", paddingLeft: ".5rem" }}
                  >
                    ภาพ
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B", width: "130px" }}>
                    ชื่อรายการ
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B", width: "130px" }}>
                    ผู้ใช้งาน
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    วันเวลาเบิกออกล่าสุด
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>วันที่ซื้อ</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    จำนวนเบิกออกล่าสุด/หน่วย
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    จำนวนคงเหลือ/หน่วย
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    วันผลิตวันหมดอายุ
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>Vat</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>หมวดหมู่</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    ปริมาณสุทธิต่อหน่วย
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>ต้นทุนต่อ หน่วย</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>กำไร</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>ราคาขายจริง</TableCell>
                  <TableCell align="center" sx={{ fontSize: "12px", color: "#3B336B" }}>
                    Supplier
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover role="checkbox">
                  <TableCell align="center" sx={{ fontSize: "12px" }}>
                    <figure
                      style={{
                        background: "#D0D0E2",
                        borderRadius: "5px",
                        width: "40px",
                        height: "40px",
                        margin: "auto",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src="/images/mock/product1.png"
                        alt=""
                      />
                    </figure>
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>
                    น้ำอัดลมกลิ่นเมลอ... 01234567895846
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>Admin mnm1</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>28 sep 2023 13:25:25</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>28 sep 2023</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>20 กระป๋อง</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>80 กระป๋อง</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>28 sep 2023 30 dec 2024</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>No</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>ฝ่ายผลิต</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>250 ml</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>5 THB</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>5 %</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>20 THB</TableCell>
                  <TableCell align="center" sx={{ fontSize: "12px" }}>
                    <figure
                      style={{
                        background: "#3B326B",
                        borderRadius: "5px",
                        padding: ".65rem",
                        width: "40px",
                        height: "40px",
                        margin: "auto",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src="/images/icons/supplier-icon.png"
                        alt=""
                      />
                    </figure>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>

        <Card className="item">
          <div className="header">
            <figure className="header-title">
              <img src="/images/icons/import-icon.png" alt="" />
              <p>จำนวนสินค้าใกล้หมด</p>
            </figure>
            <div className="header-link">
              <p>25 รายการ</p>
              <button>ดูรายการเพิ่มเติม</button>
            </div>
          </div>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ fontSize: "12px", color: "#3B336B" }}>
                    ภาพ
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B", width: "130px" }}>
                    ชื่อรายการ
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B", width: "130px" }}>
                    ผู้ใช้งาน
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    วันเวลาเบิกออกล่าสุด
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>วันที่ซื้อ</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    จำนวนเบิกออกล่าสุด/หน่วย
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    จำนวนคงเหลือ/หน่วย
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    วันผลิตวันหมดอายุ
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>Vat</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>หมวดหมู่</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>
                    ปริมาณสุทธิต่อหน่วย
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>ต้นทุนต่อ หน่วย</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>กำไร</TableCell>
                  <TableCell sx={{ fontSize: "12px", color: "#3B336B" }}>ราคาขายจริง</TableCell>
                  <TableCell align="center" sx={{ fontSize: "12px", color: "#3B336B" }}>
                    Supplier
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow hover role="checkbox">
                  <TableCell align="center" sx={{ fontSize: "12px" }}>
                    <figure
                      style={{
                        background: "#D0D0E2",
                        borderRadius: "5px",
                        width: "40px",
                        height: "40px",
                        margin: "auto",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src="/images/mock/product1.png"
                        alt=""
                      />
                    </figure>
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>
                    น้ำอัดลมกลิ่นเมลอ... 01234567895846
                  </TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>Admin mnm1</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>28 sep 2023 13:25:25</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>28 sep 2023</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>20 กระป๋อง</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>80 กระป๋อง</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>28 sep 2023 30 dec 2024</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>No</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>ฝ่ายผลิต</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>250 ml</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>5 THB</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>5 %</TableCell>
                  <TableCell sx={{ fontSize: "12px" }}>20 THB</TableCell>
                  <TableCell align="center" sx={{ fontSize: "12px" }}>
                    <figure
                      style={{
                        background: "#3B326B",
                        borderRadius: "5px",
                        padding: ".65rem",
                        width: "40px",
                        height: "40px",
                        margin: "auto",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        style={{ width: "100%", height: "100%" }}
                        src="/images/icons/supplier-icon.png"
                        alt=""
                      />
                    </figure>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </div>
    </>
  );
}

export default Tables;
