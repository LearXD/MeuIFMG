import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Alert, ToastAndroid } from "react-native";
import { getRoute } from "./RouteManager";

export const validadeRegistration = (input) => {
    return input.length === 7 && !!input.match(/^[0-9]*$/)
}

export const validadePassword = (input) => {
    return input.length >= 3;
}

export const validadeBoth = (registration, password) => {
    if (!validadeRegistration(registration)) {
        ToastAndroid.show("Defina uma matricula de 7 números!", ToastAndroid.LONG)
        return false;
    }

    if (!validadePassword(password)) {
        ToastAndroid.show("Defina uma senha de pelo menos 3 caracteres!", ToastAndroid.LONG)
        return false;
    }

    return true;
}

export const doLogin = (registration, password, callbacks) => {

    axios({
        url: getRoute('login'),
        method: 'POST',
        data: { registration, password},
        validateStatus: (status) => ([200, 301, 401].includes(status)),
    }).then((response) => {

        callbacks.stopLoading && callbacks.stopLoading()

        if (response.status === 401) {
            callbacks.resetPassword && callbacks.resetPassword()
            return ToastAndroid.show(response.data.error.message, ToastAndroid.SHORT)
        }

        AsyncStorage.setItem('registration', registration).catch(e => ToastAndroid.show(e.message, ToastAndroid.SHORT))
        AsyncStorage.setItem('password', password).catch(e => ToastAndroid.show(e.message, ToastAndroid.SHORT))
        
        callbacks.loginSucess && callbacks.loginSucess(response.data.token, registration)
    }).catch((error) => {
        callbacks.stopLoading && callbacks.stopLoading()
        Alert.alert(
            "Erro", 
            error.message === "Network Error" ? 
            `\nNão foi possível fazer login pois você está desconectado(a) à intenet!` :
            error.message
        )
    })
    return true
}