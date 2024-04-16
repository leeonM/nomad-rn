import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'

const MiniTripCard = () => {
  return (
    <>
    <TouchableOpacity style={{paddingRight:20}}>
        <View style={styles.miniCardContainer}>
        <View style={{flexDirection:'row',gap:20,alignItems:'center'}}>
        <Image 
            source={require('@/assets/images/beach.png')}
            style={{height:50,width:50,borderRadius:10}}
            resizeMode="cover"
        />
        <View>
            <Text>Beach Day</Text>
            <Text style={{fontWeight:'600'}}>24th January 2024</Text>
            <Text>Bali,Indonesia</Text>
        </View>
        </View>

        <View>
            <Text>
                10 <AntDesign name='hearto' size={14} />
            </Text>
            <Text style={{flexDirection:'row',alignItems:'center',gap:5}}>
                10 <AntDesign name="message1" size={14} />
            </Text>
        </View>
        </View>
    </TouchableOpacity>
    </>
  )
}

export default MiniTripCard

const styles = StyleSheet.create({
    miniCardContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    }
})