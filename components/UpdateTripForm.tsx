import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '@/constants/Styles'
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
import { app } from '@/firebaseConfig'
import { Formik } from 'formik';
import {Picker} from '@react-native-picker/picker';
import Colors from '@/constants/Colors';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { useUser } from '@clerk/clerk-expo';
import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';
import * as Yup from 'yup';


type TripFormProps =
 {
    userId: string
    type: 'Update' 
    trip?: any
    tripId?: string
    communityId?: string
}

type CategoryItem = {
  icon:string
  name:string
}

const TripForm = ({userId, type, trip, tripId, communityId}:TripFormProps) => {
  const db = getFirestore(app)
  const storage = getStorage()
  const {user}:any = useUser()
  const [image, setImage] = useState<any>(null);
  const [categoryList, setCategoryList] = useState<any>([])
  const [loading, setLoading] = useState(false)

  const getCategoryList = async () => {
    setCategoryList([])
    const querySnapshot = await getDocs(collection(db,'Category'))
    querySnapshot.forEach((doc)=>{
      // console.log(doc.id,"=>",doc.data())
      setCategoryList((categoryList:any)=>[...categoryList,doc.data()])
    })
  }

  useEffect(()=>{
    getCategoryList()
  },[])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      // @ts-ignore
      setImage(result.assets[0].uri);
    }
  }

  const onSubmitMethod = async (value:any)=>{
    setLoading(true)
    // convert uri to blob file
    const resp = await fetch(image);
    const blob = await resp.blob();
    const storageRef = ref(storage, 'tripPost/'+Date.now()+".jpg")

    uploadBytes(storageRef, blob).then((snapshot)=>{
      console.log('Uploaded a blob file')
    }).then((resp)=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl)
        value.image=downloadUrl;
        value.userName = user.fullName
        value.userEmail = user.primaryEmailAddress.emailAddress
        value.userImage = user.imageUrl
        const docRef = await addDoc(collection(db,"TripPost"),value)
        if(docRef.id){
          setLoading(false)
          Alert.alert('Success','Post added successfully')
        }
      })
    })
  }

  const tripSchema = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Trip title required'),
    desc: Yup.string()
      .min(2, 'Too Short!')
      .max(500, 'Too Long!')
      .required('Description required'),
    country: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Country required'),
    city: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('City required'),
  });


  return (
    <KeyboardAvoidingView style={{flex:1,justifyContent:'center'}}>
      <Text style={[defaultStyles.header,{padding:15}]}>Create Trip</Text>
    <Formik
    initialValues={{title:'',category:'',desc:'',image:'',date:new Date(),country:'',city:''}}
    validationSchema={tripSchema}
    onSubmit={(value)=>onSubmitMethod(value)}
    >
        {({handleChange,handleBlur,handleSubmit,touched,isValid,setFieldValue,setFieldTouched,values,errors})=>(
          <View style={{padding:10}}>
            <TouchableOpacity onPress={pickImage}>
             {image ? (
              <Image source={{uri:image}}
              style={{
                width:100,height:100,borderRadius:15,marginBottom:5
              }}
               />
            ):(
              <Image source={require('@/assets/images/placeholder.jpg')} 
            style={{
              width:100,height:100,borderRadius:15,marginBottom:5
            }}
            />
            )}
            </TouchableOpacity>
            <TextInput 
            style={styles.input} 
            placeholder='Trip Title'
            value={values?.title}
            onChangeText={handleChange('title')}
            onBlur={()=>setFieldTouched('title')}
            />
            {touched.title && errors.title && (
              <Text style={styles.errorTxt}>{errors.title}</Text>
            )}
            <View>
            <TextInput 
            style={styles.descInput} 
            multiline={true}
            placeholder='Description' 
            value={values?.desc}
            onChangeText={handleChange('desc')}
            onBlur={()=>setFieldTouched('desc')}

            />
            {touched.desc && errors.desc && (
              <Text style={styles.errorTxt}>{errors.desc}</Text>
            )}
            </View>
            {loading && <ActivityIndicator size="large" />}
            <Picker
            selectedValue={values?.category}
            onValueChange={(itemValue)=>setFieldValue('category',itemValue)}
            >
            {categoryList&&categoryList.map((item:any,index:any)=>(
              <Picker.Item key={index} label={item.name} value={item.name} />
            ))}
            </Picker>
            <DateTimePicker 
            mode="date" 
            value={new Date(values?.date)}
            minimumDate={new Date()}
            style={{marginBottom:10,flexDirection:'row',alignSelf: 'flex-start'}} 
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || values.date; // Fallback to old value if cancelled
              setFieldValue('date', currentDate);
            }}
            />
            <TextInput 
            style={styles.input} 
            placeholder='Country'
            value={values?.country}
            onChangeText={handleChange('country')}
            onBlur={()=>setFieldTouched('country')}
            />
            {touched.country && errors.country && (
              <Text style={styles.errorTxt}>{errors.country}</Text>
            )}
            <TextInput 
            style={styles.input} 
            placeholder='City'
            value={values?.city}
            onChangeText={handleChange('city')}
            onBlur={()=>setFieldTouched('city')}
            />
            {touched.city && errors.city && (
              <Text style={styles.errorTxt}>{errors.city}</Text>
            )}
            <View style={{padding:10}}>
            <TouchableOpacity 
            onPress={()=>handleSubmit()}
            style={[defaultStyles.pillButton,{backgroundColor:loading || !isValid ? Colors.lightGray:Colors.primary}]}
            disabled={loading || !isValid}

            >
              <Text style={defaultStyles.buttonText}>{loading ? 'Loading':`${type} Trip`}</Text>
            </TouchableOpacity>
            </View>
          </View>
        )}
    </Formik>
  </KeyboardAvoidingView>
  )
}

export default TripForm

const styles = StyleSheet.create({
  input:{
    height: 50,
    width:'100%',
    borderWidth:1,
    borderColor:Colors.lightGray,
    borderRadius:10,
    marginVertical:5,
    padding:15,
    marginBottom:15,
    alignSelf:'center',
    fontSize:20,
    backgroundColor:'#fff'
  },
  descInput:{
    backgroundColor:'#fff',
    height:130,
    width:'100%',
    borderWidth:1,
    borderColor:Colors.lightGray,
    borderRadius:10,
    marginVertical:5,
    padding:15,
    marginBottom:20,
    alignSelf:'center',
    fontSize:20,
  },
  errorTxt:{
    fontSize:15,
    color:'red'
  }
})