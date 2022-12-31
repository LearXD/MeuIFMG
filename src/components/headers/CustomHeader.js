import { StyleSheet, View, Text, TouchableOpacity } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import Colors from "../../utils/Colors"

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 20,
        borderBottomEndRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderWidth: 0,
        height: '8.5%',
        flexDirection: 'row',
    },
    sides: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20
    },
    leftButton: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default (
    {title, titleStyle, leftButton, onLeftButtonClick, rightButton, onRightButtonClick, rightIconStyle, leftIconStyle, style}
    ) => {
    return (
        <View style={[styles.container, style]}>
            <View style={[{ flex: 1 }, styles.sides]}>
            {leftButton && (
                <TouchableOpacity activeOpacity={0.7} onPress={onLeftButtonClick} style={styles.leftButton}>
                    <Icon style={leftIconStyle} name={leftButton} size={30} color="#FFF"/>
                </TouchableOpacity>
            )}
            </View >

            <View style={[{ flex: 3 }, styles.sides]}>
                <Text style={[styles.title, titleStyle]}>{title}</Text>
            </View>

            <View style={[{ flex: 1}, styles.sides]}>
                {rightButton && (
                    <TouchableOpacity activeOpacity={0.7} onPress={onRightButtonClick} style={styles.rightButton}>
                        <Icon style={rightIconStyle} name={rightButton} size={30}/>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}