import React, { useState, useRef, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts'; 
import './App.css';

const Report1: React.FC<({
    chart1: string
})> = ({chart1}) => {

  useEffect(() => {
  }, []);

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    image: {
      width: 400,
      height: 250
    }
  });

  return (
    <div className="Report1">
      { chart1 &&
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
            <View>
              <Image src={chart1} style={styles.image} />
            </View>
          </Page>
        </Document>
      </PDFViewer>}
    </div>
  );
}

export default Report1;
