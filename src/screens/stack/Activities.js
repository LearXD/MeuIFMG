import { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, ScrollView, Modal } from 'react-native'
import Activity from '../../components/assessments/Activity'
import Dropdown from '../../components/assessments/Dropdown'
import CustomHeader from '../../components/headers/CustomHeader'
import Colors from '../../utils/Colors'
import { getAcivities, getSubjects } from '../../utils/RequestManager'
import AuthenticatedContext from '../../context/AuthenticatedContext'

import LoadingScreen from '../../components/LoadingScreen'

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


export default ({navigation}) => {

    const { state  } = useContext(AuthenticatedContext)

    const [subjects, setSubjects] = useState([])
    const [activities, setActivities] = useState([])

    const [isLoading, setLoading] = useState(false);
    const [isActivitiesLoading, setActivitiesLoading] = useState(false);

    const [loadingMessage, setLoadingMessage] = useState("Carregando...");

    const reloadActivities = async (data) => {
        setLoadingMessage("Carregando atividades...");
        setActivitiesLoading(true);
        const response = await getAcivities(state.token, data.id);
        setActivities(response.data)
        setActivitiesLoading(false);
    }

    useEffect(() => {
        setLoading(true);
        setLoadingMessage("Carregando Matérias...")
        getSubjects(state.token)
            .then(response => {
                setLoading(false);
                setSubjects(response.data)
            })
    }, [])

    return (
        <>
             <CustomHeader
                leftButton="chevron-back-outline"
                onLeftButtonClick={() => navigation.goBack()}
                title="SUAS NOTAS" />
            <Modal visible={isLoading}>
                <LoadingScreen message={loadingMessage}/>
            </Modal>
            <View
                style={{ flex: 1, alignItems: 'center', paddingVertical: 10 }}
            >

                <Dropdown
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