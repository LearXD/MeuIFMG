import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons'

export default ({backgroundColor, inactive, icon, name, description, onClick}) => {

    const styles = StyleSheet.create({
        container: {
            padding: 10,
            borderRadius: 20,
            borderWidth: 0,
            backgroundColor: backgroundColor,
            opacity: inactive ? 0.6 : 1,
            marginBottom: 10,
            flexDirection: 'row'
        },
        name: {
            color: '#FFF',
            fontWeight: 'bold',
            fontSize: 20
        },
        description: {
            color: '#fdfffd',
            fontSize: 12
        }
    })

    return (
        <TouchableOpacity 
        style={styles.container} 
        activeOpacity={inactive ? styles.container.opacity : 0.6} 
        onPress={() => {inactive || onClick()}}>

            {icon && (
            <View style={{flex: 1, alignItems: 'center', justifyContent: "center"}}>    
                <Icon name={icon} size={40} color="#FFF"/>
            </View>)
            }
            <View style={{flex: 5, justifyContent: 'center'}}>
                <Text style={styles.name}>{name ?? "Botão"}</Text>
                <Text style={styles.description}>{description ?? "Uma descrição qualquer para esse botão, insira usando a tag `description`...."}</Text>
            </View>
            
            
        </TouchableOpacity>
    )
}