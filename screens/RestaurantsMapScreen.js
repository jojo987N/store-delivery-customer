import { View, Text, useWindowDimensions, Image, ScrollView, Animated, StyleSheet, TouchableOpacity, StatusBar} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import MapView, { Callout, Marker } from 'react-native-maps'
import RestaurantItems from '../components/home/RestaurantItems'
import LottieView from 'lottie-react-native'
import { RestaurantInfo, RestaurantImage} from '../components/home/RestaurantItems'
//import { getDistanceFromLatLonInKm } from '../global'
import { location } from '../global'
import {MaterialIcons} from '@expo/vector-icons';
import { ArrowBack } from '../components/restaurantDetail/About'
import SearchBar from '../components/home/SearchBar'
import BottomSheet from '@gorhom/bottom-sheet'
import Categories from '../components/home/Categories'
import {FlatList} from 'react-native-gesture-handler'
//import { Reward } from './Offers'
import Reward from '../components/Reward'
import { getDistanceFromLatLonInKm } from '../utils'
import { Icon} from 'react-native-elements'





export default function RestaurantsMapScreen({route, navigation}) {
  
  //const {lat, lng} = useSelector((state)=>state.userReducer)

  const {restaurantData} = route.params


  // const restaurantDataSort1 = restaurantData.sort((a, b)=>{

  //   return getDistanceFromLatLonInKm(a.coordinates.latitude, a.coordinates.longitude, 
  //     37.769535,
  //     -122.429213 ) - getDistanceFromLatLonInKm(b.coordinates.latitude, b.coordinates.longitude, 
  //       37.769535,
  //       -122.429213 )
    
  // }).filter(c => getDistanceFromLatLonInKm(c.coordinates.latitude, c.coordinates.longitude,
  //   37.769535,-122.429213)<5)

  // const restaurantDataSort = restaurantData.filter(c => getDistanceFromLatLonInKm(c.coordinates.latitude, c.coordinates.longitude,
  //   37.769535,-122.429213) < 5)

  const restaurantDataSort = restaurantData.filter(c => c.type === "store")

  const { width, height } = useWindowDimensions();

  const [myLocation, setMyLocation] = useState(null)

  const _map = useRef(null)

  const restaurantsRef = useRef(null)

  const [visible, setVisible] = useState(true)

  const [scrollEnabled, setScrollEnabled] = useState(false)

  const [offset, setOffset] = useState(0)
  const [direction, setDirection] = useState("")
  


   

  const [focus, setFocus] = useState(new Array(restaurantData.length).fill({
    backgroundColor:"white",
    color: "black",
    zIndex: 1,
  }))

   
 const setFocusFunction = async (index)=>{

  setFocus([...Array(index).fill({
    backgroundColor:"white",
    color: "black",
    zIndex: 1
  }),{
    backgroundColor:"black",
    color: "white",
    zIndex: 1000
  },...Array(focus.length-index).fill({
    backgroundColor:"white",
    color: "black",
    zIndex: 1
  })])

 }
  
  
  
  

// const smallestDistance = (loc)=>{
  
//  console.log(restaurantData.map((restaurant)=>{
//    return {...restaurant.coordinates, dist: getDistanceFromLatLonInKm(restaurant.coordinates.latitude, 
//       restaurant.coordinates.longitude, loc.coords.latitude,
//       loc.coords.longitude)}
//   }).sort((a,b)=>a.dist - b.dist))
// }

 
  // useEffect(()=>{
  //   location().then((loc)=>{
  //     setMyLocation(loc)
     
     
  //   })
    
  // },[])


//   if(!myLocation)
//   return ( <View style={styles.activityIndicator}>
//     <LottieView
//         style={{ height: 200 }}
//         source={require('../assets/animations/scanner.json')}
//         autoPlay
//         speed={3} />
// </View>)

   
   
  return (
    <View style={{
      //flex: 1,
     // alignItems: "center",
     // justifyContent: "center"
    }}>
      <MapView
         ref={_map}
        initialRegion={{
          latitude: 37.769535,
          longitude: -122.429213,
         // latitude: myLocation.coords.latitude,
        //  longitude: myLocation.coords.longitude,
           
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421

        }}

        style={{
          height: height,
          width: width
        }}
      >
         {/* <Marker  title="nass" description="nasso"
              coordinate={{
                latitude: myLocation.coords.latitude,
                longitude: myLocation.coords.longitude,
              }}
               
            >
              <Image source={require('../assets/images/marker2.png')} style={{
                width: 60,
                height: 60
              }}/>
            </Marker> */}

            <RestaurantMarkers restaurantDataSort={restaurantDataSort} focus={focus} setFocusFunction={setFocusFunction} restaurantsRef={restaurantsRef}
            visible={visible} setVisible={setVisible}/>
              
             

      </MapView>

      <View style={{...styles.header, width: width,}}>
         <ArrowBack navigation={navigation}/>
         <View style={styles.searchbar}>
           <SearchBar />
         </View>
      </View>

      {/* <View style={{position: "absolute", top: 200, zIndex: 1}}>
        <ListButton />
      </View> */}
       
       

     {visible && <BottomSheet  index={1} snapPoints={["20%","40%","95%"]} 
       handleIndicatorStyle={{ backgroundColor: "#d9d9d9", width: 100 }}
       onChange={(index)=>{ 
         
        if(index === 2){

          
          setScrollEnabled(true)
        } 
        if(index === 0){
         }
      }}
      >
        <RestaurantsView restaurantsRef={restaurantsRef} restaurantDataSort={restaurantDataSort} setFocusFunction={setFocusFunction}
     focus={focus} _map={_map} width={width} horizontal={false} Categories={Categories} scrollEnabled={scrollEnabled}
     setDirection={setDirection} setOffset={setOffset} offset={offset} direction={direction}
     setScrollEnabled={setScrollEnabled}/>
      </BottomSheet>}

     
     {!visible && <RestaurantsView restaurantsRef={restaurantsRef} restaurantDataSort={restaurantDataSort} setFocusFunction={setFocusFunction}
     focus={focus} _map={_map} width={width} horizontal={true} setVisible={setVisible}/>}
                 
    </View>
  )
}

const RestaurantsView = ({_map, restaurantsRef, restaurantDataSort, setFocusFunction, focus, width, horizontal,
Categories, scrollEnabled, offset, setOffset, direction, setDirection, setScrollEnabled, setVisible})=>{

  return (
    <View style={horizontal?styles.flatlist:{}}>
     {horizontal && <ListButton setVisible={setVisible}/>}   
    <FlatList
         ref={restaurantsRef}
         horizontal={horizontal}
         data={restaurantDataSort}
         keyExtractor={(item, index)=>index}
         renderItem={({item, index})=>{
         return <View style={{...styles.restaurant, 
          width: horizontal?width*0.9:"auto",  
         }}>
         
         <View style={{...styles.restaurantImage_restaurantInfo, paddingTop:horizontal?15:"auto", paddingVertical:horizontal?"auto":10}}>
            <RestaurantImage image={item.image_url} />
            <RestaurantInfo
                        name={item.name}
                        rating={item.rating}
                        city={item.location.city}/>
             
               {!horizontal && <Reward restaurant={item}/>}
             
           
          </View>

         </View>
      
         }}

         scrollEnabled={scrollEnabled}

         showsHorizontalScrollIndicator={false}

         onScroll={horizontal?(event)=>{

       
          let x = event.nativeEvent.contentOffset.x
          let w = event.nativeEvent.layoutMeasurement.width
           
           let index = Math.round(x/w)
          //console.log(Math.round(x/w))
           

          console.log(index)

          _map.current.animateToRegion({
             latitude: restaurantDataSort[Math.round(x/w)].coordinates.latitude,
             longitude: restaurantDataSort[Math.round(x/w)].coordinates.longitude,
              
             latitudeDelta: 0.0922,
             longitudeDelta: 0.0421
        
           })

            setFocusFunction(index)
        //    .then(()=>restaurantsRef.current.scrollToIndex({
        //     animated: true,
        //     index: index
        // }))
    }:(event)=>{
      // console.log(direction)
       setDirection(event.nativeEvent.contentOffset.y > offset?'up':'down')
       setOffset(event.nativeEvent.contentOffset.y)

       if(event.nativeEvent.contentOffset.y === 0 && direction === "down")
       setScrollEnabled(false)
       
    }}
    onMomentumScrollEnd={horizontal?()=>{
       restaurantsRef.current.scrollToIndex({
            animated: true,
            index:  focus.findIndex((style)=>style.backgroundColor ==="black")
        })


    }:()=>{}}
  
    ListHeaderComponent={!horizontal?()=><View style={styles.categories}>
      {/* <Categories /> */}
      </View>:<></>}
          
      />
    
  </View>
  )
}

 

const RestaurantMarkers = ({restaurantDataSort, focus, setFocusFunction, restaurantsRef, visible, setVisible})=>{

  return restaurantDataSort.map((restaurant, index)=>{

    return(
      <Marker key={index} title={restaurant.name} description="nasso"
      coordinate={{
        latitude: restaurant.coordinates.latitude,
        longitude: restaurant.coordinates.longitude,
      }}

      onPress={()=>{

        if(visible)
         setVisible(false)
         
       const wait = new Promise(resolve => setTimeout(resolve, 500));
        wait.then(()=>{
           setFocusFunction(index)
        .then(()=>restaurantsRef.current.scrollToIndex({
         animated: true,
         index: index
     }))
        })
       
      
       
      }}
     // image={require("../assets/images/restaurant1.png")}
     // style={{width: 28, height: 28}}
     // resizeMode="contain"
        
    >
      {/* <View style={{...styles.restaurant_marker, ...styles.restaurant_marker_shadow}}>
      </View> */}
        
          <View style={{ ...styles.restaurant_marker, backgroundColor: focus[index].backgroundColor, zIndex: focus[index].zIndex }}>
            <MaterialIcons style={styles.restaurant_marker_icon} name="restaurant" size={15} color={focus[index].color} />
          </View>
        
      

      {/* <View style={{backgroundColor: focus[index].backgroundColor, borderRadius: 50, elevation: 5}}>
              <MaterialIcons style={{...styles.restaurant_marker_icon, zIndex: focus[index].zIndex}} name="restaurant" size={15} color={focus[index].color} />

      </View> */}


      {/* <Image source={require("../assets/images/restaurant.png")}
       style={{width: 35, height: 35}}
       resizeMode="center"
       resizeMethod='resize'/> */}


       <Callout tooltip>
         <View style={styles.bubble}>
           {/* <Text style={styles.bubbleName}>{restaurant.name}</Text> */}
           <RestaurantInfo
                            name={restaurant.name}
                            rating={restaurant.rating}
                            city={restaurant.location.city}/>
           </View>
         
       </Callout>
    </Marker>
    )
  })
}

const ListButton = ({setVisible})=> {
  return (
    <View style={styles.menuList}>
    <View style={styles.menuListBloc}>
       <Icon type="material-community" name='menu' color="black" size={32} 
        onPress={() => setVisible(true)} />
        <Text style={{fontWeight: "bold"}}>List</Text>
    </View>
   
 </View>
  )
}
const styles = StyleSheet.create({

  header: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    paddingBottom: 10,
    zIndex: 1
},
   searchbar: {flex: 1, marginHorizontal: 10},

   categories: {
    marginBottom: 10
   },

   bubble: {
      flexDirection: "row",
      alignSelf: "flex-start",
      backgroundColor: "#fff",
      borderRadius: 6,
      borderColor: '#ccc',
      borderWidth: 0.5,
      padding: 15,
   },
   bubbleName: {
     fontSize: 16,
     marginBottom: 5,

   },
  activityIndicator: {
    backgroundColor: 'black',
    position: 'absolute',
    opacity: 0.6,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    
   },
   restaurant_marker:{
     backgroundColor: "white",
     borderRadius: 50,
     position: "absolute",
     borderColor: '#ccc',
      borderWidth: 0.5,
    // top: 3,
    // left:3
    },
    restaurant_marker_shadow:{
    backgroundColor: "grey", 
    top:0,left:0,
    width:43, height: 43
    },
    restaurant_marker_icon:{
      padding: 10,
      
      
     },

  flatlist: {
    position: "absolute",
    //backgroundColor: "red", 
    bottom: 70
  },
   
  restaurantsContainer: 
    {
      //backgroundColor: "red",
      
      flexDirection: "row"
    },
    restaurant:{
       //borderWidth: 1,
       borderRadius: 10,
      // padding: 15,
       backgroundColor: "white",
       marginHorizontal: 5,
       
    },
    restaurantImage_restaurantInfo:{
     //padding: 10,
     marginHorizontal: 10,
    },
    restaurant_title: {
      paddingHorizontal: 50,
      paddingVertical: 50,
    },

    menuList: {
      // backgroundColor: "white",
      flexDirection: "row",
      alignItems:"center",
      justifyContent: "flex-end",

    },
    menuListBloc: {
      backgroundColor: "white",
      width: 70, 
      flexDirection: "row", 
      marginRight: 15,
      alignItems: "center",
      justifyContent: "space-around",
      borderRadius: 20,
      padding: 5,
      marginBottom: 10

    }

  
})