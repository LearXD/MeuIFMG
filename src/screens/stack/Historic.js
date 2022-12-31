import { useContext, useEffect, useState } from "react"
import { StyleSheet, View, ScrollView, Linking, Modal, Alert, FlatList } from "react-native"
import AuthenticatedContext from '../../context/AuthenticatedContext'
import Background from "../../components/Background"
import CustomHeader from "../../components/headers/CustomHeader"
import Dropdown from "../../components/historic/Dropdown"
import GradeList from "../../components/historic/GradeList"
import { getRoute } from "../../utils/RouteManager"
import CookieManager from "@react-native-cookies/cookies"
import ContextWebView from "../../components/home/ContextWebView"
import LoadingScreen from "../../components/LoadingScreen"
import axios from "axios"

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 8,
        padding: 10
    },
    dropdown: {
        marginBottom: 10
    },
    dropdownContent: {
        padding: 5,
        paddingTop: 10
    },
    gradeListItem: {
        marginTop: 10,
    }
})

const loadHistory = (token, { setHistoric, setLoading, setLoadingMessage, setShowWebView }) => {
    setLoading(true)
    setLoadingMessage("Carregando histórico...")
    axios({
        url: getRoute('historic'),
        method: 'GET',
        headers: { token },
        validateStatus: (status) => ((status >= 200 && status < 303) || status === 401 || status === 409)
    }).then(
        ({ data, status }) => {
            switch (status) {
                case 409:
                    const contextAlert = () => {
                        Alert.alert(
                            "Aviso de Contexto!",
                            '\nVocê ainda não selecionou um ano letivo no site do MeuIFMG.\n\nAcesse o site, faça login com suas credenciais, clique em hisórico e selecione o ano letivo respectivo, e não se esqueça de marcar a caixa de "Salvar período letivo"...\n\nApós fazer esse procedimento, clique em "Recarregar"!', [
                            {
                                text: 'Acessar Site',
                                onPress: () => {
                                    contextAlert()
                                    Linking.openURL('https://meu.ifmg.edu.br/')
                                }
                            },
                            {
                                text: 'Recarregar',
                                onPress: () => {
                                    loadHistory(context, loadingData)
                                }
                            },
                            {
                                text: 'Voltar',
                                onPress: () => {
                                    loadedUserData = false
                                    state.navigation.pop()
                                    state.navigation.navigate('Login')
                                }
                            }
                        ])
                    }

                    CookieManager.setFromResponse(
                        'https://meu.ifmg.edu.br', state.token).then(
                            (success) => {
                                setShowWebView(true)
                            }).catch((error) => {
                                contextAlert();
                            }
                            );

                    return;
                case 401:
                    Alert.alert(
                        "Credenciais Inválidas!",
                        '\nA sessão que você estava conectado(a) expirou ou foi encerrada inesperadamente, volte e faça login novamente!', [
                        {
                            text: 'Voltar',
                            onPress: () => {
                                loadedUserData = false
                                state.navigation.pop()
                                state.navigation.navigate('Login')
                            }
                        }
                    ])
                    return;
                case 200:
                case 301:
                    setLoading(false)
                    setHistoric(data)
                    return;
            }

            throw new Error("Erro desconhecido!");
        }
    ).catch(e => {
        console.error(e)
        Alert.alert("ERRO INTERNO", `Erro: ${e.message}`, [
            {
                text: 'OK, SAIR.',
                onPress: () => BackHandler.exitApp()
            }
        ])
    })
}

export default ({ navigation }) => {

    const { state } = useContext(AuthenticatedContext)

    const [historic, setHistoric] = useState()

    const [loading, setLoading] = useState(false)
    const [loadingMessage, setLoadingMessage] = useState("Carregando...");

    const [showWebView, setShowWebView] = useState(false)

    useEffect(() => {
        loadHistory(state.token, { setHistoric, setLoadingMessage, setLoading, setShowWebView })
    }, [])

    return (
        <>
            <Modal visible={showWebView}>
                <ContextWebView token={state.token} onEndSession={() => {
                    setShowWebView(false)
                    loadHistory({ state, dispatch }, { setLoading, setLoadingMessage, setShowWebView })
                }} />
            </Modal>

            <Modal visible={loading}>
                <LoadingScreen message={loadingMessage} />
            </Modal>

            <Background style={{ flex: 1 }}>
                <CustomHeader
                    leftButton="chevron-back-outline"
                    onLeftButtonClick={() => navigation.goBack()}
                    title="SEU HISTORICO" />

                <View style={styles.container}>
                    <FlatList
                        style={styles.contentContainer}
                        data={historic}
                        keyExtractor={(_, i) => i}
                        renderItem={({item}) => {
                            //console.log(data);
                            return (
                                <Dropdown style={styles.dropdown} contentStyle={styles.dropdownContent} title={item.period.replace(/_/g, ' ')}>
                                    <GradeList itemStyle={styles.gradeListItem} data={item.subjects} />
                                </Dropdown>
                            )
                        }} />
                </View>
            </Background>
        </>


    )
}
