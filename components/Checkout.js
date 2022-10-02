import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useState, useContext} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {language, currency}  from '../global'
import { addDoc, serverTimestamp } from 'firebase/firestore'
import { generateUID } from '../global'
import Loading from './Loading'
import { ordersCol } from '../firebase'
import { useNavigation } from '@react-navigation/native'
import Loader from '../screens/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LoaderContext } from '../contexts/LoaderContext'
export default function Checkout({storeName, setLoader, setViewCartButton, setModalVisible}) {
    const {setLoading} = useContext(LoaderContext)
    const {name, phone, address, id, lat, lng} = useSelector((state)=>state.userReducer)
     const navigation = useNavigation()
    const items = useSelector((state)=>state.cartReducer).filter(item => item.storeName === storeName)
    const total = items.reduce((prev, curr)=> prev + curr.price, 0)

    console.log("IMAGE : ",items[0].storeImage)
    const dispatch = useDispatch();   
    const addOrderToFirebase = () => {
        setViewCartButton(false)
        addDoc(ordersCol, {
            orderId: generateUID(),
            storeId: items[0].store.storeId,
            Store: {
                    //  lat: items[0].store.coordinates.latitude,
                    //  lng: items[0].store.coordinates.longitude,
                    //  address: items[0].store.location.display_address.toString(),
                    //  phone: items[0].store.phone,
                    //  name: items[0].store.name,

                    lat: items[0].store.lat,
                     lng: items[0].store.lng,
                     address: items[0].store.address,
                     phone: items[0].store.phone,
                     name: items[0].store.name,
                 },
            User: {
                    id: id,
                    name: name,
                    //  lat: address.location.lat,
                    //  lng: address.location.lng,
                    lat,
                    lng,
                    phone: phone,
                    // address: address.description,
                    address,
                     items: items,
                },
                status: "pending",
                createdAt: serverTimestamp(),
        })
        .then(()=> {
            dispatch({ type: 'CLEAR_STORE', payload: storeName })
            setLoading(false)
           navigation.navigate('OrderRequest',{
            //    lat: address.location.lat,
            //    lng: address.location.lng
            lat,
            lng
           })
        })
    }
  return (
      <>
          <View style={styles.container}>
              <TouchableOpacity
                  style={styles.checkoutButton}
                  onPress={() => {
                    setLoading(true)
                    setModalVisible(false);

                    addOrderToFirebase()


                    // navigation.navigate('OrderRequest',{   
                    //     // lat: address.location.lat,
                    //     // lng: address.location.lng,
                    //     lat,
                    //     lng
                    // })
                     
                  }}>
                  <Text style={styles.checkoutText}>Checkout</Text>
                  <Text style={styles.total}>{total ? total.toLocaleString(language, { style: "currency", currency: currency }) : ""}</Text>
              </TouchableOpacity>
          </View>
      </>
  )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
    },
    checkoutButton: {
        marginTop: 20,
        backgroundColor: "black",
        alignItems: "center",
        padding: 13,
        borderRadius: 20,
        width: 300,
        position: "relative",
    },
    checkoutText: { 
        color: "white", 
        fontSize: 20
     },
    total: {
        color: "white",
        position: "absolute",
        right: 15,
        fontSize: 15,
        top: 17
    }
})