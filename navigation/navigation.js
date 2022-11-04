import { View, Text, SafeAreaView, StatusBar} from 'react-native'
import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Home from "../screens/Home"
import StoreDetail from '../screens/StoreDetail'
import { Provider as ReduxProvider } from 'react-redux'
import configureStore from '../redux/store'
import OrderCompleted from '../screens/OrderCompleted'
import BottomTabs from './BottomTabs'
import StoresMapScreen from '../screens/StoresMapScreen'
import DrawerNavigator from './DrawerNavigator'
import storeDetailScreen from '../screens/StoreDetailScreen'
import OrderRequest from '../screens/OrderRequest'
import Splash from '../screens/Splash'
import SignIn from '../screens/SignIn'
import Loader from '../screens/Loader'
import Offers from '../screens/Offers'
import Wallet from '../screens/Wallet'
import AddCard from '../screens/AddCard'
 import OnboardingScreen from '../screens/Onboarding'
import SignUp from '../screens/SignUp'
import { LoaderContext } from '../contexts/LoaderContext'
import { StoresContext } from '../contexts/StoresContext'
import Settings from '../screens/Settings'
import { CategoriesContextProvider } from '../contexts/CategoriesContext'
const store = configureStore();
export default function RootNavigation({statusBarColor}) {
    const Stack = createStackNavigator();
    const [loading, setLoading] = useState(false)
    const [storeData, setStoreData]= useState()
    const screenOptions = {
        headerShown: false,
    }
  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
      <LoaderContext.Provider value={{loading, setLoading}}>
        <StoresContext.Provider value={{storeData, setStoreData}}> 
        <CategoriesContextProvider> 
          <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
              <Stack.Screen name="Splash" component={Splash}/>
              <Stack.Screen name="SignIn" component={SignIn}/>
              <Stack.Screen name="SignUp" component={SignUp}/>
              <Stack.Screen name="DrawerNavigator" component={DrawerNavigator}/>
              <Stack.Screen name="OrderRequest" component={OrderRequest}/>
              <Stack.Screen name="OrderCompleted" component={OrderCompleted}/>
              <Stack.Screen name="Offers" component={Offers}/>
              <Stack.Screen name="Wallet" component={Wallet}/>
              <Stack.Screen name="AddCard" component={AddCard}/>
              <Stack.Screen name="Settings" component={Settings}/>
          </Stack.Navigator>
          </CategoriesContextProvider> 
          </StoresContext.Provider>
          </LoaderContext.Provider>
      </NavigationContainer>
    </ReduxProvider>
  )
}