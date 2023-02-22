import { ActivityIndicator, Modal, StyleSheet, View, Text, Dimensions } from "react-native"
import Colors from "../utils/Colors"

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.6)',
        padding: 10,
        opacity: 1
    },
    text: {
        fontSize: 15,
        marginBottom:15,
        flexWrap: 'wrap',
        textAlign: 'center'
    }
})

export default ({message, style}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={{
                //height: screenHeight * 0.8,
                backgroundColor: '#fdfffd',
                width: '80%',
                borderRadius: 10,
                borderColor: Colors.primary,
                borderWidth: 1
            }}>
                <View style={{
                    padding: 5,
                    borderBottomColor: Colors.primary,
                    borderBottomWidth: 1,
                    alignItems: 'center'
                }}>
                    <Text style={{fontSize: 20}}>
                        Carregando...
                    </Text>
                </View>
                <View style={{
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Text style={styles.text}>{message}</Text>
                    <ActivityIndicator size={45} color={Colors.primary}/>
                </View>
                
            </View>
            
        </View>
    )
}