import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet} from "react-native";
import {orders} from "../data";
import {stores} from "../data";
import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import DishListItem from "../components/DishListItem";
const order = orders[0];
    const OrderDetailsHeader = () => {
  return (
    <View>
      <View style={styles.page}>
        <Image source={{ uri: order.Store.image }} style={styles.image} />
        <View style={styles.container}>
          <Text style={styles.title}>{order.Store.name}</Text>
          <Text style={styles.subtitle}>{order.status} &#8226; 2 days ago</Text>
          <Text style={styles.menuTitle}>Your orders</Text>
        </View>
      </View>
    </View>
  );
};
const OrderDetails = () => {
  const [order, setOrder] = useState();
  const route = useRoute();
  const id = route.params?.id;
  return (
    <>
    <OrderDetailsHeader />
    <FlatList  
        data={stores[0].dishes}
        renderItem={({item})=><DishListItem  dish={item}/>}/>
    </>
  );
};
export default OrderDetails;
const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 180
    },
    title: {
        fontWeight: "bold",
        fontSize: 29,
        marginTop: 10, 
        marginHorizontal: 15,
    },
    subtitle: {
        marginTop: 10,
        marginHorizontal: 15,
    },
    menuTitle: {
        marginTop: 10,
        marginHorizontal: 15,
        fontWeight: "bold",
        fontSize: 19
    }
})