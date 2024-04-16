import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { Link, useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { useSignIn, useSignUp } from '@clerk/clerk-expo'
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
  const { signIn, setActive, isLoaded } = useSignIn();

  const [code, setCode] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const router = useRouter()

  useWarmUpBrowser()

  const {startOAuthFlow:googleAuth} = useOAuth({strategy: 'oauth_google'})
  const {startOAuthFlow:facebookAuth} = useOAuth({strategy: 'oauth_facebook'})

  const onSelectOAuth = async (strategy:Strategy)=>{
    const selectedAuth = {
      [Strategy.Google]:googleAuth,
      [Strategy.Facebook]:facebookAuth,
    }[strategy]

    try {
      const {createdSessionId,setActive} = await selectedAuth()
      console.log("file: login.tsx:31 ~ onSelectAuth ~ createdSessionId: ", createdSessionId)

      if (createdSessionId){
         // @ts-ignore
        setActive({session:createdSessionId})
        router.push('/(authenticated)/(tabs)/home')
      }
    } catch (error:any) {
      Alert.alert('OAuth error',error)
    }
  }

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
      router.push('/(authenticated)/(tabs)/home')
    } catch (err: any) {
      Alert.alert(err);
    }
  };

 
  
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior='padding'
    keyboardVerticalOffset={keyboardVerticalOffset}
    >
    <View style={[defaultStyles.container,{backgroundColor:'#fff'}]}>
      <Text style={defaultStyles.header}>Lets get started!</Text>
      <Text style={defaultStyles.descriptionText}>Login using your Email, Google or Meta account</Text>

        <View style={styles.inputCont}>
        <TextInput autoCapitalize='none' placeholder='Email' 
            style={[styles.inputField]} 
            value={emailAddress}
            onChangeText={(email) => setEmailAddress(email)}
            />
            <TextInput autoCapitalize='none' placeholder='Password' 
            style={[styles.inputField]} 
            value={password}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
            />
        <View style={{gap:15}}>
        <TouchableOpacity style={[defaultStyles.pillButton,{backgroundColor:Colors.primary}]}
        onPress={onSignInPress}
        >
                <Text style={defaultStyles.buttonText}>Continue with Email</Text>
            </TouchableOpacity>
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
    }
})