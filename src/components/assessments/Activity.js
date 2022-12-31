import { StyleSheet, View, Text } from "react-native"
import Colors from "../../utils/Colors";

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.primary,
        borderRadius: 10,
        borderWidth: 1,
        padding: 5,
        marginVertical: 5
    }
})

export default ({data}) => {

    const {name, note, date, value} = data;

    return (
        <View style={styles.container}>
            <View style={{
                flex: 1,
                alignContent: 'center',
                justifyContent: 'center',
            }}>
                <Text style={{
                    fontSize: 15
                }}>
                    Atividade: {(<Text style={{fontWeight: 'bold'}}>{name}</Text>)}
                </Text>
                {date && (
                    <Text style={{
                    }}>
                        Data: {date}
                    </Text>
                )}
                <Text>
                    Valor da Atividade: {(<Text style={{fontWeight: 'bold'}}>{value}</Text>)}
                </Text>
                <Text>
                    Nota: {(<Text style={{fontWeight: 'bold'}}>{note || "-/-"}</Text>)}
                </Text>
            </View>
        </View>
    )
}
