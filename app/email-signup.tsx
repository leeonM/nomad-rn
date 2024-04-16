import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { Link, useRouter } from 'expo-router'
import Colors from '@/constants/Colors'
import { useSignUp } from '@clerk/clerk-expo'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'

WebBrowser.maybeCompleteAuthSession();


const Page = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter()
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  useWarmUpBrowser()


  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });
 
      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
 
      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      Alert.alert(JSON.stringify(err, null, 2));
    }
  };
 
  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
 
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
 
      await setActive({ session: completeSignUp.createdSessionId });
      router.push('/(authenticated)/(tabs)/home')

    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
    }
  };
 
  // start the sign up process.
  
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 80 : 0
  return (
    <KeyboardAvoidingView style={{flex:1}} behavior='padding'
    keyboardVerticalOffset={keyboardVerticalOffset}
    >
    <View style={[defaultStyles.container,{backgroundColor:'#fff'}]}>

        <View style={styles.inputCont}>
        {!pendingVerification && (
          <>
        <TextInput autoCapitalize='none' placeholder='First Name' 
            style={[styles.inputField]} 
            value={firstName}
            onChangeText={(firstName) => setFirstName(firstName)} 
            />
            <TextInput autoCapitalize='none' placeholder='Last Name' 
            style={[styles.inputField]} 
            value={lastName}
            onChangeText={(lastName) => setLastName(lastName)}
            />
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
            </>
            )}
        <View style={{gap:15}}>
        {pendingVerification ? (
          <View>
          <View>
            <TextInput
            style={[styles.inputField]}
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify}
          style={[defaultStyles.pillButton, {backgroundColor:Colors.primary}]}
          >
            <Text style={[defaultStyles.buttonText,{color:'#fff'}]}>Verify Email</Text>
          </TouchableOpacity>
        </View>
        ):
        (
        <>
        <TouchableOpacity style={[defaultStyles.pillButton,{backgroundColor:Colors.primary}]}
        onPress={onSignUpPress}
        >
                <Text style={defaultStyles.buttonText}>Continue with Email</Text>
            </TouchableOpacity>
          </>)}
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