import { useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Text } from "react-native"

export default (props) => {

    const [pressed, setPressed] = useState(false)
    const [loading, setLoading] = useState(false)

    let { name, load, style, color, onClick, instance } = props;
    name ?? (name = "Botão")

    const styles = StyleSheet.create({
        container: {
            borderRadius: 20,
            alignItems: 'stretch',
            justifyContent: 'center',
        },
        touchableContainer: {
            
        },
        pressedStyle: {
            borderWidth: 2,
            borderColor: color,
            opacity: 0.7,
        },
        unpressedStyle: {
            borderWidth: 2,
            borderColor: color,
            opacity: 1
        },
        text: {
            color,
            fontSize: 15,
            fontWeight: 'bold',
            textAlign: 'center'
        }
    })

    return (
        <View 
        style={[styles.container, (pressed || loading) ? styles.pressedStyle : styles.unpressedStyle,style]}>
            <TouchableOpacity
                ref={instance}
                style={[styles.touchableContainer, { opacity: pressed ? 0.5 : 1}]}
                onPressIn={() => setPressed(true)}
                onPressOut={() => setPressed(false)}
                onPress={() => {
                    if(load) {
                        setLoading(true)
                        return onClick && onClick(() => {
                            setLoading(false)
                        });
                    }
                    return onClick && onClick();
                }}>
                {(load && loading) ? (
                    <ActivityIndicator color={color} size={25}/>
                ) : (
                    <Text style={styles.text}>
                        {name}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    )
}