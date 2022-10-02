import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
 import { getStoresFromFirebase, searchStoresByCategory } from '../firebase'
import { categories } from '../data'
import {StoreImage, StoreInfo} from '../components/home/StoreItems'
import Loader from './Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SearchResults({route, navigation}) {
  const [storeData, setStoreData]= useState()
  const [loader, setLoader]  = useState(true)
  useEffect(()=>{
    searchStoresByCategory(route.params.categoryId)
    .then(storesResult => {
      setStoreData(storesResult)
    })
    navigation.setOptions({title: route.params.name})
  },[])
  setTimeout(()=>{
    setLoader(false)
  }, 3000)
    if(loader)
    return <Loader />
  return (
    <View>
       <View>
         <FlatList
         data={storeData}
              keyExtractor={(item, index)=>String(index)}
              renderItem={({item})=>{
                return(
                   <TouchableOpacity onPress={()=>navigation.navigate("StoreDetail",
                   {
                     store: item
                   })}
                   style={styles.itemContainer}>
                   <StoreImage image={item.image} />
                  <StoreInfo
                            name={item.name}
                            rating={item.rating}
                            city={item.city}/>
                    </TouchableOpacity>
                )
                }}/>
       </View>
    </View>
  )
}
const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "white",
  }
})