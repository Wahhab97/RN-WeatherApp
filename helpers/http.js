import axios from "axios";
import { weatherKey } from "./keys";
import { Alert } from "react-native";

const axiosInstance = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
});

export const getCityWeather = async (city, units = "metric") => {
  try {
    const response = await axiosInstance.get(`?q=${city}&appid=${weatherKey}&units=${units}`);
    return response.data;
  } catch (error) {
    console.log('error', error);
    console.warn("Could not load city weather, please try again later!");
    Alert.alert("Error", "Could not load entered city weather!");
  }
};