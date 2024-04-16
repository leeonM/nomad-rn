import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { FontAwesome } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import {BlurView} from 'expo-blur'
import CustomHeader from '@/components/CustomHeader'
import NoSearchHeader from '@/components/NoSearchHeader'

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor:Colors.primary,
        tabBarBackground: () => (
            <BlurView
            intensity={100}
            tint={'extraLight'}
            style={{
                flex:1,
                backgroundColor:'rgba(0,0,0,0.0.5)'
            }}
            />
        ),
        tabBarStyle: {
            backgroundColor: 'transparent',
            position:'absolute',
            bottom:0,
            left:0,
            right:0,
            elevation:0,
            borderTopWidth:0,
        },
        headerTransparent:true,
    }}>
        <Tabs.Screen name="home" options={{
            title:'Home',
            headerTitle:'',
            tabBarIcon: ({size,color})=>(
                <FontAwesome name="home" size={size} color={color} />
            ),
            header:()=> <NoSearchHeader />,
            headerTransparent:true,
        }} />
        <Tabs.Screen name="search" options={{
            title:'Search',
            headerTitle:'',
            tabBarIcon: ({size,color})=>(
                <FontAwesome name="search" size={size} color={color} />
            ),
            headerTransparent:true,
            header:()=> <CustomHeader />,
        }} />
         <Tabs.Screen name="create-trip" options={{
            title:'Create Trip',
            headerTitle:'',
            tabBarIcon: ({size,color})=>(
                <FontAwesome name="plus" size={size} color={color} />
            ),
            header:()=> <NoSearchHeader />,
            headerTransparent:true,
        }} />
         <Tabs.Screen name="communities" options={{
            title:'Communities',
            headerTitle:'',
            tabBarIcon: ({size,color})=>(
                <FontAwesome name="group" size={size} color={color} />
            ),
            headerTransparent:true,
            header:()=> <CustomHeader />,
        }} />
         <Tabs.Screen name="profile" options={{
            title:'Profile',
            headerTitle:'',
            tabBarIcon: ({size,color})=>(
                <FontAwesome name="user-circle" size={size} color={color} />
            ),
            header:()=> <NoSearchHeader />,
            headerTransparent:true,
        }} />
    </Tabs>
  )
}

export default TabsLayout