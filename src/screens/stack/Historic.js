import { useContext, useEffect, useState } from "react"
import { StyleSheet, View, Modal, Alert, FlatList } from "react-native"
import AuthenticatedContext from '../../context/AuthenticatedContext'
import Background from "../../components/Background"
import CustomHeader from "../../components/headers/CustomHeader"
import Dropdown from "../../components/historic/Dropdown"
import GradeList from "../../components/historic/GradeList"
import CookieManager from "@react-native-cookies/cookies"
import ContextWebView from "../../components/home/ContextWebView"
import { getHistoric } from "../../utils/RequestManager"

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

const loadHistory = (token, { setHistoric, setLoading, setShowWebView }) => {
    const cancelLoading = setLoading("Carregando histórico...")

    getHistoric(token)
        .then(response => {
            switch (response.status) {
                case 200:
                case 301:
                    cancelLoading();
                    setHistoric(response.data)
                    return;
                case 409:
                    CookieManager.setFromResponse('https://meu.ifmg.edu.br', token)
                        .then((success) => {setShowWebView(true)})
                    return;
            }
            throw new Error("Erro desconhecido!");
        })
        .catch(error => {
            Alert.alert("Aviso!", error.message, [
                {
                    text: 'OK, SAIR.',
                    onPress: () => { BackHandler.exitApp() }
                }
            ])
        })
}

export default ({ navigation }) => {

    const { state, setLoading } = useContext(AuthenticatedContext)
    
    const [historic, setHistoric] = useState()
    const [showWebView, setShowWebView] = useState(false)

    useEffect(() => {
        loadHistory(state.token, { setHistoric, setLoading })
    }, [])

    return (
        <>
            <Modal visible={showWebView}>
                <ContextWebView token={state.token} onEndSession={() => {
                    setShowWebView(false)
                    loadHistory(state.token, { setHistoric, setLoading })
                }} />
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
                        renderItem={({ item }) => {
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
