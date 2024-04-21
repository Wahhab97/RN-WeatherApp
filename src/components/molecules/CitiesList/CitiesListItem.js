import React from "react";
import Card from "../../atoms/Card/Card";
import { Pressable, StyleSheet, View } from "react-native";
import NoCity from "./NoCity";
import AppText from "../../atoms/AppText/AppText";
import { useNavigation } from "@react-navigation/native";



const CitiesListItem = ({ cities }) => {
  const navigation = useNavigation();
  const cardPressHandler = () => {
    navigation.navigate("CityWeather")
  }

  // TODO: Remove Comment
  // if (!cities) {
  //   return <NoCity />;
  // }

  return (
    <Pressable style={({pressed}) => pressed && styles.pressed}>
      <Card style={styles.card}>
        <View style={styles.container}>
          <AppText style={styles.title}>City</AppText>
          <AppText style={styles.temperature}>15°</AppText>
        </View>
        <View style={styles.brief}>
          <AppText>Mostly Cloudy</AppText>
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
  temperature: {
    fontSize: 18,
  },
  time: {},
  brief: {
    alignSelf: "flex-end",
    marginHorizontal: 15,
    marginBottom: 5,
  },
});
