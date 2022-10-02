import { View, Text, StyleSheet, StatusBar} from 'react-native'
import React from 'react'
import GroupFoodHeader from '../GroupFoodHeader'
import { ArrowBack } from './About'

export default function StoreDetailHeader({foodsRef, navigation, route}) {
  
    const {store} = route.params
    return (
    <View style={styles.container}>
     
      <GroupFoodHeader foodsRef={foodsRef}/>
    </View>
    
  )
}

const styles = StyleSheet.create({

    container: {
        position: "absolute",
        zIndex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,

    },
    head: {
     flexDirection: "row",
     alignItems: "center"
    },
    title:{
        fontSize: 20,
        fontFamily: "Roboto_500Medium",
    }
})