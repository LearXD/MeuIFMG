import { useContext, useEffect, useState } from "react"
import { Alert, BackHandler, Linking, Modal, StyleSheet, ToastAndroid, View } from "react-native"
import CustomHeader from "../../components/headers/CustomHeader"
import OptionsContainer from "../../components/home/OptionsContainer"
import ProfileContainer from "../../components/home/ProfileContainer"
import Colors from "../../utils/Colors"
import AuthenticatedContext from '../../context/AuthenticatedContext'
import LoadingScreen from "../../components/LoadingScreen"
import axios from "axios"
import { getRoute } from '../../utils/RouteManager';
import Background from "../../components/Background"
import AsyncStorage from "@react-native-async-storage/async-storage"

const loadUserData = ({ state, dispatch }, { setLoadingMessage, setLoading }) => {
    setLoadingMessage("Carregando informações de usuário...")
    axios({
        url: getRoute('profile'),
        method: 'GET',
        headers: { token: state.token },
        validateStatus: (status) => ((status >= 200 && status < 303) || status === 401)
    }).then(
        ({ data, status }) => {
            if (status !== 401) {
                state.profile = {
                    ...state.profile,
                    name: data.name,
                    image: data.image
                }
                dispatch(state)
                setLoading(false)
                return;
            }
            Alert.alert("Erro ao fazer Login...", data.error.message, [
                {
                    text: 'OK, SAIR.',
                    onPress: () => { BackHandler.exitApp() }
                }
            ])
        }
    ).catch(e => {
        Alert.alert("Erro desconhecido!", e.message, [
            {
                text: 'OK, SAIR.',
                onPress: () => { BackHandler.exitApp() }
            }
        ])
    })
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    optionsContainer: {
        flex: 1,
        padding: 10,
        borderColor: Colors.primary,
        borderWidth: 1.5,
        borderRadius: 10,
        marginTop: 10
    }
})

let loadedUserData = false

export default ({ navigation }) => {

    const { state, dispatch } = useContext(AuthenticatedContext)
    const [loading, setLoading] = useState(true)
    const [loadingMessage, setLoadingMessage] = useState("Carregando...");

    useEffect(() => {
        loadUserData({ state, dispatch }, { setLoading, setLoadingMessage })
    }, [])

    return (
        <Background style={{ flex: 1 }}>

            <Modal 
            visible={loading}
            transparent={true}
            animationType="fade">
                <LoadingScreen message={loadingMessage} />
            </Modal>

            <CustomHeader
                leftButton="exit-outline"
                leftIconStyle={{ transform: [{ rotate: '180deg' }] }}
                onLeftButtonClick={
                    () => {
                        Alert.alert("SAIR", "Deseja mesmo sair?", [
                            {
                                text: 'SIM',
                                onPress: () => {
                                    loadedUserData = false
                                    AsyncStorage.getItem('registration', (err, res) => {
                                        if (!err) {
                                            AsyncStorage.removeItem('registration')
                                            AsyncStorage.removeItem('password')
                                        }
                                    })
                                    state.navigation.pop()
                                    state.navigation.navigate('Login')
                                }
                            },
                            {
                                text: 'NÃO',
                            }
                        ])
                    }}
                title={"MeuIFMG Mobile"} />

            <View style={styles.container}>

                <ProfileContainer
                    image={state.profile.image ?? ''}
                    name={state.profile.name ?? 'Carregando'}
                    subscription={state.profile.registration ?? '000000'}
                />

                <View style={styles.optionsContainer}>
                    <OptionsContainer
                        title="Opções"
                        buttonsBackground={Colors.primary}
                        buttons={[
                            {
                                name: 'Histórico',
                                description: 'Veja suas Notas, Faltas e Carga Horária de cada matéria em todos os anos letivos disponíveis...',
                                backgroundColor: Colors.primary,
                                icon: 'newspaper-outline',
                                onClick: () => navigation.navigate("Historic")
                            },
                            {
                                name: 'Avaliações/Atividades',
                                description: 'Veja suas notas de atividades em matérias em específicas...',
                                backgroundColor: Colors.primary,
                                icon: 'document-text-outline',
                                onClick: () => navigation.navigate("Activities")
                            },
                            {
                                name: 'Notas e Faltas (EM BREVE)',
                                inactive: true,
                                description: 'Veja suas notas e faltas do ano letivo todo em matérias específicas...',
                                backgroundColor: Colors.primary,
                                icon: 'documents-outline',
                                //onClick: () => navigation.navigate("Historic")
                            },
                        ]} />
                </View>

            </View>
        </Background>

    )
}
