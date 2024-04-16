import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { formatDateTime } from '@/lib/utils'

type TripCardProps = {
  item:any
}

const TripCard = ({item}:TripCardProps) => {
    const username = item?.userName.toString()
    const navigation = useNavigation()
    const params = useLocalSearchParams()
    const router = useRouter()
  return (
    <>
    <TouchableOpacity
    style={{marginRight:15}}
    onPress={()=>{
      router.push({ pathname: "/(authenticated)/(modals)/trip-details", params: { item: item.id} });
    }}
    >
    <View style={styles.trip}>
    <Image 
      source={{uri:item?.image}}
      style={{height:'55%',width:'100%',borderTopLeftRadius:10,borderTopRightRadius:10}}
      resizeMode="cover"
    />

  <View style={styles.tripInfo}>
      <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{fontSize:18,fontWeight:'600'}}>{item?.title.substring(0,30)}</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
             <Image source={require('@/assets/images/profile-image.png')} 
             style={{height:30,width:30,borderRadius:99}}
             />
             {<Text style={{fontSize:12}}>{username?.substring(0,5)}</Text>}
          </View>
      </View>
      <Text style={{fontSize:15}}>{formatDateTime(item?.date.seconds).dateOnly}</Text>
      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
      <View style={{backgroundColor:Colors.lightGray,alignSelf: 'flex-start', padding:3,borderRadius:10}}>
      <Text style={{fontSize:15,fontWeight:'600',color:Colors.gray}}>{item?.city}, {item?.country}</Text>
      </View>
      <View style={{flexDirection:'row',alignItems:'center'}}>
          <Ionicons name="heart-outline" size={20} />
          <Text style={{fontSize:13}}>8</Text>
      </View>
      </View>
  </View>
</View>
</TouchableOpacity>
</>
  )
}

export default TripCard

const styles = StyleSheet.create({
    trip:{
        height:250, 
        width:'100%',
        marginRight:15,
        borderRadius:10,
        backgroundColor:'white',
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.51,
        elevation: 2
      },
      tripInfo: {
        flexDirection:'column',
        padding:10,
        gap:10
      },
})