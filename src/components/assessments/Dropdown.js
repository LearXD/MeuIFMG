import { useState } from "react"
import { Dimensions, FlatList, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"

import Icon from 'react-native-vector-icons/Ionicons'
import Colors from "../../utils/Colors"

const windowHeight = Dimensions.get('screen').height

const styles = StyleSheet.create({
    container: {
        width: '90%',
    },
    header: {
        backgroundColor: "#eff2ef",
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.primary
    },
    headerOpen: {
        borderWidth: 1,
        borderRadius: 10,
        borderBottomWidth: 1.5,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
    },
    headerClosed: {
        borderWidth: 1,
        borderRadius: 10,
    },
    flatList: {
        backgroundColor: "#eff2ef",
        width: '100%',
        zIndex: 2, // Para não ficar por baixo do header
        height: windowHeight * 0.5,
        position: 'absolute',
        bottom: (-(windowHeight * 0.5)),
        borderWidth: 1,
        borderTopWidth: 0,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderColor: Colors.primary
    }
})

export default ({ options, style, onSelect, keyExtractor, canOpen, nothingSelectedMessage}) => {

    const [selected, setSelected] = useState(undefined)
    const [open, setOpen] = useState(false)

    const selectItem = (i) => {
        setSelected(i)
        setOpen(false)
        onSelect && onSelect(options[i])
    }

    return (
        <View style={[styles.container, style]}>
            <View style={[styles.header, open ? styles.headerOpen : styles.headerClosed]}>
                <TouchableWithoutFeedback
                    style={{
                        flex: 1
                    }}
                    onPress={() => (canOpen === undefined || canOpen) && setOpen(!open)}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                        }}>
                        <View
                            style={{
                                flex: 9,
                                paddingRight: 5,
                                justifyContent: 'center'
                            }}>
                            <Text style={{fontWeight: 'bold'}}>{
                                selected != undefined ? (`Selecionado: ${options[selected].name}`) : (nothingSelectedMessage || "Nada selecionado!")
                            }</Text>
                        </View>

                        <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Icon
                                name={open ? "chevron-up-circle-sharp" : "chevron-down-circle-sharp"}
                                color={Colors.primary}
                                size={25} />
                        </View>
                    </View>

                </TouchableWithoutFeedback>
            </View>
            {open && (
                <FlatList
                    style={[styles.flatList]}
                    data={options}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(data, i) => (keyExtractor ? keyExtractor(data, i) : i)}
                    renderItem={({item, index}) => {
                        return gradItem({
                            item, 
                            index, 
                            selected: (selected === index), 
                            end: (index === (options.length - 1)) 
                        }, selectItem)
                    }}
                />
            )}
        </View>


    )
}

export const gradItem = ({item, index, selected, end}, selectItem) => {
    return (
        <View style={[!end && {
            borderBottomWidth: 1,
            borderBottomColor: '#7A7A7A',
            marginHorizontal: 10
        }, selected && {backgroundColor: '#d3d3d3'}]}>
            <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => selectItem(index)}>
                <View style={[{
                        flex: 1, 
                        padding: 5,
                        paddingVertical: 15,
                    }]}>
                    <Text style={{textAlign: 'center'}}>{item.name}</Text>
                </View>
                
        </TouchableOpacity>
        </View>
        
    )
}