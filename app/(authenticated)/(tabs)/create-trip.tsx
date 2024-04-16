import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { useHeaderHeight } from '@react-navigation/elements'
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { defaultStyles } from '@/constants/Styles'
import TripForm from '@/components/TripForm'
import Colors from '@/constants/Colors'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';



const CreateTrip = () => {
  const headerHeight = useHeaderHeight()
  const userId = '1'
  return (
      <ScrollView style={{backgroundColor: Colors.background,marginBottom:85}}
      contentContainerStyle={{ 
        paddingTop: headerHeight,
      }}
      >
        <TripForm userId={userId} type="Create" />
      </ScrollView>
  )
}

export default CreateTrip

const styles = StyleSheet.create({
  
})