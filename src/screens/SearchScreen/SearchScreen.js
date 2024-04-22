import React, { useLayoutEffect, useState } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import AppInput from "../../components/atoms/AppInput/AppInput";
import AppButton from "../../components/atoms/AppButton/AppButton";
import { getCityWeather } from "../../../helpers/http";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../themes/styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "../../../store/unitSlice";
import CitiesListItem from "../../components/molecules/CitiesList/CitiesListItem";
import NoCity from "../../components/molecules/CitiesList/NoCity";
import { formatTempBasedOnUnit } from "../../../helpers/formatTemp";

const SearchScreen = () => {
  const navigation = useNavigation();
  const unit = useSelector((state) => state.unit);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const unitPressHandler = () => {
    dispatch(toggleUnit());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Weather",
      headerRight: () => {
        return (
          <AppButton
            backgroundColor={colors.primaryBackground}
            textColor={colors.primaryText}
            onPress={unitPressHandler}
            style={{ width: 40 }}
          >
            °{unit}
          </AppButton>
        );
      },
    });
  }, [navigation, unit]);

  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const cityChangeHandler = (value) => {
    setCity(value.nativeEvent.text);
  };
  const getWeather = async () => {
    const weather = await getCityWeather(city);
    if (weather) {
      navigation.navigate("CityWeather", {
        weatherData: weather,
      });
    }
  };

  return (
    <ScrollView alwaysBounceVertical={false}>
      <View style={styles.searchContainer}>
        <AppInput
          value={city}
          onChange={cityChangeHandler}
          placeholder="Search for a City"
        />
        <AppButton
          backgroundColor="#dcdcdc"
          onPress={getWeather}
          disabled={!city || loading}
          style={styles.button}
        >
          Search
        </AppButton>
      </View>
      <ScrollView style={styles.cardsContainer} alwaysBounceVertical={false}>
        {favorites.length === 0 && <NoCity />}
        {favorites.length > 0 &&
          favorites.map((item) => {
            return <CitiesListItem
              key={item.id}
              city={item}
            />;
          })}
      </ScrollView>
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
    width: "90%",
    marginBottom: 20,
  },
  cardsContainer: {
    flex: 1,
    paddingVertical: 15,
  },
  button: {
    padding: 4,
  },
});
