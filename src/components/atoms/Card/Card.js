import React from 'react'
import { StyleSheet, View } from 'react-native';

const Card = ({children, style}) => {
  const cardStyles = [styles.card, style];

  return (
    <View style={cardStyles}>
      {children}
    </View>
  )
}

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    height: 100,
    width: "90%",
    alignSelf: "center"
  }
});