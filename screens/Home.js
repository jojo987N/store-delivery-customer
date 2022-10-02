import { View, Text, SafeAreaView, StatusBar, ScrollView, StyleSheet} from 'react-native'
import React, {useState, useEffect, useRef, useContext} from 'react'
import HeaderTabs from '../components/home/HeaderTabs'
import SearchBar from '../components/home/SearchBar'
import Categories from '../components/home/Categories'
import StoreItems, { localStores } from '../components/home/StoreItems'
import { Divider } from 'react-native-elements'
import { stores, themes } from '../data'
import HomeHeader from '../components/home/HomeHeader'
import { addStores, getStoresFromFirebase, getStoresFromFirebase } from '../firebase'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons'
import Loader from './Loader'
import { StoresContext } from '../contexts/StoresContext'

export default function Home({navigation}) {
  const {storeData, setStoreData} = useContext(StoresContext)
  const [city, setCity] = useState("Paris");
  const [activeTab, setActiveTab]= useState("Delivery")
  const flatlist = useRef(null)
  const searchbar = useRef(null)
  useEffect(()=>{
    AsyncStorage.getItem("stores").then(value => {
      if (!value) {
        // getStoresFromFirebase()
        getStoresFromFirebase()
        .then((stores)=>{
          setStoreData(stores)
          AsyncStorage.setItem('stores', JSON.stringify(stores))
        })
      }else{
        AsyncStorage.getItem("stores").then(value=>{
          let stores = JSON.parse(value)
          setStoreData(stores)
        }).then(() => {
        })
      }
    }) 
        },[])
  if(!storeData)
  return <Loader />
  return (
    <SafeAreaView style={{
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "#eee",
      flex: 1
    }}>
     <View style={{flex: 1}}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} navigation={navigation} storeData={storeData} setCity={setCity} searchbar={searchbar}/>
       <HomeHeader navigation={navigation}/>
        <SearchBar cityHandler={setCity} navigation={navigation} storeData={storeData} searchbar={searchbar}/>
      </View>
       {city?
       <>
        <Categories navigation={navigation}/>
       <StoreItems storeData={storeData} navigation={navigation}  size="100%"/>
       </>
       :
        <ScrollView showsVerticalScrollIndicator={false}>
          <StoreItems storeData={storeData} reward="$60 until $9 reward" navigation={navigation} size="100%" horizontal={true}/>
          <StoreItems storeData={storeData}  navigation={navigation} ads={true} size="100%" flatlist={flatlist} horizontal={true}/>
          <StoreRowsItems themes={themes} storeData={storeData} navigation={navigation} />
        </ScrollView>}
      <Divider width={1}/>
     </View>
     </SafeAreaView>
  )
}
const StoreRowsItems = ({themes, storeData, navigation}) => {
  return themes.map((theme, index)=>{
      return(
        <View key={index}>
          <View style={styles.row}>
            <StoreItems storeData={storeData} navigation={navigation} horizontal={true} />
          </View>
        </View>
      )
    })
}
const styles = StyleSheet.create({
  row: {backgroundColor: "white", marginTop: 8},
  rowsTitle: {fontSize: 25, paddingLeft: 15, fontFamily: "Roboto_700Bold", paddingTop: 15}
})
 