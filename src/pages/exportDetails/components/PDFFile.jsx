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
    paddingTop: 5,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    height: "100%",
    minHeight: 55,
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
    paddingTop: 5,
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
    fontSize: 20,
  },
  floatRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "flex-end",
    gap: 30,
    width: "100%",
    fontSize: 20,
  },
});

const PDFFile = ({ data }) => {
  return (
    <Document>
      <Page
        size={{ width: "100%", height: "100%" }}
        style={styles.page}
        fonts={[{ src: ThaiSarabunRegular, family: "ThaiSarabun" }]}
      >
        <View style={styles.table}>
          <View style={styles.tableRowHeader}>
            <View style={{ ...styles.tableHeader, flex: 1.175 }}>
              <Text>สินค้า</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>ประเภทสินค้า</Text>
            </View>
            <View style={{ ...styles.tableHeader, flex: 1.175 }}>
              <Text>รหัสเบิก</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>ซัพพลายเออร์</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>บาร์โค้ดเดิม</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>บาร์โค้ดใหม่</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>จำนวนเบิก</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>คงเหลือ</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>เบิกไปที่</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>วันที่เบิก</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>ผู้ใช้งาน</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>ผู้เบิก</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>ผู้อนุมัติ</Text>
            </View>
          </View>

          {data.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <View style={{ ...styles.tableCell, flex: 1.2 }}>
                <Text>{item.title}</Text>
                <Text>{item.product_id}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.p_type}</Text>
              </View>
              <View style={{ ...styles.tableCell, flex: 1.2 }}>
                <Text>{item.export_id}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.supplier_name}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.product_barcode}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.barcode_number}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.export_quantity}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>
                  {parseInt(item.import_value) -
                    parseInt(item.export_value) -
                    parseInt(item.export_defective_value)}
                </Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.export_type}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.export_date}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.account_name}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.picker_name}</Text>
              </View>
              <View style={styles.tableCell}>
                <Text>{item.approver_name}</Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFFile;
