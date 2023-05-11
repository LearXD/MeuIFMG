import { View, Text, StyleSheet, Alert, BackHandler, Modal } from 'react-native'
import { useContext, useEffect, useState } from 'react';
import theme from '../../utils/theme';
import Header from '../../components/screens/Header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Picture from '../../components/screens/home/Picture';
import AuthenticatedContext from '../../contexts/AuthenticatedContext';
import { profile } from '../../utils/api/api';
import OptionButton from '../../components/screens/home/OptionButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChangeContext from '../../components/screens/home/ChangeContext';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    flex: 1,
  },
  contents: {
    alignItems: 'center',
    paddingTop: '8%',
    padding: 15,
    flex: 1,
    gap: 40
  }
});

interface Props {
  navigation: NativeStackNavigationProp<{
    Grades: undefined,
    Hub: undefined,
    Login: undefined,
    Reports: undefined,
  }>
}

export default function HubScreen({
  navigation
}: Props) {

  const { token, loading, mainNavigation }: any = useContext(AuthenticatedContext)

  const [userImage, setUserImage] = useState('')
  const [userName, setUserName] = useState('Carregando...')

  const [contextModalIsVisible, setContextModalIsVisible] = useState(false)

  useEffect(() => {
    if (token) {
      BackHandler.addEventListener('hardwareBackPress', () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;
        }
        Alert.alert('Sair', 'Deseja realmente sair?', [
          { text: 'Não', style: 'cancel' },
          { text: 'Sim', onPress: () => BackHandler.exitApp() }
        ])
        return true;
      });

      const stopLoading = loading.start('Carregando perfil...');
      (async () => {

        const response = await profile(token);

        if (response) {
          setUserImage(response.data.image)
          setUserName(response.data.name)
          stopLoading();
          return;
        }

      })()

    }
  }, []);

  return (
    <View style={styles.container}>
      <Modal visible={contextModalIsVisible} transparent>
        <ChangeContext
          visible={contextModalIsVisible}
          closeModal={() => setContextModalIsVisible(false)} />
      </Modal>
      <Header
        customTitle='Meu HUB'
        customRightIcon='settings-outline'
        customRightIconSize={25}
        customRightIconClick={() => setContextModalIsVisible(true)}
        customLeftIconSize={25}
        customLeftIcon='power-outline'
        customLeftIconClick={() => {
          Alert.alert('Sair', 'Deseja realmente sair?', [
            { text: 'Não', style: 'cancel' },
            {
              text: 'Sim', onPress: async () => {
                await AsyncStorage.multiRemove(['@registration', '@password'])
                mainNavigation.reset({
                  index: 1,
                  routes: [{
                    name: 'Login',
                  }],
                });
              }
            }
          ])
        }}
      />
      <View style={styles.contents}>
        <View style={{
          width: '100%',
          alignItems: 'center',
          gap: 15
        }}>
          <Picture image={userImage} />
          <Text style={{
            color: theme.text,
            fontSize: 20,
            fontFamily: 'Montserrat-Regular',
            textAlign: 'center'
          }}>
            {userName}
          </Text>
        </View>
        <View style={{
          flex: 1,
          width: '100%',
          gap: 10,
          padding: 15,
        }}>
          <Text style={{
            color: theme.text,
            fontSize: 20,
            fontFamily: 'Montserrat-Bold',
          }}>
            Painel de controle
          </Text>
          <View style={{ flex: 1 }}>
            <OptionButton
              icon='scroll'
              text='Avaliações'
              onClick={() => navigation.navigate('Grades')}
            />
          </View>
          <View style={{ flex: 1, gap: 10, flexDirection: 'row' }}>
            <OptionButton
              icon='history'
              text='Faltas'
              onClick={() => undefined}
            />
            <OptionButton
              icon='paste'
              text='Boletim Geral'
              onClick={() => navigation.navigate('Reports')}
            />
          </View>
        </View>
      </View>

    </View>
  )
}