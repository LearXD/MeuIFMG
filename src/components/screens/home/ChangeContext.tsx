import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import theme from '../../../utils/theme';

import { ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const contextUrl = "https://meu.ifmg.edu.br/EducaMobile/Educacional/EduContexto/GetContextoAluno"

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    width: '90%',
    borderRadius: 5,
    borderColor: theme.primary,
    borderWidth: 1,
    backgroundColor: theme.background,
    gap: 10,
    padding: 10,
  }
})

interface Props {
  visible: boolean;
  closeModal: () => void
}

export default function ChangeContext(props: Props) {

  const webView = useRef<WebView>(null)
  const [options, setOptions] = React.useState<string[]>([])

  useEffect(() => {
    webView.current?.reload()
  }, [props.visible])

  const selectOption = (index: number) => {
    if (webView.current) {
      webView.current.injectJavaScript(`
        if(!document.querySelector('#cbSalvarContexto').clicked) {
          document.querySelector('#cbSalvarContexto').clicked = true
          document.querySelector('#cbSalvarContexto').click()
        }
        document
          .getElementsByClassName('ui-mini ui-listview ui-listview-inset ui-corner-all ui-shadow')[0]
          .querySelectorAll('a')[${index}]
          .innerText = "clicked";
        document
          .getElementsByClassName('ui-mini ui-listview ui-listview-inset ui-corner-all ui-shadow')[0]
          .querySelectorAll('a')[${index}]
          .click();
      `)
      ToastAndroid.show('Ano letivo alterado', ToastAndroid.SHORT)
    }
  }

  return (
    <View style={styles.container}>
      <WebView
        ref={webView}
        scalesPageToFit={false}
        onLoadEnd={(event) => {
          if (event.nativeEvent.url && event.nativeEvent.url !== contextUrl) {
            props.closeModal()
            return;
          }
          if (webView.current) {
            webView.current.injectJavaScript(`
              let data = [];
              document
                .getElementsByClassName('ui-mini ui-listview ui-listview-inset ui-corner-all ui-shadow')[0]
                .querySelectorAll('a')
                .forEach((e) => {
                  data.push(e.innerText)
                });
              window.ReactNativeWebView.postMessage(JSON.stringify(data));
            `)
          }
        }}
        onMessage={(event) => {
          if (event.nativeEvent.data) {
            console.log(JSON.parse(event.nativeEvent.data))
            setOptions(JSON.parse(event.nativeEvent.data))
            return;
          }
          ToastAndroid.show('Erro ao carregar opções', ToastAndroid.SHORT)
        }}
        source={{
          uri: 'https://meu.ifmg.edu.br/EducaMobile/Educacional/EduContexto/GetContextoAluno'
        }} />
      <View style={styles.modal}>
        <View style={styles.content}>
          <View style={{
            width: '100%',
            alignItems: 'flex-end',
          }}>
            <TouchableOpacity onPress={props.closeModal}>
              <Ionicons
                name="close"
                color={theme.text}
                size={25}
              />
            </TouchableOpacity>
          </View>
          <Text style={{
            fontSize: 20,
            fontFamily: 'Montserrat-Bold',
            width: '100%',
            color: theme.text,
            textAlign: 'center',
            marginBottom: 10
          }}>
            Alterar Ano Letivo
          </Text>
          {options.length > 0 ? (
            options.map((e, i) => (
              <View key={i} style={{
                padding: 10,
                borderColor: theme.primary,
                borderWidth: 1,
                borderRadius: 5,
              }}>
                <Text
                  style={{
                    color: theme.textSecondary,
                    fontSize: 14,
                    fontFamily: 'Montserrat-Regular',
                    textAlign: 'center'
                  }}
                  onPress={() => selectOption(i)}>
                  {e}
                </Text>
              </View>
            ))
          ) : (
            <ActivityIndicator
              style={{
                paddingVertical: 10
              }}
              color={theme.primary}
              size={30}
            />
          )}
        </View>
      </View>
    </View>
  )
}

