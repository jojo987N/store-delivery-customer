import { View, Text, Modal, StyleSheet} from 'react-native'
import React, {useContext} from 'react'
import { CloseModal, Icon } from './FilterModal'


import { Divider, } from 'react-native-elements'
import DisplayMapview from './DisplayMapview'
import StoreName from './StoreName'
import StoreDescription from './StoreDescription'
import { CategoriesContext } from '../contexts/CategoriesContext';


export default function StoreDetailComponent({store, visible, setVisible, userLocation, mapRef, apikey}) {

    const {name, image_url, price, review_count, rating, collectTime, address, deliveryTime} = store;
    
    const {categories, setCategories} = useContext(CategoriesContext)

    let formattedCategories;
    
    if(categories)
    formattedCategories = categories.map((cat)=>cat.name).join(' • ')

  

    const description = formattedCategories + ' '+price
  return (

      <Modal animationType='slide' visible={visible} >
        < DisplayMapview height={200} userLocation={userLocation} mapRef={mapRef} apikey={apikey} store={store} />

          <View style={styles.container}>
              <View style={styles.header}>
                  <CloseModal setVisible={setVisible} />
                  <StoreName name={name} />
              </View>
              <View style={styles.header1}>
                  <StoreDescription
                      description={description}
                      style={styles.description}
                  />
              </View>
              <Divider />
              <StoreInfo iconName="location-pin" iconType="Entypo"
                  iconSize={35} 
                
                text={address}
                  />

              <StoreInfo iconName="time" iconType="Ionicons"
                  iconSize={35} text="Open until 9:00 AM" />

              <StoreInfo iconName="star" iconType="FontAwesome"
                  iconSize={35} text={`⭐${rating} (${review_count}+ ratings)`} />

<StoreInfo iconName="timer" iconType="Ionicons"
                  iconSize={35} text={"Collect time: "+ collectTime+" min"}/>

                  <StoreInfo iconName="delivery-dining" iconType="MaterialIcons"
                  iconSize={35} text={"Delivery time: "+ deliveryTime+" min"}/>
          </View>


      </Modal>
  )
}

const StoreInfo = ({iconName, iconType, iconSize, text})=> {

    return (
        <>
            <View style={styles.storeInfo}>
                <Icon name={iconName} type={iconType} size={iconSize} />
                <Text style={styles.storeInfoText}>{text}</Text>
            </View>
            <Divider />
        </>
      
    )
    
}

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 10
    },
    header: {
     
      marginTop: 20,
     
     
    },
    header1: {
     marginTop: 10,
     marginBottom: 25
    },
    description: {
        color: "grey",
        fontSize: 15.5,
    },
    storeInfo: {
      flexDirection: "row"  ,
      alignItems: "center",
      marginHorizontal: 10,
      marginVertical: 20

    },
    storeInfoText: {
        marginLeft: 10,
        fontSize: 20
    }
    
})