import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { View } from "react-native"
import SplashScreen from "./others/SplashScreen";
import theme from "../utils/theme";
import LoginScreen from "./auth/LoginScreen";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { useEffect } from "react";
import AuthenticatedNavigation from "./auth/AuthenticatedNavigator";
import { ScreenProps } from "react-native-screens";

const { Navigator, Screen } = createNativeStackNavigator();

export default () => {

  useEffect(() => changeNavigationBarColor(theme.background, false, true))

  return (
    <View style={{
      flex: 1,
      backgroundColor: theme.background
    }}>
      <NavigationContainer>
        <Navigator
          initialRouteName="Splash"

          screenOptions={{
            headerShown: false,
            statusBarStyle: theme.statusBarStyle as ScreenProps['statusBarStyle'],
            statusBarColor: theme.statusBarColor,
          }}
        >
          <Screen
            name="Splash"
            component={SplashScreen}
          />

          <Screen
            name="Login"
            component={LoginScreen}
            options={{
              animation: 'simple_push',
            }}
          />
          <Screen
            name="Authenticated"
            component={AuthenticatedNavigation}
            options={{
              animation: 'simple_push',
            }}
          />
        </Navigator>
      </NavigationContainer>
    </View>
  )
}