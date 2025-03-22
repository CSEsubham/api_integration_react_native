import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { CameraScreen } from "react-native-camera-kit";

const BarcodeScanner = () => {
  const [barcodes, setBarcodes] = useState([]);
  const [scanning, setScanning] = useState(true);

  const onBarcodeScan = (event) => {
    if (!event.nativeEvent.codeStringValue) return;
    
    setBarcodes((prev) => {
      const newHistory = [event.nativeEvent.codeStringValue, ...prev];
      return newHistory.slice(0, 5); // Keep only last 5 scanned barcodes
    });
  };

  return (
    <View style={styles.container}>
      {scanning && (
        <CameraScreen
          scanBarcode={true}
          onReadCode={onBarcodeScan}
          showFrame={true}
          laserColor="red"
          frameColor="white"
        />
      )}
      <View style={styles.historyContainer}>
        <Text style={styles.title}>Last 5 Scanned Barcodes:</Text>
        <FlatList
          data={barcodes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.barcode}>{item}</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  historyContainer: {
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  barcode: {
    fontSize: 16,
    backgroundColor: "white",
    padding: 8,
    marginBottom: 5,
    borderRadius: 5,
  },
});

export default BarcodeScanner;
