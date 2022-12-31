import { FlatList, StyleSheet, View, Text } from "react-native"
import Colors from "../../utils/Colors";
import OptionsButton from "./OptionsButton";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: Colors.primary,
        fontWeight: 'bold',
        fontSize: 30,  
    },
    buttonsList: {
        marginTop: 5,
        borderTopWidth: 1,
        borderTopColor: Colors.primary,
        padding: 5,
        paddingTop: 10
    }
})


export default (props) => {
    const {title, buttons} = props;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>

            <FlatList 
            style={styles.buttonsList}
            keyExtractor={(data, i) => i}
            data={buttons}
            renderItem={({item}) => {
                return (
                    <OptionsButton {...item}/>
                )
            }}/>
        </View>
    )
}