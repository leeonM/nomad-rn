import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { defaultStyles } from '@/constants/Styles'
import Colors from '@/constants/Colors'

const Page = () => {
  return (
    <View style={styles.container}>
      <View style={{alignItems:'center',marginTop:200}}>
      <Image 
      source={require('@/assets/images/logo.png')}
      style={styles.logo}
      />
        <Text style={styles.header}>Find your travel tribe around the world</Text>
      </View>
      

      <View style={styles.buttons}>
        <Link href={'/login'} asChild style={[defaultStyles.pillButton,{flex:1, backgroundColor:Colors.dark}]}>
        <TouchableOpacity>
            <Text style={{color:'white', fontSize:22, fontWeight:'500'}}>Login</Text>
        </TouchableOpacity>
        </Link>
        <Link href={'/signup'} asChild style={[defaultStyles.pillButton,{flex:1, backgroundColor:'#fff',borderWidth:2}]}>
        <TouchableOpacity>
            <Text style={{fontSize:22, fontWeight:'500'}}>Signup</Text>
        </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        justifyContent:'space-between'
    },
    header: {
        fontSize:36,
        fontWeight:'800'
    },
    logo: {
        height:250,
        width:250,
        alignSelf: 'center'

    },
    buttons:{
        flexDirection:'row',
        justifyContent:'center',
        gap:20,
        marginBottom:100,
        paddingHorizontal:20
    }
})