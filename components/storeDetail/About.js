import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { Icon } from 'react-native-elements';
import StoreDetailComponent from '../StoreDetailComponent';
import { apikey } from '../../global';
import { getCategoriesFromStore } from '../../firebase';
import { CategoriesContext } from '../../contexts/CategoriesContext';

export default function About(props) {
  const {store} = props.route.params
  const {name, image_url, price, review_count, rating, collectTime} = store;
  const [storeDetail, setStoreDetail] = useState(false)
  // const {categories, setCategories} = useContext(CategoriesContext)
  const [categories, setCategories] = useState()
let description;
 if(categories)
description = `⭐${rating} (${review_count}+ ratings) • ${categories[0].name} •${price}• 🎫`
useEffect(()=> {
  getCategoriesFromStore(store.storeId)
  .then(categories => {
    setCategories(categories)
  })
}, [])
return (
    <View style={styles.container}>
      <StoreName name={name}/>
      <TouchableOpacity onPress={()=>setStoreDetail(true)}>
      <StoreDescription 
      description={description} 
      collectTime={collectTime}
      />
      <View style={styles.open}>
        <Text style={styles.openText}>Open until 2:00 AM</Text>
        </View>
      </TouchableOpacity>
       <StoreDetailComponent store={store} 
       visible={storeDetail} setVisible={setStoreDetail}
       userLocation={props.userLocation} mapRef={props.mapRef} apikey={props.apikey}/>
    </View>
  )
}
const StoreImage = (props)=>(
  <ImageBackground
    style={styles.container}
    source={{uri: props.image }}
  >
  </ImageBackground>
);
export const ArrowBack = (props)=>{
  return (
    <View style={styles.view2}>
    <Icon 
      name="arrow-left"
      type="material-community"
      color="black"
      size={25}
      onPress={()=>props.navigation.goBack()}
    />
</View>
  )
}
export const StoreName = (props) => (
<Text style={{
    fontSize: 29,
    fontWeight:Platform.OS === "android"?"bold":"600",
    marginTop: 10, 
}}
>{props.name}</Text>
)
export const StoreDescription = (props)=>(
      <View style={styles.description}>
        <Text style={props.style?{...props.style}:styles.textDescription}>{props.description}</Text>
      </View>
)
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10
  },
  view2: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    margin: 10,
  },
  textDescription: {
    fontWeight:Platform.OS === "android"?"bold":"400",
    fontSize: 15.5,
  },
  openText: {
    fontSize: 14.5,
    color: "grey",
  },
  open: {
   marginBottom: 10
  }
})
