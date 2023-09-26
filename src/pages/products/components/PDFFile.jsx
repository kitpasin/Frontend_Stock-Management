import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import ThaiSarabunRegular from "../../../components/fonts/th_sarabun/th_sarabun.ttf";

Font.register({
  family: "ThaiSarabun",
  src: ThaiSarabunRegular,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "landscape",
    paddingHorizontal: 30,
    paddingVertical: 10,
    width: "100%",
    minWidth: "1280px",
    minHeight: "720px",
    marginTop: 10,
    fontFamily: "ThaiSarabun",
  },
  table: {
    display: "table",
    width: "100%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    marginTop: 10,
  },
  tableRowHeader: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    height: "100%",
    minHeight: 30,
  },
  tableHeader: {
    fontSize: 16,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#475569",
    paddingTop: 5
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    height: "100%",
    minHeight: 50,
  },
  tableCell: {
    padding: 5,
    fontSize: 16,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    flex: 1,
    textAlign: "center",
    color: "#000",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
    maxWidth: "1280px",
  },
  floatLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-start",
    gap: 30,
    width: "100%",
    fontSize: 20
  },
  floatRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-end",
    gap: 30,
    width: "100%",
    fontSize: 20
  }
});

const PDFFile = ({ data, export_id, export_date, username, export_type }) => {
  return (
    <Document>
      <Page
        size={{ width: "100%", height: "100%" }}
        style={styles.page}
        fonts={[{ src: ThaiSarabunRegular, family: "ThaiSarabun" }]}
      >
        <View style={styles.container}>
          <View style={styles.floatLeft}>
            <View>
              <Text>รหัสเบิก : {export_id.valueOf()}</Text>
            </View>
            <View>
              <Text>วันที่เบิก : {export_date}</Text>
            </View>
            <View>
              <Text>ผู้ใช้งาน : {username}</Text>
            </View>
            <View>
              <Text>เบิกไปที่ : {export_type}</Text>
            </View>
          </View>
          <View style={styles.floatRight}>
            <View>
              <Text>ผู้เบิก : .............................................</Text>
            </View>
            <View>
              <Text>ผู้อนุมัติ : .............................................</Text>
            </View>
          </View>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <View style={styles.tableHeader}>
              <Text>สินค้า</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>ประเภทสินค้า</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>บาร์โค้ดเดิม</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>คงเหลือ/หน่วย</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>วันที่ซื้อ</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>วันผลิต/วันหมดอายุ</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>หน่วยนับ</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>ปริมาตรสุทธิ/หน่วย</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>ราคาขายจริง</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>จำนวนเบิกออก</Text>
            </View>
          </View>

          {data.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={styles.tableCell}>
                <Text>{item.title}</Text>
                <Text>{item.product_id}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.p_type}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.product_barcode}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>
                  {parseInt(item.import_value) -
                    parseInt(item.export_value) -
                    parseInt(item.export_defective_value)}
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.purchase_date}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.mfd_date}</Text>
                <Text>{item.exp_date}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.counting_unit_name}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>
                  {item.units} {item.unit_name}
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.selling_price}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.quantity}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFFile;
