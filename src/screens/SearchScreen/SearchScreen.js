import React, { useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import AppButton from "../../components/atoms/AppButton/AppButton";
import { getCityWeather } from "../../../helpers/http";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../themes/styles/colors";
import { useDispatch, useSelector } from "react-redux";
import { toggleUnit } from "../../../store/unitSlice";
import CitiesListItem from "../../components/molecules/CitiesList/CitiesListItem";
import SearchHeader from "./SearchHeader/SearchHeader";
import LoadingOverlay from "../../components/atoms/LoadingOverlay/LoadingOverlay";

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

  const [loading, setLoading] = useState(false);

  const getWeather = async (city) => {
    setLoading(true);
    const weather = await getCityWeather(city);
    setLoading(false)
    if (weather) {
      navigation.navigate("CityWeather", {
        weatherData: weather,
      });
    }
  };
  if (loading) {
    return <LoadingOverlay />
  }

  return (
    <FlatList
      ListHeaderComponent={<SearchHeader loading={loading} onSearch={getWeather} />}
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => <CitiesListItem city={itemData.item} />}
      style={styles.cardsContainer}
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
    />
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  cardsContainer: {
    flex: 1,
    paddingVertical: 15,
  },
});
