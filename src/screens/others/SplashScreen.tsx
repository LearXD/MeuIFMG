import { View, Text, StyleSheet, useWindowDimensions, StatusBar, StatusBarStyle } from 'react-native'
import React, { useEffect } from 'react'
import theme from '../../utils/theme'

import Logo from '../../assets/svg/logo.svg'

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

interface Props {
  navigation: NativeStackNavigationProp<{
    Splash: undefined;
    Login: undefined;
  }>
}

export default function SplashScreen({
  navigation
}: Props): JSX.Element {

  const { height } = useWindowDimensions()

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
      //navigation.navigate('Login')
    }, 2000)
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme.statusBarStyle as StatusBarStyle}
        backgroundColor={theme.background}
      />
      <Logo style={{
        height: height * 0.25,
        width: height * 0.25,
        alignSelf: 'center',
      }} />
      <Text style={{
        color: theme.text,
        fontSize: 10,
        position: 'absolute',
        bottom: 20,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '500'
      }}>
        POWERED BY IFMG ITABIRITO
      </Text>
    </View>
  )
}