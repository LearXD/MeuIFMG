import { useState } from "react"
import { StyleSheet, View, Text, TouchableWithoutFeedback, Dimensions } from "react-native"
import Icon from "react-native-vector-icons/Ionicons"
import Colors from "../../utils/Colors"
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default ({ title, startsOpened, contentStyle, children, style }) => {

    const openedAnimation = useSharedValue(0)

    const iconAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${interpolate(openedAnimation.value, [0, 1], [0, -90])}deg` }]
        }
    });

    const [opened, setOpened] = useState(!!startsOpened)

    const switchOpened = () => {
        setOpened(!opened)
        openedAnimation.value = withTiming(!opened, { duration: 200 })
    }

    return (
        <View style={[styles.container, style]}>
            <View style={styles.touchableView}>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={switchOpened}>
                    <View style={styles.header}>

                        <View style={[styles.centerContainer, { flex: 4 }]}>
                            <Text style={styles.headerTitle}>{title}</Text>
                        </View>

                        <View
                            style={
                                [styles.centerContainer, { flex: 1 }]}>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderColor: '#FFF',
                                borderWidth: 1,
                                borderRadius: 10,
                            }}>
                                <AnimatedIcon
                                    style={[styles.icon, iconAnimatedStyle]}
                                    name="chevron-forward-outline"
                                    size={30} color="#FFF" />
                            </View>
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
                            style={{ alignSelf: 'center', margin: 20, textAlign: 'center' }}>Conteúdo não encontrado</Text>
                    )}
                </View>
            )}
        </View>

    )
}

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
        alignItems: 'center',
        padding: 5,
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