import { StyleSheet } from "react-native";
import { colors } from "../../../themes/styles/colors";

export const styles = StyleSheet.create({
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