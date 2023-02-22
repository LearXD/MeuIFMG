import { useContext, useEffect, useState } from "react"
import { StyleSheet, View, Text, Alert, FlatList, Modal } from "react-native"
import Background from "../../components/Background"
import CustomHeader from "../../components/headers/CustomHeader"
import { getSubjects } from "../../utils/RequestManager"
import AuthenticatedContext from '../../context/AuthenticatedContext'
import Situation from "../../components/AcademicSituation/Situation"
import ContextWebView from "../../components/home/ContextWebView"
import CookieManager from "@react-native-cookies/cookies"
import CustomButton from "../../components/login/CustomButton"
import Colors from "../../utils/Colors"

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default({ navigation }) => {

    const [showWebView, setShowWebView] = useState(false)

    const { state, setLoading } = useContext(AuthenticatedContext)
    const [data, setData] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => {
        const cancelLoading = setLoading("Carregando situacao academica...")
        getSubjects(state.token).then((response) => {
            setData(response.data)
            cancelLoading();
        }).catch(() => {
            switch (response.status) {
                case 409:
                    CookieManager.setFromResponse('https://meu.ifmg.edu.br', state.token)
                        .then(() => { setShowWebView(true) })
                    return;
            }
            Alert.alert("❌ Erro Encontrado!", error.message, [
                {
                    text: 'OK, SAIR.',
                    onPress: () => { BackHandler.exitApp() }
                }
            ])
        })
    }

    return (
        <>
            <Modal visible={showWebView}>
                <ContextWebView token={state.token} onEndSession={() => {
                    setShowWebView(false)
                    loadData();
                }} />
            </Modal>

            <Background style={styles.container}>
                <CustomHeader
                    leftButton="chevron-back-outline"
                    onLeftButtonClick={() => navigation.goBack()}
                    title="SUA SITUAÇÃO"
                />
                <CustomButton
                    style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: Colors.primary,
                        margin: 10,
                        //width: '100%',
                        padding: 5,
                    }}
                    onClick={() => {
                        CookieManager.setFromResponse('https://meu.ifmg.edu.br', state.token)
                            .then(() => { setShowWebView(true) })
                            .catch((e) => Alert.alert("Erro", e.message))
                    }}
                    name={"ALTERAR PERIODO LETIVO"}
                />
                <FlatList
                    data={data}
                    style={{
                        paddingHorizontal: 10
                    }}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        return (<Situation token={state.token} subject={item} />)
                    }}
                    
                />

            </Background>
        </>
    )
}
