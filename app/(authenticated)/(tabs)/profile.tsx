import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo'
import { BlurView } from 'expo-blur'
import Colors from '@/constants/Colors'
import { useHeaderHeight } from '@react-navigation/elements'
import { Ionicons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import { defaultStyles } from '@/constants/Styles'
import TripCard from '@/components/TripCard'
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
import { app } from '@/firebaseConfig'
import TripList from '@/components/TripList'
import NoItemsFound from '@/components/NoItemsFound'

const Page = () => {
  const headerHeight = useHeaderHeight()
  const db = getFirestore(app)
  const storage = getStorage()
  const {user}:any = useUser()
  const {signOut} = useAuth()
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const [edit, setEdit] = useState(false)
  const [trips, setTrips] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const onSaveUser = async () => {
    try {
      await user?.update({firstName:firstName!,lastName:lastName!})
      setEdit(false)
    } catch (error) {
      console.error(error)
      Alert.alert('Something went wrong')
    } finally {
      setEdit(false)
    }
  }

  const onCaptureImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes:ImagePicker.MediaTypeOptions.Images,
    allowsEditing:true,
    aspect:[4,3,],
    quality:0.75,
    base64:true
    })

    if (!result.canceled) {
        const base64 = `data.image/jpeg;base64,${result.assets[0].base64}`;
        user?.setProfileImage({
            file:base64,
        })
    }
}

const getTripsByUser = async () => {
  setTrips([])
  setLoading(true)
  const q = query(collection(db,'TripPost'),where('userId','==',user?.id))
  const querySnapshot = await getDocs(q)
  querySnapshot.forEach(doc=>{
      setTrips((trips:any)=>[...trips,doc.data()])
      setLoading(false)
  })
}

useEffect(() => {
  getTripsByUser()
}, [])

  return (
    <KeyboardAvoidingView style={{flex:1,backgroundColor:Colors.background,paddingTop:headerHeight}}>
      <View
      style={{paddingTop:50,alignItems: 'center'}}
      >
        <TouchableOpacity onPress={onCaptureImage}
        style={styles.captureBtn}
        >
          {user?.imageUrl && <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />}
        </TouchableOpacity>
        <View style={{flexDirection:'row',gap:6}}>
            {!edit && (
                  <View style={styles.editRow}>
                        <Text style={{fontSize:26}}>{firstName} {lastName}</Text> 
                        <TouchableOpacity onPress={()=>setEdit(!edit)}>
                          <Ionicons name="ellipsis-horizontal" size={26} />
                      </TouchableOpacity>
                  </View>
                )}
            {edit && (
                  <View style={styles.editRow}>
                        <TextInput 
                        style={[styles.inputField]}
                        placeholder='First Name' 
                        value={firstName || ''} 
                        onChangeText={setFirstName}/>
                        <TextInput 
                        style={[styles.inputField]}
                        placeholder='Last Name' 
                        value={lastName || ''} 
                        onChangeText={setLastName} />
                        <TouchableOpacity onPress={onSaveUser}>
                          <Ionicons name="checkmark-outline" size={26} />
                      </TouchableOpacity>
                  </View>
              )}
        </View>
        </View>

        <View style={styles.actions}>
        <TouchableOpacity style={styles.btn} onPress={() => signOut()}>
          <Ionicons name="log-out" size={24}  />
          <Text style={{  fontSize: 18 }}>Log out</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Ionicons name="megaphone" size={24}  />
          <Text style={{  flex:1,fontSize: 18 }}>Inbox</Text>
          <View
            style={{
              backgroundColor: Colors.primary,
              paddingHorizontal: 10,
              borderRadius: 10,
              justifyContent: 'center',
            }}>
            <Text style={{ color: '#fff', fontSize: 12 }}>14</Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView style={{flex:1,marginBottom:100}}>
      {loading? 
      <ActivityIndicator size={'large'} style={{marginVertical:100}} />
            : 
       trips?.length>0 ? <TripList trips={trips} 
        heading={'My'} />:
        <NoItemsFound heading={'My'} subHeading={`Why don't you create a trip`} />
        }
      {loading ? 
        <ActivityIndicator size={'large'} style={{marginVertical:100}} />
      :trips?.length>0 ? <TripList trips={trips} 
      heading={'Liked'} />:<NoItemsFound heading={'Liked'} subHeading={`Why don't you like a trip`} />}     
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Page

const styles = StyleSheet.create({
  editRow: {
    flex:1,
    flexDirection:'row',
    gap:12,
    alignItems: 'center',
    justifyContent:'center',
    marginTop:20
  },
  captureBtn: {
    width:100,
    height:100,
    borderRadius:50,
    backgroundColor:Colors.gray,
    justifyContent:'center',
    alignItems: 'center',
  },
  avatar: {
    width:100,
    height:100,
    borderRadius:50,
    backgroundColor:Colors.gray,
},
  inputField: {
    height:44,
    borderWidth:1,
    borderColor:Colors.gray,
    borderRadius:8,
    padding:10,
    width:140,
    fontSize:18
  },
  actions: {
    borderRadius:16,
    gap:0,
    margin:20,
    backgroundColor:Colors.lightGray,
},
  btn: {
    padding:14,
    flexDirection: 'row',
    gap:20
}
})