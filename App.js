import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Switch, Text, View } from "react-native";
import { colors } from "./themes/styles/colors";
import SearchScreen from "./src/screens/SearchScreen/SearchScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Title from "./src/components/molecules/Title/Title";
import CityWeatherScreen from "./src/screens/CityWeatherScreen/CityWeatherScreen";
import { Provider } from "react-redux";
import { persistor, store } from "./store/configureStore";
import { PersistGate } from "redux-persist/es/integration/react";
import AppButton from "./src/components/atoms/AppButton/AppButton";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
        <StatusBar style="light" />
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTintColor: colors.primaryText,
                headerStyle: {
                  backgroundColor: colors.secondaryBackground,
                },
                headerTitle: ({children}) => <Title>{children}</Title>,
                contentStyle: {
                  padding: 16,
                  backgroundColor: colors.primaryBackground,
                },
              }}
            >
              <Stack.Screen
                name="Search"
                component={SearchScreen}
              />
              <Stack.Screen
                name="CityWeather"
                component={CityWeatherScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      {/* </PersistGate> */}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondaryBackground,
  },
});
