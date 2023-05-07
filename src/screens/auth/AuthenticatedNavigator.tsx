import React, { useEffect, useState } from 'react'

import AuthenticatedContext from '../../contexts/AuthenticatedContext';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute } from '@react-navigation/native';
import HubScreen from '../content/HubScreen';
import Header from '../../components/screens/Header';
import GradesScreen from '../content/GradesScreen';
import { Modal } from 'react-native';
import LoadingModal from '../../components/screens/LoadingModal';

const { Navigator, Screen } = createNativeStackNavigator();

interface Props {
  navigation: NativeStackNavigationProp<{
    Login: undefined;
  }>
}

interface Params {
  token: string;
}

export default function AuthenticatedNavigation({
  navigation
}: Props) {

  const { params } = useRoute();
  const [token] = useState((params as Params)?.token ?? '')

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMessage, setLoadingMessage] = useState<string>('Carregando...');

  const startLoading = (message: string) => {
    setLoadingMessage(message);
    setLoading(true);
    return () => {
      setLoading(false);
      setLoadingMessage('Carregando...');
    }
  }

  return (
    <>
      <Modal transparent={true} visible={loading}>
        <LoadingModal message={loadingMessage} />
      </Modal>
      <AuthenticatedContext.Provider
        value={{
          token,
          mainNavigation: navigation,
          loading: {
            start: startLoading,
            setMessage: startLoading
          }
        }}>
        <Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName='Hub'
        >
          <Screen
            name="Hub"
            component={HubScreen}
          />
          <Screen
            name="Grades"
            component={GradesScreen}
            options={{
              animation: "fade_from_bottom",
            }}
          />
        </Navigator>
      </AuthenticatedContext.Provider >
    </>

  )
}