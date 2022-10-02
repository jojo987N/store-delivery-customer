import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import OrderItem from './storeDetail/OrderItem'
import {language, currency}  from '../global'
import Checkout from './Checkout'
import Loader from '../screens/Loader'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const Cart = ({storeName, setViewCartButton, setModalVisible})=>{
    const items = useSelector((state)=>state.cartReducer).filter(item => item.storeName === storeName)
    const total = items.reduce((prev, curr)=> prev + curr.price, 0)
    const [loader, setLoader] = useState(false)
    return (
            <TouchableOpacity style={styles.modalContainer} onPress={()=> setModalVisible(false)} 
            activeOpacity={1} >
                <TouchableOpacity activeOpacity={1} onPress={()=>{}} style={styles.modalCheckoutContainer}>
                    <Text style={styles.storeName}>{storeName}</Text>
                    {Object.entries(items.map(item => item.name)
                        .reduce((acc, curr) => (acc[curr] = (acc[curr] || 0) + 1, acc), {}))
                        .map(([name, quantity], index) => (
                            <OrderItem key={index} name={name} quantity={quantity} items={items} />
                        ))}
                    <View style={styles.subtotalContainer}>
                        <Text style={styles.subtotalText}>Subtotal</Text>
                        <Text>{Number(total).toLocaleString(language, {
                            style: "currency",
                            currency: currency
                        })}</Text>
                    </View>
                    <Checkout storeName={storeName} setLoader={setLoader} setViewCartButton={setViewCartButton}
                    setModalVisible={setModalVisible}/>
                </TouchableOpacity>
            </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0,0,0,0.7)"
    },
    modalCheckoutContainer: {
        backgroundColor: "white",
        padding: 16,
        height: 500,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    storeName:{
        textAlign: "center",
        fontWeight:Platform.OS === "android"?"bold":"600",
        fontSize: 18,
        marginBottom: 10
    },
    subtotalContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        paddingHorizontal: 20
    },
    subtotalText: {
      textAlign: "left",
      fontWeight:Platform.OS === "android"?"bold":"600",
      fontSize: 15,
      marginBottom: 10
    }
})
export default Cart;