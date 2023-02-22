import { Image, Modal, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native"
import { useState } from "react"
import ImageViewModal from './ImageViewModal'
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
    viewImage: {
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default ({image, name, subscription, style}) => {

    const [viewImageState, setViewImage] = useState(false);

    const toggleViewImage = () => {
        setViewImage(!viewImageState)
    }

    const profileImage = image && (image.startsWith('data:image') ? ({uri: image }) : require('../../../assets/images/profile.png'))

    return (
        <View style={[styles.container, style]}>
            <Modal 
            transparent={true}
            style={styles.viewImage}
            visible={viewImageState}>
                <ImageViewModal 
                toggleViewImage={toggleViewImage}
                image={profileImage} />
            </Modal>
            <View style={styles.imageContainer}>
                <TouchableWithoutFeedback onPress={toggleViewImage}>
                    <Image 
                    style={styles.image} 
                    source={profileImage}/> 
                </TouchableWithoutFeedback>
                
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{name ?? "Carregando"}</Text>
                <Text style={styles.subscription}>{`Matricula: ${subscription}`}</Text>
            </View>
            
        </View>
    )
}