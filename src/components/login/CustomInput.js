import { useState } from "react"
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View, Text } from "react-native"
import Ionicon from 'react-native-vector-icons/Ionicons'

export default (props) => {

    let { 
        children, 
        style, 
        placeholder, 
        icon, 
        label, 
        onTextChange, 
        onIconPress, 
        color, 
        password, 
        keyboardType, 
        onSubmit, 
        state
    } = props
    
    color ?? (color = '#000');
    children ?? (children = '')
    placeholder ?? (placeholder = 'Digite aqui....')

    const [inputText, setInputText] = useState(children)
    const [iconState, setIconState] = useState(true)

    state && state({inputText, setInputText})

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'center',
            borderRadius: 10,
            borderColor: color,
            borderWidth: 1,
            width: '80%',
            paddingRight: 5,
            paddingLeft: 20,
            paddingVertical: 10
        },
        inputContainer: {
            flex: 6,
        },
        iconContainer: {
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'center',
            borderLeftWidth: 1,
            paddingLeft: 5,
            borderLeftColor: color
        },
        labelText: {
            padding: 0,
            fontSize: 12,
            color: '#000',
            fontWeight: 'bold'
        },
        input: {
            shadowColor: color,
            color: '#4c4c4c',
            padding: 0,
            paddingRight: 20
        },
        iconTouchable: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }
    })


    const onChangeText = (text) => {
        setInputText(text);
        onTextChange && onTextChange(text);
    }

    const toggleIconState = () => {
        setIconState(!iconState)
        onIconPress && onIconPress(iconState);
    }

    return (
        <View style={[styles.container, style]}>

            <View style={styles.inputContainer}>
                {label && (
                    <Text style={styles.labelText}>{label}</Text>
                )}
                <TextInput 
                keyboardType={keyboardType ?? "default"}
                secureTextEntry={password && iconState}
                autoCorrect={false}
                onSubmitEditing={onSubmit}
                style={styles.input} 
                placeholder={placeholder} 
                value={inputText} 
                onChangeText={onChangeText} />
            </View>

            {icon && (
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={toggleIconState}
                    style={styles.iconTouchable}
                    activeOpacity={0.5}>
                        <Ionicon 
                        color="#000"
                        name={iconState ? (icon.active || 'eye') : (icon.inactive || 'eye-off')} 
                        size={icon.size || 22} />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}