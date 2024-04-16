import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'

type NoItemProps = {
    heading:string
    subHeading:string
}

const NoItemsFound = ({heading,subHeading}:NoItemProps) => {
  return (
    <>
      <Text style={defaultStyles.sectionHeader}>{heading} Trips</Text>
      <View style={styles.container}>
      <View style={styles.subContainer}>
      <Text style={{fontSize:18,fontWeight:'700'}}>No Items Found</Text>
        <Text style={{fontSize:14,fontWeight:'500',color:Colors.gray}}>{subHeading}</Text>
      </View>
  </View>
    </>
  )
}

export default NoItemsFound

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    subContainer: {
        flex:1,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: Colors.lightGray,
        height:100,
        width:350,
        borderRadius:16
    }
})