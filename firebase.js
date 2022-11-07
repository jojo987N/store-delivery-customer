//import firebase from 'firebase'
import {initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth';

import {addDoc, getFirestore, collection, getDocs, doc, deleteDoc, orderBy, query, limit,
where, onSnapshot, serverTimestamp, updateDoc} from 'firebase/firestore'
//import { restaurants } from './data';
import {getStorage, ref, getDownloadURL} from 'firebase/storage'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core'])


const firebaseConfig = {

    apiKey: "AIzaSyBKG5-vG_pBdRdKHX30UYUF9_F7SOt8Co4",
  
    authDomain: "uber-eats-a4c19.firebaseapp.com",
  
    projectId: "uber-eats-a4c19",
  
    storageBucket: "uber-eats-a4c19.appspot.com",
  
    messagingSenderId: "976827322571",
  
    appId: "1:976827322571:web:8ba517048bb9928f938b4e"
  
  };

  const firebaseApp = initializeApp(firebaseConfig);

  //!firebase.apps.length?firebase.initializeApp(firebaseConfig):firebase.app();
  
  export default firebaseApp;
  export const auth = getAuth(firebaseApp)

 //export default firebase;



// const db = getFirestore(firebaseApp)

// export const usersColRef = collection(db, 'users')

// export const restaurantsColRef = collection(db, 'restaurants')

export const db = getFirestore()

export const storage = getStorage();

const restaurantsCol = collection(db, 'restaurants')

export const getRestaurantsFromFirebase = () => {

  const restos = []

  return getDocs(restaurantsCol)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {

       // restaurants.push(doc.data())
      
       restos.push({
         restaurantId: doc.id,
         ...doc.data()
       })


      })
      return restos
    })
    //.then(()=> setRestaurantData(restaurants))

}

export const ordersCol = collection(db, 'orders')

  export const getOrders = ()=>{
   
   const q= query(ordersCol, orderBy('createdAt', 'desc'), limit(1))
    const orders = []

    return getDocs(q)
    .then((snapshot) => {
       
      snapshot.docs.forEach((doc) => {

        orders.push(doc.data())
       console.log(doc.data())
      })

      return orders
       
    })
     

  }

  export const getDriverInfos = async (setDriverName, setCar, setDriverImage, bottomSheet, setDriverLat, setDriverLng, mapRef)=>{

    //const q= query(ordersCol, orderBy('createdAt', 'desc'), limit(1))
    //const q= query(ordersCol, where('createdAt', 'desc'), limit(1))

   // const orders = []

    //const unsuscribe = onSnapshot(q, (snapshot)=>{
      const unsuscribe = onSnapshot(ordersCol, (snapshot)=>{

          //console.log('on entre')
         
         snapshot.docs.forEach((doc) => {
          
        if(doc.data().createdAt && doc.data().status === 'ACCEPTED' && doc.data().User.id === auth.currentUser?.uid, doc.data().driverId) {
          
          bottomSheet?.current.collapse()

          mapRef?.current?.getCamera().then((cam)=>{
            cam.zoom += 1;
            mapRef?.current?.animateCamera(cam);
           })

         // console.log(doc.data().driverId)
          driverInfos(doc.data().driverId)
          .then((snapshot)=>snapshot.docs.forEach((doc)=>{
              console.log(doc.data().lat, doc.data().lng)
              setDriverName(doc.data().name)
              setCar(doc.data().Car)
              setDriverImage({uri: doc.data().image})
              setDriverLat(doc.data().lat)
              setDriverLng(doc.data().lng)
          }))

        //  console.log(doc.data())
        //  console.log(doc.id)
         // orders.push(doc.data())
        //  setOrder({id: doc.id, 
        //           ...doc.data()
        //           })
        // setShowOrderCountDown(true)
        // setMapdirection(true)
          // setDestination({
          //   latitude: doc.data().Restaurant.lat,
          //   longitude: doc.data().Restaurant.lng,
          // })
        }
       
      })
      

    })

   // unsuscribe()
    

  }

   
  //getOrders()
  //.then((orders)=>orders.map((order)=>order.items.map((item)=>item.restaurantName)))
   


const testt = ()=>{

  //const db = getFirestore()

  const colRef = collection(db, 'orders')
 const q= query(colRef, orderBy('createdAt', 'desc'))
  return getDocs(q)
    .then((snapshot) => {

      console.log(snapshot.docs[0].data())
      // snapshot.docs.forEach((doc) => {

      //   console.log(doc.data())

      // })
       
    })

}
//testt()

// ADD DOCS TO FIREBASE
export const addRestaurants = (restaurants)=>{

  restaurants.forEach((restaurant)=>{
    addDoc(restaurantsCol, restaurant)
    .then(()=>console.log("ajouté"))
   })
}

//addRestaurants()
  

 //addDoc(colRef, restaurants[0].dishes[0])
 //.then(()=>console.log('c bon '))

  const productsCol = collection(db, 'products')

  const addProducts = () => {

    getDocs(restaurantsCol)
      .then(snapshot => snapshot.docs.forEach((doc) => {

        doc.data().dishes.forEach((dishe) => {

         //console.log(dishe.hasOwnProperty('name'))

          addDoc(productsCol, dishe.name?{
            restaurantID: doc.id,
            ...dishe,
            createdAt: serverTimestamp()        
          }:{
            restaurantID: doc.id,
            ...dishe,
             name: dishe.title,
             createdAt: serverTimestamp()
          }).then(()=>console.log("ADDED"))

        })

      }))

  }

 // addProducts()

  export const getProducts = (restaurantID) => {

     
    const products = []
    //const q= query(productsCol, where("restaurantID", "==", restaurantID))
    return getDocs(productsCol)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {

          products.push({
            ...doc.data(), 
            id: doc.id})
        })
        return products
      }
      )

  }

  

  const getProductsAll = () => {
     
    getDocs(productsCol)
      .then((snapshot) => {

        console.log(snapshot.docs.map((doc) => doc.data()))
      
      })

  }

   //getProductsAll()

  const addGroupToProducts = ()=> {

     //console.log(Math.floor(Math.random()*9+1))
      
    getDocs(productsCol)
    .then(snapshot => {
      
      snapshot.docs.forEach(docc =>{
         

        updateDoc( doc(db, 'products', docc.id), {

          group : Math.floor(Math.random()*9+1)
       
        }).then(()=> console.log('Updated'))
      })
    })
  }

 // addGroupToProducts()
  

 //GET DOCS Firebase

 //export const restaurants = []
//  getDocs(colRef)
//  .then((snapshot)=>{
//    snapshot.docs.forEach((doc)=>{
    
//    // restaurants.push(doc.data())
//   //console.log(doc.id)

//    console.log(doc.data())
      
//    }) 
//   })
  //console.log(restaurants)
  

  //console.log(restaurants) 

//  const docRef = doc(db, 'restaurants', "vMO2dkUnCNQLZJ3zex1Y")

//  deleteDoc(docRef)
//  .then(()=>{
//    console.log("supprimé")
//  })

//  48rjIlNtPylbqPfJLpof
// pu5E232csfnRrxvpNnn1
// vMO2dkUnCNQLZJ3zex1Y

// doc(db, 'restaurants', 'jeteste').set({

// })

 //console.log(colRef)

 //Collection User
  const userRef = collection(db, 'users')

  export const addUser = async (userCredentials,name,phone, address) => {

   // const userRef = collection(db, 'users')
    addDoc(userRef, {
      //id: auth.currentUser?.uid,
      id: userCredentials.user.uid,
      name: name,
     // email: auth.currentUser?.email,
      email: userCredentials.user.email,
      //address: address,
      phone: phone,
      address: address
     // lat: 40.71,
     // lng: -74,


    })
      .then(() => console.log('user create'))

  }

  export const userInfos = (uid)=>{

     
    const q= query(userRef, where("id", "==", uid))

    return getDocs(q)

  }
  
//console.log(auth.currentUser?.uid)

const driversCol = collection(db, 'drivers')

export const driverInfos = (driverId)=>{

     
  const q= query(driversCol, where("Id", "==", driverId))

  return getDocs(q)

}

const getImageFromStorage = (imagePath)=>{

  const fileRef = ref(storage, imagePath);
  return getDownloadURL(fileRef) 

}

// getImageFromStorage('restaurant/bonmange').then((url)=>{
//   console.log(url)
// })

//'restaurant/bonmange'

const addOrderToFirebase = () => {
    
  //setLoading(true)

           addDoc(ordersCol, {
               //     title: item.title,
               //     image: item.image,
               //     restaurantName: restaurantName,
               //    // createdAt: firebase.firestore.fieldValue.serverTimestamp()
               //    createdAt: serverTimestamp(),
               //    status: "New",
               //    total: total 
               orderId: generateUID(),
               restaurantId: restaurant.restaurantId,
                Restaurant: {
               //     id: restaurant.id,
                    lat: restaurant.coordinates.latitude,
                    lng: restaurant.coordinates.longitude,
                    address: restaurant.location.display_address.toString(),
                    phone: restaurant.phone,
               //     image: restaurant.image_url,
                    name: restaurant.name,
                },
               User: {
                   //id: auth.currentUser?.uid,
                   name: name,
                    lat: loc.coords.latitude,
                    lng: loc.coords.longitude,
                   phone: phone,
                   address: address,
                   // items : ["Big Mac", "Cheese Burger","juice"]
                   items: items
               },
              // driverID: "",
               status: "pending",
               createdAt: serverTimestamp(),

           }).then(()=> {
               dispatch({ type: 'CLEAR', })
               setLoading(false)
               navigation.navigate('OrderRequest', {loc: loc})
              //navigation.navigate('OrderRequest')
           })

     
}

const populateRestaurant = ()=> {

  const themes = [
    "In a rush?",
    "Best Overall",
    "Popular near you",
    "Rewards for you",
    "National brands",
     "Only on Good Food",
     "Everyday savings"
  ]

  getDocs(restaurantsCol)
    .then( snapshot => {
      snapshot.docs.forEach((docc) => {

        updateDoc( doc(db, 'restaurants', docc.id), {

          theme : themes[Math.floor(Math.random()*7)]
       
        }).then(()=> console.log('Updated'))

      })
})

}

//populateRestaurant()

const storesCol = collection(db, 'stores')
const fillStores = () => {

  getRestaurantsFromFirebase().then(restaurants => {
    restaurants.forEach((restaurant)=>{
      addDoc(storesCol, restaurant)
      .then(()=>console.log("store added"))
     })
  })

}

fillStores()

 


  




  
