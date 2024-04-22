import React from "react";
import Card from "../../atoms/Card/Card";
import { Pressable, StyleSheet, View } from "react-native";
import AppText from "../../atoms/AppText/AppText";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../../themes/styles/colors";
import WeatherIcon from "../../atoms/WeatherIcon/WeatherIcon";
import { formatTempBasedOnUnit } from "../../../../helpers/formatTemp";
import { useSelector } from "react-redux";

const CitiesListItem = ({ city }) => {
  const unit = useSelector((state) => state.unit);
  const navigation = useNavigation();
  const cardPressHandler = () => {
    navigation.navigate("CityWeather", {weatherData: city});
  };
  const name = city?.name;
  const description=city?.weather[0]?.main;
  const temperature=formatTempBasedOnUnit(city?.main?.temp, unit);
  const icon=city?.weather[0]?.icon;

  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed} onPress={cardPressHandler}>
      <Card style={styles.card}>
        <View style={styles.container}>
          <AppText style={styles.title}>{name}</AppText>
          <AppText style={styles.text}>{temperature}°</AppText>
        </View>
        <View style={styles.brief}>
          <WeatherIcon icon={icon} style={styles.icon} />
          <AppText style={styles.text}>{description}</AppText>
        </View>
      </Card>
    </Pressable>
  );
};

export default CitiesListItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.7,
  },
  card: {
    justifyContent: "space-between",
    backgroundColor: "#3a4251",
    padding: 8,
    marginBottom: 12,
    elevation: 2,
    shadowColor: colors.primaryText,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 15,
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  text: {
    fontSize: 20,
  },
  brief: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    marginHorizontal: 15,
    marginBottom: 5,
    gap: 5,
  },
  icon: {
    height: 24,
    width: 24,
    borderRadius: 12,
  },
});
