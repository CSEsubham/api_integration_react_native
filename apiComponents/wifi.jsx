import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet, PermissionsAndroid, Platform } from "react-native";
import { NetworkInfo } from "react-native-network-info";
import NetInfo from "@react-native-community/netinfo";

const Wifi = () => {
  const [wifiDetails, setWifiDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const fetchNetworkInfo = async () => {
      try {
        // Request Location Permission (Needed for WiFi SSID on Android 10+)
        if (Platform.OS === "android") {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );

          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            console.warn("Location permission denied. Cannot fetch WiFi SSID.");
            setLoading(false);
            return;
          }
        }

        // Fetch network info
        const ssid = await NetworkInfo.getSSID();
        const ipAddress = await NetworkInfo.getIPAddress();

        // Check internet connection
        const netState = await NetInfo.fetch();
        setIsConnected(netState.isConnected);

        setWifiDetails({
          ssid: ssid || "Unknown",
          ipAddress: ipAddress || "Unknown",
        });
      } catch (error) {
        console.error("Error fetching WiFi details:", error);
      }
      setLoading(false);
    };

    fetchNetworkInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connected WiFi Info</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : wifiDetails ? (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>SSID: {wifiDetails.ssid}</Text>
          <Text style={styles.infoText}>IP Address: {wifiDetails.ipAddress}</Text>
          <Text style={styles.infoText}>
            Internet Status: {isConnected ? "Connected ✅" : "Disconnected ❌"}
          </Text>
        </View>
      ) : (
        <Text style={styles.errorText}>No WiFi connection found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
    marginVertical: 5,
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
});

export default Wifi;
