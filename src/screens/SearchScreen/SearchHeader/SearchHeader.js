import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AppInput from "../../../components/atoms/AppInput/AppInput";
import AppButton from "../../../components/atoms/AppButton/AppButton";

const SearchHeader = ({loading, onSearch}) => {
  const [city, setCity] = useState("");
  const cityChangeHandler = (value) => {
    setCity(value.nativeEvent.text);
  };

  const pressHandler = () => {
    onSearch(city);
  };

  return (
    <View style={styles.searchContainer}>
      <AppInput
        value={city}
        onChange={cityChangeHandler}
        placeholder="Search for a City"
      />
      <AppButton
        backgroundColor="#dcdcdc"
        onPress={pressHandler}
        disabled={!city || loading}
        style={styles.button}
      >
        Search
      </AppButton>
    </View>
  );
};

export default SearchHeader;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
    width: "90%",
    marginBottom: 20,
  },
  button: {
    padding: 4,
  },
});
