import { Text, View } from "react-native"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import Situation from "../../components/AcademicSituation/Situation"
import Dropdown from "../../components/historic/Dropdown"

export default () => {   
    return (
        <View style={{flex: 1}}>
            <Dropdown style={{
                margin: 10,
            }}/>
        </View>

    )
}