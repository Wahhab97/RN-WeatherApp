import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const AppButton = ({ children, onPress, disabled, style, textColor, backgroundColor }) => {
  const buttonStyle = [styles.container];
  if (disabled) buttonStyle.push(styles.disabledButton);
  if(backgroundColor) buttonStyle.push({backgroundColor: backgroundColor});

  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={buttonStyle}>
          <Text style={{color: textColor}}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    padding: 10,
  },
  disabledButton: {
    opacity: 0.3,
  },
  pressed: {
    opacity: 0.75,
  },
});
