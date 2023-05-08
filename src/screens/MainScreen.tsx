import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { SafeAreaView, StatusBar, StatusBarStyle } from "react-native"
import SplashScreen from "./others/SplashScreen";
import theme from "../utils/theme";
import LoginScreen from "./auth/LoginScreen";
import changeNavigationBarColor from "react-native-navigation-bar-color";
import { useEffect } from "react";
import AuthenticatedNavigation from "./auth/AuthenticatedNavigator";

const { Navigator, Screen } = createNativeStackNavigator();

export default () => {

  useEffect(() => {
    changeNavigationBarColor(theme.background, false, true)
    //hideNavigationBar()
  })

  return (
    <>
      <SafeAreaView style={{
        width: '100%',
        height: '100%',
        backgroundColor: theme.background
      }}>
        <StatusBar
          barStyle={theme.statusBarStyle as StatusBarStyle}
          backgroundColor={theme.statusBarColor}
        />
        <NavigationContainer>
          <Navigator
            initialRouteName="Splash"

            screenOptions={{
              headerShown: false,
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
      </SafeAreaView>
    </>
  )
}