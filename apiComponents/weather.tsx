import {useState,useEffect} from 'react';
import { View, Text,ActivityIndicator, StyleSheet, Button  } from 'react-native';
import axios from "axios";


const weather = () => {
    
    
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);

    const API_KEY="cede43276040ee568c3953c5ad19bd9c";
    const LAT = 33.44;
    const LON = -94.04;
    const URL = 'https://api.openweathermap.org/data/2.5/weather?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=cede43276040ee568c3953c5ad19bd9c&=';

    useEffect(() => {
      const fetchWeather = async () => {
        try {
          const response = await axios.get(URL);
          setWeather(response.data);
        } catch (error) {
          console.error("Error fetching weather data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchWeather();
    }, []);

console.log(setWeather);
const weatherString = JSON.stringify(weather);
return (
  <View style={styles.container}>
  {loading ? (
    <ActivityIndicator size="large" color="#00f" />
  ) : weather ? (
    <View><>
       <Text style={styles.title}>Weather in us</Text>
       <Text>{weatherString}</Text>

   
      </>
    </View>
  ) : (
    <Text>Error loading weather data.</Text>
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
},
title: {
  fontSize: 20,
  fontWeight: "bold",
  marginBottom: 10,
},
});

export default weather;