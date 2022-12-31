import { useState } from "react"
import { StyleSheet, View, Text, TouchableWithoutFeedback, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import Colors from "../../utils/Colors"

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
    },
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    touchableView: { // VERDADEIRO HEADER
        height: Dimensions.get('screen').height * 0.08, // 8%
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
    },
    icon: {
        justifyContent: 'center',
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        paddingBottom: 0
    },

    headerTitle: {
        color: '#FFF',
        fontSize: 20
    },
    content: {
        marginTop: 10,
        padding: 1,
        backgroundColor: Colors.primary
    }
})

export default ({ title, startsOpened, contentStyle, children, style }) => {

    const [opened, setOpened] = useState(!!startsOpened)

    const switchOpened = () => setOpened(!opened)

    return (
        <View style={[styles.container, style]}>
            <View style={styles.touchableView}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={switchOpened}>
                    <View style={styles.header}>

                        <View style={[styles.centerContainer, { flex: 4 }]}>
                            <Text style={styles.headerTitle}>{title}</Text>
                        </View>

                        <View style={[styles.centerContainer, { flex: 1 }]}>
                            <Icon 
                            style={styles.icon} 
                            name={opened ? 'chevron-up-outline' : 'chevron-forward-outline'} 
                            size={30} color="#FFF" />

                        </View>
                    </View>

                </TouchableWithoutFeedback>
            </View>

            {opened && (
                <View style={[styles.content, contentStyle]}>
                    {children ? (
                        children
                    ) : (
                        <Text 
                        style={{alignSelf: 'center', margin: 20, textAlign: 'center'}}>Conteúdo não encontrado</Text>
                    )}
                </View>
            )}
        </View>

    )
}