import React from 'react'
import Card from '../../atoms/Card/Card'
import { StyleSheet, Text } from 'react-native'
import { colors } from '../../../../themes/styles/colors'

const NoCity = () => {
  return (
    <Card style={styles.noCityContainer}>
        <Text style={styles.noCityText}>Add a city to your favorites!</Text>
      </Card>
  )
}

export default NoCity;

const styles = StyleSheet.create({
  noCityContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#474746"
  },
  noCityText: {
    color: colors.primaryText,
    fontSize: 24,
  }
});