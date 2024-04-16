import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const TripDetails = () => {
  const nav = useNavigation()
  return (
    <View>
      <Text>TripDetails</Text>
    </View>
  )
}

export default TripDetails

const styles = StyleSheet.create({})