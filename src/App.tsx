import React, { useState, useRef, useEffect } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import Chart from 'react-apexcharts';
import ApexCharts from 'apexcharts'; 
import './App.css';

const App: React.FC = () => {
  const [series] = useState([
    {
      name: "Series 1",
      data: [10, 5, 30, 25]
    }
  ]);
  
  const [options] = useState<ApexCharts.ApexOptions | undefined>({
    chart: {
      type: 'line',
      id: 'chart',
      animations: {
        enabled: false,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr']
    },
  });
  
  const [chartImage, setChartImage] = useState<string | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current && options && series) {
      const chart = (chartRef.current as unknown as {chart : ApexCharts}).chart ;
        chart.dataURI().then((value: { imgURI: string; } | { blob: Blob; }) => {
          if ('imgURI' in value)  setChartImage(value.imgURI);
        });
    }
  }, [series, options]);

  const HiddenChart = () => (
    <div style={{position: 'absolute', visibility: 'hidden'}}>
      {options && series && <Chart options={options} series={series} width={400} height={250} type="line" ref={chartRef} />}
    </div>
  )

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 270,
      height: 150,
    }
  });

  return (
    <div className="App">
      {/* Charts to use in report */}
      <HiddenChart />
      {/* end charts */}
      { chartImage && options && series &&
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text style={{marginBottom: 10}}>Section #1</Text>
              <Text style={{fontSize: 12}}>
                This is the short intro about a report that was created with help of 3 node js libraries, in this case apexcharts js and react-pdf/renderer
              </Text>
            </View>
            <View style={styles.section}>
              <Text style={{marginBottom: 10}}>Section #2</Text>
              <Text style={{fontSize: 12, marginBottom: 10}}>
                Here is some random content explaining stuffs and things that are important to understand the next chart that will be presented overthere, also this is expected to probably have another important image
              </Text>
              <Image src={chartImage} style={styles.image} />
            </View>
          </Page>
        </Document>
      </PDFViewer>}
    </div>
  );
}

export default App;
