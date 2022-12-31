import { StyleSheet, View, Text, BackHandler, Image, ToastAndroid, Alert, Dimensions, Keyboard } from "react-native"

import CustomInput from "../../components/login/CustomInput"
import CustomButton from "../../components/login/CustomButton"

import FAB from "../../components/learxd/FAB"
import Background from "../../components/Background"
import { doLogin, validadeBoth } from "../../utils/LoginManager"

export default ({ navigation }) => {

    let registrationState = undefined
    let passwordState = undefined

    let submitButton = undefined;

    return (
        <View style={styles.container}>
            <Background
            style={styles.container}>

                <View style={styles.logoContainer}>
                    <View style={{ flex: 3, justifyContent: 'flex-end' }}>
                        <Image
                            style={styles.logo}
                            source={require('../../../assets/images/if_logo.jpg')}
                        />
                    </View>

                    <Text style={styles.logoText}>LOGIN</Text>
                </View>

                <View style={styles.inputsContainer}>
                    
                    <CustomInput
                        state={(state) => registrationState = state}
                        style={{ height: 60 }}
                        keyboardType="number-pad"
                        label={"Digite seu número de matricula:"}
                        color="#309a43"
                    />

                    <CustomInput
                        password
                        state={(state) => passwordState = state}
                        style={{ height: 60, marginTop: '5%' }}
                        label={"Digite sua senha:"}
                        onSubmit={() => {
                            submitButton && submitButton._internalFiberInstanceHandleDEV.memoizedProps.onClick()
                        }}
                        icon={{ active: 'eye', inactive: 'eye-off' }}
                        color="#309a43"
                    />
                    
                    <CustomButton
                        load
                        name="ENTRAR"
                        style={styles.loginButton}
                        instance={(props) => submitButton = props}
                        color="#309a43"
                        onClick={(stopLoading) => {
                            const [registration, password] = [registrationState.inputText, passwordState.inputText]

                            if(!validadeBoth(registration, password)) {
                                stopLoading()
                                return;
                            }

                            Keyboard.dismiss();
                            doLogin( 
                                registration, 
                                password, 
                                {
                                    stopLoading, 
                                    resetPassword: () => passwordState && passwordState.setInputText(''),
                                    loginSucess: (token, registration) => {
                                        navigation.navigate("Authenticated", { token, registration })
                                    }
                                }
                            );
                        }} />

                </View>
                <FAB/>
            </Background>
        </View>
    )
}

const screenHeight = Dimensions.get('screen').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoContainer: {
        flex: 1,
        alignItems: 'center',
    },
    inputsContainer: {
        flex: 1.5,
        alignContent: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: '90%',
        width: windowWidth * .3,
        resizeMode: 'contain',
        alignContent: 'center',
        justifyContent: 'center',
    },
    logoText: {
        flex: 1,
        fontFamily: 'Raleway',
        fontSize: screenHeight * .05,
        color: '#1e752c',
        fontWeight: 'bold'
    },
    loginButton: {
        marginTop: '10%',
        height: 50
    }
})