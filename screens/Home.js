import { View, Text, SafeAreaView, StatusBar, ScrollView, StyleSheet} from 'react-native'
import React, {useState, useEffect, useRef} from 'react'
import HeaderTabs from '../components/home/HeaderTabs'
//import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'
import SearchBar from '../components/home/SearchBar'
import Categories from '../components/home/Categories'
import RestaurantItems, { localRestaurants } from '../components/home/RestaurantItems'
import { Divider } from 'react-native-elements'
//import BottomTabs from '../components/home/BottomTabs'
import { restaurants, themes } from '../data'
//import { restaurants } from '../firebase'
import HomeHeader from '../components/home/HomeHeader'

import { addRestaurants, getRestaurantsFromFirebase } from '../firebase'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { AntDesign } from '@expo/vector-icons'
import Loader from './Loader'


 




const YELP_API_KEY = "QwzJKvTWZBiTJI3UPgzCD5Ierogxs8yXg2Ko3EpT9cGVhw3oBuHw_H8FI-l8EKAVE29jLo4J9j8ErkiT55KJ8qrCrwF2ov7-1v-aQNwSf-RwPyivoCoisZp3px9OYnYx"

export default function Home({navigation}) {

  //console.log(restaurants)

   //const [restaurantData, setRestaurantData]= useState(localRestaurants)
  // const [restaurantData, setRestaurantData]= useState([]) //ICIIII

  //const [restaurantData, setRestaurantData]= useState(restaurants)

  const [restaurantData, setRestaurantData]= useState()
     
  //const restaurantData = []
  //const restaurantData = restaurants
  //const [city, setCity] = useState("San Francisco");
  const [city, setCity] = useState();
  const [activeTab, setActiveTab]= useState("Delivery")
   

  const flatlist = useRef(null)

  const searchbar = useRef(null)

  const getRestaurantsFromYelp = ()=>{

    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${city}`;
  
    const apiOptions = {
      headers:{
        Authorization: `Bearer ${YELP_API_KEY}`,
      }
    }

    return fetch(yelpUrl, apiOptions)
    .then(res => res.json())
    .then(json => {
      //console.log(json.businesses)
      //addRestaurants(json.businesses.filter((business)=> business.transactions.includes(activeTab.toLowerCase())))
      setRestaurantData(json.businesses.filter((business)=> business.transactions.includes(activeTab.toLowerCase())))
    })
  
  }
  useEffect(()=>{
   // getRestaurantsFromYelp();
  // getRestaurantsFromFirebase()
   // getRestaurantsFromFirebase().then((restaurants)=> setRestaurantData(restaurants))
    
    AsyncStorage.getItem("restaurants").then(value => {
  
      if (!value) {

        getRestaurantsFromFirebase()
        .then((restaurants)=>{
          setRestaurantData(restaurants)

          AsyncStorage.setItem('restaurants', JSON.stringify(restaurants))
        })
      }else{
        AsyncStorage.getItem("restaurants").then(value=>{
          let restaurants = JSON.parse(value)
          setRestaurantData(restaurants)
           
        }).then(() => {
           

        })
      }
    }) 

    let i = 1
          setInterval(()=>{
     
            
           // setTimeout(()=>{

              if (flatlist.current)
              flatlist.current.scrollToIndex({
                animated: true,
                index: i%2===0?0:1
              })

              i++
  
          }, 3000)

        },[])
  
  //},[city, activeTab])

  if(!restaurantData)
  return <Loader />

   
  return (
    <SafeAreaView style={{
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      backgroundColor: "#eee",
      flex: 1
    }}>
     <View style={{flex: 1}}>
      <View style={{ backgroundColor: "white", padding: 15 }}>

        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} navigation={navigation} restaurantData={restaurantData} setCity={setCity} searchbar={searchbar}/>
       <HomeHeader navigation={navigation}/>
        <SearchBar cityHandler={setCity} navigation={navigation} restaurantData={restaurantData} searchbar={searchbar}/>
      </View>
       
       {city?<RestaurantItems restaurantData={restaurantData.filter(restaurant => restaurant.location.city === city)} navigation={navigation}  size="100%"/>
          :
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <Categories /> */}

          <RestaurantItems restaurantData={restaurantData} reward="$60 until $9 reward" navigation={navigation} size="100%" horizontal={true}/>
        
          <RestaurantItems restaurantData={restaurantData}  navigation={navigation} ads={true} size="100%" flatlist={flatlist} horizontal={true}/>
        
           
          <RestaurantRowsItems themes={themes} restaurantData={restaurantData} navigation={navigation} />


          {/* <RestaurantItems restaurantData={restaurantData.filter(restaurant => restaurant.theme === "Everyday savings")}  navigation={navigation} theme="Everyday savings"  horizontal={true}/> */}

        </ScrollView>}
       
      
      <Divider width={1}/>
      {/* <BottomTabs /> */}
     </View>
     </SafeAreaView>
  )
}

const RestaurantRowsItems = ({themes, restaurantData, navigation}) => {

  return themes.map((theme, index)=>{
      return(
        <View key={index}>
          <View style={styles.row}>
            <Text style={styles.rowsTitle}>{theme}</Text>
            <RestaurantItems restaurantData={restaurantData.filter(restaurant => restaurant.theme === theme)} navigation={navigation} horizontal={true} />
          </View>
        </View>
      
      )
    })
  
}

const styles = StyleSheet.create({
  row: {backgroundColor: "white", marginTop: 8},
  rowsTitle: {fontSize: 25, paddingLeft: 15, fontFamily: "Roboto_700Bold", paddingTop: 15}

})
 
 