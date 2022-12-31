import { StyleSheet, View, Text, ListViewBase } from "react-native"

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    subjectContainer: {
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        padding: 10,
        borderBottomWidth: 1
    },
    subjectText: {
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 20,
        
    },
    gradesContainer: {
        width: '100%',
        padding: 10,
        alignItems: 'center'
    },
    gradesText: {
        width: '79%'
    }
})

export default ({ data, subject, style }) => {

    let texts = [];

    for (let key in data) {
        if(["C.H.", "Créditos", "Cód. disciplina"].includes(key)) continue;
        texts.push(
            <Text key={texts.length} style={{marginTop: 2}}>{`${key}: ${data[key]}`}</Text>
        )
    }

    return (
        <View style={[styles.container, style]}>
            <View style={styles.subjectContainer}>
                <Text style={styles.subjectText}>
                    {subject}
                </Text>
            </View>
            
            <View style={styles.gradesContainer}>
                {texts.length ? texts : (<Text style={{marginTop: 2}}>Informações indisponíveis!</Text>)}
            </View>

        </View>
    )
}
