import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'

const CommunityCard = () => {
    const username = 'Bootygroceryking'
  return (
    <>
    <TouchableOpacity>
    <View style={styles.community} >
          <Text style={{fontSize:20,fontWeight:'600'}}>Bali Surfers club</Text>
          <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={{backgroundColor:Colors.lightGray, padding:3,borderRadius:10}}>
                <Text style={{fontSize:15,fontWeight:'600',color:Colors.gray}}>Bali, Indonesia</Text>
             </View>
          </View>
        <View style={{flexDirection:'row',alignItems:'center'}}>
          <Image source={require('@/assets/images/profile-image.png')} 
             style={{height:30,width:30,borderRadius:99}}
             />
          <Text style={{fontSize:12}}>{username.substring(0,5)}</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center', gap:5}}>
          <Ionicons name="heart" size={20} />
          <Text>8</Text>
          <Text>-</Text>
          <FontAwesome name="group" size={20} />
          <Text>10</Text>
          <Text>-</Text>
          <Text>1</Text>
          <FontAwesome name="plane" size={20} />
      </View>
      </View>
    </TouchableOpacity>
    </>
  )
}

export default CommunityCard

const styles = StyleSheet.create({
    community:{
        height:150, 
        width:220,
        borderRadius:10,
        backgroundColor:'white',
        marginRight:15,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent:'center',
        gap:7,
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity:  0.16,
        shadowRadius: 1.51,
        elevation: 2
      },

})