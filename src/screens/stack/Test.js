import { Text, View } from "react-native"
import ShimmerPlaceholder from "react-native-shimmer-placeholder"
import Situation from "../../components/AcademicSituation/Situation"

export default () => {   
    return (
        <View style={{flex: 1}}>
            <ShimmerPlaceholder
            visible={true}
            >
                <Text>aAAAAaa</Text>
            </ShimmerPlaceholder>
        </View>

    )
}