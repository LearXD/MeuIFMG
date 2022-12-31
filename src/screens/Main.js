import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"
import Loading from "./stack/Loading";

import Login from "./stack/Login";
import Authenticated from "./stack/Authenticated";

import Test from "./stack/Test";

import Dev from "../utils/Dev";
import Colors from "../utils/Colors";

StatusBar.setBackgroundColor(Colors.primary)

const { Navigator, Screen } = createNativeStackNavigator();

export default () => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavigationContainer>
                <Navigator initialRouteName={Dev.env.modes[Dev.env.mode].initialScreen}  screenOptions={{
                    headerShown: false,
                }}>
                    <Screen name="Loading" component={Loading}/>

                    <Screen 
                    name="Login" 
                    component={Login} options={{
                        animation: 'fade'
                    }} />

                    <Screen 
                    name="Authenticated" 
                    component={Authenticated}
                    options={{
                        animation: 'slide_from_right'
                    }}/>

                    <Screen name="Teste" component={Test}/>

                </Navigator>
            </NavigationContainer>
        </SafeAreaView>
    )
}