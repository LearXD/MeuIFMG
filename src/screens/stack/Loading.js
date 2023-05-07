import axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';

import { Image, StyleSheet, View, Text, Alert, BackHandler } from 'react-native';

import Background from '../../components/Background';
import { getRoute } from '../../utils/RouteManager';
import { doLogin } from '../../utils/LoginManager';
import { registerBackPressHandler } from '../../events/EventHandler'
import Lottie from 'lottie-react-native';
import { ACCEPTED_STATUS } from './../../utils/RequestManager';

const checkSever = (navigation) => {
  axios.get(getRoute('status'))
    .then(({ status }) => {
      if (ACCEPTED_STATUS.includes(status)) {
        AsyncStorage.getItem(
          'registration',
          (err, registration) => {
            if (!err && !!registration) {
              AsyncStorage.getItem(
                'password',
                (err, password) => {
                  if (!err && !!password) {
                    doLogin(registration, password, {
                      loginSucess: (token, registration) => {
                        navigation.navigate("Authenticated", { token, registration })
                      }
                    })
                    return;
                  }
                })
                return;
            }
            navigation.navigate('Login')
          })
      }
    }).catch((error) => {
      Alert.alert(
        'Servidor Indisponível',
        `Não foi possível se comunicar com os servidores do IFMG...\n\nEsse erro pode ter acontecido por você estar desconectado(a) a internet, ou o servidor está offline!\n\nErro: ${error.message}`,
        [
          {
            text: 'RECONECTAR',
            onPress: () => {
              checkSever(navigation, { setMessage });
            },
          },
          {
            text: 'SAIR',
            onPress: () => {
              BackHandler.exitApp();
            },
          }
        ])
    })
}

export default ({ navigation }) => {
  useEffect(() => {
    registerBackPressHandler();
    checkSever(navigation)
  }, [])

  return (
    <View style={styles.container}>
      <Background style={styles.container}>
        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
          <Image
            style={styles.logo}
            source={require('../../../assets/images/if_logo.jpg')}
          />
          <Text style={styles.title}>Meu IFMG</Text>
          <Text style={{ fontSize: 25, fontFamily: 'Montserrat-VariableFont_wght', fontWeight: '800' }}>Mobile</Text>
        </View>

        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

          <Lottie
            source={require('../../../assets/animations/loading.json')}
            autoPlay
            style={{ width: 140, height: 140 }}
          />
        </View>
      </Background>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: '35%',
    width: '100%',
    resizeMode: 'contain'
  },
  title: {
    marginTop: 30,
    fontSize: 40,
    fontFamily: 'Montserrat-VariableFont_wght',
    fontWeight: '800'
  },
  loadingTitle: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 15
  },
  activityLoading: {
  }
});