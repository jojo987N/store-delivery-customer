import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

export default function Reward({store}) {
  return (
    <View style={styles.reward}>
        <Text style={styles.rewardText}>{store.reward}</Text>
    </View>
  )
}

const styles = StyleSheet.create({

    reward: {
        position: "absolute",
        backgroundColor: "green",
        top: 20,
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20
         
    },
    rewardText: {
        paddingVertical : 5,
        color: "white",
        paddingHorizontal: 20
    }
})