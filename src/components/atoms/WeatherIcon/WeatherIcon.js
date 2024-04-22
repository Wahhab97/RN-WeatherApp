import React from "react";
import { Image, StyleSheet } from "react-native";

const WeatherIcon = ({ icon, style }) => {
  const iconStyles = [styles.icon];
  if (style) {
    iconStyles.push(style)
  };

  return (
    <Image
      style={iconStyles}
      source={{
        uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
      }}
    />
  );
};

export default WeatherIcon;

const styles = StyleSheet.create({
  icon: {
    width: 36,
    height: 36,
    backgroundColor: "#bbb",
    borderRadius: 18,
  },
});
