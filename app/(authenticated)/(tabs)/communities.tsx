import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { defaultStyles } from '@/constants/Styles'
import CommunityCard from '@/components/CommunityCard'
import { useHeaderHeight } from '@react-navigation/elements'
import Colors from '@/constants/Colors'

const Communities = () => {
  const headerHeight = useHeaderHeight()
  return (
    <View style={{flex:1,backgroundColor:Colors.background,paddingTop:headerHeight}}>
        <View style={{paddingHorizontal:20,}}>
        <Text style={defaultStyles.sectionHeader}>Communities</Text>
          <ScrollView horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.scrollViews}
          >
             <CommunityCard />
             <CommunityCard />
             <CommunityCard />
             <CommunityCard />
          </ScrollView>
          </View>
    </View>
  )
}

export default Communities

const styles = StyleSheet.create({
    scrollViews: {
    marginBottom:1, 
    padding:10,
  }
})