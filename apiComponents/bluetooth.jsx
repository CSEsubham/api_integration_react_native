import React, { useState } from "react";
import { View, Button, Text } from "react-native";
import { Platform } from "react-native";

const BluetoothScanner = () => {
  const [deviceName, setDeviceName] = useState(null);
  const [error, setError] = useState(null);

  const scanBluetooth = async () => {
    if (Platform.OS !== "web") {
      setError("Web Bluetooth API is only supported on web.");
      return;
    }

    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true, // You can filter by UUIDs or services
      });

      setDeviceName(device.name || "Unnamed Device");
      console.log("Connected to:", device.name);
    } catch (err) {
      setError(err.message);
      console.error("Bluetooth Error:", err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Scan for Bluetooth Devices" onPress={scanBluetooth} color="blue" />
      {deviceName && <Text style={{ marginTop: 10 }}>Connected to: {deviceName}</Text>}
      {error && <Text style={{ color: "red", marginTop: 10 }}>Error: {error}</Text>}
    </View>
  );
};

export default BluetoothScanner;
