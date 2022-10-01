import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import * as Animatable from "react-native-animatable"
import { appName, APP_CONSTANT } from '../global'
export default function OnboardingScreen({navigation}) {
  const [splash, setSplash]= useState(true)
  setTimeout(()=>{
    setSplash(false)
  }, 4000)
  if(splash)
  return <View style={styles.splash}>
      <Text style={styles.splashText}>{appName.split(' ')[0]}{'\n'}
      <Text style={styles.splashText1}>{appName.split(' ')[1]}</Text></Text>
  </View>
  return (
    <ImageBackground style={{ width: "100%", height: "100%" }}
      source={require("../assets/images/onboarding.jpg")}>
      <Text style={styles.title}>{appName.split(' ')[0]}{'\n'}{appName.split(' ')[1]}</Text>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
      <View style={styles.box}>
        <Text style={styles.discoverText}>{APP_CONSTANT.DISCOVER_STORES}</Text>
        <TouchableOpacity style={styles.button} onPress={()=>{
          navigation.navigate("SignIn")
        }}>
          <Text style={styles.buttonText}>{APP_CONSTANT.CONTINUE}</Text>
        </TouchableOpacity>
      </View>
      </Animatable.View>
    </ImageBackground>
  )
}
const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#006600"
  },
  splashText: {
     fontSize: 50,
     fontFamily: "Roboto_500Medium"
  },
  splashText1: {
    fontWeight: "bold",
    fontSize: 50,
  },
  title: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    marginHorizontal: 40,
    marginTop: 40,
    flex: 1
  },
  box: {
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "black",
    marginHorizontal: 10,
    marginBottom: 10
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    paddingVertical: 18,
    fontSize: 20
  },
  discoverText: {
    fontSize: 25,
    fontFamily: 'Roboto_500Medium',
    marginLeft: 15,
    paddingVertical: 20
  }
})