import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

const ScreenWrapper = ({children, style}) => {
  return (
    <ScrollView alwaysBounceVertical={false} style={[styles.container, style]}>
      {children}
    </ScrollView>
  )
}

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  }
});