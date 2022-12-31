import { StyleSheet, View, Text } from "react-native"
import GradeItem from "./GradeItem"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    }
})

export default ({data, itemStyle}) => {

    //console.log(data)

    const items = []
    for (let subData of data) {
        items.push(
            <GradeItem style={itemStyle} key={items.length} subject={subData.name} data={subData.data}/>
        )
    }

    return (
        <View style={styles.container}>
            {items.length ? items : (
            <Text style={{margin: 10, textAlign: 'center', color: '#FFF'}}>
                Nenhum dado disponível!
            </Text>
            )}
        </View>
    )
}
