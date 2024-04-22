import React, { useLayoutEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import IoniconsButton from "../../components/molecules/IoniconsButton/IoniconsButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../../store/favoritesSlice";
import { colors } from "../../../themes/styles/colors";
import AppText from "../../components/atoms/AppText/AppText";
import Title from "../../components/molecules/Title/Title";
import { formatTempBasedOnUnit } from "../../../helpers/formatTemp";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";

const CityWeatherScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const unit = useSelector((state) => state.unit);
  const [isFavorite, setIsFavorite] = useState(
    favorites.find((item) => item.name === route?.params?.weatherData?.name)
  );

  const weather = route?.params?.weatherData;
  const city = weather?.name;
  const temp = formatTempBasedOnUnit(weather.main.temp, unit);
  const tempMax = formatTempBasedOnUnit(weather.main.temp_max, unit);
  const tempMin = formatTempBasedOnUnit(weather.main.temp_min, unit);
  const feelsLike = formatTempBasedOnUnit(weather.main.feels_like, unit);
  const icon = weather.weather[0].icon;

  const handleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(route.params.weatherData.name));
      setIsFavorite(false);
    } else {
      dispatch(addFavorite(route.params.weatherData));
      setIsFavorite(true);
    }
  };

  useLayoutEffect(() => {
    if (city) {
      navigation.setOptions({
        title: "", //route.params.weatherData.name,
        headerRight: () => {
          return (
            <IoniconsButton
              color={colors.primaryText}
              icon={isFavorite ? "star" : "star-outline"}
              size={24}
              onPress={handleFavorite}
            />
          );
        },
      });
    }
  }, [navigation, route, city, isFavorite]);

  if (!city) {
    return (
      <View>
        <AppText>There is No City Information!</AppText>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.general}>
          <Title>{city}</Title>
          <AppText style={styles.text}>{temp}°</AppText>
          <View style={styles.description}>
            <Image
              style={styles.icon}
              source={{
                uri: `https://openweathermap.org/img/wn/${icon}@2x.png`,
              }}
            />
            <AppText style={styles.text}>
              {weather.weather[0].description}
            </AppText>
          </View>
          <View style={[styles.description, styles.minMax]}>
            <AppText style={styles.text}>H: {tempMax}°</AppText>
            <AppText style={styles.text}>L: {tempMin}°</AppText>
          </View>
          <AppText style={styles.textSmall}>Feels Like: {feelsLike}°</AppText>
        </View>
        <View style={styles.general}>
          <View style={styles.wind}>
            <View
              style={{
                transform: [{ rotate: `${weather.wind.deg}deg` }],
              }}
            >
              <FontAwesome5
                name="long-arrow-alt-up"
                size={25}
                color={colors.primaryText}
              />
            </View>
            <AppText style={styles.textSmall}>
              Wind: {weather.wind.speed}km/h at {weather.wind.deg}°
            </AppText>
          </View>
          <AppText style={styles.textSmall}>
            Humidity: {weather.main.humidity}%
          </AppText>
          <AppText style={styles.textSmall}>
            Visibility: {weather.visibility / 1000} km
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default CityWeatherScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  card: {
    padding: 50,
    alignItems: "center",
    justifyContent: "center",
    gap: 60,
    backgroundColor: colors.secondaryBackground,
    borderRadius: 22,
    elevation: 4,
    shadowColor: colors.primaryText,
    shadowRadius: 15,
    shadowOpacity: 0.5,
    shadowOffset: {height: 0, width: 0},
  },
  general: {
    alignItems: "center",
    gap: 7,
  },
  temprature: {},
  description: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  minMax: {
    gap: 25,
  },
  icon: {
    width: 36,
    height: 36,
    backgroundColor: "#bbb",
    borderRadius: 18,
  },
  wind: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  text: {
    fontSize: 24,
  },
  textSmall: {
    fontSize: 20,
  },
});
