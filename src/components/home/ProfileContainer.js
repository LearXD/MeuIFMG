import { Image, StyleSheet, Text, View } from "react-native"
import Colors from "../../utils/Colors"

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.primary,
        padding: 10,
        flexDirection: 'row'
    },
    imageContainer: {
        marginRight: 5,
        borderRadius: 50,
        borderColor: Colors.primary,
        borderWidth: 1,
        padding: 1
    },
    textContainer: {
        flex: 1,
        borderLeftColor: Colors.primary,
        borderLeftWidth: 1,
        marginLeft: 5,
        paddingTop: 5,
        paddingLeft: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        resizeMode: 'contain',
        borderRadius: 50,
        height: 100,
        width: 100,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        flexWrap: 'wrap'
    },

})

export default ({image, name, subscription, style}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.imageContainer}>
                <Image 
                style={styles.image} 
                source={
                    image && (image.startsWith('data:image') ? ({uri: image }) : require('../../../assets/images/profile.png'))
                    }/> 
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{name ?? "Carregando"}</Text>
                <Text style={styles.subscription}>{`Matricula: ${subscription}`}</Text>
            </View>
            
        </View>
    )
}