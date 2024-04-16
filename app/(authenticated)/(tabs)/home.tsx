import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import {useHeaderHeight} from '@react-navigation/elements'
import Colors from '@/constants/Colors'
import { defaultStyles } from '@/constants/Styles'
import TripCard from '@/components/TripCard'
import CommunityCard from '@/components/CommunityCard'
import MiniTripCard from '@/components/MiniTripCard'
import { collection, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore'
import { app } from '@/firebaseConfig'
import { getStorage } from 'firebase/storage'
import { useUser } from '@clerk/clerk-expo'
import TripList from '@/components/TripList'
import NoItemsFound from '@/components/NoItemsFound'


const Page = () => {
  const headerHeight = useHeaderHeight()
  const [newTrips, setNewTrips] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const db = getFirestore(app)
  const storage = getStorage()
  const {user}:any = useUser()

  const getAllTrips = async () => {
    setNewTrips([])
    setLoading(true)
    const q = query(collection(db,'TripPost'),orderBy('date','asc'),limit(6))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(doc=>{
        setNewTrips((trips:any)=>[...trips,doc.data()])
        setLoading(false)
    })
  }
  
  useEffect(() => {
    getAllTrips()
  }, [])

  return (
    <ScrollView style={{backgroundColor:Colors.background,marginBottom:85}}
    contentContainerStyle={{
      paddingTop: headerHeight,
    }}
    >
      <View style={styles.tripsContainer}>

      <View>
          {loading? 
          <ActivityIndicator size={'large'} style={{marginVertical:100}} />
                : 
          newTrips?.length>0 ? <TripList trips={newTrips} 
            heading={'New'} />:
        <NoItemsFound heading={''} subHeading={`Why don't you create a trip`} />
        }
        </View>

          
          <View style={{padding:10,gap:20}}>
          <View style={styles.popularTrips}>
          <Text style={defaultStyles.sectionHeader}>Popular Trips</Text>

          <View style={styles.miniCardContainer}>
            <MiniTripCard />
            <MiniTripCard />
            <MiniTripCard />
            <MiniTripCard />
          </View>
          </View>
          <View style={styles.popularTrips}>
          <Text style={defaultStyles.sectionHeader}>For You</Text>

          <View style={styles.miniCardContainer}>
            <MiniTripCard />
            <MiniTripCard />
            <MiniTripCard />
            <MiniTripCard />
          </View>
          </View>
          </View>
      </View>
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  tripsContainer:{
    flex:1,
    padding:20,
    flexDirection:'column',
  },
  popularTrips: {
    flex:1,
    backgroundColor: '#fff',
    borderRadius:10,
    flexDirection:'column'
  },
  miniCardContainer: {
    marginLeft:20,
    gap:15,
    marginBottom:10
  },
  scrollViews: {
    marginBottom:1, 
    padding:10,
  }
})