import { useContext, useEffect, useState } from "react"
import { Alert, BackHandler, Linking, Modal, StyleSheet, ToastAndroid, View } from "react-native"
import CustomHeader from "../../components/headers/CustomHeader"
import OptionsContainer from "../../components/home/OptionsContainer"
import ProfileContainer from "../../components/home/ProfileContainer"
import Colors from "../../utils/Colors"
import AuthenticatedContext from '../../context/AuthenticatedContext'
import Background from "../../components/Background"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { getProfile } from "../../utils/RequestManager"
import { goBackToLogin } from "../../utils/Utils"

const loadUserData = ({ state, dispatch }, setLoading, navigation) => {
    const cancelLoading = setLoading("Carregando informações de usuário...")

    getProfile(state.token).then(response => {
        const acceptedStatuses = [200, 301];
        if (acceptedStatuses.includes(response.status)) {

            state.profile = {
                ...state.profile,
                name: response.data.name,
                image: response.data.image
            }

            dispatch(state)
            cancelLoading()
            return;
        } 
        throw new Error("Erro desconhecido. Status " + response.status)
    }).catch(error => {

        Alert.alert("❌ Erro Encontrado!", error.message, [
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

export default ({ navigation }) => {

    const { state, dispatch, setLoading} = useContext(AuthenticatedContext)

    useEffect(() => {
        loadUserData({ state, dispatch }, setLoading, navigation)
    }, [])

    return (
        <Background style={{ flex: 1 }}>

            <CustomHeader
                leftButton="exit-outline"
                leftIconStyle={{ transform: [{ rotate: '180deg' }] }}
                onLeftButtonClick={
                    () => {
                        Alert.alert("SAIR", "Deseja mesmo sair?", [
                            {
                                text: 'SIM',
                                onPress: () => {
                                    AsyncStorage.getItem('registration', (err) => {
                                        if (!err) {
                                            AsyncStorage.removeItem('registration')
                                            AsyncStorage.removeItem('password')
                                        }
                                    })
                                    goBackToLogin(state.navigation)
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
                                name: 'Sua Situação',
                                description: 'Veja um resumo detalhado sobre sua situação academica...',
                                backgroundColor: Colors.primary,
                                icon: 'happy-outline',
                                onClick: () => navigation.navigate("Situation")
                            },
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
                            
                        ]} />
                </View>

            </View>
        </Background>

    )
}
