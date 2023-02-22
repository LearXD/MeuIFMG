import { BackHandler, ToastAndroid } from "react-native";

export const registerBackPressHandler = () => {
    let backPressed = false;

    BackHandler.addEventListener("hardwareBackPress", () => {
        if (backPressed) {
            BackHandler.exitApp();
            return true;
        }
        ToastAndroid.show("Toque novamente para sair", ToastAndroid.SHORT);
        backPressed = true
        setTimeout(() => { backPressed = false }, 2000);
        return true
    })
}