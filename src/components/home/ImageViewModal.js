import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from "react-native"
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

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
    const animatedShared = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            width: `${interpolate(animatedShared.value, [0, 1], [0, 100])}%`,
            height: `${interpolate(animatedShared.value, [0, 1], [0, 90])}%`,
        }
    })

    animatedShared.value = withTiming(1, { duration: 500 })

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => {toggleViewImage(); animatedShared.value = 0}}>
                <Animated.Image source={image} style={[styles.image, animatedStyle]} />
            </TouchableWithoutFeedback>
        </View>
    )
}
