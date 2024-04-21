import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const AppInput = ({onChange, placeholder, style, value}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, style]}
        onChange={onChange}
        placeholder={placeholder}
        placeholderTextColor="#d2d1d1"
        value={value}
      />
    </View>
  )
}

export default AppInput;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#ffffff52",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
  },
  input: {
    height: 25,
    fontSize: 22,
  },
});