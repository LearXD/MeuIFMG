import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';

import { Image, StyleSheet, View, Text, ActivityIndicator, Alert, BackHandler } from 'react-native';

import Background from '../../components/Background';
import { getRoute, endpoint } from '../../utils/RouteManager';
import { doLogin } from '../../utils/LoginManager';
import { registerBackPressHandler } from '../../events/EventHandler'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: '30%',
    width: '40%',
    resizeMode: 'contain'
  },
  title: {
    marginTop: 30,
    fontSize: 30
  },
  loadingTitle: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 15
  },
  activityLoading: {
  }
});

const checkSever = (navigation, { setMessage }) => {
  axios({
    url: getRoute('status'),
    method: 'GET'
  }).then(({ status }) => {
    if (status === 200 || status === 304) {

      return AsyncStorage.getItem('registration', (err, registration) => {
        if (!err && !!registration) {
          AsyncStorage.getItem('password', (err, password) => {
            if (!err && !!password) {
              doLogin(registration, password, {
                loginSucess: (token, registration) => {
                  navigation.navigate("Authenticated", { token, registration })
                }
              })
              return;
            }
            navigation.navigate('Login')
          })
          return
        }
        navigation.navigate('Login')
      })
      
    }
    throw new Error();
  }).catch((error) => {
    Alert.alert(
      'Servidor Indisponível',
      `Não foi possível se comunicar com os servidores do IFMG...\n\nEsse erro pode ter acontecido por você estar desconectado(a) a internet, ou o servidor está offline!\n\nErro: ${error.message}`,
      [
        {
          text: 'RECONECTAR',
          onPress: () => {
            checkSever(navigation);
          },
          style: 'default'
        },
        {
          text: 'SAIR',
          onPress: () => {
            BackHandler.exitApp();
          },
          style: 'cancel'
        }
      ])
  })
}

export default (props) => {
  const { navigation } = props;

  const [message, setMessage] = useState("Carregando...")

  useEffect(() => {

    setTimeout(() => {
      setMessage('Conectando com o servidor...\n' + endpoint)
      checkSever(navigation, { message, setMessage })
    }, 1000)

    registerBackPressHandler();

  }, [])

  return (
    <View style={styles.container}>
      <Background style={styles.container}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
          <Image style={styles.logo} source={require('../../../assets/images/if_logo.jpg')} />
          <Text style={styles.title}>Meu IFMG Mobile</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.loadingTitle}>{message}</Text>
          <ActivityIndicator style={styles.activityLoading} size={60} color="#28983d" />
        </View>
      </Background>


    </View>
  );
};
