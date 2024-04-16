import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import TripCard from './TripCard'

type TripListProps = {
    userId?:string
    heading: 'My' | 'Liked' | 'Popular' | 'New'
    trips:any
}

const TripList = ({userId,heading,trips}:TripListProps) => {
  return (
    <View>
          <Text style={defaultStyles.sectionHeader}>{heading} Trips</Text>

             <FlatList 
                data={trips}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                style={styles.scrollViews}
                contentContainerStyle={{paddingRight:20}}
                renderItem={({item,index})=>(
                <TripCard item={item} key={index} />
            )} 
            />
        </View>
  )
}

export default TripList

const styles = StyleSheet.create({
    scrollViews: {
        marginBottom:1, 
        padding:10,
        paddingHorizontal:20,
        
      }
})