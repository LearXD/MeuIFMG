import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'

import Lottie from 'lottie-react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  }
})

interface Props {
  message: string
}

export default function LoadingModal({
  message
}: Props) {

  const { width } = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Lottie
        style={{
          width: width * .2,
          height: width * .2,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        source={require('../../assets/lottie/loading.json')}
        autoPlay
        loop
      />
      <Text style={styles.text}>{message}</Text>
    </View>
  )
}

