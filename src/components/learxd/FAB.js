import { StyleSheet, View, Text, TouchableOpacity, Linking, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"

const idealSize = (Dimensions.get('screen').height - Dimensions.get('screen').width) / 8;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        borderRadius: 25,
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default ({size}) => {
    return (
        <View 
        style={[styles.container, { height: size || idealSize, width: size || idealSize, borderRadius: (size / 2) || (idealSize / 2)}]}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                Linking.openURL('https://learxd.me/github')
            }} style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Icon name="logo-github" color="#FFF" size={size || (idealSize * 0.6)}/>
            </TouchableOpacity>
        </View>
    )
}
