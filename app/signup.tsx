import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback} from 'react'
import { defaultStyles } from '@/constants/Styles'
import { Link, useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

enum Strategy {
    Google = 'oauth_google',
    Facebook = 'oauth_facebook',
  }


const Page = () => {
  useWarmUpBrowser();
  const router = useRouter()


  const {startOAuthFlow:googleAuth} = useOAuth({strategy: 'oauth_google'})
  const {startOAuthFlow:facebookAuth} = useOAuth({strategy: 'oauth_facebook'})

  const onSelectOAuth = useCallback(async (strategy:Strategy)=>{
    const selectedAuth = {
      [Strategy.Google]:googleAuth,
      [Strategy.Facebook]:facebookAuth,
    }[strategy]

    try {
      const {createdSessionId,signUp,signIn,setActive} = await selectedAuth()
      console.log("file: login.tsx:31 ~ onSelectAuth ~ createdSessionId: ", createdSessionId)

      if (createdSessionId){
        // @ts-ignore
        setActive({session:createdSessionId})
        router.push('/(authenticated)/(tabs)/home')
      }
    } catch (error:any) {
      Alert.alert('OAuth error',error)
    }
  },[])

  
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior='padding'
    keyboardVerticalOffset={keyboardVerticalOffset}
    >
    <View style={[defaultStyles.container,{backgroundColor:'#fff'}]}>
      <Text style={defaultStyles.header}>Lets get started!</Text>
      <Text style={defaultStyles.descriptionText}>Signup using your username, email, Google or Facebook</Text>

        <View style={styles.inputCont}>
        <Link href={'/login'} replace asChild>
            <TouchableOpacity>
                <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
            </TouchableOpacity>
        </Link>
        <View style={{gap:15}}>
          <Link href={'/email-signup'} asChild>
              <TouchableOpacity style={styles.emailButton}>
                <Text style={defaultStyles.buttonText}>Continue with Email</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity  onPress={()=>onSelectOAuth(Strategy.Google)}
          style={[defaultStyles.pillButton, {backgroundColor:Colors.primary, flexDirection:'row',gap:2}]}
          >
            <Ionicons name="logo-google" size={24} color={'#fff'}  />
            <Text style={[defaultStyles.buttonText,{color:'#fff'}]}>
              Continue with Google
            </Text>
          </TouchableOpacity>

          <TouchableOpacity  onPress={()=>onSelectOAuth(Strategy.Facebook)}
          style={[defaultStyles.pillButton, {backgroundColor:Colors.primary,flexDirection:'row',gap:2}]}
          >
            <FontAwesome6 name="meta" size={24} color={'#fff'}  />
            <Text style={[defaultStyles.buttonText,{color:'#fff'}]}>
              Continue with Meta
            </Text>
          </TouchableOpacity>
            </View>
        </View>
    </View>
    </KeyboardAvoidingView>
  )
}

export default Page

const styles = StyleSheet.create({
  inputContainer: {
      marginVertical:40,
      flexDirection:'row'
  },
  enabled:{
      backgroundColor:Colors.primary
  },
  disabled:{
      backgroundColor:Colors.primaryMuted
  },
  inputField: {
      height: 60,
      width:'95%',
      borderWidth:1,
      borderColor:Colors.lightGray,
      borderRadius:10,
      marginVertical:5,
      padding:15,
      marginBottom:20,
      alignSelf:'center',
      fontSize:20
  },
  inputCont: {
      flexDirection:'column',
      marginTop:20
  },
  emailButton: {
    marginTop:20,
    backgroundColor:Colors.primary,
    padding: 10,
    height: 60,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  }
})