import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from "react-native"
import Colors from "../../utils/Colors"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        resizeMode: 'contain',
        width: '100%',
        height: '90%'
    }
})

export default ({image, toggleViewImage}) => {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={toggleViewImage}>
                <Image source={image} style={styles.image} />
            </TouchableWithoutFeedback>
        </View>
    )
}
