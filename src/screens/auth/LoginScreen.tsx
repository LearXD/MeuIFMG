import { View, Text, StyleSheet, Image, useWindowDimensions, KeyboardAvoidingView } from 'react-native'
import { useEffect, useState } from 'react';
import theme from '../../utils/theme';

import AsyncStorge from '@react-native-async-storage/async-storage';

import Input from '../../components/screens/login/Input';
import Button from '../../components/screens/login/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { login } from '../../utils/api/api';
import { StatusBar } from 'react-native';
import { StatusBarStyle, ToastAndroid } from 'react-native';
import { z } from 'zod';
import CookieManager from '@react-native-cookies/cookies';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    padding: 0,
    backgroundColor: theme.background,
  },
  titleContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: '10%',
    paddingTop: '2%',
  },
  inputsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '10%',
    gap: 10,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: '10%',
  }
});

interface Props {
  navigation: NativeStackNavigationProp<{
    Authenticated: {
      token: string;
    };
    Login: undefined;
    Splash: undefined;
  }>
}

export default function LoginScreen({
  navigation
}: Props) {

  const { height } = useWindowDimensions();

  const [registration, setRegistration] = useState('')
  const [password, setPassword] = useState("")

  useEffect(() => {
    AsyncStorge.multiGet(['@registration', '@password'])
      .then((value) => {
        const [[_1, registration], [_2, password]] = value;
        if (registration && password) {
          ToastAndroid.show('Sua sessão foi restaurada!', ToastAndroid.SHORT);
          setRegistration(registration);
          setPassword(password);
        }
      })
  }, [])

  const handleLogin = async (cancelLoading: CallableFunction) => {
    try {

      const validate: any = z.object({
        registration: z.string().min(1, 'Você precisa definir seu R.A'),
        password: z.string().min(3, 'A senha deve conter no minimo 3 digitos'),
      })
        .safeParse({
          registration,
          password
        })

      if (!validate.success) {
        cancelLoading();
        ToastAndroid.show(validate.error.errors[0].message, ToastAndroid.SHORT);
        return;
      }

      const loginResponse = await login(registration, password);

      if (loginResponse) {
        if (loginResponse.status === 401) {
          cancelLoading();
          ToastAndroid.show('Usuário ou senha incorretos!', ToastAndroid.SHORT);
          return;
        }

        //console.log(loginResponse.data.token)

        await AsyncStorge.multiSet([
          ['@registration', registration],
          ['@password', password]
        ])

        await CookieManager.clearAll();
        await CookieManager.setFromResponse('https://meu.ifmg.edu.br', loginResponse.data.token)

        navigation.replace('Authenticated', { token: loginResponse.data.token });
      }

    } catch (error) {
      console.error(error)
    }
    cancelLoading();
  }

  return (
    <KeyboardAvoidingView
      behavior='height'
      keyboardVerticalOffset={0}
      enabled={false}
      style={styles.container}>
      <StatusBar
        barStyle={theme.statusBarStyle as StatusBarStyle}
        backgroundColor={theme.statusBarColor}
      />
      <View style={styles.titleContainer}>
        <Image
          style={{
            height: height * 0.25,
            width: height * 0.25,
          }}
          source={require('../../assets/images/splash_image.png')}
        />
        <Text style={{
          color: theme.text,
          fontSize: height * 0.03,
          textAlign: 'center',
          fontFamily: 'Montserrat-Regular',
        }}>
          Faça
          <Text style={{
            color: theme.textSecondary,
            fontSize: height * 0.03,
            fontFamily: 'Montserrat-Regular',
          }}>
            {" LOGIN "}
          </Text>
          para acessar seu painel
        </Text>
      </View>
      <KeyboardAvoidingView
        enabled={true}
        keyboardVerticalOffset={height * 0.1}
        behavior='padding'
        style={styles.inputsContainer}
      >
        <Input
          state={[registration, setRegistration]}
          title="Digite seu número de matricula:"
          placeholder="Seu numero de matricula..."
        />
        <Input
          state={[password, setPassword]}
          title="Digite sua senha:"
          placeholder="Sua senha..."
          password
          icon="eye-outline"
        />
        <Text style={{
          fontSize: 10,
          color: theme.textSecondary,
          fontFamily: 'Montserrat-Regular',
        }}>
          Caso não lembre seu R.A, ou não possua um, entre em contato com a assistencia de seu campus!
        </Text>
      </KeyboardAvoidingView>
      <View style={styles.buttonContainer}>
        <Button
          onClick={handleLogin}
          text='ENTRAR'
          isLoading
        />
      </View>
    </KeyboardAvoidingView>
  )
}