import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import Colors from '@/constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'

const NoSearchHeader = () => {
    const {top} = useSafeAreaInsets()
  return (
    <BlurView 
    intensity={80}
    tint='extraLight'
    style={{paddingTop:top}}
    >
      <View style={styles.container}>
        {/* <Link href={'/(authenticated)/(tabs)/profile'} asChild>
        <TouchableOpacity style={styles.roundBtn}>
            <Text style={{color:'#fff',fontWeight:'500',fontSize:16}}>
                SG
            </Text>
        </TouchableOpacity>
        </Link> */}
        {/* <View style={styles.searchSection}>
            <Ionicons name="search" size={22} color={Colors.dark}
            style={styles.searchIcon}
            />
            <TextInput 
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={Colors.dark}
            />
        </View> */}

        {/* <View style={styles.circle}>
            <Ionicons name="stats-chart" size={20} color={Colors.dark}
            style={styles.searchIcon}
            />
        </View>

        <View style={styles.circle}>
            <Ionicons name="card" size={20} color={Colors.dark}
            style={styles.searchIcon}
            />
        </View> */}
      </View>
    </BlurView>
  )
}

export default NoSearchHeader

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'transparent',
        gap:10,
        paddingHorizontal:20
    },
    roundBtn:{
        width:40,
        height:40,
        borderRadius:20,
        backgroundColor:Colors.gray,
        alignItems:'center',
        justifyContent:'center'
    },
    searchSection:{
        flex:1,
        flexDirection:'row',
        backgroundColor:Colors.lightGray,
        borderRadius:30,
        alignItems:'center',
        justifyContent:'center'

    },
    searchIcon:{
        padding:10,
    },
    input:{
        flex:1,
        paddingTop:15,
        paddingRight:10,
        paddingBottom:15,
        paddingLeft:10,
        color:Colors.dark,
        fontSize:17
    },
    circle: {
        width:40,
        height:40,
        borderRadius:20,
        backgroundColor:Colors.lightGray,
        alignItems:'center',
        justifyContent:'center'
    }
})