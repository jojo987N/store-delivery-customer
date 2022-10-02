import { View, Text, StyleSheet, StatusBar} from 'react-native'
import React from 'react'
import StoreItems from '../components/home/StoreItems'
import HeaderTabs from '../components/home/HeaderTabs'
import HomeHeader from '../components/home/HomeHeader'
import SearchBar from '../components/home/SearchBar'

export default function StoreSearchResults({route, navigation}) {

    const {storeData} = route.params
  return (
      <View style={styles.container}>
          <View style={{ backgroundColor: "white", padding: 15 }}>

              <HomeHeader navigation={navigation} />
              
          </View>
          <StoreItems storeData={storeData} navigation={navigation} size="100%" />
      </View>
    
  )
}

const styles = StyleSheet.create({
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
})