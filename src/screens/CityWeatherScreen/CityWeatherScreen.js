import React, { useLayoutEffect, useState } from "react";
import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import IoniconsButton from "../../components/molecules/IoniconsButton/IoniconsButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../../store/favoritesSlice";
import { colors } from "../../../themes/styles/colors";
import AppText from "../../components/atoms/AppText/AppText";
import Title from "../../components/molecules/Title/Title";
import { formatTempBasedOnUnit } from "../../../helpers/formatTemp";
import { FontAwesome5 } from "@expo/vector-icons";
import WeatherIcon from "../../components/atoms/WeatherIcon/WeatherIcon";
import {styles} from "./CityWeatherScreen.styles";

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
            <WeatherIcon icon={icon}/>
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
