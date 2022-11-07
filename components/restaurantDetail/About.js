import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { Icon } from 'react-native-elements';
import RestaurantDetailComponent from '../RestaurantDetailComponent';
import { apikey } from '../../global';

  
export default function About(props) {

  const {restaurant} = props.route.params

  const {name, image_url, price, review_count, rating, categories, collectTime} = restaurant;

  const [restaurantDetail, setRestaurantDetail] = useState(false)
  

//const {name, image, price, reviews, rating, categories, collectTime} = props.route.params;

//const formattedCategories = categories.map((cat)=>cat.title).join('•')

//const formattedCategories = categories.map((cat)=>cat.title).join('•')
//const description = `${formattedCategories} ${price?'•'+price:""} • 🎫 • ${rating} ⭐ (${review_count}+)`
const description = `⭐${rating} (${review_count}+ ratings) • ${price}• 🎫`
  return (
     
    <View style={styles.container}>
      {/* <RestaurantImage image={image_url} navigation={props.navigation}/> */}
      <RestaurantName name={name}/>


      <TouchableOpacity onPress={()=>setRestaurantDetail(true)}>

      <RestaurantDescription 
      description={description} 
      collectTime={collectTime}
       
      
      />
      <View style={styles.open}>
        <Text style={styles.openText}>Open until 2:00 AM</Text>
        </View>

      </TouchableOpacity>


     

       <RestaurantDetailComponent restaurant={restaurant} 
       visible={restaurantDetail} setVisible={setRestaurantDetail}
       userLocation={props.userLocation} mapRef={props.mapRef} apikey={props.apikey}/>
    </View>
    
     
     
  )
}

const RestaurantImage = (props)=>(

    // <Image 
    // source={{uri: props.image}}
    // style={{width: "100%", height: 180}}
    // />

  <ImageBackground

    style={styles.container}
    source={{uri: props.image }}
  >

    {/* <ArrowBack navigation={props.navigation}/> */}


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

export const RestaurantName = (props) => (
<Text style={{
    fontSize: 29,
    fontWeight:Platform.OS === "android"?"bold":"600",
    marginTop: 10, 
   // marginHorizontal: 15,
}}
>{props.name}</Text>
)

export const RestaurantDescription = (props)=>(
     
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
    

   // marginTop: StatusBar.currentHeight

  // marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },

  textDescription: {

    fontWeight:Platform.OS === "android"?"bold":"400",
    fontSize: 15.5,

  },
  openText: {

    //fontWeight:Platform.OS === "android"?"bold":"400",
    fontSize: 14.5,
    color: "grey",
   // marginLeft: 10

  },
  open: {
  // marginLeft: 10,
   marginBottom: 10
  }

})
