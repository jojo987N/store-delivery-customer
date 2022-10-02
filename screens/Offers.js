import { View, Text, StyleSheet, ScrollView, StatusBar} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { ArrowBack } from '../components/storeDetail/About'
import {stores} from '../data'
import { StoreInfo, StoreImage} from '../components/home/StoreItems'
import Reward from '../components/Reward'

export default function Offers({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.arrow_title}>
          <ArrowBack navigation={navigation}/>
          <Text style={styles.title}>Deals</Text>
           
      </View>
      <ScrollView >
              {stores.map((store, index)=>

               <View key={index} style={styles.storesContainer}>
                   <StoreImage image={store.image_url} />
                   <StoreInfo
                                name={store.name}
                                rating={store.rating}
                                city={store.location.city}/>
                      <Reward store={store}/>
               </View>

              )}
          </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
    
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    marginHorizontal: 10

    },
    arrow_title: {
      flexDirection: "row" ,
      alignItems: "center",

    },
    title: {
       marginLeft : 20,
        fontSize: 25
    },
    storesContainer: {
        marginVertical: 10
    }, 
    
    
    
    
    
    
         
    
    
    
    
    
    
    

})