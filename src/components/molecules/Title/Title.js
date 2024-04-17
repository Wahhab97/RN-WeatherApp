import React from 'react'
import AppText from '../../atoms/AppText/AppText'
import { StyleSheet } from 'react-native';

const Title = ({children}) => {
  return (
    <AppText style={styles.title}>{children}</AppText>
  )
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontWeight: "bold",
  }
});