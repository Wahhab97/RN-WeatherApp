import React, { useLayoutEffect, useState } from "react";
import { Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import IoniconsButton from "../../components/molecules/IoniconsButton/IoniconsButton";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../../store/favoritesSlice";
import { colors } from "../../../themes/styles/colors";
import AppText from "../../components/atoms/AppText/AppText";

const CityWeatherScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);

  const city = route?.params?.weatherData?.name;
  const [isFavorite, setIsFavorite] = useState(favorites.find(item => item.name === city));

  const handleFavorite = () => {
    if(isFavorite) {
      dispatch(removeFavorite(route.params.weatherData.name));
      setIsFavorite(false);
    } else {
      dispatch(addFavorite(route.params.weatherData));
      setIsFavorite(true);
    }
  }

  useLayoutEffect(() => {
    if (city) {
      navigation.setOptions({
        title: route.params.weatherData.name,
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
    return <View>
      <AppText>There is No City Information!</AppText>
    </View>
  }
};

export default CityWeatherScreen;
