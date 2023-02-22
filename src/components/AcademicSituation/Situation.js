import { useState, useEffect } from "react"
import { StyleSheet, View, Text } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import { getAcivities } from "../../utils/RequestManager"

const COLORS = {
    green: '#00C851',
    red: '#ff4444',
    yellow: '#ffbb33',
    loading: '#33b5e5',
}

const icons = [
    "alert-outline",
    "happy-outline",
    "happy-outline",
    "sad-outline",
]

const situations = {
    ERROR: 0,
    GOOD: 1,
    MEDIUM: 2,
    BAD: 3,
}

export default ({token, subject}) => {

    const [loading, setLoading] = useState(false)
    //const [loadingMessage, setLoadingMessage] = useState("Carregando...")

    const [situation, setSituation] = useState(situations.GOOD);
    const [belowAverage, setBelowAverage] = useState([]);

    const [color, setColor] = useState(COLORS.loading);

    const [totalGrade, setTotalGrade] = useState(0);
    const [currentGrade, setCurrentGrade] = useState(0);

    const getFeedbackMessage = (situation) => {

        let message = "";

        const messages = [
            `Ocorreu um erro ao carregar os dados!`,
            `Sua situação em ${subject.name} está excelente! Continue assim!`,
            `Sua situação em ${subject.name} está boa!`,
            `Sua situação em ${subject.name} não está tão boa!`,
        ]

        message += (messages[situation] || "Carregando...");

        const belowNote = Math.floor((totalGrade * 0.6) - currentGrade);
        if(belowNote > 0) {
            message += `\n\nVocê está ${belowNote} pontos abaixo da media (menos de 60% de ${totalGrade} pontos distribuidos).`
        }

        if(belowAverage.length > 0){
            message += `\n\nVocê está abaixo da média em ${belowAverage.length} atividades.`
        }

        return message;

    }

    useEffect(() => {
        getAcivities(token, subject.id).then(response => {
            let totalGrade = 0;
            let currentGrade = 0;
            let belowAverage = []

            response.data.forEach(roles => {
                roles.activities.forEach(activity => {
                    if(!activity.note || activity.name.includes("recuperação") || activity.name.includes("recuperacao")) return; 

                    totalGrade += Math.round(parseFloat(activity.value));
                    currentGrade += Math.round(parseFloat(activity.note));

                    const average = Math.round(0.6 * parseFloat(activity.value));
                    const grade = Math.round(parseFloat(activity.note));
                    if(grade < average){
                        belowAverage.push(activity)
                    }
                });
            })

            setTotalGrade(totalGrade);
            setCurrentGrade(currentGrade);
            setBelowAverage(belowAverage)
            
            if(belowAverage.length > 0) {
                setSituation(situations.MEDIUM)
                setColor(COLORS.yellow)
                return;
            }

            if(((totalGrade * 0.6) - currentGrade) > 0) {
                setSituation(situations.BAD)
                setColor(COLORS.red)
                return;
            }

            setSituation(situations.GOOD)
            setColor(COLORS.green)

            setLoading(false)

        }).catch(error => {
            console.error(error)
            setSituation(situations.ERROR)
        })
    }, [])

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 15,
            marginTop: 8,
            borderRadius: 10,
            backgroundColor: color,
            flexDirection: 'row',
        },
    })

    return (
        <View style={styles.container}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Icon name={icons[situation]} size={30} color="#FFF" />
            </View>
            <View style={{flex: 3, alignItems: 'center'}}>
                <Text style={{
                    fontSize: 20,
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}>{subject.name}</Text>
                <Text style={{textAlign: 'center'}}>{getFeedbackMessage(situation)}</Text>
            </View>
        </View>
    )
}
