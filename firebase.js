import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import {
  addDoc, getFirestore, collection, getDocs, doc, deleteDoc, orderBy, query, limit,
  where, onSnapshot, serverTimestamp, updateDoc
} from 'firebase/firestore'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { LogBox } from 'react-native';
import { stores } from './data';
LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core'])

const firebaseConfig = {
  apiKey: "AIzaSyDgDMdmkB50rwTRdaMXL4fAdcgYksET2-s",
  authDomain: "store-delivery-43cb0.firebaseapp.com",
  projectId: "store-delivery-43cb0",
  storageBucket: "store-delivery-43cb0.appspot.com",
  messagingSenderId: "283406701144",
  appId: "1:283406701144:web:d05dbea3aded6c00d5b02d"
};
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
export const auth = getAuth(firebaseApp)
export const db = getFirestore()
export const storage = getStorage();
const storesCol = collection(db, 'stores')
const categoriesCol = collection(db, 'categories')
const categoriesStoresCol = collection(db, 'categoriesStores')

// export const getStoresFromFirebase = () => {
//   const restos = []
//   return getDocs(storesCol)
//     .then((snapshot) => {
//       snapshot.docs.forEach((doc) => {
//         restos.push({
//           storeId: doc.id,
//           ...doc.data()
//         })
//       })
//       return restos
//     })
// }

export const getStoresFromFirebase = () => {
  const stores = []
  return getDocs(storesCol)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        restos.push({
          storeId: doc.id,
          ...doc.data()
        })
      })
      return stores
    })
}
export const ordersCol = collection(db, 'orders')
export const getOrders = () => {
  const q = query(ordersCol, orderBy('createdAt', 'desc'), limit(1))
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
export const getDriverInfos = async (setDriverName, setCar, setDriverImage, bottomSheet, setDriverLat, setDriverLng, mapRef) => {
  const unsuscribe = onSnapshot(ordersCol, (snapshot) => {
    snapshot.docs.forEach((doc) => {
      if (doc.data().createdAt && doc.data().status === 'ACCEPTED' && doc.data().User.id === auth.currentUser?.uid, doc.data().driverId) {
        bottomSheet?.current.collapse()
        mapRef?.current?.getCamera().then((cam) => {
          cam.zoom += 1;
          mapRef?.current?.animateCamera(cam);
        })
        driverInfos(doc.data().driverId)
          .then((snapshot) => snapshot.docs.forEach((doc) => {
            console.log(doc.data().lat, doc.data().lng)
            setDriverName(doc.data().name)
            setCar(doc.data().Car)
            setDriverImage({ uri: doc.data().image })
            setDriverLat(doc.data().lat)
            setDriverLng(doc.data().lng)
          }))
      }
    })
  })
}
const testt = () => {
  const colRef = collection(db, 'orders')
  const q = query(colRef, orderBy('createdAt', 'desc'))
  return getDocs(q)
    .then((snapshot) => {
      console.log(snapshot.docs[0].data())
    })
}
export const addStores = (stores) => {
  stores.forEach((store) => {
    addDoc(storesCol, store)
      .then(() => console.log("ajouté"))
  })
}
const foodsCol = collection(db, 'foods')
const addfoods = () => {
  getDocs(storesCol)
    .then(snapshot => snapshot.docs.forEach((doc) => {
      doc.data().dishes.forEach((dishe) => {
        addDoc(foodsCol, dishe.name ? {
          storeID: doc.id,
          ...dishe,
          createdAt: serverTimestamp()
        } : {
          storeID: doc.id,
          ...dishe,
          name: dishe.title,
          createdAt: serverTimestamp()
        }).then(() => console.log("ADDED"))
      })
    }))
}
export const getFoods = (storeId) => {

  const foods = []
  const q = query(foodsCol, where("storeId", "==", storeId))
  return getDocs(q)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        foods.push({
          ...doc.data(),
          id: doc.id
        })
      })
       
      return foods
    }
    )
}
const getFoodsAll = () => {
  getDocs(foodsCol)
    .then((snapshot) => {
      console.log(snapshot.docs.map((doc) => doc.data()))
    })
}
const addGroupToFoods = () => {
  getDocs(foodsCol)
    .then(snapshot => {
      snapshot.docs.forEach(docc => {
        updateDoc(doc(db, 'foods', docc.id), {
          group: Math.floor(Math.random() * 9 + 1)
        }).then(() => console.log('Updated'))
      })
    })
}
const userRef = collection(db, 'users')
export const addUser = async (userCredentials, name, phone, address) => {
  addDoc(userRef, {
    id: userCredentials.user.uid,
    name: name,
    email: userCredentials.user.email,
    phone: phone,
    address: address.description,
    lat: address.location.lat,
    lng: address.location.lng
  })
    .then(() => console.log('user create'))
}

export const updateUser = async (address, userId) => {
  const docRef = doc(db, 'users', userId)
  return updateDoc(docRef, {
    address: address.description,
    lat: address.location.lat,
    lng: address.location.lng
  })
    .then(() => console.log('user updated'))
}
export const userInfos = (uid) => {
  const q = query(userRef, where("id", "==", uid))
  return getDocs(q)
}
const driversCol = collection(db, 'drivers')
export const driverInfos = (driverId) => {
  const q = query(driversCol, where("Id", "==", driverId))
  return getDocs(q)
}
const getImageFromStorage = (imagePath) => {
  const fileRef = ref(storage, imagePath);
  return getDownloadURL(fileRef)
}
const addOrderToFirebase = () => {
  addDoc(ordersCol, {
    orderId: generateUID(),
    storeId: store.storeId,
    Store: {
      lat: store.coordinates.latitude,
      lng: store.coordinates.longitude,
      address: store.location.display_address.toString(),
      phone: store.phone,
      name: store.name,
    },
    User: {
      name: name,
      lat: loc.coords.latitude,
      lng: loc.coords.longitude,
      phone: phone,
      address: address,
      items: items
    },
    status: "pending",
    createdAt: serverTimestamp(),
  }).then(() => {
    dispatch({ type: 'CLEAR', })
    setLoading(false)
    navigation.navigate('OrderRequest', { loc: loc })
  })
}
const populateStore = () => {
  const themes = [
    "In a rush?",
    "Best Overall",
    "Popular near you",
    "Rewards for you",
    "National brands",
    "Only on Good Food",
    "Everyday savings"
  ]
  getDocs(storesCol)
    .then(snapshot => {
      snapshot.docs.forEach((docc) => {
        updateDoc(doc(db, 'stores', docc.id), {
          theme: themes[Math.floor(Math.random() * 7)]
        }).then(() => console.log('Updated'))
      })
    })
}
export const getCategories = () => {
  const categories = []
  return getDocs(categoriesCol).then(snapshot => {
    snapshot.docs.forEach((doc) => {
      categories.push({ ...doc.data(), id: doc.id })
    })
    return categories
  })
}
export const getCategoriesStores = () => {
  let categoriesStores = []
  return getDocs(categoriesStoresCol).then(snapshot => {
    snapshot.docs.forEach((doc) => {
      categoriesStores.push({ ...doc.data(), id: doc.id })
    })
    return categoriesStores
  })
}
export const getCategoriesFromStore = async (storeId) => {
  const categoriesStores = await getCategoriesStores()
  const categoriesStoresResult = categoriesStores.filter(categoryStore => categoryStore.storeId === storeId)
  const categories = await getCategories()
  return categoriesStoresResult.map(categoryStoreResult => categories.find(category => category.id === categoryStoreResult.categoryId))
}
export const searchStoresByCategory = async (categoryId) => {
  const categoriesStores = await getCategoriesStores()
  const categoriesStoresResult = categoriesStores.filter(categoryStore => categoryStore.categoryId === categoryId)
  const stores = await getStoresFromFirebase()
  return categoriesStoresResult.map(categoryStoreResult => stores.find(store => store.storeId === categoryStoreResult.storeId))
}
