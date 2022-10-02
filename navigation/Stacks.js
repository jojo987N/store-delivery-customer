import { View, Text } from 'react-native'
import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Home from '../screens/Home'
import StoreDetail from '../screens/StoreDetail'
import MenuDetailScreen from '../screens/MenuDetailScreen'
import MyOrdersScreen from '../screens/MyOrdersScreen'
import OrderDetails from '../screens/OrderDetails'
import PreferenceScreen from '../components/PreferenceScreen'
import SearchResults from '../screens/SearchResults'
import SearchScreen from '../screens/SearchScreen'
import OrdersScreen from '../screens/OrdersScreen'
import OrderRequest from '../screens/OrderRequest'
import CartScreen from '../screens/CartScreen'
import StoresMapScreen from '../screens/StoresMapScreen'
import StoreSearchResults from '../screens/StoreSearchResults'
import { CategoriesContextProvider } from '../contexts/CategoriesContext'

const  HomeStack = createStackNavigator()

export function HomeNavigator() {
  return (
    // <CategoriesContextProvider> 
      <HomeStack.Navigator>
        <HomeStack.Screen 
          name="HomeScreen"
          component={Home}
          options={{headerShown: false}}/>

      <HomeStack.Screen 
          name="StoreSearchResults"
          component={StoreSearchResults}
          options={{headerShown: false}}/>

        <HomeStack.Screen
          name="StoreDetail"
          component={StoreDetail}
          options={{ headerShown: false }} />
      

      <HomeStack.Screen 
          name="MenuDetailScreen"
          component={MenuDetailScreen}
          options={{headerShown: false}}/>

      <HomeStack.Screen 
          name="PreferenceScreen"
          component={PreferenceScreen}
          options={{headerShown: false}}/>

<HomeStack.Screen 
          name="StoresMapScreen"
          component={StoresMapScreen}
          options={{headerShown: false}}/>


<HomeStack.Screen 
          name="SearchResults"
          component={SearchResults}
          options={{headerShown: true}}/>

      </HomeStack.Navigator>
      // </CategoriesContextProvider>
      
  )
}

const  OrderStack = createStackNavigator()

export function OrderNavigator() {

  return (
    <OrderStack.Navigator>
       <OrderStack.Screen 
          name="Carts"
          component={CartScreen}
          options={{headerShown: true, headerLeft: null}}/>

       <OrderStack.Screen 
          name="OrderDetails"
          component={OrderDetails}
          options={{headerShown: false}}/>

       <OrderStack.Screen 
          name="Orders"
          component={OrdersScreen}
          options={{}}/>

    </OrderStack.Navigator>
  )

}

const  SearchStack = createStackNavigator()

export function SearchNavigator() {

  return (
    <SearchStack.Navigator>
       <SearchStack.Screen 
          name="SearchScreen"
          component={SearchScreen}
          options={{headerShown: false}}/>

       <SearchStack.Screen 
          name="SearchResults"
          component={SearchResults}
          options={{}}/>

    </SearchStack.Navigator>
  )

}