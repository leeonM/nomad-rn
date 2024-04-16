import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SignupEmail = () => {

  const onSignUpEmail = async () => {
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
      console.error(JSON.stringify(err, null, 2));
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
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };
  return (
    <View>
    {!pendingVerification && (
      <View style={styles.inputCont}>
      <View>
          <TextInput
            style={styles.inputField}
            autoCapitalize="none"
            value={firstName}
            placeholder="First Name..."
            onChangeText={(firstName) => setFirstName(firstName)}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputField}
            autoCapitalize="none"
            value={lastName}
            placeholder="Last Name..."
            onChangeText={(lastName) => setLastName(lastName)}
          />
        </View>
        <View>
          <TextInput
            style={styles.inputField}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
          />
        </View>

        <View>
          <TextInput
            style={styles.inputField}
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
          <View style={{gap:15}}>
          <TouchableOpacity onPress={onSignUpEmail}
        style={[defaultStyles.pillButton, {marginTop:20, backgroundColor:Colors.primary}]}
        >
          <Text style={defaultStyles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={()=>onSelectAuth(Strategy.Google)}
        style={[defaultStyles.pillButton, {backgroundColor:Colors.primary, flexDirection:'row',gap:2}]}
        >
          <Ionicons name="logo-google" size={24} color={'#fff'}  />
          <Text style={[defaultStyles.buttonText,{color:'#fff'}]}>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity  onPress={()=>onSelectAuth(Strategy.Facebook)}
        style={[defaultStyles.pillButton, {backgroundColor:Colors.primary,flexDirection:'row',gap:2}]}
        >
          <Ionicons name="logo-facebook" size={24} color={'#fff'}  />
          <Text style={[defaultStyles.buttonText,{color:'#fff'}]}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>

          </View>
      </View>
    )}
    {pendingVerification && (
      <View>
        <View>
          <TextInput
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />
        </View>
        <TouchableOpacity onPress={onPressVerify}
        style={[defaultStyles.pillButton, {marginTop:20, backgroundColor:Colors.primary}]}
        >
          <Text style={defaultStyles.buttonText}>Verify Email</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
  )
}

export default SignupEmail

const styles = StyleSheet.create({})