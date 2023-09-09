import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
});

const PDFComponent = ({ data }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {data.map((item, index) => (
          <View key={index}>
            <Text style={styles.text}>Item: {item.name}</Text>
            <Text style={styles.text}>Description: {item.description}</Text>
            {/* Add more fields as needed */}
          </View>
        ))}
      </Page>
    </Document>
  );
};

export default PDFComponent;
