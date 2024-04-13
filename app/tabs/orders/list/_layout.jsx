import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { withLayoutContext } from 'expo-router'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const TopBar=withLayoutContext(createMaterialTopTabNavigator().Navigator)
export default function _layout() {
  return (
    <SafeAreaView style={{
        flex:1
    }}>
 <TopBar>
    <TopBar.Screen name='index' options={{
        title:'Active'
    }}></TopBar.Screen>
 </TopBar>
    </SafeAreaView>
 
  )
}
