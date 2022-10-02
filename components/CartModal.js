import { View, Text, Modal } from 'react-native'
import React from 'react'
import Cart from './Cart'

export default function CartModal({modalVisible, setModalVisible, storeName, setViewCartButton}) {
  return (
    <Modal
    animationType='slide'
    visible={modalVisible}
    transparent={true}
    onRequestClose={() => setModalVisible(false)}>
    <Cart storeName={storeName} setViewCartButton={setViewCartButton} setModalVisible={setModalVisible}/>
   </Modal>
  )
}