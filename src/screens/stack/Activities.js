import { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, Modal, Alert, BackHandler, ToastAndroid } from 'react-native'
import Activity from '../../components/assessments/Activity'
import Dropdown from '../../components/assessments/Dropdown'
import CustomHeader from '../../components/headers/CustomHeader'
import Colors from '../../utils/Colors'
import { getAcivities, getSubjects } from '../../utils/RequestManager'
import AuthenticatedContext from '../../context/AuthenticatedContext'

import LoadingScreen from '../../components/LoadingScreen'
import ContextWebView from '../../components/home/ContextWebView'
import CookieManager from '@react-native-cookies/cookies'

import CustomButton from '../../components/login/CustomButton'

const styles = StyleSheet.create({
    contents: {
        flex: 1,
        width: '90%',
        marginTop: 10,
        padding: 10,
        borderColor: Colors.primary,
        borderRadius: 10,
        borderWidth: 1
    }
})


export default ({ navigation }) => {

    const { state, setLoading } = useContext(AuthenticatedContext)

    const [subjects, setSubjects] = useState([])
    const [activities, setActivities] = useState([])

    const [isActivitiesLoading, setActivitiesLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState("Carregando...");

    const [showWebView, setShowWebView] = useState(false)

    const reloadActivities = async (data) => {
        setLoadingMessage("Carregando atividades...");
        setActivitiesLoading(true);

        getAcivities(state.token, data.id)
        .then(response => {
            setActivities(response.data)
            setActivitiesLoading(false);
        })
        .catch(error => {
            Alert.alert("Erro", "Erro: " + error.message)
        });
    }

    const loadSubjects = () => {
        const cancelLoading = setLoading("Carregando Matérias...");
        getSubjects(state.token)
            .then(async (response) => {
                cancelLoading();
                response.data.map((subject) => {
                    const name = subject.name.split("-");
                    name.shift();
                    subject.name = name.join("-")
                    return subject
                })
                setSubjects(response.data)
                
            }).catch((error) => {
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

    useEffect(() => {
        loadSubjects();
    }, [])

    return (
        <>
            <Modal visible={showWebView}>
                <ContextWebView token={state.token} onEndSession={() => {
                    setShowWebView(false)
                    loadSubjects();
                }} />
            </Modal>

            <CustomHeader
                leftButton="chevron-back-outline"
                onLeftButtonClick={() => navigation.goBack()}
                title="SUAS NOTAS" />

            <View
                style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}
            >

                <CustomButton
                    style={{
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: Colors.primary,
                        marginBottom: 10,
                        width: '90%',
                        padding: 5,
                    }}
                    onClick={() => {
                        CookieManager.setFromResponse('https://meu.ifmg.edu.br', state.token)
                            .then(() => { setShowWebView(true) })
                            .catch((e) => Alert.alert("Erro", e.message))
                    }}
                    name={"ALTERAR PERIODO LETIVO"}
                />

                <Dropdown
                    nothingSelectedMessage="Clique para selecionar uma matéria"
                    options={subjects}
                    canOpen={!isActivitiesLoading}
                    onSelect={(data) => {
                        reloadActivities(data)
                    }} />


                <View style={styles.contents}>

                    <FlatList
                        data={activities}
                        keyExtractor={(_, i) => i}
                        renderItem={({ item, index }) => {
                            return getActivityItem(item, index)
                        }}
                    />
                    {isActivitiesLoading && (
                        <LoadingScreen
                            style={{
                                backgroundColor: "#eff2ef",
                                position: 'relative',
                                borderRadius: 10,
                                height: '100%',
                                width: '100%',
                            }}
                            message={loadingMessage}
                        />)}
                </View>

            </View>
        </>

    )
}

export const getActivityItem = ({ role, activities }, index) => {

    if (activities.length < 1) {
        return;
    }

    const actvs = [];

    for (let index in activities) {
        actvs.push(
            <Activity key={index} data={activities[index]} />
        )
    }

    return (
        <View
            style={{
                borderColor: Colors.primary,
                borderWidth: 1,
                marginBottom: 10,
                padding: 5,
            }}>
            <View
                style={{
                    borderBottomColor: Colors.primary,
                    borderBottomWidth: 1,
                    paddingBottom: 5
                }}>
                <Text
                    style={{
                        fontSize: 20,
                        textAlign: 'center',
                        fontWeight: 'bold'
                    }}>
                    {role}
                </Text>
            </View>

            {actvs}
        </View>
    )
}